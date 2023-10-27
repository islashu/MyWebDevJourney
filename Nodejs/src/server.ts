require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO;
const {createCustomLogger} = require('./util/loggers/customLogger');
const userRoutes = require('./routes/authRoutes');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials.middleware');
const cors = require('cors');
const corsOptions = require('./config/cors/corsOptions');
const {errorHandlerMiddleware} = require('./middleware/errorHandler.middleware');

/*
 * Node js is a waterfall approach
 * */

// Connect to express framework
const app = express();

//middleware for cookies
app.use(cookieParser());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Create custom winston logger to log files
const customLogger = createCustomLogger('server', 'serverts-logs');

// Configuration of passport strategy
require('./models/user.model'); // Load the model first so that we can extract the auth
require('./config/passport strategy/passportJWT')(passport); // initialise configuration of passport strategy class
app.use(passport.initialize()); // Create the passport strategy object

// Allows app to read and return json
app.use(express.json());

// All routes
app.use('/auth', userRoutes);

// Global error handler
app.use(errorHandlerMiddleware);
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
