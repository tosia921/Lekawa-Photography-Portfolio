const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
    const { companyname, email, phone, products, message } = req.body;

    const messagecontent = `
        CompanyName: ${companyname}\r\n
        Email: ${email}\r\n
        Phone: ${phone}\r\n
        Products: ${products}\r\n
        Message: ${message}\r\n
    `;

    const data = {
        to: 'tomasz@lekawa-photography.co.uk',
        from: 'tomasz@lekawa-photography.co.uk',
        subject: `Nowa wiadomość z twojej strony MODELING od ${companyname}!`,
        text: messagecontent,
        html: messagecontent.replace(/\r\n/g, '<br>'),
    };

    await mail.send(data);

    res.status(200).json(req.body);
};
