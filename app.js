const { leerInput, inquireMenu, inquirePausa, listadoCiudades } = require('./helpers/inquirer');
require('dotenv').config();

const Busquedas = require('./models/busqueda');
require('colors')



const main = async () => {

    const busquedas = new Busquedas()



    do {
        opt = await inquireMenu();
        switch (opt) {
            case 1:

                const termino = await leerInput('Ciudad')

                const lugares = await busquedas.ciudad(termino);
                const id = await listadoCiudades(lugares);
                if(id===0) continue;
                
                const {nombre,lng,lat}=lugares.find(l=>l.id=id);
                busquedas.agregarHistorial(nombre);
                const clima= await busquedas.climaLugar(lat,lng);
                console.clear();
                console.log('\nInformacion de la ciudad\n',nombre.green);
                console.log('Longitud:',lng);
                console.log('Latitud:',lat);
                console.log('Temperatura promedio',clima.temp);
                console.log('Temperatura maxima',clima.temp_max);
                console.log('Temperatura minima',clima.temp_min);
                console.log('Sensacion',clima.weather.green,);
                await inquirePausa();
                break;
            case 2:
              busquedas.getHistoriaCapitalizado().forEach((lugar,i)=>{
                    console.log(`${((i+1).toString()+'.').green} ${lugar}`);
                }) 
                await inquirePausa();
                break;
            case 0:
                await inquirePausa();
                break;

            default:
                break;
        }
    } while (opt !== 0);

    /* const texto= await leerInput('hola: ') */


}

main();