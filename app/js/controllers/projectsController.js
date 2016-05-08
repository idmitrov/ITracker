(function () {
    "use strict";

    function ProjectsController($routeParams, projectsService) {
        var controller = this;

        function getProjectSuccessHandler(successData) {
            controller.projectDetail = successData;
            console.log(successData);
        }

        projectsService.getProjectById($routeParams.id)
            .then(getProjectSuccessHandler);
    }

    angular
        .module('ITracker')
        .controller('ProjectsController', ['$routeParams', 'projectsService', ProjectsController]);
} ());