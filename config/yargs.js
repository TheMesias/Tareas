const descripcion = { 
    descripcion: { 
        alias: 'd',
        demand: true,
        desc: 'Tarea por hacer'
    }
}

const completado = { 
    completado: { 
        alias: 'c', 
        demand: true,
        desc: 'Marca como completado o pendiente la tarea'
    }
}

const argv = require('yargs')
            .command('crear','Crear un elemento que hacer',{descripcion})
            .command('actualizar','Quitar tarea echa',{descripcion, completado})
            .command('borrar','Borrar tarea', {descripcion})
            .help()
            .argv; 


module.exports = { 
    argv
}