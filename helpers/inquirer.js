const inquire = require('inquirer')
require('colors')


const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'que deseas hacer?',
        //choices:['opt1','opt2','opt3']
        choices: [
            {
                value: 1,
                name: `${'1.'.green}Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green}Historial`
            }, {
                value: 0,
                name: `${'0.'.green}Salir`
            },
        ]
    }
];


const pausa = [
    {
        type: 'input',
        name: 'pausa',
        message: `presione ${'enter'.green} para continuar`,

    }
]

const inquirePausa = async () => {
    const { opcion } = await inquire.prompt(pausa)
    return opcion;
}

const inquireMenu = async () => {

    console.clear();
    console.log('=================='.green);
    console.log('selecione una opcion'.green);
    console.log('==================\n'.green);

    const { opcion } = await inquire.prompt(menuOpts)
    return opcion;
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value=== 0) return 'porfavor ingrse un valor';
                return true
            }
        }
    ]

    const{desc}= await inquire.prompt(question);
    return desc
}



const listadoCiudades=async(ciudades=[])=>{
    
    const choices=ciudades.map((ciudad,i)=>{
            return{
                value:ciudad.id,
                name:`${(i+1).toString().green}. ${ciudad.nombre}`
            }

    });
    choices.unshift({
        value:0,
        name:'0.'.green+'Cancelar'
    })

    const preguntas=[{
        type:'list',
        name:'id',
        message:'Seleccionar lugar:',
        choices,
    }]
    const { id } = await inquire.prompt(preguntas)
return id
}

const mostarListadoChecklist=async(tareas=[])=>{
    
    const choices=tareas.map((tarea,i)=>{
            return{
                value:tarea.id,
                name:`${(i+1).toString().green}. ${tarea.desc}`,
                checked:(tarea.completadoEn)?true:false
            }

    });
    

    const pregunta=[{
        type:'checkbox',
        name:'ids',
        message:'seleccion',
        choices,
    }]
    const { ids } = await inquire.prompt(pregunta)
return ids
}


const confirmar=async (message)=>{
    const question=[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]
    const { ok } = await inquire.prompt(question)
    return ok 
}


module.exports = {
    inquireMenu,
    inquirePausa,
    leerInput,
    listadoCiudades,
    confirmar,  
    mostarListadoChecklist, 
}