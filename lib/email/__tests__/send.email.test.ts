import { sendEmail } from '..';
import { createTransport, Transporter } from 'nodemailer';
import { SMTPServer } from 'smtp-server';

describe('sendEmail integration tests', () => {
  let smtpServer: SMTPServer;
  let transporter: Transporter;

  beforeAll(async () => {
    // Set up a test SMTP server
    smtpServer = new SMTPServer({
      authOptional: true,
      onData(stream, session, callback) {
        let mailData = '';
        stream.on('data', (chunk) => {
          mailData += chunk;
        });
        stream.on('end', () => {
          callback(null, 'Message queued');
        });
      },
    });

    await new Promise<void>((resolve) => {
      smtpServer.listen(0, 'localhost', () => {
        resolve();
      });
    });

    // Configure the test transporter
    transporter = createTransport({
      host: 'localhost',
      port: smtpServer.options.port,
      secure: false,
      ignoreTLS: true,
    });
  });

  afterAll(async () => {
    // Close the test SMTP server and transporter
    await new Promise<void>((resolve) => {
      smtpServer.close(() => {
        resolve();
      });
    });
    await transporter.close();
  });

  it('should send an email successfully', async () => {
    const to_email = 'test@example.com';
    const subject = 'Test Subject';
    const message = 'Test Message';

    const result = await sendEmail({ to_email, subject, message });

    expect(result.status).toBe(200);
    expect(result.message).toBe('Email sent successfully');
  });

  it('should throw an error if email sending fails', async () => {
    // Misconfigure the transporter to simulate an error
    transporter.options.port = 12345;

    const to_email = 'test@example.com';
    const subject = 'Test Subject';
    const message = 'Test Message';

    await expect(sendEmail({ to_email, subject, message })).rejects.toThrow();
  });
});
