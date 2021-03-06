'use strict';

/**
 * handles user interaction with matter items
 *
 * @controller MatterController
 * @author Chris Peters
 */
module.exports = function($scope, $rootScope, mattersService) {
    $scope.contentActive = false;
    $scope.optionsActive = false;

    /**
     * conditionally emits `matter:closeoptions` to ALL matters items and
     * toggles a matter's options menu visibility
     *
     * @method $scope.optionsClick
     * @param {object} $event
     */
    $scope.optionsClick = function($event) {
        $event.stopPropagation();

        if (! $scope.optionsActive) {
            /**
             * @listener MatterController
             */
            $rootScope.$emit('matter:openoptions');
            /**
             * @listener maPositionOptions
             */
            $scope.$emit('matter:openoptions');
        }

        $scope.optionsActive = $scope.optionsActive ? false : true;
    };

    /**
     * used by deactivateOptions directive and on optionsClick to close
     * all active options menus
     *
     * @method $scope.deactivate
     */
    $scope.deactivate = function() {
        $scope.optionsActive = false;
    };

    /**
     * emits rootScope-level event with selected data
     *
     * @method $scope.contentClick
     * @param {object} matter - the matter data
     */
    $scope.contentClick = function(matter) {
        /**
         * @listener ContentController
         * @listener MatterController
         */
        $rootScope.$emit('matter:contentclick', matter);
        $scope.contentActive = true;
    };

    /**
     * removes hidden class on sidebar->matter AND content->matter via
     * `$scope.matter`
     *
     * @method $scope.close
     */
    $scope.close = function() {
        $scope.matter.status = 'closed';
    };

    /**
     * remove item from `mattersService.matters` array
     *
     * @method $scope.delete
     * @param {string} id - the id of the matter to delete
     */
    $scope.delete = function(id) {
        mattersService.removeItemById(parseInt(id, 10));
    };

    /**
     * toggles content's active class
     *
     * @method contentDeactivate
     */
    var contentDeactivate = function() {
        $scope.contentActive = false;
    };

    /**
     * toggles checkbox check
     *
     * @method checkAllHandler
     * @param {object} e - dom event
     * @param {boolean} data - checked toggle
     */
    var checkAllHandler = function(e, data) {
        $scope.checked = data;
    };

    $rootScope.$on('matter:openoptions', $scope.deactivate);
    $rootScope.$on('matter:contentclick', contentDeactivate);
    $scope.$on('sidebar:checkall', checkAllHandler);
};
