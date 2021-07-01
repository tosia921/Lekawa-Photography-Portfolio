const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
    const { fullname, email, message } = req.body;

    const messagecontent = `
        Name: ${fullname}\r\n
        Email: ${email}\r\n
        Message: ${message}\r\n
    `;

    const data = {
        to: 'tomasz@lekawa-photography.co.uk',
        from: 'tomasz@lekawa-photography.co.uk',
        subject: `New Contact From Submission from ${fullname}!`,
        text: messagecontent,
        html: messagecontent.replace(/\r\n/g, '<br>'),
    };

    await mail.send(data);

    res.status(200).json(req.body);
};
