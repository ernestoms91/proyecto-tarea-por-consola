require ('colors');

const { guardarDB, leerDB } = require('./db/guardarArchivo');
const {inquirerMenu, pausa , leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/Tareas');
console.clear();

const main = async()=>{


    let opt = '';
    const tareas = new Tareas();
    
    const tareasDB = leerDB();
   
    if(tareasDB){
      tareas.cargarTareasFromArray(tareasDB);
    }
   
    do{ 

      //Iprimir el menu
      opt = await inquirerMenu();

      switch (opt) {
      
        case '1':
          const desc = await leerInput();
          tareas.crearTarea(desc);
          
        break;
      
        case '2':
          tareas.listadoCompleto();
        break;
        
        case '3':
        tareas.listarPendientesCompletadas(true);
        break;
        
        case '4':
        tareas.listarPendientesCompletadas(false);
        break;
        
        case '5':
         const ids = await mostrarListadoCheckList(tareas.listadoArr);
         console.log(ids);
        tareas.toggleCompletadas(ids);
        break;

        case'6':
          const id = await listadoTareasBorrar(tareas.listadoArr);
          const  conf = await confirmar('Está seguro?');
          if (conf){
            
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
          }
        break;

        case '7':
        break;
  
      }

      guardarDB(tareas.listadoArr);




      await pausa();


    } while(opt !== '0');


    //pausa();
}

main();