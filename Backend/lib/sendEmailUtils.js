const nodemailer = require('nodemailer');

function sendEmail(userEmail, subject, emailHTML) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'fleapster1804@gmail.com',
            pass: 'rprt mbwr xjgc hqdq'
        }
    });

    const mailOptions = {
        from: {
            name: 'Fleapster',
            address: 'fleapster1804@gmail.com'
        },
        to: userEmail,
        subject: subject,
        html: emailHTML
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
        } else {
            console.log('Correo electrónico enviado:', info.response);
        }
    }); 
}

module.exports = sendEmail;
