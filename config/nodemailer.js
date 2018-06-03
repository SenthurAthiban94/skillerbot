'use strict';
const nodemailer = require('nodemailer');

module.exports= (sendData)=>{
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    return new Promise((resolve,reject)=>{
        nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "senthurathibanprofile@gmail.com", // generated ethereal user
                pass: "Senthur@profile" // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from:sendData.name+' <'+sendData.email+'>', // sender address
            to: 'senthurathiban@gmail.com , vilvaathiban@gmail.com', // list of receivers
            subject: 'SkillerBot - Message from '+sendData.name+' User', // Subject line
            text: 'User '+sendData.name+' wanted to contact you about Customized bot creation from Skillerbot. Contact No:'+sendData.number+', and User Name is '+sendData.name+', User mailid is '+sendData.email, // plain text body
            html: '<div>User <b>'+sendData.name+'</b> wanted to contact you about Customized bot creation from Skillerbot.</div>\
                   <div><b>Contact Details</b></div>\
                   <div>User Name  : <b>'+sendData.name+'</b>,</div>\
                   <div>User Email : <b>'+sendData.email+'</b>,</div>\
                   <div>User Contact No : <b>'+sendData.number+'</b></div>\
                   </div>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({status:0,msg:"Something went Wrong!."});
            }
            // console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            resolve({status:1,msg:"Message Sent Successfully"});

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
    });
}