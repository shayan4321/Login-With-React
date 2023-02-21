const express = require('express')
const cors = require('cors');
const dbConfig = require('./database/conn.js');
const {Sequelize, DataTypes} = require('sequelize');
const router = require('./router/route.js');


const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const port = 8080;

// Http get request
app.get('/',(req,res)=>{
    res.status(201).json("Home Get Request");
});

/** api route */
app.use('/api', router)


// Db Connection
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

// Start Server
app.listen(port,()=>{
    console.log(`Server connected to http://localhost:${port}`);
})