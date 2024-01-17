const express = require("express");
const https=require('https')
const bodyParser=require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
const port = 3000;

app.get("/", (req, res) => {
res.sendFile(__dirname+"/index.html")

});
app.post("/",(req,res)=>{
  //console.log(req.body.city)
  const querry=req.body.cityName
const apikey='38db00ecbff11e272115a2644ace56d3'
//res.send("Hello World!");
const url='https://api.openweathermap.org/data/2.5/weather?q='+querry+'&appid='+apikey+'&units=metric'
https.get(url,(response)=>{
  //console.log(response.statusCode)
  response.on('data', (data) => {
      //console.log(data)
      const weatherdata=JSON.parse(data)
      //console.log(weatherdata)
      const temp=weatherdata.main.temp
      //console.log(temp)
      const description=weatherdata.weather[0].description
      //console.log(description)
      // res.write("<h1>the temp in" +querry+ "is+"+ temp+" "+ " degree celsius</h1>")
      // res.write("<p>the weather description is" +description+" "+ "</p>")
      res.write(`<h1>The temperature in ${querry} is ${temp} degree Celsius</h1>`);
res.write(`<p>The weather description is ${description}</p>`);

    });
  
})


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});