"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCollection = void 0;
var Taskitem_1 = require("./Taskitem");
var TaskCollection = /** @class */ (function () {
    function TaskCollection(userName, taskItems) {
        var _this = this;
        if (taskItems === void 0) { taskItems = []; }
        this.userName = userName;
        this.taskItems = taskItems;
        this.nextId = 1;
        this.taskMap = new Map();
        taskItems.forEach(function (item) { return _this.taskMap.set(item.id, item); });
    }
    TaskCollection.prototype.insertar = function (task) {
        while (this.buscar(this.nextId)) {
            this.nextId++;
        }
        this.taskMap.set(this.nextId, new Taskitem_1.TaskItem(this.nextId, task));
        return this.nextId;
    };
    TaskCollection.prototype.mostrarItems = function (includeComplete) {
        return __spreadArray([], this.taskMap.values()).filter(function (task) { return includeComplete || !task.complete; });
    };
    TaskCollection.prototype.buscar = function (id) {
        return this.taskMap.get(id);
    };
    TaskCollection.prototype.markComplete = function (id, complete) {
        var taskItem = this.buscar(id);
        if (taskItem) {
            taskItem.complete = complete;
        }
    };
    TaskCollection.prototype.eliminar = function () {
        var _this = this;
        this.taskMap.forEach(function (item) {
            if (item.complete) {
                _this.taskMap.delete(item.id);
            }
        });
    };
    TaskCollection.prototype.mostrar = function () {
        return {
            total: this.taskMap.size,
            incomplete: this.mostrarItems(false).length
        };
    };
    return TaskCollection;
}());
exports.TaskCollection = TaskCollection;
