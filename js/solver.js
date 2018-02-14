function generateTask() {
    let a = parseInt(1 + Math.random() * 10);
    let b = parseInt(1 + Math.random() * 10);
    let op = '+';
    console.log("generateTask " + a + " " + op + " " + b)
    return {
        x: a,
        y: b,
        operator: op,
        expectedResult: a + b,
        result: '',
        score: 0
    };
}

var solverModule = angular.module('SolverApp', []);

solverModule.controller("SolverCtrl", function ($scope, $http) {
    $scope.generateTasks = function(number) {
        if (number > 10)
            number = 10;
        let tasks = [];
        for (let i = 0; i < number; i++) {
            tasks.push(generateTask())
        }
        tasks.allDone = false;
        return tasks;
    }
    $scope.verifyTask = function(task) {
        console.log("verifyTask: " + task.result);
        if (task.result == task.expectedResult) {
            task.score = 5;
            task.message = "'" + task.result + "' ПРАВИЛЬНО!";
        } else if (task.result === '') {
            task.score = 0;
            task.message = '';
        } else {
            task.score = 2;
            task.message = "'" + task.result + "' НЕ ПРАВИЛЬНО!";
        }
        let completed = 0;
        for (let i = 0; i < $scope.tasks.length; i++) {
            if ($scope.tasks[i].score)
                completed++;
        }
        if (completed == $scope.tasks.length) {
            $scope.tasks.allDone = true;
        }
    }
    $scope.generateMoreTasks = function() {
        $scope.tasks = $scope.generateTasks($scope.tasks.length + 1)
    }
    $scope.initSolver = function() {
        $scope.tasks = $scope.generateTasks(1);
    }
});
