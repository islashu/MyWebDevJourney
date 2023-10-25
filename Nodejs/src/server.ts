require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO;
const {createCustomLogger} = require('./util/loggers/customLogger');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
/*
 * Node js is a waterfall approach
 * */

// Connect to express framework
const app = express();

// Create custom winston logger to log files
const customLogger = createCustomLogger('server', 'serverts-logs');

// Configuration of passport strategy
require('./models/user.model'); // Load the model first so that we can extract the user
require('./config/passport strategy/passportJWT')(passport); // initialise configuration of passport strategy class
app.use(passport.initialize()); // Create the passport strategy object

// Allows app to read and return json
app.use(express.json());

// All routes
app.use('/user', userRoutes);

// Connect to mongoDB
mongoose
    .connect(MONGO_URL)
    .then((res: any) => {
        customLogger.info('Server has connected to mongoDB');
        console.log('Server has connected to mongoDB');
    })
    .catch((error: any) => {
        console.log(error);
    });

app.listen(PORT, () => console.log(`listening to port ${PORT} `)); // This port should be in env
