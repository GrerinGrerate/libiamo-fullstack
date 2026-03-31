import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

function createTransporter() {
	if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
		return null;
	}
	return nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: Number(env.SMTP_PORT || '587'),
		secure: env.SMTP_SECURE === 'true',
		auth: {
			user: env.SMTP_USER,
			pass: env.SMTP_PASS
		}
	});
}

export async function sendEmail({
	to,
	subject,
	text,
	html
}: {
	to: string;
	subject: string;
	text: string;
	html?: string;
}): Promise<void> {
	const transporter = createTransporter();
	if (!transporter) {
		console.log('[email] SMTP not configured. Would send email:');
		console.log(`  To: ${to}`);
		console.log(`  Subject: ${subject}`);
		console.log(`  Body: ${text}`);
		return;
	}
	await transporter.sendMail({
		from: env.SMTP_FROM,
		to,
		subject,
		text,
		html
	});
}
