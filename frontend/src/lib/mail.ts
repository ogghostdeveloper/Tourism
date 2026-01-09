import nodemailer from "nodemailer";

const transOptions: any = {
    service: "gmail",
    auth: {
        user: "2107.subham@gmail.com",
        pass: "gjps wmvo qvyw weyz",
    },
};

const transporter = nodemailer.createTransport(transOptions);

export interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendMail({ to, subject, html }: MailOptions) {
    try {
        await transporter.verify();

        const info = await transporter.sendMail({
            from: `"Black Tomato Bhutan" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
