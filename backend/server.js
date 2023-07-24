// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config()



// Create Express app
const app = express();
const bookingRoutes = require("../backend/routes/bookingRoutes")
const departmentRoutes = require("../backend/routes/departmentRoutes")
const hallRoutes = require("../backend/routes/hallRoutes")
const updateStatus = require("../backend/routes/adminRoutes")
// Middleware
app.use(bodyParser.json());
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection URI and options
// const mongooseOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// };

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // listen for requsts 
    app.listen(process.env.PORT,()=>{
    console.log("connected to db and listening on port 4000 !!!")
    })
 })
    .catch((error)=>{
        console.log(error)
    })


app.use('/api/bookings', bookingRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/halls', hallRoutes);
app.use('/api/admin/booking-intervals', updateStatus    );

