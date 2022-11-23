const { Router } = require('express');
const router = Router();
const { Country, TouristActivity } = require('../db')
const Stripe =require('stripe')

router.get('/', async function(req,res){
    const activities=await TouristActivity.findAll()
    res.json(activities)
})
router.post('/api/checkout', async function(req,res){
    const stripe= new Stripe("sk_test_51LqNmzKNelZkcsqhaCkkkRXRg3yxsm781EFK3d02L7NXMneFJsCiETL4Adt2QLxjunF2baIIwQZqxRSuCGFf115C00Q6SX6dSk")
    const {id,amount}=req.body
    try{

    const payment=await stripe.paymentIntents.create({
        amount,
        currency:"USD",
        description:"Libro de Cuentos",
        payment_method:id,
        confirm:true
    })
    console.log(payment)

    res.json({message:"Compra Exitosa"})
    }catch(error){
        res.json({message: error.raw.message})  
    }
})



router.post('/',async function(req,res){
    const {name,difficulty,duration,season,countries}=req.body
    const act={
        name,
        difficulty,
        duration,
        season
    }
    //Se agrega la actividad
   const acitivity= await TouristActivity.create(act)
   //Se relaciona los paises
   await acitivity.addCountries(countries)
   res.send('Datos guardados correctamente')

})

module.exports = router;