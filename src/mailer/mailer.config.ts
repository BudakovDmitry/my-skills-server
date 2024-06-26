import { MailerOptions } from '@nestjs-modules/mailer';

export const MailerConfig: MailerOptions = {
  transport: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  defaults: {
    from: '"My Skills"',
  },
};
