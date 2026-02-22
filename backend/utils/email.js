const nodemailer=require('nodemailer');


const transporter=nodemailer.createTransport({
   service:'gmail',//ses for aws
   auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
   } 
});

async function sendReminderEmail(userEmail,taskTitle) {
    console.log("Reaching here");
    console.log(userEmail);
    const mailOptions={
        from:'"QuickTask Alerts" <ceastinstark@gmail.com>',
        to: userEmail,
        subject: ` "${taskTitle}" on mohammad aftaab!`,
        html:`
        <h3>Hello!</h3>
        <p>This is a quick reminder that your task <strong>${taskTitle}</strong> is working.</p>
        <p>Log in to QuickTask to explore more!</p>
        `
    };
    await  transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${userEmail}`);

}

module.exports={sendReminderEmail};