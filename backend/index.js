const express = require('express');
require('dotenv').config();
require('express-async-errors');

const app = express();

const cors = require('cors')
//authenticate when trying to create comments
const authenticateUser = require('./middleware/authentication');


//connectDB
const connectDB = require('./db/connect');

//routers
const championsRouter = require('./routes/champions');
const authRouter = require('./routes/auth');
const commentRouter = require('./routes/comments');

//error handler
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

const { getAllChampionComments } = require('./controllers/comments')

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/champions', championsRouter);
app.get('/api/v1/comments/', getAllChampionComments)
app.use('/api/v1/comments', commentRouter);


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