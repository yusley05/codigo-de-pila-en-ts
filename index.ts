import inquirer from 'inquirer';
import { TaskCollection } from './models/TaskCollection';
import { tasks } from "./models/exampleData";

const collection = new TaskCollection('pila', tasks);
let showCompleted:  boolean = true;

function displayTaskList(): void {
     console.log(`${collection.userName}'s nueva ` +
     `(${collection.mostrar().incomplete} elemento)`)
    collection.mostrarItems(showCompleted).forEach(task => task.printDetails());

}

enum Commands{
    Add = "insertar un elemento",
    Complete = " elemento",
    Purge = "quitar un elemento",
    Quit = "salir"
}

async function promptAdd(): Promise<void> {
    console.clear();
    const respuesta = await inquirer.prompt({
      type: "input",
      name: "add",
      message: "ingrese un elemento:"
    });
    if (respuesta["add"] !== "") {
      collection.insertar(respuesta["add"]);
    }
    mostraropciones();
 }

 async function promptComplete(): Promise<void> {
     console.clear();
         const respuestas = await inquirer.prompt({
            type: "checkbox",
            name: "eliminar",
            message: "seleccione el elemento",
            choices: collection.mostrarItems(showCompleted).map(item => ({
              name: item.task,
              value: item.id,
              checked: item.complete
     }))
 });
    let eliminarelementos = respuestas['eliminar'] as number[];
    collection 
    .mostrarItems(true)
    .forEach(item => collection.markComplete(
        item.id,
         eliminarelementos.find(id => id === item.id) != undefined)
         );
    mostraropciones();
 }
async function mostraropciones() {
    console.clear();
    displayTaskList();

    const respuesta = await inquirer.prompt({
    type: 'list',
    message: 'escoja una opcion',
    name: 'Commands',
    choices: Object.values(Commands)
});
switch(respuesta["Commands"]){
   
   case Commands.Add:
       promptAdd();
      break;
      case Commands.Purge:
          collection.eliminar();
          mostraropciones();
          break;
      case Commands.Complete:
          if (collection.mostrar().incomplete > 0) {
            promptComplete();
          }else {
            mostraropciones();
          }
          break;
     case Commands.Purge:
        collection.eliminar();
        mostraropciones();
        break
}
}

mostraropciones();