angular.module('swWebSocket', [])

.factory 'swWebSocket', ($q, $interval, $timeout) ->

    class swWebSocket
        constructor: (wsUri) ->
            this.wsUri = wsUri


    return swWebSocket