"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskItem = void 0;
var TaskItem = /** @class */ (function () {
    function TaskItem(id, task, complete) {
        if (complete === void 0) { complete = false; }
        this.id = id;
        this.task = task;
        this.complete = complete;
    }
    TaskItem.prototype.printDetails = function () {
        console.log(this.id + "\t" + this.task + " " + (this.complete ? "\t(elemento)" : ""));
    };
    return TaskItem;
}());
exports.TaskItem = TaskItem;
