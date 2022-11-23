const { Router } = require('express');
const router = Router();
const axios = require('axios')
const { Country, TouristActivity } = require('../db')

//si le pasan query busca el name pasado sino trae todo
router.get('/', async function (req, res) {
      
        const {name,activity}=req.query   
        //Si ya lo cargo en la base de datos lo trae desde alli
        let query={
            model:TouristActivity,
            attributes:['name'],
            through:{
                attributes:[]
            }
        }
        if(activity){
            query.where={
                name:activity
            }
        }
      
        let countries = await Country.findAll({
            include: [query]
        })
      
        //Sino busca en la API y llena la BD
        if (!countries.length) {
            
            countries = await axios.get('https://restcountries.com/v3.1/all')
            
            countries = countries.data.map(country => {
            return {
                id: country.cca3,
                name: country.name.common,
                flag: country.flags.png,
                continent: country.continents[0],
                capital: country.capital ? country.capital[0] : "Sin Capital",
                subregion: country.subregion,
                area: country.area,
                population: country.population
            }

        })
        await Country.bulkCreate(countries)
        }
           
        //Si envian por query el nombre
        if(name){
                countries=countries.filter((country)=>{
                return country.name.toLowerCase().includes(name.toLowerCase())
            })
            if(!countries.length) return res.send('No se encontraron Paises con el nombre ingresado')
        }
        //Si envian por query la actividad
        res.json(countries)
    
})

router.get('/:idPais', async function (req, res) {
        /*  const country=await axios.get(`https://restcountries.com/v3/alpha/${idPais}`)
        country.data.map((c)=>{
            return {
                name:c.data.name
            }
        })*/
    const {idPais}=req.params

    const country=await Country.findByPk(idPais,{
        include: [{
            model:TouristActivity,
            //attributes:['name'],
            through:{
                attributes:[]
            }
        }]
    })
    res.json(country)
})

module.exports = router;

