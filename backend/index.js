const express = require('express');
require('dotenv').config();
require('express-async-errors');
const cors = require('cors')
const app = express();

//connectDB
const connectDB = require('./db/connect');

//routers
const championsRouter = require('./routes/champions');
const authRouter = require('./routes/auth');


//error handler
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5432',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/champions', championsRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5555;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();