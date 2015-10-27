# trucs
[AngularJs] - Sharing RootScope data between controller
```TEXT
Demo Sharing Scope :http://jsfiddle.net/e1w7gL18/2/
AngularJs Event : http://tutorials.jenkov.com/angularjs/events.html
Plugin DatePicker : https://github.com/720kb/angular-datepicker
Liste de plugins : http://webmaterialcube.com/category/angular-js-plugins/
		   http://ngmodules.org/modules/
```


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

Conditionnal Class on Scope

Two Ways:

```javascript
1. ng:class="{true:'selected', false:''}[$index==selectedIndex]" or ng-class="{selected: $index==selectedIndex}"
2. ng-class="{admin:'enabled', moderator:'disabled', '':'hidden'}[user.role]"
```

To ParJson : 
```javascript
angular.fromJson(data);
```


To Select Element by $event
```javascript
In function($event) :
1. Select element : angular.element(event.target);
2. Select parent  : angular.element(event.target).parent();
3. Ex add a class : angular.element(event.target).parent().addClass('loading');
```
Create Scope and assign value
```javascript
$scope[scopeName] = Value;
```

Autocomplete off on Input
```HTML
add to input : autocomplete="off"
```

Wait Dom and Angular Load before $scope.$watch
```javascript
if(angular.isDefined(newVal)){
  //Do Something
}
```

Avoid to blink {{value}} before Angular module load
```javascript
Do not use : <h4>{{title}}</h4>
but ng-bind :<h4 ng-bind="title"></h4>
Or ng-bind-template to multiple values : <h4 ng-bind-template="{{title}} {{date}}"></h4>
```

How to assign default value From PHP to Input on load
```HTML
<input type='hidden' id='type' ng-init="initAuth('<?php echo Auth::user();?>')" ng-model="admin">
```
```javascript
    $scope.initAuth = function(value){
        $scope.admin = value;
    };
```
