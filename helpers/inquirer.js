const inquirer = require('inquirer');
require ('colors');


const inquirerMenu = async()=>{

    try {

        const preguntas =[{
            type:'list',
            name:'opcion',
            message: 'Qué desea hacer?',
            choices:[
                {   
                    value: '1',
                    name:`${'1.'.green} Crear tarea`,
            },    
                {   
                    value: '2',
                    name: `${'2.'.green} Listar tarea`,
            },
                {   
                    value: '3',
                    name: `${'3.'.green} Listar tareas completadas`,
            },
                {   
                    value: '4',
                    name: `${'4.'.green} Listar tareas pendientes`,
            },
                {   
                    value: '5',
                    name: `${'5.'.green} Completar tarea(s)`,
            },
                {   
                    value: '6',
                    name: `${'6.'.green} Borrar tarea`,
            },
                {   
                    value: '0',
                    name: `${'0.'.green} Salir`,
            }
        ]
        }];


        console.clear();
        console.log('====================='.green);
        console.log('Seleccione una opción'.white);
        console.log('=====================\n'.green);
    
        const {opcion} = await inquirer.prompt(preguntas);
        return opcion;
    } catch (error) {
        
    }

}

const pausa = async()=>{
    try {
        
        const preguntaEnter =[{
            type:'input',
            name:'enter',
            message: `Presione ${'ENTER'.green} para continuar`,
        }];

        console.log();        
        await inquirer.prompt(preguntaEnter);

    } catch (error) {
        throw error;
    }
}

  const  leerInput = async()=>{
      try {

        const question =[{
            type:'input',
            name:'desc',
            message: 'Escriba la descripción: ',
            validate(value){
               if (value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }];
  
        const {desc} = await inquirer.prompt(question);
        return desc;

      } catch (error) {
        throw error;
      }
  }

  const listadoTareasBorrar = async(tareas =[])=>{

    try {
       
       const choices = tareas.map((tarea, i)=>{

        const idx = `${i +1}.`.green;
           return{
               value: tarea.id,
               name: `${idx} ${tarea.desc}`
           }
       });

       const preguntas =[{
           type:'list',
           name:'id',
           message:'Borrar',
           choices
       }]

       const {id} = await inquirer.prompt(preguntas);
       return id;
    } catch (error) {
        throw error;
    }
  }
   
  
  const confirmar = async(message)=>{

    try {
        const question =[{
            type:'confirm',
            name:'ok',
            message
        }];
        const {ok} = await inquirer.prompt(question);
        return ok;
    } catch (error) {
        throw error
    }
}
    const mostrarListadoCheckList = async(tareas =[])=>{

        try {
           
           const choices = tareas.map((tarea, i)=>{
    
            const idx = `${i +1}.`.green;
               return{
                   value: tarea.id,
                   name: `${idx} ${tarea.desc}`,
                   checked: (tarea.completado) ? true : false

               }
           });
    
           const preguntas =[{
               type:'checkbox',
               name:'ids',
               message:'Seleccione',
               choices
           }]
    
           const {ids} = await inquirer.prompt(preguntas);
           return ids;
        } catch (error) {
            throw error;
        }
      }



    

  



module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}