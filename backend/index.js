const express = require('express');
const serverless = require('serverless-http')

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
app.use('/api/v1/champions', cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type']
}))
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
// TODO: Add origin of the MCP server here

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

const handler = serverless(app)

module.exports.handler = async (event, context) => {
    await connectDB(process.env.MONGO_URI)

    return handler(event, context);
}