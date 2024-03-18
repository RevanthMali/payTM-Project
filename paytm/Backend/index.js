const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

 //cors is use for connect/express as we are getting many requests from the server to access them cors is used
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000 ;
app.listen(3000,()=>{
    console.log(`Server listening to ${PORT}`);
}); 
