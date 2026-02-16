import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, subject, message } = req.body;

    // SMTP Mailtrap (sandbox)
    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: "fa0b9bf86cdbc1",
            pass: "8cb34aaa2da2e6"
        }
    });

    try {
        await transporter.sendMail({
            from: '"Alpina-Conseil" <no-reply@alpina.com>',
            to: email,
            subject: subject,
            text: message
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
}
