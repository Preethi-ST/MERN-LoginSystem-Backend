require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
/* import Routes */
const authRouter = require('./routes/auth')
const privateRouter = require('./routes/private');

const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;
/* Connect to DB */
mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
const connection = mongoose.connection;
connection.on('open',() => console.log("MongoDB Connected"));

const app = express();
/* Middleware */
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/private',privateRouter)

app.get('/',(req,res) => {
    res.send('MERN LoginSystem - Server is up and Running')
})
const server = app.listen(PORT,() => console.log(`Server running on port ...${PORT}`));

/*
    use Process to handle exception. 
    A process is a global object that provides information about the current Node.js process. 
    The process is a listener function that is always listening to the events.
    Ref : https://www.geeksforgeeks.org/how-to-resolve-unhandled-exceptions-in-node-js/
*/
process.on('unhandledRejection',(err) => {
    console.log(err);
    server.close(()=>process.exit(1));
})
