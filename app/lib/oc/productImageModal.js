angular.module('OrderCloud-ProductImageModal', []);

angular.module('OrderCloud-ProductImageModal')
    .directive('productimagemodal', productimagemodal)
    .controller('ProductImageModalCtrl', ProductImageModalCtrl)
;

function productimagemodal() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'ProductImageModalCtrl'
    };
    return directive;

    /*TODO: add ng-if to a class if there is a product image -- need to pass ?? ng-if="item.Product.LargeImageURL"  */
    function template() {
        return [
            '<style>',
            'productimagemodal a:hover {color:inherit;text-decoration:none;}',
            '.lightbox {font-size:16px; padding:10px 0;}',
            '</style>',
            '<a class="lightbox" ng-click="open(500)">',
            '<figure ng-hide="LineItem.Variant.PreviewUrl">',
                '<img id="451_img_prod_lg" class="product-image-large img-responsive" ng-src="{{LineItem.Variant.PreviewUrl || LineItem.Variant.LargeImageUrl || LineItem.Product.LargeImageUrl}}" imageonload />',
            '</figure>',
            '<figure ng-show="LineItem.Variant.PreviewUrl">',
                '<img style="border:1px solid black;" id="451_img_prod_lg" class="product-image-large img-responsive" ng-src="{{LineItem.Variant.PreviewUrl || LineItem.Variant.LargeImageUrl}}" imageonload />',
            '</figure>',
            '</a>',
            '<br/><span ng-show="LineItem.Variant.PreviewUrl" style="color:red;font-size:.8em;">This is a draft. Please click "View PDF" to review proof.</span>'
        ].join('');
    }
}

ProductImageModalCtrl.$inject = ['$scope', '$modal', '$log'];
function ProductImageModalCtrl($scope, $modal, $log) {

    $scope.item = $scope.LineItem;
    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size, // this needs some figuring out
            template: productimagemodalopen,
            controller: ProductImageModalOpenCtrl,
            resolve: {
                item: function () {
                    return $scope.LineItem;
                }
            }
        });

        function productimagemodalopen() {
            return [
                '<style>',
                '.modal-header {background-color:#f5f5f5;border-bottom: 1px solid #ccc; min-height: 36px; padding: 2px;}',
                '.modal-header a.close {margin:10px 0;padding:0;position:absolute;right:10px;font-size:1em;color:#000;}',
                '.modal-body {width:100%; margin:0 auto; padding:10px 25px;}',
                '.modal-wrapper img {height: auto; margin: 0 auto;border:1px solid black;}',
                '.modal-dialog { width:auto; max-width:1000px; }',
                '</style>',
                '<div class="modal-header" class="col-xs-12 row pull-right">',
                '<span ng-show="item.Variant.PreviewUrl" style="color:red;top:10px;left:10px;position: absolute;">This is a draft. Please review PDF proof by closing this window and clicking "View PDF."</span><a class="pull-right close" ng-click="close()">',
                'close&nbsp;<i class="fa fa-times"></i>',
                '</a>',
                '</div>',
                '<div class="modal-body">',
                '<div class="modal-wrapper">',
                '<img ng-src="{{item.Variant.PreviewUrl || item.Variant.LargeImageUrl || item.Product.LargeImageUrl}}" />',
                '</div>'
            ].join('');
        }

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    };

    var ProductImageModalOpenCtrl = ['$scope', '$modalInstance', '$modal', 'item', function($scope, $modalInstance, $modal, item) {

        $scope.item = item; // this is the line item passed in from the ProductModalCtrl

        $scope.close = function () {
            $modalInstance.close();
        };

    }];

}