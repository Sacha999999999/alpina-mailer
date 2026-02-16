import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    // Config SMTP gratuit (exemple avec Mailtrap)
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "fa0b9bf86cdbc1",     // Remplace par ton user Mailtrap
        pass: "8cb34aaa2da2e6"      // Remplace par ton mot de passe Mailtrap
      }
    });

    await transporter.sendMail({
      from: '"Alpina-Conseil" <no-reply@alpina.ch>',
      to: email,
      subject: subject,
      text: message
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible d'envoyer le mail" });
  }
}
