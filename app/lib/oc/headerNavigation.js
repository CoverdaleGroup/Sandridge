angular.module('OrderCloud-HeaderNavigation', []);
angular.module('OrderCloud-HeaderNavigation')
    .directive('headernavigation', headernavigation)
    .controller('HeaderNavigationCtrl', HeaderNavigationCtrl)
;

function headernavigation() {
    return {
        restrict: 'E',
        template: template
    };

    function template() {
        return [
            '<section class="header-navigation navbar-fixed-top">',
            '<div class="row">',
            '<div class="col-xs-12 col-sm-6 pull-right">',
            '<ul>',
            '<li><a href="contactus"><i class="fa fa-envelope"></i> Contact Us</a></li>',
            '<li><a href="admin"><i class="fa fa-cog"></i> Account</a></li>',
            '<li><a href="cart"><i class="fa fa-shopping-cart"></i> Cart&nbsp;',
            '<span ng-if="currentOrder.LineItems.length" ng-bind="cartCount" class="badge"></span>',
            '</a></li>',
            '<li><a ng-click="Logout()"><i class="fa fa-sign-out"></i> Log Out</a></li>',
            '</ul>',
            '</div>',
            '</div>',
            '</section>'
        ].join('');
    }
}

HeaderNavigationCtrl.$inject = ['$scope','User'];
function HeaderNavigationCtrl($scope, User) {

    $scope.Logout = function(){
        User.logout();
        if ($scope.isAnon) {
            $location.path("/catalog");
            User.login(function(user) {
                $scope.user = user;
            });
        }
    };

}
