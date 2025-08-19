import { useEffect, useState } from "react";
import "./App.css";
import RotatingText from "./RotatingText";
import ScrambledText from "./ScrambledText";
import ShinyText from "./ShinyText";
import TextType from "./TextType";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && isOpen) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  return (
    <nav
      className="top-navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        backgroundColor: "#000B18",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 1000,
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      }}
    >
      <h3 style={{ margin: 0, color: "#64b5f6" }}>Franco Ramos</h3>

      {/* Hamburger toggle (mobile) */}
      <button
        className={`hamburger ${isOpen ? "active" : ""}`}
        aria-label="Toggle navigation"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Links container */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <button 
          onClick={() => scrollToSection('about')}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "20px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(100, 181, 246, 0.2)";
            e.target.style.color = "#64b5f6";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection('skills')}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "20px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(100, 181, 246, 0.2)";
            e.target.style.color = "#64b5f6";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}
        >
          Skills
        </button>
        <button 
          onClick={() => scrollToSection('projects')}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "20px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(100, 181, 246, 0.2)";
            e.target.style.color = "#64b5f6";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}
        >
          Projects
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "20px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(100, 181, 246, 0.2)";
            e.target.style.color = "#64b5f6";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}

function Carousel({ images, currentIndex, setCurrentIndex }) {
  useEffect(() => {
    if (!images || images.length === 0) return;
    if (currentIndex >= images.length) setCurrentIndex(0);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  const goPrev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const goNext = () =>
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>

      <button className="carousel-btn left" onClick={goPrev} aria-label="Previous">
        &#10094;
      </button>
      <button className="carousel-btn right" onClick={goNext} aria-label="Next">
        &#10095;
      </button>
    </div>
  );
}

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const educationImages = Array.from({ length: 12 }, (_, i) => `/e${i + 1}.png`);
  const hobbiesImages = Array.from({ length: 5 }, (_, i) => `/h${i + 1}.png`);
  const awardsImages = Array.from({ length: 3 }, (_, i) => `/a${i + 1}.png`);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset);

      const section4 = document.querySelector(".section4");
      if (section4) {
        const rect = section4.getBoundingClientRect();
        const halfwayPoint = rect.height / 2;

        if (rect.top < window.innerHeight - halfwayPoint && rect.bottom > halfwayPoint) {
          setCardsVisible(true);
        } else {
          setCardsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (modalType) => {
    setActiveModal(modalType);
    setModalOpen(true);
    setCurrentIndex(0);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveModal(null);
  };

  let modalImages = [];
  if (activeModal === "education") modalImages = educationImages;
  if (activeModal === "hobbies") modalImages = hobbiesImages;
  if (activeModal === "awards") modalImages = awardsImages;

  const getModalDescription = (modal, index) => {
    if (modal === "education") {
      if (index >= 0 && index <= 3) return "hi this is my highschool life";
      if (index >= 4 && index <= 8) return "this is my senior-highschool life";
      if (index >= 9 && index <= 11) return "this is my college life";
      return "";
    }
    if (modal === "hobbies") {
      if (index >= 0 && index <= 1) return "active lifestyle here";
      if (index >= 2 && index <= 4) return "coffee break with friends";
      return "";
    }
    if (modal === "awards") {
      if (index === 0) return "highschool awards";
      if (index === 1) return "senior-high awards";
      if (index === 2) return "college certificates";
      return "";
    }
    return "";
  };

  const modalDescription = getModalDescription(activeModal, currentIndex);

  useEffect(() => {
    if (!modalImages || modalImages.length === 0) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= modalImages.length) setCurrentIndex(0);
  }, [modalImages.length]);

  useEffect(() => {
    if (!modalOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          modalImages.length ? (prev > 0 ? prev - 1 : modalImages.length - 1) : 0
        );
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          modalImages.length ? (prev < modalImages.length - 1 ? prev + 1 : 0) : 0
        );
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, modalImages.length]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {scrollY >= window.innerHeight * 2 && <Navbar />}

      {/* INTRO SCREEN */}
      <div
        className="main-container"
        style={{
          backgroundColor: "#000B18",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {!clicked && (
          <button
            onClick={() => {
              setClicked(true);
              setTimeout(() => setShowTyping(true), 400);
            }}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <ShinyText text="Click Me" speed={3} />
          </button>
        )}

        {showTyping && (
          <div style={{ color: "white", fontSize: "2rem", textAlign: "center" }}>
            <TextType
              text={["HEY THERE!", "ALLOW ME TO INTRODUCE MYSELF", "START SCROLLING ;)"]}
              typingSpeed={80}
              pauseDuration={1000}
              deletingSpeed={40}
              showCursor={true}
              cursorCharacter="_"
            />
          </div>
        )}
      </div>

      {/* SECTION 1 */}
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundImage: `url("/firstpage.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/franco.png"
          alt="Franco"
          style={{
            position: "absolute",
            top: 0,
            left: `${-scrollY * 0.2}px`,
            height: "100%",
            width: "auto",
            transition: "transform 0.1s ease-out",
          }}
        />
        <img
          src="/akoto.png"
          alt="Akoto"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: "100%",
            width: "auto",
          }}
        />
        <img
          src="/ramos.png"
          alt="Ramos"
          style={{
            position: "absolute",
            top: 0,
            right: `${-scrollY * 0.2}px`,
            height: "100%",
            width: "auto",
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* SECTION 2 */}
      <div
        id="about"
        className="section2"
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          backgroundImage: `url("/second_mainbg.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* About Me content overlay */}
        <div className="about-container">
          <ScrambledText className="about-title about-title-scramble" radius={140} duration={1} speed={0.6} scrambleChars=".:" textTag="h1">
            ABOUT ME
          </ScrambledText>
          <p className="about-subline">
            People often say I'm
            {' '}
            <RotatingText
              texts={["LAZY SMART", "RESOURCEFUL", "INGENIOUS", "EFFICIENT", "STRATEGIC"]}
              mainClassName="rotate-chip"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.03}
              splitLevelClassName="rotate-split"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </p>
          <p className="about-paragraph">
            I like finding the simplest and most efficient way to get things done because I believe in working smarter, not harder. I enjoy balancing work, life, and learning at my own pace, which allows me to grow without burning out. This approach helps me stay consistent, focused, and avoid unnecessary stress in both academic and personal areas.
          </p>
        </div>

        {/* Social Media Buttons Row */}
        <div className="social-icons-container">
          <a href="https://www.facebook.com/inyiigo" target="_blank" rel="noopener noreferrer">
            <img src="/fb.png" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://www.tiktok.com/@inyiigoo" target="_blank" rel="noopener noreferrer">
            <img src="/tiktok.png" alt="TikTok" className="social-icon" />
          </a>
          <a href="https://www.instagram.com/inyiigo/" target="_blank" rel="noopener noreferrer">
            <img src="/ig.png" alt="Instagram" className="social-icon" />
          </a>
          <a href="https://www.facebook.com/inyiigo" target="_blank" rel="noopener noreferrer">
            <img src="/mail.png" alt="Email" className="social-icon" />
          </a>
        </div>

        {/* RIGHT-SIDE BUTTONS */}
        <div
          className="image-button-container"
          style={{
            position: "absolute",
            right: "105px",
            top: "52%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Education */}
          <div
            className="image-button-wrapper"
            role="button"
            tabIndex={0}
            onClick={() => openModal("education")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openModal("education");
            }}
            aria-label="Open education modal"
          >
            <img src="/edubg.png" alt="Education" className="image-button default" />
            <img src="/edu_ani.png" alt="Education animation" className="image-button hover" />
          </div>

          {/* Hobbies */}
          <div
            className="image-button-wrapper"
            role="button"
            tabIndex={0}
            onClick={() => openModal("hobbies")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openModal("hobbies");
            }}
            aria-label="Open hobbies modal"
          >
            <img src="/hb.png" alt="Hobbies" className="image-button default" />
            <img src="/hobbies_ani.png" alt="Hobbies animation" className="image-button hover" />
          </div>

          {/* Awards */}
          <div
            className="image-button-wrapper"
            role="button"
            tabIndex={0}
            onClick={() => openModal("awards")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openModal("awards");
            }}
            aria-label="Open awards modal"
          >
            <img src="/awards_cert.png" alt="Awards" className="image-button default" />
            <img src="/award_ani.png" alt="Awards animation" className="image-button hover" />
          </div>
        </div>
      </div>

      {/* SECTION 3 */}
      <div
        className="section3"
        style={{
          width: "100vw",
          height: "auto",
        }}
      >
        <img
          src="/section_3.png"
          alt="Section 3"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      {/* SECTION 4 */}
      <div
        id="skills"
        className="section4"
        style={{
          width: "100vw",
          height: "auto",
          position: "relative",
        }}
      >
        <img
          src="/section_4.png"
          alt="Section 4"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />

        {/* Cards container */}
        <div className={`cards-container ${cardsVisible ? "visible" : ""}`}>
          {/* Card 1 */}
          <div className="card">
            <img src="/cards_1.png" alt="Card 1" className="slide-up-card" />
            <div className="skills-group">
              <div className="skills-row">
                <div className="skill-item">
                  <img src="/pyth.png" alt="Python" className="skill-icon" />
                  <span className="tooltip">Python</span>
                </div>
                <div className="skill-item">
                  <img src="/java.png" alt="Java" className="skill-icon" />
                  <span className="tooltip">Java</span>
                </div>
                <div className="skill-item">
                  <img src="/sql.png" alt="SQL" className="skill-icon" />
                  <span className="tooltip">SQL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card">
            <img src="/cards_2.png" alt="Card 2" className="slide-up-card" />
            <div className="skills-group">
              <div className="skills-row">
                <div className="skill-item">
                  <img src="/html.png" alt="HTML5" className="skill-icon" />
                  <span className="tooltip">HTML5</span>
                </div>
                <div className="skill-item">
                  <img src="/css.png" alt="CSS3" className="skill-icon" />
                  <span className="tooltip">CSS3</span>
                </div>
                <div className="skill-item">
                  <img src="/javascript.png" alt="JavaScript" className="skill-icon" />
                  <span className="tooltip">JavaScript</span>
                </div>
              </div>
              <div className="skills-row">
                <div className="skill-item">
                  <img src="/react.png" alt="React" className="skill-icon" />
                  <span className="tooltip">React</span>
                </div>
                <div className="skill-item">
                  <img src="/bootstrap.png" alt="Bootstrap" className="skill-icon" />
                  <span className="tooltip">Bootstrap</span>
                </div>
              </div>
            </div>
          </div>
        </div> {/* close cards-container */}
      </div> {/* close section4 */}

      {/* PROJECTS SECTION */}
      <div id="projects" className="projects-section">
        <div className="projects-container">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">Here are some of the projects I've worked on</p>
          
          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/arcade.png" alt="Arcade App" />
              </div>
              <div className="project-content">
                <h3>Arcade Gaming App</h3>
                <p>A React-based gaming application featuring multiple arcade-style games with interactive UI and smooth animations.</p>
                <div className="project-tech">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">CSS3</span>
                </div>
                <div className="project-links">
                  <button className="project-btn primary">Live Demo</button>
                  <button className="project-btn secondary">View Code</button>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/gg.png" alt="Guessing Game" />
              </div>
              <div className="project-content">
                <h3>Number Guessing Game</h3>
                <p>A Python-based number guessing game with score tracking, multiple difficulty levels, and user-friendly interface.</p>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Tkinter</span>
                  <span className="tech-tag">Game Logic</span>
                </div>
                <div className="project-links">
                  <button className="project-btn primary">Live Demo</button>
                  <button className="project-btn secondary">View Code</button>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/hi_lo.png" alt="Hi-Lo Game" />
              </div>
              <div className="project-content">
                <h3>Hi-Lo Card Game</h3>
                <p>A Java-based card game implementing the classic Hi-Lo betting system with animated graphics and sound effects.</p>
                <div className="project-tech">
                  <span className="tech-tag">Java</span>
                  <span className="tech-tag">Swing</span>
                  <span className="tech-tag">OOP</span>
                </div>
                <div className="project-links">
                  <button className="project-btn primary">Live Demo</button>
                  <button className="project-btn secondary">View Code</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT INFORMATION SECTION */}
      <div id="contact" className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's work together on your next project</p>
          
          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form">
              <h3>Send Me a Message</h3>
              <form className="form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter your full name"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email address"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="What's this about?"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5"
                    placeholder="Tell me about your project or inquiry..."
                    required 
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
              {formSubmitted && (
                <div className="form-success-message">
                  Message sent successfully!
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="contact-info">
              <h3>Contact Details</h3>
              
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>franco.ramos@example.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <p>+63 912 345 6789</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>Manila, Philippines</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">💼</div>
                <div className="contact-details">
                  <h4>Availability</h4>
                  <p>Open for freelance projects</p>
                </div>
              </div>

              <div className="social-links">
                <h4>Follow Me</h4>
                <div className="social-buttons">
                  <a href="https://www.facebook.com/inyiigo" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                    Facebook
                  </a>
                  <a href="https://www.instagram.com/inyiigo/" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                    Instagram
                  </a>
                  <a href="https://www.tiktok.com/@inyiigoo" target="_blank" rel="noopener noreferrer" className="social-btn tiktok">
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Franco Ramos</h3>
            <p>Aspiring Computer Engineer</p>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 Franco Ramos. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} style={{ fontWeight: "bold" }}>
              X
            </button>

            <Carousel
              images={modalImages}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />

            <div className="modal-text">
              <h2 className="modal-title">
                {activeModal === "awards" ? "AWARDS & CERTIFICATES" : activeModal?.toUpperCase()}
              </h2>
              <p>{modalDescription}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
