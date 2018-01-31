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
var tasks_service_1 = require("../tasks.service");
var TaskComponent = /** @class */ (function () {
    function TaskComponent(taskService) {
        this.taskService = taskService;
        this.delete = new core_1.EventEmitter();
    }
    TaskComponent.prototype.ngOnInit = function () {
    };
    TaskComponent.prototype.taskToggle = function () {
        this.task.Done = !this.task.Done;
        this.taskService.saveTask(this.task)
            .subscribe(function (r) {
        });
    };
    TaskComponent.prototype.deleteTask = function () {
        if (confirm("Aten\u00E7\u00E3o, a tarefa '" + this.task.Name + "' ser\u00E1 exclu\u00EDda, prosseguir?")) {
            this.delete.next(this.task);
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskComponent.prototype, "delete", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TaskComponent.prototype, "task", void 0);
    TaskComponent = __decorate([
        core_1.Component({
            selector: 'tdl-task',
            templateUrl: './task.component.html'
        }),
        __metadata("design:paramtypes", [tasks_service_1.TaskService])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map