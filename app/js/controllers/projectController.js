(function () {
    "use strict";

    function projectController($routeParams, projectsService) {
        var controller = this;

        function getProjectSuccessHandler(successData) {
            controller.projectDetail = successData;
        }

        if ($routeParams.id) {
            projectsService.getProjectById($routeParams.id)
                .then(getProjectSuccessHandler);
        } else {
            projectsService.getAll();
        }
    }

    angular
        .module('ITracker')
        .controller('ProjectController', ['$routeParams', 'projectsService', projectController]);
} ());