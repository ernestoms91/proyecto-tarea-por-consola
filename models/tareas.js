const Tarea = require("./tarea");
require ('colors');

class Tareas{

    _listado ={}

    constructor(){
        this._listado ={};
    }

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key=>{
            const tarea = this._listado[key];
            listado.push(tarea); 
        }

        )
        return listado;
    }
    crearTarea(desc=''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas=[]){
        
        
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        });
        
    }
    
    listadoCompleto(){

        const temp = this.listadoArr;
        console.log();

        for (let i = 0; i < temp.length; i++) {
            
            const {desc,completado} = temp[i];
            const temp2 = `${i+1}.`.green;
            if (completado){ 
                console.log(`${temp2} ${desc} :: ${'Completado'.green}|${'Pendiente'.red}`);
            }else{
            console.log(`${temp2} ${desc} :: ${'Completado'.red}|${'Pendiente'.green}`);
            }
        }
    }
    listarPendientesCompletadas(completadas=true){
        
        let temp = 1;

        this.listadoArr.forEach((tarea,i)=>{
        const {desc,completado} = tarea;
         const estado  = (completado)
                                    ?'Completada'.green
                                    :'Pendiente'.red
            if(completadas && completado){
            
                console.log(`${(temp + '.').green} ${desc} :: ${(completado).green}`);
                temp++;
            }
            if(!completadas && !completado){ 
            
                console.log(`${(temp + '.').green} ${desc} :: ${'Pendiente'.red}`);
                temp++;
            }

       }) 

    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []){
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if(!tarea.completado){
                tarea.completado = new Date().toISOString()
            }

        });

        this.listadoArr.forEach(tarea=>{
         if (!ids.includes(tarea.id)){
            this._listado[tarea.id].completado = null;
         }   
        })
    }
}

module.exports = Tareas;