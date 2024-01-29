const express = require("express");
const cors = require("cors");
const tutorial= require("./app/models/CollectionEndpoint.js")
const app = express();
const { init } = require("./scheduler.js");
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
console.log("%c GHdadadadddddddd","color:green")
// app.use(cors(corsOptions));
app.use(cors())
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/config/db.config.js");
const mongoose = require('mongoose');
mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// app.post("/create",async(req,res)=>{
//   console.log(req.body)
//   const data = new tutorial(req.body)
//   await data.save()
//   res.send({success : true ,message : "data save !!"})
// })

app.get('/', async(req, res) => {
  const data = await tutorial.find({})
  res.json({success : true , data : data})
});

require("./app/routes/tutorial.routes.js")(app);

init();
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
