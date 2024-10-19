const express= require('express');
const pool=require('./conf/db');
const cors = require('cors')
const {topicRouter} =require('./Routers/TopicsRoute');


const app= express();
app.use(cors());

app.listen(3000,()=>{
  console.log("servidor corriendo");
})
app.use(express.json()); //middleware
app.use('/api/topics',topicRouter);

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