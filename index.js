const express= require('express');
const pool=require('./conf/db');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const {topicRouter} =require('./Routers/TopicsRoute');
const {accountRouter} = require('./Routers/AccountRoute')
const {usersRoute}= require ('./Routers/UsersRoute');
const {activitiesRouter} = require ('./Routers/ActivitiesRoute')


const app= express();
app.use(cors({origin: 'http://localhost:5173', // Cambia a la URL de tu cliente
  credentials: true,}));

app.listen(3000,()=>{
  console.log("servidor corriendo");
})
app.use(express.json()); //middleware
app.use(cookieParser());
app.use('/api/topics',topicRouter);
app.use('/api/account',accountRouter);
app.use('/api/users',usersRoute);
app.use('/api/actividades',activitiesRouter);

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('Pool cerrado');
    process.exit(0);
  });
});
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('Pool cerrado por interrupción');
    process.exit(0);
  });
}); 