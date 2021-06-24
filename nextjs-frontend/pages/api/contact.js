import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';

export default async (req, res) => {
    const { fullname, email, message } = req.body;

    const transporter = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY,
        })
    );

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: process.env.GMAIL_USER,
    //         pass: process.env.GMAIL_PASS,
    //     },
    // });

    try {
        const emailResponse = await transporter.sendMail({
            from: 'tomaszposiadala@gmail.com',
            to: 'tomaszposiadala@gmail.com',
            subject: `Contact form submission from ${fullname}`,
            html: `<p>You have a new contact form submission</p><br>
            <p><strong>Name: </strong>${fullname}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Message: </strong>${message}</p>
            `,
        });

        console.log('Message Sent', emailResponse.messageId);
    } catch (err) {
        console.log(err);
    }

    console.log(req.body);
    res.status(200).json(req.body);
};
