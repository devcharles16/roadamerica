export default function Contact() {
  return (
    <div className="container">
      <div className="header">Contact Us</div>
      <div className="card">
        <form>
          <label>Name</label>
          <input type="text" className="input" />
          <label>Email</label>
          <input type="email" className="input" />
          <label>Message</label>
          <textarea rows="5" className="input"></textarea>
          <button className="button">Send Message</button>
        </form>
      </div>
    </div>
  );
}