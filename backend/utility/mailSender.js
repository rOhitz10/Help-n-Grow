 
const nodeMailer = require('nodemailer')

exports.sendMail = async(email , title , body)=>{

    try{
      const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
      })  
      const info = await transporter.sendMail({
        from: "Help N Groww ",
        to : `${email}`,
        subject  : `${title}`,
        html : `${body}`
      })

      console.log(info);
      return info;
    }
    catch(error){
        console.log(error);
        console.error(error);
    }
}