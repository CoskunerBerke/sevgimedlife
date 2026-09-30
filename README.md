# Sevgi Medlife — Website

**One-page website for Sevgi Medlife, a beauty, laser hair removal and skin care centre in Bahçelievler, Çankaya / Ankara.**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-JSX-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-custom-1572B6?logo=css3&logoColor=white)

> Client project — designed and developed by Berke Coşkuner for **Sevgi Medlife**.

**Live:** [sevgimedlife.com](https://www.sevgimedlife.com/)

---

## Overview

A Turkish-language, single-page website for Sevgi Medlife, a beauty centre on Bahçelievler 7th Street (Aşkabat Caddesi) in Çankaya, Ankara. It introduces the centre's main treatments — ice-laser hair removal, medical skin care / HydraFacial and body contouring with G5 massage — and guides visitors to book an appointment by phone, WhatsApp or one of the request forms. The design uses a champagne-gold and slate-navy palette on a warm cream background.

## Features

- **Sticky header** that changes style on scroll, highlights the active section while scrolling, mobile hamburger menu, click-to-call number and a "Hızlı Randevu" (quick appointment) WhatsApp button
- **Hero** with calls to action and a **quick appointment form** (name, phone, service of interest) with validation messages
- **Services** — three cards: laser hair removal, medical skin care, body contouring & G5, each with a WhatsApp "info & price" link
- **About** section with the centre's approach and three highlight cards (expert staff, device technology, personal analysis)
- **Animated statistics counters** that start when the section scrolls into view (`IntersectionObserver`)
- **Testimonials marquee** — continuously scrolling review cards (pure CSS animation; text is hard-coded in `page.js`)
- **Gallery** of the treatment rooms with a lightbox (click to open, Esc or × to close)
- **Contact** — address, phone numbers, Instagram, working hours, a detailed contact form and an embedded Google Map
- **Floating WhatsApp button** fixed to the corner of the screen
- **SEO** — Turkish title, description, keywords and Open Graph tags with a preview image

> **Note:** both forms currently have no backend — submission is simulated on the client (`setTimeout`) and a success message is shown. Connect them to an e-mail service or an API route before relying on them.

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | JavaScript (JSX), `@/*` path alias via `jsconfig.json` |
| Styling | Hand-written CSS in `globals.css` (CSS variables, responsive breakpoints, keyframe animations) |
| Fonts | `next/font` — Inter, Outfit |
| Linting | ESLint 9 (`eslint-config-next` core-web-vitals) |

Tailwind CSS 4 is installed through PostCSS, but the current styles are written in plain CSS.

## Project structure

```text
sevgimedlife/
├── public/assets/images/   # Clinic interior, equipment, skin care and spa room images
├── src/app/
│   ├── layout.js           # Fonts, SEO metadata, Open Graph
│   ├── page.js             # Whole one-page site: header, hero, services, about,
│   │                       # stats, testimonials, gallery, contact, footer
│   └── globals.css         # Design tokens and all component styles
├── jsconfig.json
└── next.config.mjs
```

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start
```

No environment variables are required.

## Editing content

| What | Where |
| --- | --- |
| Services, about text, testimonials, gallery | `src/app/page.js` (section by section) |
| Phone numbers, WhatsApp, address, working hours, map | `src/app/page.js` → header and `#contact` section |
| Colours, spacing, animations | `src/app/globals.css` → `:root` variables |
| Page title, description, keywords, OG image | `src/app/layout.js` |

---

## Türkçe

**Ankara Çankaya, Bahçelievler'deki güzellik, lazer epilasyon ve cilt bakım merkezi Sevgi Medlife için tek sayfalık web sitesi.**

> Müşteri projesi — **Sevgi Medlife** için Berke Coşkuner tarafından tasarlandı ve geliştirildi.

**Canlı:** [sevgimedlife.com](https://www.sevgimedlife.com/)

### Genel bakış

Ankara Çankaya'da, Bahçelievler 7. Cadde (Aşkabat Caddesi) üzerinde hizmet veren Sevgi Medlife güzellik merkezi için hazırlanmış Türkçe, tek sayfalık web sitesi. Merkezin başlıca uygulamalarını — buz lazer epilasyon, medikal cilt bakımı / HydraFacial ve G5 masajı ile bölgesel zayıflama — tanıtır ve ziyaretçileri telefon, WhatsApp veya talep formları üzerinden randevu almaya yönlendirir. Tasarımda sıcak krem zemin üzerinde şampanya altını ve lacivert tonlar kullanılır.

### Özellikler

- Kaydırınca stil değiştiren, aktif bölümü vurgulayan sabit menü; mobil menü, tıkla-ara numarası ve "Hızlı Randevu" WhatsApp butonu
- **Hero** bölümünde doğrulama mesajlı **hızlı randevu formu** (ad, telefon, ilgilenilen hizmet)
- **Hizmetler** — lazer epilasyon, medikal cilt bakımı, bölgesel zayıflama & G5; her kartta WhatsApp "Bilgi & Fiyat Al" bağlantısı
- Merkezin yaklaşımını ve üç öne çıkan kartı içeren **Hakkımızda** bölümü
- Görünür olduğunda başlayan **animasyonlu istatistik sayaçları**
- Sürekli kayan **yorum kartları** şeridi (saf CSS animasyonu; metinler `page.js` içinde sabit yazılıdır)
- Seans odalarından oluşan, lightbox destekli **galeri** (Esc ile kapatma)
- **İletişim** — adres, telefonlar, Instagram, çalışma saatleri, detaylı bilgi formu ve gömülü Google Haritası
- Sayfanın her yerinde görünen **sabit WhatsApp butonu**
- **SEO** — Türkçe başlık, açıklama, anahtar kelimeler ve önizleme görselli Open Graph

> **Not:** Her iki formun da şu an bir backend bağlantısı yoktur; gönderim istemci tarafında simüle edilir. Gerçek kullanımdan önce bir e-posta servisine veya API route'a bağlanmalıdır.

### Teknolojiler

Next.js 16 (App Router), React 19, JavaScript (JSX), elle yazılmış CSS (`globals.css`), `next/font` (Inter, Outfit). Tailwind CSS 4 PostCSS ile kurulu olsa da mevcut stiller düz CSS ile yazılmıştır.

### Kurulum

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

Ortam değişkeni gerekmez.

### İçerik düzenleme

- Hizmetler, hakkımızda metni, yorumlar, galeri → `src/app/page.js`
- Telefon, WhatsApp, adres, çalışma saatleri, harita → `src/app/page.js` (üst menü ve `#contact` bölümü)
- Renkler ve animasyonlar → `src/app/globals.css` (`:root` değişkenleri)
- Sayfa başlığı, SEO ve OG görseli → `src/app/layout.js`

---

Built by [Berke Coşkuner](https://github.com/CoskunerBerke)
