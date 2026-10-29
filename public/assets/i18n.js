/**
 * Bilingual (English & Bengali) Localization Engine
 * Next Label Portfolio - Imran Hossain
 * Zero-Trust, Client-Side, Instant Reactive Localization
 */

(function () {
  'use strict';

  const WORKS_BN = [
    {
      role: 'UI/UX ও ওয়েব ডিজাইন',
      summary: 'অ্যাম্বিয়েন্ট নান্দনিকতা এবং আধুনিক লেআউট টাইপোগ্রাফিতে নির্মিত বিলাসবহুল আর্কিটেকচারাল ইন্টেরিয়র শোকেস।',
      highlights: ['কিউরেটেড মিনিমালিস্ট লেআউট ও স্পেশিয়াল ভিজ্যুয়াল', 'আধুনিক টাইপোগ্রাফি সহ ইন্টারেক্টিভ রুম শোকেস']
    },
    {
      role: '3D ইন্টারঅ্যাকশন ও WebGL',
      summary: 'স্ক্রোল-সিঙ্কযুক্ত ডেস্ক ক্লক ডিভাইস এবং রিয়েল-টাইম ইন্টারঅ্যাকশন সমৃদ্ধ ইন্টারেক্টিভ 3D প্রোডাক্ট শোকেস।',
      highlights: ['রিয়েল-টাইম 3D স্ক্রোল-সিঙ্ক অ্যানিমেশন', 'ইন্টারেক্টিভ স্পেশিয়াল ডিভাইস নিরীক্ষণ']
    },
    {
      role: 'ক্রিয়েটিভ দেব ও স্পেশিয়াল পার্টিকল',
      summary: 'শীর্ষস্থানীয় ডিজিটাল স্টুডিওর জন্য নির্মিত এক্সপেরিমেন্টাল WebGL পার্টিকল স্কাল্পচার ও গতিশীল টাইপোগ্রাফি অভিজ্ঞতা।',
      highlights: ['GPGPU ডায়নামিক পার্টিকল অ্যাভাটার সিমুলেশন', 'ব্রাউজারে জিরো-লেটেন্সি গতিশীল মিথস্ক্রিয়া']
    },
    {
      role: 'AI অটোমেশন ও ইন্টিগ্রেশন',
      summary: 'এন্ড-টু-এন্ড ইন্টেলিজেন্ট সিআরএম সমন্বয়, স্বয়ংক্রিয় লিড অন্বেষণ এবং রিয়েল-টাইম সেলস পাইপলাইন পরিচালনা।',
      highlights: ['স্বয়ংক্রিয় সিআরএম সিঙ্ক ও ওয়ার্কফ্লো ট্রিগার', 'AI-চালিত আউটবাউন্ড কল কোচিং অ্যানালিটিক্স']
    },
    {
      role: 'SaaS প্রডাক্ট ডেভেলপমেন্ট',
      summary: 'রেভিনিউ ভেলোসিটি, ইউজার রিটেনশন এবং রিয়েল-টাইম প্রোডাক্ট মেট্রিক্স ট্র্যাকিংয়ের হাই-কনভার্সন SaaS গ্রোথ ড্যাশবোর্ড।',
      highlights: ['লাইভ বিজনেস ইন্টেলিজেন্স ও কোহর্ট চার্ট', 'রিয়েল-টাইম পারফরম্যান্স ও কনভার্সন ট্র্যাকিং']
    },
    {
      role: 'ফুল-স্ট্যাক ডেভেলপমেন্ট',
      summary: 'এক্সপেরিমেন্টাল 3D অক্ষরবিন্যাস এবং হার্ডওয়্যার-অ্যাক্সিলারেটেড অ্যানিমেশন সমৃদ্ধ উচ্চ-গতির ওয়েব প্ল্যাটফর্ম।',
      highlights: ['গতিশীল টাইপোগ্রাফি এবং ডায়নামিক ফিজিক্স', 'স্মার্ট ডিভাইস রেসপনসিভ রেন্ডারিং']
    },
    {
      role: 'মোবাইল অ্যাপ ডেভেলপমেন্ট',
      summary: 'স্পেশিয়াল ক্যারেক্টার ফিজিক্স এবং সোশ্যাল ফিড ইন্টিগ্রেশন সমন্বিত ক্রস-প্ল্যাটফর্ম ইন্টারেক্টিভ 3D মোবাইল অ্যাপ।',
      highlights: ['ডিভাইস স্ক্রিনে ইন্টারেক্টিভ 3D ক্যারেক্টার', 'ক্রস-প্ল্যাটফর্ম মোবাইল মোশন ইঞ্জিনিয়ারিং']
    },
    {
      role: 'ডেপ্লয়মেন্ট ও অপটিমাইজেশন',
      summary: 'ইমার্সিভ গন্তব্য আবিষ্কার এবং তাৎক্ষণিক বুকিং সমৃদ্ধ ট্রাভেল ও হসপিটালিটি ওয়েব অ্যাপ্লিকেশন।',
      highlights: ['কার্ড-ভিত্তিক গন্তব্য অন্বেষণ', 'দ্রুত পেজ লোড ও টেকনিক্যাল এসইও']
    }
  ];

  const TRANSLATIONS = {
    en: {
      lang: 'en',
      nav: {
        about: 'About',
        services: 'Services',
        works: 'Works',
        contact: 'Contact'
      },
      controls: {
        motionOn: 'Motion on',
        motionOff: 'Motion off',
        soundOn: 'Sound on',
        soundOff: 'Sound off'
      },
      hud: {
        spring: 'Spring',
        summer: 'Summer',
        autumn: 'Autumn',
        winter: 'Winter'
      },
      loader: {
        trouble: 'Loading is taking longer than expected.',
        retry: 'Try again',
        light: 'Lightweight mode',
        enterSound: 'Enter with sound',
        enterSilent: 'Without sound',
        skipLink: 'Skip to contact form'
      },
      hero: {
        label: 'SOFTWARE & PRODUCT DEVELOPER',
        title: 'I Turn Ideas Into Digital Products.',
        body: 'I build websites, mobile apps, and SaaS products that solve real-world business problems through thoughtful design and AI automation.',
        ctaAbout: 'Explore Profile',
        ctaWorks: 'Selected Works'
      },
      about: {
        season: 'Spring',
        label: 'About',
        lede: 'More than code.<br />Digital products built<br />to solve real problems.',
        body: "I'm a software & product developer focused on building websites, mobile apps, and SaaS products that turn ideas into practical digital solutions. By combining thoughtful design, modern development, and AI automation, I create digital experiences that solve real-world business problems.",
        note: 'Based in Bangladesh · Open to remote collaboration',
        advance: 'Explore Services'
      },
      services: {
        season: 'Summer',
        label: 'Services',
        lede: 'From concept and design to development and deployment.',
        items: [
          { no: '01', title: 'AI Automation & Integration', tags: 'AI Agents / Workflow Automation / Business Processes' },
          { no: '02', title: 'Business Solutions & Product Strategy', tags: 'Business Analysis / Digital Solutions / MVP Planning' },
          { no: '03', title: 'UI/UX & Web Design', tags: 'Landing Pages / Business Websites / Responsive Design' },
          { no: '04', title: 'Website Development', tags: 'React / Next.js / Tailwind CSS' },
          { no: '05', title: 'Full-Stack Development', tags: 'Frontend / Backend / APIs / Databases' },
          { no: '06', title: 'SaaS Product Development', tags: 'SaaS Platforms / Dashboards / Product Features' },
          { no: '07', title: 'Mobile App Development', tags: 'Flutter / Cross-Platform Apps / API Integration' },
          { no: '08', title: 'Deployment & Optimization', tags: 'Vercel / Performance / Technical SEO' }
        ]
      },
      autumn: {
        season: 'Autumn',
        label: 'Works',
        lede: 'Selected digital products & works.'
      },
      works: {
        season: 'Autumn',
        label: 'Works',
        host: 'View Case Study'
      },
      contact: {
        season: 'Winter',
        label: 'Contact',
        lede: "Have an Idea? Let's Make It Real.",
        body: "Have a project in mind? Let's discuss how we can turn your ideas into impactful digital solutions through websites, mobile apps, SaaS, and AI automation.",
        nameLabel: 'Name',
        namePlaceholder: 'Emran Hosen',
        emailLabel: 'Email Address',
        emailPlaceholder: 'imrandt2001@gmail.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your project or business challenge.',
        submit: 'Send Message',
        statusSuccess: 'Message sent successfully. Thank you for reaching out!',
        orConnect: 'Or connect directly:'
      },
      finale: {
        title: 'Explore My Work ',
        subtitle: 'Capabilities',
        card1Title: 'Full-Stack Development ',
        card1Desc: 'Building modern web applications focused on performance, usability, and real-world business needs.',
        card1Host: 'View Projects',
        card2Title: 'AI Automation Solutions ',
        card2Desc: 'Creating AI-powered workflows and automation solutions to simplify business operations and reduce repetitive tasks.',
        card2Host: 'Explore Solutions',
        card3Title: 'SaaS & App Development ',
        card3Desc: 'Designing and developing practical software products, SaaS platforms, and mobile applications that solve real-world problems.',
        card3Host: 'Start a Project',
        copyright: '© 2026 Imran Hossain. All rights reserved.',
        top: 'Back to top'
      },
      earth: {
        meta: 'Imran Hossain / Low Orbit',
        title: 'Thank you.',
        lede: 'Message transmitted. Thank you for reaching out.',
        body: 'I will review your inquiry and get back to you shortly. Your message has traveled from the deep ocean floor into low orbit.',
        close: 'Return to Ocean'
      }
    },
    bn: {
      lang: 'bn',
      nav: {
        about: 'পরিচিতি',
        services: 'সেবাসমূহ',
        works: 'প্রজেক্ট',
        contact: 'যোগাযোগ'
      },
      controls: {
        motionOn: 'মোশন চালু',
        motionOff: 'মোশন বন্ধ',
        soundOn: 'সাউন্ড চালু',
        soundOff: 'সাউন্ড বন্ধ'
      },
      hud: {
        spring: 'বসন্ত',
        summer: 'গ্রীষ্ম',
        autumn: 'শরৎ',
        winter: 'শীত'
      },
      loader: {
        trouble: 'লোড হতে স্বাভাবিকের চেয়ে বেশি সময় নিচ্ছে।',
        retry: 'পুনরায় চেষ্টা করুন',
        light: 'লাইট মোডে দেখুন',
        enterSound: 'সাউন্ড সহ প্রবেশ করুন',
        enterSilent: 'সাউন্ড ছাড়া প্রবেশ করুন',
        skipLink: 'যোগাযোগ ফর্মে যান'
      },
      hero: {
        label: 'সফটওয়্যার ও প্রডাক্ট ডেভেলপার',
        title: 'আইডিয়াকে বাস্তবে রূপ দিই সফল ডিজিটাল প্রডাক্টে।',
        body: 'আমি ওয়েবসাইট, মোবাইল অ্যাপ এবং SaaS প্রোডাক্ট তৈরি করি যা আধুনিক ডিজাইন এবং AI অটোমেশনের মাধ্যমে বাস্তব ব্যবসায়িক সমস্যার সমাধান করে।',
        ctaAbout: 'আমার পরিচয়',
        ctaWorks: 'প্রজেক্ট সমূহ'
      },
      about: {
        season: 'বসন্ত',
        label: 'পরিচিতি',
        lede: 'শুধু কোড নয়।<br />বাস্তব সমস্যা সমাধানের জন্য তৈরি<br />ডিজিটাল প্রডাক্ট।',
        body: 'আমি একজন সফটওয়্যার ও প্রডাক্ট ডেভেলপার। ওয়েবসাইট, মোবাইল অ্যাপ এবং SaaS প্রডাক্টের মাধ্যমে আইডিয়াকে বাস্তবমুখী ডিজিটাল সল্যুশনে রূপান্তর করাই আমার লক্ষ্য। আকর্ষণীয় ডিজাইন, আধুনিক প্রযুক্তি এবং AI অটোমেশনের সমন্বয়ে আমি তৈরি করি সেরা ডিজিটাল অভিজ্ঞতা।',
        note: 'বাংলাদেশভিত্তিক · রিমোট কোলাবোরেশনের জন্য উন্মুক্ত',
        advance: 'সেবাসমূহ দেখুন'
      },
      services: {
        season: 'গ্রীষ্ম',
        label: 'সেবাসমূহ',
        lede: 'পরিকল্পনা ও ডিজাইন থেকে শুরু করে ডেভেলপমেন্ট ও ডেপ্লয়মেন্ট পর্যন্ত।',
        items: [
          { no: '01', title: 'AI অটোমেশন ও ইন্টিগ্রেশন', tags: 'AI এজেন্ট / ওয়ার্কফ্লো অটোমেশন / বিজনেস প্রসেস' },
          { no: '02', title: 'বিজনেস সল্যুশন ও প্রডাক্ট স্ট্র্যাটেজি', tags: 'বিজনেস অ্যানালাইসিস / ডিজিটাল সল্যুশন / MVP প্ল্যানিং' },
          { no: '03', title: 'UI/UX ও ওয়েব ডিজাইন', tags: 'ল্যান্ডিং পেজ / বিজনেস ওয়েবসাইট / রেসপন্সিভ ডিজাইন' },
          { no: '04', title: 'ওয়েবসাইট ডেভেলপমেন্ট', tags: 'React / Next.js / Tailwind CSS' },
          { no: '05', title: 'ফুল-স্ট্যাক ডেভেলপমেন্ট', tags: 'ফ্রন্টএন্ড / ব্যাকএন্ড / API / ডাটাবেজ' },
          { no: '06', title: 'SaaS প্রডাক্ট ডেভেলপমেন্ট', tags: 'SaaS প্ল্যাটফর্ম / ড্যাশবোর্ড / কাস্টম ফিচার' },
          { no: '07', title: 'মোবাইল অ্যাপ ডেভেলপমেন্ট', tags: 'Flutter / ক্রস-প্ল্যাটফর্ম অ্যাপ / API ইন্টিগ্রেশন' },
          { no: '08', title: 'ডেপ্লয়মেন্ট ও অপটিমাইজেশন', tags: 'Vercel / পারফরম্যান্স / টেকনিক্যাল SEO' }
        ]
      },
      autumn: {
        season: 'শরৎ',
        label: 'প্রজেক্ট',
        lede: 'নির্বাচিত কিছু ডিজিটাল প্রডাক্ট ও কাজ।'
      },
      works: {
        season: 'শরৎ',
        label: 'প্রজেক্ট',
        host: 'কেস স্টাডি দেখুন'
      },
      contact: {
        season: 'শীত',
        label: 'যোগাযোগ',
        lede: 'কোনো আইডিয়া আছে? চলুন বাস্তবে রূপ দিই।',
        body: 'আপনার কি কোনো প্রজেক্টের পরিকল্পনা আছে? ওয়েবসাইট, মোবাইল অ্যাপ, SaaS কিংবা AI অটোমেশনের মাধ্যমে কীভাবে তা সফল করা যায়, চলুন আলোচনা করি।',
        nameLabel: 'আপনার নাম',
        namePlaceholder: 'ইমরান হোসেন',
        emailLabel: 'ইমেইল ঠিকানা',
        emailPlaceholder: 'imrandt2001@gmail.com',
        messageLabel: 'বার্তা',
        messagePlaceholder: 'আপনার প্রজেক্ট বা ব্যবসায়িক চ্যালেঞ্জ সম্পর্কে লিখুন।',
        submit: 'বার্তা পাঠান',
        statusSuccess: 'বার্তা সফলভাবে পাঠানো হয়েছে। যোগাযোগ করার জন্য ধন্যবাদ!',
        orConnect: 'সরাসরি যোগাযোগ ও সোশ্যাল মাধ্যম:'
      },
      finale: {
        title: 'আমার কাজসমূহ এক্সপ্লোর করুন ',
        subtitle: 'দক্ষতাসমূহ',
        card1Title: 'ফুল-স্ট্যাক ডেভেলপমেন্ট ',
        card1Desc: 'পারফরম্যান্স, সহজ ব্যবহার এবং বাস্তব ব্যবসায়িক চাহিদাকে প্রাধান্য দিয়ে আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি।',
        card1Host: 'প্রজেক্ট দেখুন',
        card2Title: 'AI অটোমেশন সল্যুশন ',
        card2Desc: 'ব্যবসায়িক কার্যক্রম সহজ করতে এবং পুনরাবৃত্তিমূলক কাজ কমাতে AI চালিত ওয়ার্কফ্লো ও অটোমেশন সল্যুশন তৈরি।',
        card2Host: 'সল্যুশন এক্সপ্লোর করুন',
        card3Title: 'SaaS ও অ্যাপ ডেভেলপমেন্ট ',
        card3Desc: 'বাস্তব সমস্যার সমাধানকারী কার্যকরী সফটওয়্যার পণ্য, SaaS প্ল্যাটফর্ম এবং মোবাইল অ্যাপ্লিকেশন ডিজাইন ও ডেভেলপমেন্ট।',
        card3Host: 'প্রজেক্ট শুরু করুন',
        copyright: '© ২০২৬ ইমরান হোসেন। সর্বস্বত্ব সংরক্ষিত।',
        top: 'উপরে ফিরে যান'
      },
      earth: {
        meta: 'ইমরান হোসেন / লো অরবিট',
        title: 'ধন্যবাদ।',
        lede: 'বার্তা সফলভাবে পৌঁছেছে। যোগাযোগ করার জন্য ধন্যবাদ।',
        body: 'আমি দ্রুত আপনার বার্তাটি পর্যালোচনা করে আপনার সাথে যোগাযোগ করব। আপনার বার্তাটি গভীর সমুদ্রতল থেকে লো অরবিটে পৌঁছেছে।',
        close: 'সাগরে ফিরে যান'
      }
    }
  };

  let currentLanguage = 'en';

  function getStoredLang() {
    try {
      const stored = localStorage.getItem('portfolio_lang');
      if (stored === 'bn' || stored === 'en') return stored;
    } catch (e) {}
    return 'en';
  }

  function updateActiveWorkDetails() {
    if (currentLanguage !== 'bn') return;
    const indexEl = document.querySelector('[data-work-index]');
    if (!indexEl) return;
    const idx = parseInt(indexEl.textContent, 10) - 1;
    if (idx >= 0 && idx < WORKS_BN.length) {
      const bnWork = WORKS_BN[idx];
      const roleEl = document.querySelector('[data-work-role]');
      const summaryEl = document.querySelector('[data-work-summary]');
      if (roleEl) roleEl.textContent = bnWork.role;
      if (summaryEl) summaryEl.textContent = bnWork.summary;
      const highlightsEl = document.querySelector('[data-work-highlights]');
      if (highlightsEl && bnWork.highlights) {
        highlightsEl.innerHTML = bnWork.highlights.map(h => `<li>${h}</li>`).join('');
      }
    }
  }

  function setLanguage(lang) {
    if (lang !== 'bn' && lang !== 'en') lang = 'en';
    currentLanguage = lang;
    try {
      localStorage.setItem('portfolio_lang', lang);
    } catch (e) {}

    document.documentElement.lang = lang;
    const t = TRANSLATIONS[lang];

    // 1. Update Lang Switcher UI Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isTarget = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', isTarget);
      btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    // 2. Masthead Nav
    const navLinks = document.querySelectorAll('.masthead__nav a');
    if (navLinks.length >= 4) {
      navLinks[0].textContent = t.nav.about;
      navLinks[1].textContent = t.nav.services;
      navLinks[2].textContent = t.nav.works;
      navLinks[3].textContent = t.nav.contact;
    }

    // 3. Motion & Sound Toggle Labels
    const motionLabel = document.querySelector('[data-motion-label]');
    if (motionLabel) {
      const isPressed = motionLabel.closest('button')?.getAttribute('aria-pressed') === 'true';
      motionLabel.textContent = isPressed ? t.controls.motionOn : t.controls.motionOff;
    }
    const soundLabel = document.querySelector('[data-sound-label]');
    if (soundLabel) {
      const isPressed = soundLabel.closest('button')?.getAttribute('aria-pressed') === 'true';
      soundLabel.textContent = isPressed ? t.controls.soundOn : t.controls.soundOff;
    }

    // 4. HUD Seasons
    const seasons = document.querySelectorAll('.hud__seasons li[data-hud-season]');
    if (seasons.length >= 4) {
      seasons[0].textContent = t.hud.spring;
      seasons[1].textContent = t.hud.summer;
      seasons[2].textContent = t.hud.autumn;
      seasons[3].textContent = t.hud.winter;
    }

    // 5. Hero Section
    const heroLabel = document.querySelector('.panel--hero .label');
    if (heroLabel) heroLabel.textContent = t.hero.label;
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = `<span class="visually-hidden">Emran Hosen: </span>${t.hero.title}`;
    }
    const heroBody = document.querySelector('.panel--hero .body--hero');
    if (heroBody) heroBody.textContent = t.hero.body;
    const heroCtaAbout = document.querySelector('[data-hero-cta="about"]');
    if (heroCtaAbout) heroCtaAbout.textContent = t.hero.ctaAbout;
    const heroCtaWorks = document.querySelector('[data-hero-cta="works"]');
    if (heroCtaWorks) heroCtaWorks.textContent = t.hero.ctaWorks;

    // 6. About Section
    const aboutSeason = document.querySelector('#about .label__season');
    if (aboutSeason) aboutSeason.textContent = t.about.season;
    const aboutLabel = document.querySelector('#about .label');
    if (aboutLabel && aboutSeason) {
      aboutLabel.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = t.about.label;
      });
    }
    const aboutTitle = document.getElementById('about-title');
    if (aboutTitle) aboutTitle.innerHTML = t.about.lede;
    const aboutBody = document.querySelector('#about .body');
    if (aboutBody) aboutBody.textContent = t.about.body;
    const aboutNote = document.querySelector('#about .note');
    if (aboutNote) aboutNote.textContent = t.about.note;
    const aboutAdvance = document.querySelector('[data-advance="services"]');
    if (aboutAdvance) aboutAdvance.textContent = t.about.advance;

    // 7. Services Section
    const servicesSeason = document.querySelector('#services .label__season');
    if (servicesSeason) servicesSeason.textContent = t.services.season;
    const servicesLabel = document.querySelector('#services .label');
    if (servicesLabel && servicesSeason) {
      servicesLabel.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = t.services.label;
      });
    }
    const servicesTitle = document.getElementById('services-title');
    if (servicesTitle) servicesTitle.textContent = t.services.lede;

    const serviceItems = document.querySelectorAll('#services .service');
    serviceItems.forEach((el, idx) => {
      const data = t.services.items[idx];
      if (data) {
        const titleEl = el.querySelector('.service__title');
        const tagsEl = el.querySelector('.service__tags');
        if (titleEl) titleEl.textContent = data.title;
        if (tagsEl) tagsEl.textContent = data.tags;
      }
    });

    // 8. Autumn & Works
    const autumnSeason = document.querySelector('.panel--autumn .label__season');
    if (autumnSeason) autumnSeason.textContent = t.autumn.season;
    const autumnLabel = document.querySelector('.panel--autumn .label');
    if (autumnLabel && autumnSeason) {
      autumnLabel.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = t.autumn.label;
      });
    }
    const autumnTitle = document.getElementById('autumn-title');
    if (autumnTitle) autumnTitle.textContent = t.autumn.lede;

    const worksSeason = document.querySelector('#works .label__season');
    if (worksSeason) worksSeason.textContent = t.works.season;
    const worksLabel = document.querySelector('#works .label');
    if (worksLabel && worksSeason) {
      worksLabel.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = t.works.label;
      });
    }
    const worksHost = document.querySelector('[data-work-host]');
    if (worksHost) worksHost.textContent = t.works.host;

    updateActiveWorkDetails();

    // 9. Contact Section
    const contactSeason = document.querySelector('#contact .label__season');
    if (contactSeason) contactSeason.textContent = t.contact.season;
    const contactLabel = document.querySelector('#contact .label');
    if (contactLabel && contactSeason) {
      contactLabel.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = t.contact.label;
      });
    }
    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.textContent = t.contact.lede;
    const contactBody = document.querySelector('#contact .body');
    if (contactBody) contactBody.textContent = t.contact.body;

    const nameLabel = document.querySelector('label[for="contact-name"]');
    if (nameLabel) nameLabel.textContent = t.contact.nameLabel;
    const nameInput = document.getElementById('contact-name');
    if (nameInput) nameInput.setAttribute('placeholder', t.contact.namePlaceholder);

    const emailLabel = document.querySelector('label[for="contact-email"]');
    if (emailLabel) emailLabel.textContent = t.contact.emailLabel;
    const emailInput = document.getElementById('contact-email');
    if (emailInput) emailInput.setAttribute('placeholder', t.contact.emailPlaceholder);

    const msgLabel = document.querySelector('label[for="contact-message"]');
    if (msgLabel) msgLabel.textContent = t.contact.messageLabel;
    const msgInput = document.getElementById('contact-message');
    if (msgInput) msgInput.setAttribute('placeholder', t.contact.messagePlaceholder);

    const submitBtn = document.querySelector('[data-submit]');
    if (submitBtn) submitBtn.textContent = t.contact.submit;

    const socialsLabel = document.querySelector('[data-contact-socials-label]');
    if (socialsLabel) socialsLabel.textContent = t.contact.orConnect;

    // 10. Finale Section
    const finaleTitle = document.getElementById('owned-sites-title');
    if (finaleTitle) {
      finaleTitle.innerHTML = `${t.finale.title}<span>${t.finale.subtitle}</span>`;
    }
    const cardLinks = document.querySelectorAll('.owned-sites__list li');
    if (cardLinks.length >= 3) {
      const c1Name = cardLinks[0].querySelector('.owned-sites__name');
      const c1Desc = cardLinks[0].querySelector('.owned-sites__description');
      const c1Host = cardLinks[0].querySelector('.owned-sites__host');
      if (c1Name) c1Name.innerHTML = `${t.finale.card1Title}<span aria-hidden="true">↗</span>`;
      if (c1Desc) c1Desc.textContent = t.finale.card1Desc;
      if (c1Host) c1Host.textContent = t.finale.card1Host;

      const c2Name = cardLinks[1].querySelector('.owned-sites__name');
      const c2Desc = cardLinks[1].querySelector('.owned-sites__description');
      const c2Host = cardLinks[1].querySelector('.owned-sites__host');
      if (c2Name) c2Name.innerHTML = `${t.finale.card2Title}<span aria-hidden="true">↗</span>`;
      if (c2Desc) c2Desc.textContent = t.finale.card2Desc;
      if (c2Host) c2Host.textContent = t.finale.card2Host;

      const c3Name = cardLinks[2].querySelector('.owned-sites__name');
      const c3Desc = cardLinks[2].querySelector('.owned-sites__description');
      const c3Host = cardLinks[2].querySelector('.owned-sites__host');
      if (c3Name) c3Name.innerHTML = `${t.finale.card3Title}<span aria-hidden="true">↗</span>`;
      if (c3Desc) c3Desc.textContent = t.finale.card3Desc;
      if (c3Host) c3Host.textContent = t.finale.card3Host;
    }
    const finaleCopy = document.querySelector('.panel--finale p:not([class])');
    if (finaleCopy) finaleCopy.textContent = t.finale.copyright;
    const finaleTop = document.querySelector('.finale__top');
    if (finaleTop) finaleTop.textContent = t.finale.top;

    // 11. Secret Earth Modal
    const earthMeta = document.querySelector('.secret-earth__body .label');
    if (earthMeta) earthMeta.textContent = t.earth.meta;
    const earthTitle = document.getElementById('earth-title');
    if (earthTitle) earthTitle.textContent = t.earth.title;
    const earthLede = document.getElementById('earth-text');
    if (earthLede) earthLede.textContent = t.earth.lede;
    const earthBody = document.querySelector('.secret-earth__body .body');
    if (earthBody) earthBody.textContent = t.earth.body;
    const earthClose = document.querySelector('[data-earth-close]');
    if (earthClose) earthClose.textContent = t.earth.close;

    // 12. Loader texts
    const loaderTroubleText = document.querySelector('[data-loader-trouble-text]');
    if (loaderTroubleText) loaderTroubleText.textContent = t.loader.trouble;
    const loaderRetry = document.querySelector('[data-loader-retry]');
    if (loaderRetry) loaderRetry.textContent = t.loader.retry;
    const loaderLight = document.querySelector('[data-loader-light]');
    if (loaderLight) loaderLight.textContent = t.loader.light;
    const enterSound = document.querySelector('[data-enter="sound"]');
    if (enterSound) enterSound.textContent = t.loader.enterSound;
    const enterSilent = document.querySelector('[data-enter="silent"]');
    if (enterSilent) enterSilent.textContent = t.loader.enterSilent;
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) skipLink.textContent = t.loader.skipLink;
  }

  // Observe active work index changes to translate work details when in Bengali
  function observeWorkChanges() {
    const workIndexEl = document.querySelector('[data-work-index]');
    if (!workIndexEl) return;
    const observer = new MutationObserver(() => {
      if (currentLanguage === 'bn') {
        setTimeout(updateActiveWorkDetails, 20);
      }
    });
    observer.observe(workIndexEl, { childList: true, characterData: true, subtree: true });
  }

  // Bind Switcher UI
  function initLanguageSwitcher() {
    const initialLang = getStoredLang();
    setLanguage(initialLang);
    observeWorkChanges();

    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.lang-btn');
      if (btn) {
        e.preventDefault();
        const targetLang = btn.getAttribute('data-lang');
        setLanguage(targetLang);
      }
      const enterLangBtn = e.target.closest('[data-enter-lang]');
      if (enterLangBtn) {
        const targetLang = enterLangBtn.getAttribute('data-enter-lang');
        setLanguage(targetLang);
      }
    });
  }

  window.setPortfolioLanguage = setLanguage;
  window.getPortfolioLanguage = getStoredLang;
  window.PORTFOLIO_TRANSLATIONS = TRANSLATIONS;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }
})();
