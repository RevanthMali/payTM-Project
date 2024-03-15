const express = require("express"); 
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();
//cors is use for connect/express as we are getting many requests from the server to access them cors is used
app.use(cors());
app.use(express.json()); 

app.use('/api/v1',mainRouter);



const PORT = process.env.PORT || 3000 ;
app.listen(PORT,()=>{
    console.log(`Server listening to ${PORT}`);
}); 
