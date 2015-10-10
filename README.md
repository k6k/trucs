# trucs
[AngularJs] - Sharing RootScope data between controller
http://jsfiddle.net/e1w7gL18/1/

HTML : 
```HTML
<div ng-app="app">
    <div ng-controller="A">
        <input type="text" ng-model="mod"><br>
            / {{modu()}}
    </div>
            
    <div ng-controller="B">
        <input type="text" ng-model="mode"><br>
            {{data.sentAmount}} / {{abloba}}
    </div>
</div>
```
Javasript : 
```javascript
var app = angular.module("app",[]);
app.run(function($rootScope){
	$rootScope.data = {'sentAmount':1};
});

app.controller('A',['$scope','$rootScope',function($scope,$rootScope){
      $scope.mod ='';
      $scope.modu = function(){
            return $scope.mod*1+5;
      };
      function J(){
          $rootScope.data.sentAmount = $scope.modu();
      };

  	$scope.$watch($scope.modu,J);
  }]);

app.controller('B',['$scope','$rootScope',function($scope,$rootScope){
 	
     function J(){
          $scope.abloba = $rootScope.data.sentAmount;
      };
      function getDataAmount(){
          return $rootScope.data.sentAmount
      };

    $scope.$watch(getDataAmount, J,true);
}]);
```
