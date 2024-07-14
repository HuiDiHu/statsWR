const express = require('express');
require('dotenv').config();
require('express-async-errors');

const app = express();

//security
const cors = require('cors')

//swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

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
    origin: 'https://statswr.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const { getAllChampionComments } = require('./controllers/comments')

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
//routes
app.get('/', async (req, res) => {
    res.send("Render deployed!")
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/champions', championsRouter);
app.get('/api/v1/comments/', getAllChampionComments)
app.use('/api/v1/comments', authenticateUser, commentRouter);


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