export default class EmailSender {
  static DEFAULT_SENDER = "kazuki.castle0418@gmail.com";

  constructor() {
    this.msg = {
      to: EmailSender.DEFAULT_SENDER,
      from: EmailSender.DEFAULT_SENDER,
      subject: '',
      text: ''
    }
    this.emailStatusMessage = '';
  }

  setTo(to) {
    this.msg = {
      ...this.msg,
      to
    };

    return this
  }

  setSubject(subject) {
    this.msg = {
      ...this.msg,
      subject
    };

    return this;
  }

  setText(text) {
    this.msg = {
      ...this.msg,
      text
    };

    return this
  }

  send = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.msg),
      });

      const result = await response.json();

      this.emailStatusMessage = response.ok
        ? "Email sent successfully!"
        : `Failed to send email: ${result.message}`;

      alert(this.emailStatusMessage);
    } catch (error) {
      this.emailStatusMessage = "An error occurred while sending the email! Please resend.";

      if (error instanceof Error) {
        alert(`${this.emailStatusMessage} ${error.message}`);
      }
    }
  }
}