angular.module('swWebSocket', [])

.constant('WS_STATUSES', ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'])
.constant('WS_CLOSE_STATUSES', ['CLOSING', 'CLOSED'])
.constant('WS_OPEN_STATUS', 'OPEN')

.factory 'swWebSocket', ($q, $interval, $timeout, WS_STATUSES, WS_CLOSE_STATUSES, WS_OPEN_STATUS) ->
    class swWebSocket
        constructor: (wsUri) ->
            this.wsUri = wsUri

            # keep alive
            this.durable = false

            # messages queue
            this.messagesToSend = []

            # handlers
            this.startHandlers = []
            this.messageHandlers = []
            this.errorHandlers = []

            this._socket = undefined


        start: (durable) ->
            this._getSocket()

            if durable
                this.durable = true

        close: ->
            this.durable = false
            this._socket.close()


        send: (msg) ->
            # add message to messages list
            this.messagesToSend.push(msg)

            # init connection if necessary
            this._getSocket()


        onStart: (callback) ->
            this.startHandlers.push callback

        onMessage: (callback) ->
            this.messageHandlers.push callback

        onError: (callback) ->
            this.errorHandlers.push callback


        getStatus: ->
            status = undefined
            if this._socketExists()
                status = WS_STATUSES[this._socket.readyState]
            return status

        isOpen: ->
            return this.getStatus() == WS_OPEN_STATUS

        isClosed: ->
            return this.getStatus() in WS_CLOSE_STATUSES


        _getSocket: ->
            if not this._isSocketActive()
                this._socket = this._createSocket()

            return this._socket

        _createSocket: () ->
            socket = new WebSocket(this.wsUri)

            socket.onopen = (event) => this._onSocketOpen(event)
            socket.onclose = (event) => this._onSocketClose(event)
            socket.onmessage = (event) => this._onSocketMessage(event)

            return socket


        _onSocketOpen: (event) ->
            for handler in this.startHandlers
                handler(event.data)
            this._startSend()

        _onSocketMessage: (event) ->
            for handler in this.messageHandlers
                handler(event.data)

        _onSocketClose: ->
            this._stopSend()

            # trying reconnect
            if this.durable
                restartConnection = =>
                    this._getSocket()
                $timeout(restartConnection, 2000)


        _startSend: ->
            sendMsg = =>
                while this._messagesExists() and this._isSocketActive()
                    msg = this.messagesToSend.shift()
                    this._getSocket().send(msg)

            # periodically try send messages from queue
            this.stopSendPromise = $interval(sendMsg, 500)

        _stopSend: ->
            if this.stopSendPromise != undefined
                $interval.cancel(this.stopSendPromise)



        _socketExists: ->
            return this._socket != undefined

        _isSocketActive: ->
            return this._socketExists() and not this.isClosed()

        _messagesExists: ->
            return this.messagesToSend.length > 0



    return swWebSocket