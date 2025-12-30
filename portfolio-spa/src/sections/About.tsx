export function About() {
  return (
    <section id="about" className="page-section">
      <h2>ABOUT ME</h2>
      <div className="my-field-container">
        <h3 className="my-field">Cyber Security</h3>
        <h3 className="my-field">AI</h3>
        <h3 className="my-field">App Development</h3>
        <h3 className="my-field">CTF,HTB</h3>
      </div>
      <div className="about-details">
        <h3>Experience</h3>
        <ul className="about-list">
          <li>
            Currently working as a Software Engineer, where I am developing practical skills.
          </li>
          <li>
            Internship experience in implementing security access functions for in-vehicle software, focusing on encryption-based mechanisms to enhance automotive cybersecurity.
          </li>
          <li>
            In my cybersecurity research, I regularly implement Proofs-of-Concept (PoCs).
          </li>
        </ul>

        <hr className="section-divider" />

        <h3>Skills</h3>
        <ul className="tech-list">
          <li>Programming: C/C++. Scala</li>
          <li>Web Development: Laravel, Next.js</li>
          <li>AI/ML: PyTorch</li>
        </ul>
      </div>
    </section>
  );
}


