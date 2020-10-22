const fs = require('fs'); 

let listadoPorHacer = [];


const guardarDB = () => { 
    let data = JSON.stringify(listadoPorHacer); 

    fs.writeFile(`./DB/data.json`, data,err => { 
        if(err)
            throw new Error(`No se pudo grabar`, err)
    })
}

const cargarDB = () =>{
    try {
        listadoPorHacer = require('../DB/data.json') //traemos el archivo json
    } catch (error) {
        listadoPorHacer = []; /*Ponemos este try-catch debido a que el json debe almenos contener
                                un arreglo vacio entonce si no lo tiene nos genera un error con esto 
                                arreglamos ese error
                                */ 
    } 

}



const crear = (descripcion) => {
    
    cargarDB();//se carga aqui para que en el push se guarde

    let porHacer = { 
        descripcion, 
        completado: false
    }

    listadoPorHacer.push( porHacer )
    guardarDB() 
    return porHacer; 

}

const getListado = () => { 
    cargarDB() 
    return listadoPorHacer 
}

const actualizar = (descripcion, completado = true) => { 
    cargarDB() 
    let index = listadoPorHacer.findIndex(tarea => { //busca con el findindex todo el objeto
        return tarea.descripcion === descripcion; 
    })

    if (index >=0){ 
        listadoPorHacer[index].completado = completado; 
        guardarDB()
        return true
    }else{ 
        return false 
    }
}

const borrar = (descripcion) => { 
    cargarDB(); 
    let nuevoListado = listadoPorHacer.filter(tarea => { //filter regresa un nuevo arreglo
        return tarea.descripcion !== descripcion; //excluto esa tarea de la nueva lista
    })

    if(listadoPorHacer.length === nuevoListado.length){ 
        return false; 
    }else{ 
        listadoPorHacer = nuevoListado
        guardarDB();
        return true; 
    }
}

module.exports = { 
    crear,
    getListado,
    actualizar, 
    borrar
}