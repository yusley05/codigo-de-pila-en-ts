import { TaskItem } from "./Taskitem";

type TaskCounts ={
    total: number;
    incomplete: number;
};

export class TaskCollection   {
     
    nextId: number = 1;
    taskMap = new Map<number, TaskItem>();

    constructor(
       public userName: string,
       public taskItems: TaskItem[] = []
     ) {
        taskItems.forEach(item => this.taskMap.set(item.id, item));
    }

    insertar(task: string): number {
        while(this.buscar(this.nextId)){
            this.nextId++;
        }
        this.taskMap.set(this.nextId, new TaskItem(this.nextId, task));
        return this.nextId;
    }

    mostrarItems(includeComplete: boolean): TaskItem[] {
       return [...this.taskMap.values()]
       .filter(task => includeComplete || !task.complete);
     }

    buscar(id: number):  TaskItem | undefined {
        return this.taskMap.get(id);
    }

    markComplete(id: number, complete: boolean): void {
        const taskItem = this.buscar(id);
        if (taskItem) {
            taskItem.complete = complete;
        }
    }

    eliminar() :void{
        this.taskMap.forEach(item => {
           if (item.complete) {
               this.taskMap.delete(item.id);
           }
        })
    }

    mostrar(): TaskCounts{
      return {
          total: this.taskMap.size,
          incomplete: this.mostrarItems(false).length
      }
    }
}