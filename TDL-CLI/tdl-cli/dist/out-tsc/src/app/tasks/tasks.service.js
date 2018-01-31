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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var API_API_1 = require("../API.API");
var TaskService = /** @class */ (function () {
    function TaskService(http) {
        this.http = http;
    }
    TaskService.prototype.getTasks = function () {
        return this.http.get(API_API_1.TDL_API + "/tasks/")
            .map(function (response) { return response.json(); });
    };
    TaskService.prototype.addNewTask = function (task) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(API_API_1.TDL_API + "/tasks/", JSON.stringify(task), new http_1.RequestOptions({ headers: headers }))
            .map(function (response) { return response.json(); });
    };
    TaskService.prototype.saveTask = function (task) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(API_API_1.TDL_API + "/tasks/" + task.Id, JSON.stringify(task), new http_1.RequestOptions({ headers: headers }))
            .map(function (response) { return response.json(); });
    };
    TaskService.prototype.deleteTask = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete(API_API_1.TDL_API + "/tasks/" + id, new http_1.RequestOptions({ headers: headers }))
            .map(function (response) { return response.json(); });
    };
    TaskService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=tasks.service.js.map