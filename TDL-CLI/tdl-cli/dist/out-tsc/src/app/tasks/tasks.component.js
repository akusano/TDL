"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tasks_service_1 = require("./tasks.service");
var TasksComponent = /** @class */ (function () {
    function TasksComponent(taskService) {
        this.taskService = taskService;
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refreshData();
        this.interval = setInterval(function () {
            _this.refreshData();
        }, 5000);
    };
    TasksComponent.prototype.refreshData = function () {
        var _this = this;
        this.taskService.getTasks()
            .subscribe(function (tasks) { return _this.tasks = tasks; });
    };
    TasksComponent.prototype.addNewTask = function (task) {
        var _this = this;
        this.taskService.addNewTask(task)
            .subscribe(function (r) {
            _this.tasks.push(r);
        });
    };
    TasksComponent.prototype.deleteTask = function (task) {
        var _this = this;
        this.taskService.deleteTask(task.Id)
            .subscribe(function (r) {
            _this.refreshData();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TasksComponent.prototype, "tasks", void 0);
    TasksComponent = __decorate([
        core_1.Component({
            selector: 'tdl-tasks',
            templateUrl: './tasks.component.html'
        }),
        __metadata("design:paramtypes", [tasks_service_1.TaskService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map