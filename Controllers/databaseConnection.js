let mongo=require("mongodb")
let mClient=mongo.MongoClient
let mongoUrl='mongodb://127.0.0.1:27017'
let db;
function dbConnect(){
    mClient.connect(mongoUrl,{useNewUrlParser:true},(err,Client)=>{
      if (err) throw err
      else{
        db=Client.db("NodeDb")
        console.log("connected to db successfully")
      }
    })
}
function getData(colName,query){
  let data=db.collection(colName).find(query).toArray()
  return data
}
//to sort data
function getSortData(colName,query,sort,limit){
  let data=db.collection(colName).find(query).sort(sort).limit(limit).toArray()
  return data
}
module.exports={
    dbConnect,
    getData,
    getSortData
}