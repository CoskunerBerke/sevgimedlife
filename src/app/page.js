"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  // --- 1. Sticky Navigation Scroll Effect ---
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 2. Mobile Menu Toggle ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- 3. Active Nav Link on Scroll ---
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScrollActive = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScrollActive);
    return () => window.removeEventListener("scroll", handleScrollActive);
  }, []);

  // --- 4. Stats Counter Animation ---
  const [stats, setStats] = useState({
    sterilization: 0,
    categories: 0,
    sessions: 0,
    satisfaction: 0,
  });
  const statsRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const animateVal = (key, target, stepCount) => {
      let count = 0;
      const increment = Math.ceil(target / stepCount);
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          setStats((prev) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setStats((prev) => ({ ...prev, [key]: count }));
        }
      }, 40);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            animateVal("sterilization", 100, 25);
            animateVal("categories", 5, 5);
            animateVal("sessions", 1000, 30);
            animateVal("satisfaction", 100, 25);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- 5. Interactive Gallery Lightbox ---
  const [lightbox, setLightbox] = useState({
    open: false,
    src: "",
    alt: "",
  });

  const openLightbox = (src, alt) => {
    setLightbox({ open: true, src, alt });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: "", alt: "" });
    document.body.style.overflow = "auto";
  };

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && lightbox.open) {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.open]);

  // --- 6. Quick Appointment Form Handler ---
  const [quickForm, setQuickForm] = useState({
    name: "",
    phone: "",
    service: "",
  });
  const [quickStatus, setQuickStatus] = useState({
    message: "",
    type: "",
  });

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.phone || !quickForm.service) {
      setQuickStatus({
        message: "Lütfen tüm alanları doldurun.",
        type: "error",
      });
      return;
    }

    setQuickStatus({ message: "Gönderiliyor...", type: "info" });
    setTimeout(() => {
      setQuickStatus({
        message:
          "Talebiniz alınmıştır! En kısa sürede sizinle iletişime geçeceğiz.",
        type: "success",
      });
      setQuickForm({ name: "", phone: "", service: "" });
    }, 1000);
  };

  // --- 7. Full Contact Form Handler ---
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState({
    message: "",
    type: "",
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      setContactStatus({
        message: "Lütfen zorunlu alanları (Ad, Telefon, Mesaj) doldurun.",
        type: "error",
      });
      return;
    }

    setContactStatus({ message: "Mesajınız gönderiliyor...", type: "info" });
    setTimeout(() => {
      setContactStatus({
        message: "Mesajınız başarıyla gönderildi. Teşekkür ederiz!",
        type: "success",
      });
      setContactForm({ name: "", phone: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <>
      {/* Header & Navigation */}
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-container">
          <a href="#home" className="logo">
            <span className="logo-text">SEVGİ</span>
            <span className="logo-subtext">MEDLIFE</span>
          </a>

          <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`} id="navMenu">
            <ul>
              <li>
                <a
                  href="#home"
                  className={`nav-link ${activeSection === "home" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={`nav-link ${activeSection === "services" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hizmetlerimiz
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hakkımızda
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className={`nav-link ${activeSection === "gallery" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Galeri
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  İletişim
                </a>
              </li>
            </ul>
          </nav>

          <div className="header-cta">
            <a href="tel:+908503468386" className="phone-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>0850 346 83 86</span>
            </a>
            <a
              href="https://wa.me/908503468386"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Hızlı Randevu
            </a>
          </div>

          <button
            className={`mobile-nav-toggle ${mobileMenuOpen ? "active" : ""}`}
            id="mobileNavToggle"
            aria-label="Menüyü Aç/Kapat"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div class="container hero-container">
          <div className="hero-content">
            <span className="hero-tag">Ankara Güzellik & Estetik Merkezi</span>
            <h1>Güzelliğinizi Profesyonel Dokunuşlarla Keşfedin</h1>
            <p>
              Sevgi Medlife Ankara şubemizde, alanında uzman ekibimiz ve son teknoloji
              ekipmanlarımız ile güzellik, epilasyon ve cilt bakımı uygulamalarında
              kendinizi özel hissedin.
            </p>
            <div className="hero-actions">
              <a href="#services" className="btn btn-primary">
                Hizmetlerimizi İnceleyin
              </a>
              <a
                href="https://wa.me/908503468386"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px" }}
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                WhatsApp'tan Yazın
              </a>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-inner">
              <h3>Randevu Talebi</h3>
              <p>
                Bilgilerinizi bırakın, uzmanlarımız en kısa sürede size uygun saatler
                için geri dönüş yapsın.
              </p>
              <form onSubmit={handleQuickSubmit} className="quick-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={quickForm.name}
                    onChange={(e) =>
                      setQuickForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Telefon Numaranız"
                    value={quickForm.phone}
                    onChange={(e) =>
                      setQuickForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    value={quickForm.service}
                    onChange={(e) =>
                      setQuickForm((prev) => ({ ...prev, service: e.target.value }))
                    }
                    required
                  >
                    <option value="" disabled>
                      İlgi Alanınız
                    </option>
                    <option value="epilasyon">Buz Lazer Epilasyon</option>
                    <option value="cilt-bakimi">Medikal Cilt Bakımı</option>
                    <option value="zayiflama">Bölgesel Zayıflama / G5</option>
                    <option value="tirnak">Protez Tırnak & Kalıcı Makyaj</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Gönder
                </button>
              </form>
              {quickStatus.message && (
                <div
                  className={`form-status ${quickStatus.type}`}
                  style={{
                    color:
                      quickStatus.type === "success"
                        ? "#27ae60"
                        : quickStatus.type === "error"
                        ? "#c0392b"
                        : "var(--primary)",
                    marginTop: "15px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  {quickStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Neler Yapıyoruz?</span>
            <h2>Profesyonel Hizmetlerimiz</h2>
            <div className="divider"></div>
            <p>
              En kaliteli ürünler ve son teknoloji sistemlerle donatılmış
              kabinlerimizde uyguladığımız başlıca estetik çözümlerimiz.
            </p>
          </div>

          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-card">
              <div className="service-img-wrapper">
                <img
                  src="/assets/images/beauty_equipment.jpg"
                  alt="Lazer Epilasyon Ankara"
                />
                <div className="service-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
              </div>
              <div className="service-info">
                <h3>Lazer Epilasyon</h3>
                <p>
                  Farklı cilt ve kıl tiplerine uygun son teknoloji soğutma sistemli
                  (Buz Başlıklı) lazer cihazlarımızla, konforlu ve yüksek verimli
                  kalıcı pürüzsüzlük seansları.
                </p>
                <ul className="service-features">
                  <li>Acısız & Konforlu Uygulama</li>
                  <li>Tüm Cilt Tiplerine Uygun</li>
                  <li>Kalıcı ve Hızlı Sonuçlar</li>
                </ul>
                <a href="https://wa.me/908503468386" className="service-link">
                  Bilgi & Fiyat Al →
                </a>
              </div>
            </div>

            {/* Service 2 */}
            <div className="service-card">
              <div className="service-img-wrapper">
                <img
                  src="/assets/images/skincare_products.jpg"
                  alt="Cilt Bakımı Ankara"
                />
                <div className="service-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v18M3 12h18M12 3c-3 0-5 3-5 9s2 9 5 9 5-3 5-9-2-9-5-9z"></path>
                  </svg>
                </div>
              </div>
              <div className="service-info">
                <h3>Medikal Cilt Bakımı</h3>
                <p>
                  Cildinizin ihtiyacına özel derinlemesine temizlik, HydraFacial
                  vakumlama teknolojisi, peeling, vitamin serumları ve maske
                  uygulamalarıyla gözenek arındırma ve canlandırma.
                </p>
                <ul className="service-features">
                  <li>HydraFacial Cilt Yenileme</li>
                  <li>Anti-Aging & Leke Bakımları</li>
                  <li>Derinlemesine Gözenek Temizliği</li>
                </ul>
                <a href="https://wa.me/908503468386" className="service-link">
                  Bilgi & Fiyat Al →
                </a>
              </div>
            </div>

            {/* Service 3 */}
            <div className="service-card">
              <div className="service-img-wrapper">
                <img
                  src="/assets/images/massage_spa_room.jpg"
                  alt="Bölgesel Zayıflama Ankara"
                />
                <div className="service-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
              </div>
              <div className="service-info">
                <h3>Bölgesel Zayıflama & G5</h3>
                <p>
                  G5 Masajı, pasif jimnastik ve selülit karşıtı uygulamalarla vücut
                  hatlarını şekillendirme, ödem atma ve bölgesel yağ dokularını
                  hedefleyen profesyonel seanslar.
                </p>
                <ul className="service-features">
                  <li>Selülit Karşıtı G5 Masajı</li>
                  <li>Sıkılaştırıcı Pasif Jimnastik</li>
                  <li>Kan Dolaşımı Hızlandırma</li>
                </ul>
                <a href="https://wa.me/908503468386" className="service-link">
                  Bilgi & Fiyat Al →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container about-container">
          <div className="about-images">
            <div className="main-img-container">
              <img
                src="/assets/images/clinic_interior.jpg"
                alt="Sevgi Medlife Ankara Klinik İçi"
                className="about-img-main"
              />
            </div>
            <div className="experience-badge">
              <span className="badge-num">100%</span>
              <span className="badge-text">
                Hijyen & Müşteri
                <br />
                Memnuniyeti
              </span>
            </div>
          </div>

          <div className="about-content">
            <span className="section-tag">Hakkımızda</span>
            <h2>Sağlıklı Güzellik, Doğru Adres: Sevgi Medlife</h2>
            <div className="divider"></div>
            <p className="lead">
              Ankara Çankaya (Bahçelievler 7. Cadde) lokasyonunda hizmet veren
              Sevgi Medlife, modern güzellik standartlarını kişiye özel
              yaklaşımlarla harmanlayan bir merkezdir.
            </p>
            <p>
              Misafirlerimizin memnuniyetini ve sağlığını her zaman ön planda
              tutarak, steril klinik şartlarında en son teknoloji cihazlarla hizmet
              veriyoruz. Lazer epilasyondan cilt yenilemeye, bölgesel incelmeden
              estetik tırnak uygulamalarına kadar geniş yelpazedeki hizmetlerimizle
              kendinizi yenilenmiş hissetmeniz için buradayız.
            </p>

            <div className="about-features">
              <div className="about-feature-item">
                <div className="feature-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h4>Sertifikalı Uzman Kadro</h4>
                  <p>
                    Tüm uygulamalar alanında uzmanlaşmış ve deneyimli estetisyenler
                    tarafından gerçekleştirilir.
                  </p>
                </div>
              </div>

              <div className="about-feature-item">
                <div className="feature-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h4>FDA Onaylı Teknolojiler</h4>
                  <p>
                    Merkezimizde yalnızca güvenliği ve etkinliği kanıtlanmış
                    orijinal teknolojik cihazlar kullanılır.
                  </p>
                </div>
              </div>

              <div className="about-feature-item">
                <div className="feature-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h4>Kişiye Özel Analiz</h4>
                  <p>
                    Her cilt ve vücut yapısı farklıdır. Seanslar öncesinde ücretsiz
                    analiz ve kişisel planlama yapılır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container stats-container">
          <div className="stat-item">
            <div className="stat-num">
              {stats.sterilization === 100 ? "%100" : stats.sterilization}
            </div>
            <div className="stat-label">Sterilizasyon Oranı</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{stats.categories}</div>
            <div className="stat-label">Farklı Hizmet Kategorisi</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">
              {stats.sessions === 1000 ? "1000+" : stats.sessions}
            </div>
            <div className="stat-label">Başarılı Seans Uygulaması</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">
              {stats.satisfaction === 100 ? "%100" : stats.satisfaction}
            </div>
            <div className="stat-label">Müşteri Odaklı Memnuniyet</div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Klinik Ortamımız</span>
            <h2>Galeri</h2>
            <div className="divider"></div>
            <p>
              Sevgi Medlife Ankara şubemizden tamamen insan yüzü içermeyen estetik
              kareler, temiz ve huzurlu seans odalarımız.
            </p>
          </div>

          <div className="gallery-grid">
            <div
              className="gallery-item"
              onClick={() =>
                openLightbox(
                  "/assets/images/clinic_interior.jpg",
                  "Sevgi Medlife Ankara Karşılama Alanı"
                )
              }
            >
              <img
                src="/assets/images/clinic_interior.jpg"
                alt="Sevgi Medlife Ankara Karşılama Alanı"
              />
              <div className="gallery-hover">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
            <div
              className="gallery-item"
              onClick={() =>
                openLightbox(
                  "/assets/images/beauty_equipment.jpg",
                  "Lazer Epilasyon Cihaz Odası"
                )
              }
            >
              <img
                src="/assets/images/beauty_equipment.jpg"
                alt="Lazer Epilasyon Cihaz Odası"
              />
              <div className="gallery-hover">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
            <div
              className="gallery-item"
              onClick={() =>
                openLightbox(
                  "/assets/images/skincare_products.jpg",
                  "Kullanılan Profesyonel Cilt Bakım Ürünleri"
                )
              }
            >
              <img
                src="/assets/images/skincare_products.jpg"
                alt="Kullanılan Profesyonel Cilt Bakım Ürünleri"
              />
              <div className="gallery-hover">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
            <div
              className="gallery-item"
              onClick={() =>
                openLightbox(
                  "/assets/images/massage_spa_room.jpg",
                  "Bölgesel Zayıflama & G5 Masaj Odası"
                )
              }
            >
              <img
                src="/assets/images/massage_spa_room.jpg"
                alt="Bölgesel Zayıflama & G5 Masaj Odası"
              />
              <div className="gallery-hover">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <div className={`lightbox-modal ${lightbox.open ? "active" : ""}`} id="lightbox">
        <span className="lightbox-close" onClick={closeLightbox}>
          &times;
        </span>
        <div className="lightbox-content-wrapper">
          <img
            className="lightbox-content"
            id="lightboxImg"
            src={lightbox.src}
            alt={lightbox.alt}
          />
          <div id="lightboxCaption" className="lightbox-caption">
            {lightbox.alt}
          </div>
        </div>
      </div>

      {/* Contact & Map Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Bize Ulaşın</span>
            <h2>İletişim ve Konum Bilgileri</h2>
            <div class="divider"></div>
            <p>
              Bahçelievler 7. Cadde'deki merkezimizi ziyaret etmek, seanslar
              hakkında bilgi almak veya randevu oluşturmak için bizimle
              iletişime geçin.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-panel">
              <div className="info-card">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Adresimiz</h3>
                  <p>
                    Yukarı Bahçelievler Mahallesi, Aşkabat Caddesi (7. Cadde) No:
                    7/3, Çankaya / Ankara
                  </p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Telefon Numaralarımız</h3>
                  <p>
                    <a href="tel:+908503468386">0850 346 83 86</a>
                  </p>
                  <p>
                    <a href="tel:+903122123100">0312 212 31 00</a>
                  </p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Sosyal Medya (Instagram)</h3>
                  <p>
                    <a
                      href="https://www.instagram.com/sevgimedlifeankara/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @sevgimedlifeankara
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Çalışma Saatleri</h3>
                  <p>Pazartesi - Cumartesi: 09:30 - 19:30</p>
                  <p>Pazar: Kapalı</p>
                </div>
              </div>
            </div>

            <div className="contact-form-panel">
              <h3>Detaylı Bilgi Formu</h3>
              <p>
                Sorularınız veya randevu talepleriniz için aşağıdaki formu
                doldurabilirsiniz.
              </p>
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactName">Ad Soyad</label>
                    <input
                      type="text"
                      id="contactName"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPhone">Telefon</label>
                    <input
                      type="tel"
                      id="contactPhone"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">E-posta (İsteğe Bağlı)</label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactMessage">Mesajınız</label>
                  <textarea
                    id="contactMessage"
                    rows="4"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Formu Gönder
                </button>
              </form>
              {contactStatus.message && (
                <div
                  className={`form-status ${contactStatus.type}`}
                  style={{
                    color:
                      contactStatus.type === "success"
                        ? "#27ae60"
                        : contactStatus.type === "error"
                        ? "#c0392b"
                        : "var(--primary)",
                    marginTop: "15px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  {contactStatus.message}
                </div>
              )}
            </div>
          </div>

          {/* Map Container */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.957245781358!2d32.82366137656641!3d39.9240112713838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f23830a0bb1%3A0x36a45e2d9f717048!2sSevgi%20Medlife%20%7C%20Ankara%20G%C3%BCzellik%20Merkezi!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-container">
          <div className="footer-brand">
            <a href="#home" className="logo">
              <span className="logo-text">SEVGİ</span>
              <span className="logo-subtext">MEDLIFE</span>
            </a>
            <p>
              Ankara'nın merkezinde uzman kadro ve ileri teknoloji ekipmanlar ile
              güvenilir güzellik hizmetleri.
            </p>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/sevgimedlifeankara/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Hızlı Erişim</h3>
            <ul>
              <li>
                <a href="#home">Ana Sayfa</a>
              </li>
              <li>
                <a href="#services">Hizmetlerimiz</a>
              </li>
              <li>
                <a href="#about">Hakkımızda</a>
              </li>
              <li>
                <a href="#gallery">Galeri</a>
              </li>
              <li>
                <a href="#contact">İletişim</a>
              </li>
            </ul>
          </div>

          <div className="footer-services-links">
            <h3>Hizmetlerimiz</h3>
            <ul>
              <li>
                <a href="#services">Lazer Epilasyon</a>
              </li>
              <li>
                <a href="#services">Medikal Cilt Bakımı</a>
              </li>
              <li>
                <a href="#services">HydraFacial</a>
              </li>
              <li>
                <a href="#services">Bölgesel Zayıflama</a>
              </li>
              <li>
                <a href="#services">G5 Masajı</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-container">
            <p>
              &copy; 2026 Sevgi Medlife Ankara Güzellik Merkezi. Tüm Hakları Saklıdır.
            </p>
            <p>Tasarım: Antigravity AI</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/908503468386"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Randevu Hattı"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
    </>
  );
}
