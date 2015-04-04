(function() {
  angular.module('swWebsocket', []).factory('swWebSocket', function($q, $interval, $timeout) {
    var swWebSocket;
    swWebSocket = (function() {
      function swWebSocket(wsUri) {
        this.wsUri = wsUri;
      }

      return swWebSocket;

    })();
    return swWebSocket;
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3LWFuZ3VsYXItd2Vic29ja2V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLEVBQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxhQUFmLEVBQThCLEVBQTlCLENBRUEsQ0FBQyxPQUZELENBRVMsYUFGVCxFQUV3QixTQUFDLEVBQUQsRUFBSyxTQUFMLEVBQWdCLFFBQWhCLEdBQUE7QUFFcEIsUUFBQSxXQUFBO0FBQUEsSUFBTTtBQUNXLE1BQUEscUJBQUMsS0FBRCxHQUFBO0FBQ1QsUUFBQSxJQUFJLENBQUMsS0FBTCxHQUFhLEtBQWIsQ0FEUztNQUFBLENBQWI7O3lCQUFBOztRQURKLENBQUE7QUFLQSxXQUFPLFdBQVAsQ0FQb0I7RUFBQSxDQUZ4QixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJzdy1hbmd1bGFyLXdlYnNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdzd1dlYnNvY2tldCcsIFtdKVxuXG4uZmFjdG9yeSAnc3dXZWJTb2NrZXQnLCAoJHEsICRpbnRlcnZhbCwgJHRpbWVvdXQpIC0+XG5cbiAgICBjbGFzcyBzd1dlYlNvY2tldFxuICAgICAgICBjb25zdHJ1Y3RvcjogKHdzVXJpKSAtPlxuICAgICAgICAgICAgdGhpcy53c1VyaSA9IHdzVXJpXG5cblxuICAgIHJldHVybiBzd1dlYlNvY2tldCJdfQ==