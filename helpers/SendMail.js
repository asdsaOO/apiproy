

const nodeMailer= require('nodemailer');
const transporter = nodeMailer.createTransport({
    //service:"gmail",
    host:"smtp.gmail.com",//este host se utiliza para realizar envios de email de terceros
    port: 465,
    secure: true,
    auth: {

        user:/*"poogamification7@outlook.com"*/"poogamification7@gmail.com", 
        pass:"ntjbyjwlxhjebref"/*"proyectforgloryasd7"*/
    }

});
async function sendPassword( email, code){
    console.log(email);
    try{
    //var num = await Math.floor(Math.random()*(1000-9998+1)+9998);
    const info = await transporter.sendMail({
        from: "poogamification7@gmail.com",
        to: email,
        subject:"SE CREO UNA CUENTA TUYA EN EL SISTEMA NK",
        html:`
        <body>
        <br/>
        <center>
        <P>
        <b>
            SE TE ASUGNO UNA CONTRASEÑA. SE RECOMIENDA CAMBAIRLA LO MAS PRONTO POSIBLE
        </b>
        </P>
        <p1>
            PASSWORD:${code}
        </p1>
        </center>
        </body>
        `,

    });
    }catch(e){
        console.log(`error email ${e}`);
        throw new Error (`{"error":"${res.statusCode}","description":"${e}}"`);
    }

    

   

    //return info.messageId;

     
}

module.exports={sendPassword};