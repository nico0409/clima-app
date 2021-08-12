const fs = require('fs');

const { default: axios } = require("axios");


class Busquedas {


    historial = []
    path = './DB/databaje.json'
    constructor() {
        this.leerDB()
    }

    getHistoriaCapitalizado(){
        return this.historial.map(lugar=>{
             let palabras = lugar.split(' ');
           palabras = palabras.map(p => p[0].toUpperCase() + p.slice(1) );
           
           return palabras.join(' ');
        })
    }

    getParamsMabox() {
        const params = {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
        }
        return params
    }

    getParamsOpenWeather(lat, lon) {
        const params = {
            lat,
            lon,
            appid: process.env.OPNEWEATHERMAP_KEY,
            units: 'metric',
            lang: 'es',
        }

        return params
    }
    async ciudad(lugar = '') {

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
                params: this.getParamsMabox()

            })

            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
        } catch (error) {
            return [];
        }


    }

    async climaLugar(lat, lon) {

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: this.getParamsOpenWeather(lat, lon)

            })
            const resp = await instance.get();

            const { main, weather } = resp.data
            return {
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max,
                weather: weather[0].description,

            }

        } catch (error) {
            throw error
        }
    }

    agregarHistorial(lugar = '') {

        if (!this.historial.includes(lugar.toLocaleLowerCase())) {

            this.historial.unshift(lugar.toLocaleLowerCase());
            this.historial=this.historial.splice(0,5)
            this.guardarDB();
        }


    }
    guardarDB() {

        const payload = {

            historial: this.historial,
        }
        fs.writeFileSync(this.path, JSON.stringify(payload));
    }
    leerDB() {
        if (!fs.existsSync(this.path)) return null

        const info = fs.readFileSync(this.path, { encoding: 'utf-8' })
        const data = JSON.parse(info);
       
        this.historial= data.historial;   
    }


}

module.exports = Busquedas