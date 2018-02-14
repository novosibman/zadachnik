
var OPERATIONS = [ '+', '-', '*' ];

function calc(a, op, b) {
    if (op == '+')
        return a + b;
    if (op == '-')
        return a + b;
    if (op == '*')
        return a * b;
    return NaN;
}

function generateTask(op) {
    let a = parseInt(1 + Math.random() * 10);
    let b = parseInt(1 + Math.random() * 10);
    console.log("generateTask " + a + " " + op + " " + b);
    return {
        x: a,
        y: b,
        operator: op,
        expectedResult: calc(a, op, b),
        result: '',
        score: 0
    };
}

var solverModule = angular.module('SolverApp', []);

solverModule.directive('ngEnter', function () {
    return (scope, element, attrs) => {
        element.bind("keydown keypress", (event) => {
            console.log("keydown keypress " + event);
            if (event.which === 13) {
                event.preventDefault();
                scope.$apply(() => scope.$eval(attrs.ngEnter));
            }
        });
    };
});

solverModule.controller("SolverCtrl", function ($scope, $http) {
    $scope.generateTasks = function(number) {
        if (number > 10)
            number = 10;
        let tasks = [];
        for (let i = 0; i < number; i++) {
            tasks.push(generateTask('+'))
        }
        tasks.allDone = false;
        return tasks;
    }
    $scope.verifyTasks = function() {
        console.log("verifyTasks...");
        let completed = 0;
        let errors = 0;
        let totalScore = 0;
        for (let i = 0; i < $scope.tasks.length; i++) {
            let task = $scope.tasks[i];
            if (task.result == task.expectedResult) {
                task.score = 5;
                task.message = "[" + task.result + "] - правильно";
            } else if (task.result === '') {
                task.score = 0;
                task.message = " задача не решена";
            } else {
                task.score = 2;
                task.message = "[" + task.result + "] - не правильно!";
            }
            if ($scope.tasks[i].score) {
                completed++;
                totalScore += $scope.tasks[i].score;
                if ($scope.tasks[i].score < 5) {
                    errors++;
                }
            }
        }
        if (completed == $scope.tasks.length) {
            totalScore = (totalScore / completed).toFixed(0);
            $scope.tasks.allDone = true;
            $scope.tasks.message = "Всё решено на " + totalScore;
            $scope.tasks.errors = errors;
            $scope.tasks.totalScore = totalScore;
            if (errors > 0) {
                $scope.tasks.message += ", ошибок: " + errors;
            } else {
                $scope.tasks.message += ", Ура!";
            }
        }
    }
    $scope.generateMoreTasks = function(add) {
        $scope.tasks = $scope.generateTasks($scope.tasks.length + add)
    }
    $scope.initSolver = function() {
        $scope.tasks = $scope.generateTasks(1);
    }
});
