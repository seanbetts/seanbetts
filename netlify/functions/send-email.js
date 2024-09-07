// File: netlify/functions/send-email.js
const sgMail = require('@sendgrid/mail');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, message } = JSON.parse(event.body);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'seanbetts@icloud.com', // Your email address
    from: 'hello@mypanda.ai', // Your SendGrid verified sender
    subject: `New Contact Form Message from ${email}`,
    text: `You've received a new message from ${email}:\n\n${message}`,
    html: `<p>You've received a new message from ${email}:</p><p>${message}</p>`,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};