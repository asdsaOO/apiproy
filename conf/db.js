const {Pool} =require('pg');


const pool= new Pool({

  user:'postgres',
  host:'localhost',
  database:'Nk_anatomy_gam',
  password:'123',
  port:5432
})


module.exports= pool;