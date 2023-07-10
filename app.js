var express=require("express")
const { dbConnect, getData, getSortData } = require("./Controllers/databaseConnection")
const app = express()
require('dotenv').config()
let port=process.env.PORT || 1050
app.get("/",(req,res)=>{
    res.send("working fine")
})
app.get("/restaurants",async (req,res)=>{
    let query;
    if(req.query.stateId){
        query={state_id:Number(req.query.stateId)}
    }
    else{
        query={}
    }
    let projection={}
    let restaurant=await getData("restaurants_Data",query,projection)
    res.send(restaurant)
})
app.get("/menu",async(req,res)=>{
    let query;
    if(req.query.mealtype){
        query={"mealTypes.mealtype_name":req.query.mealtype.replace(/\b\w/g, x => x.toUpperCase())}
    }
    else{
        query={}
    }
     let menu=await getData("restaurants_Data",query)
     res.send(menu)
})
app.get("/filter/:mealtype",async(req,res)=>{
    let query;
    if(req.query.cuisineId){
        query={"mealTypes.mealtype_name":req.params.mealtype.replace(/\b\w/g, x => x.toUpperCase()),"cuisines.cuisine_id":Number(req.query.cuisineId)}
    }
    if(req.query.cuisineId && req.query.cost){
        query={"mealTypes.mealtype_name":req.params.mealtype.replace(/\b\w/g, x => x.toUpperCase()),"cuisines.cuisine_id":Number(req.query.cuisineId),"cost":{$gt:Number(req.query.cost)}}
    }
    if(req.query.cost){
        query={"mealTypes.mealtype_name":req.params.mealtype.replace(/\b\w/g, x => x.toUpperCase()),"cost":{$gt:Number(req.query.cost)}}
    }
    else{
        query={"mealTypes.mealtype_name":req.params.mealtype}
    }
     let menu=await getData("restaurants_Data",query)
     res.send(menu)
})
app.get("/sort-price",async(req,res)=>{
    let sort;
    let limit;
    if(req.query.type==="L2H"){
        sort= { "restaurant_name": 1}
    }
    else if(req.query.type==="H2L"){
        sort= { "restaurant_name": -1}
    }
    else if(req.query.limit){
        limit=Number(req.query.limit)
    }
   else{
    sort= {}
    limit=0
   }
    let query={}
    let menu=await getSortData("restaurants_Data",query,sort,limit)
    res.send(menu)
})
app.get("/locations",async (req,res)=>{
    let query={}
    let projection={state:1,state_id:1}
    let Location=await getData("locations",query,projection)
    res.send(Location)
})
app.listen(port,()=>{
    dbConnect()
    console.log(`server running on ${port}`)
})
// for(var i=0;i<3;i++){
//     setTimeout(()=>{
//         console.log(i),1
//     })
// }
// for(let i=0;i<3;i++){
//     setTimeout(()=>{
//         console.log(i),1
//     })
// }
//    As var in global scope it fires the i's value as 3 when enters the loop or timeout.
//    But as in let case as it is in block scope,when it  enters to function ,it goes as a new value each time after the loop.