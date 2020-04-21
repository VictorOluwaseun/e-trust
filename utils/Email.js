const nodemailer = require("nodemailer");
// const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url, text) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.text = text;
    this.from = "Admin <admin@etgzon.com.ng>"
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return //Sendgrid
    }

    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4a4c0d84df1d93",
        pass: "2ec6a45b756a71"
      }
    });
  }

  async send(subject) {
    //Rendered html

    //Email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: this.text
      // text: htmlToText.fromString(html)
    }
    //Create transport and send
    return await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("Welcome");
  }
}