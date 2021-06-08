// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from 'nodemailer';

export default async (req, res) => {
    const { companyname, email, phone, products, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    try {
        const emailResponse = await transporter.sendMail({
            from: email,
            to: 'tomaszposiadala@gmail.com',
            subject: `Modeling form submission from ${companyname}`,
            html: `<p>You have a new contact form submission</p><br>
            <p><strong>Name: </strong>${companyname}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Phone: </strong>${phone}</p>
            <p><strong>Products: </strong>${products}</p>
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
