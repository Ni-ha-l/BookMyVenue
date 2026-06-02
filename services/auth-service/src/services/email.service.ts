import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';

class EmailService {
  private transporter = nodemailer.createTransport({
    host: env.email.host,
    port: env.email.port,
    secure: env.email.port === 465,
    auth: { user: env.email.user, pass: env.email.password },
  });

  async sendOtp(to: string, otp: string): Promise<void> {
    const { otpEmailTemplate } = await import('../templates/email.templates');
    await this.transporter.sendMail({
      from: env.email.from,
      to,
      subject: 'BookMyVenue – Password Reset OTP',
      html: otpEmailTemplate(otp),
    });
    logger.info('OTP email sent', { to });
  }

  async sendVerification(to: string, link: string): Promise<void> {
    const { verificationEmailTemplate } = await import('../templates/email.templates');
    await this.transporter.sendMail({
      from: env.email.from,
      to,
      subject: 'BookMyVenue – Verify your email',
      html: verificationEmailTemplate(link),
    });
    logger.info('Verification email sent', { to });
  }
}

export const emailService = new EmailService();
