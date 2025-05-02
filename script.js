// Object containing translations in two languages: English (en) and Indonesian (id)
const translations = {
    en: {
        about_us: "About Me",
        description: "Hi, I'm Vihan Rara Agustina, a freelance designer specializing in digital accessibility.",
        education: "Undergraduate Informatics Student at Gunadarma University.",
        location: "Based in Indonesia, I work with English and Indonesian teams to create accessible digital experiences.",
        footer_text: "© 2025 Vihan Rara Agustina. All rights reserved.",
        skills_title: "Skills & Expertise",
        projects_title: "My Projects",
        projects_subtitle: "Some of my recent work",
        hotel_project: "Hotel Booking Web App",
        hotel_description: "An accessible hotel booking platform with focus on WCAG compliance.",
        attendance_project: "Attendance System",
        attendance_description: "Web & Desktop application for employee attendance tracking.",
        view_project: "View Project",
        connect_title: "Let's Connect",
        connect_subtitle: "Feel free to reach out for collaborations or just to say hello!",
        email_me: "Email me",
        name_label: "Name",
        email_label: "Email",
        message_label: "Message",
        send_button: "Send Message",
        privacy_policy: "Privacy Policy",
        accessibility_stmt: "Accessibility Statement"
    },
    id: {
        about_us: "Tentang Saya",
        description: "Hai, saya Vihan Rara Agustina, desainer lepas yang berspesialisasi dalam aksesibilitas digital.",
        education: "Mahasiswa Informatika di Universitas Gunadarma.", 
        location: "Berbasis di Indonesia, saya bekerja dengan tim berbahasa Inggris dan Indonesia untuk menciptakan pengalaman digital yang dapat diakses.",
        footer_text: "© 2025 Vihan Rara Agustina. Hak cipta dilindungi.",
        skills_title: "Keahlian & Kemampuan",
        projects_title: "Proyek Saya",
        projects_subtitle: "Beberapa pekerjaan terbaru saya",
        hotel_project: "Aplikasi Web Pemesanan Hotel",
        hotel_description: "Platform pemesanan hotel yang mengutamakan aksesibilitas sesuai standar WCAG.",
        attendance_project: "Sistem Presensi",
        attendance_description: "Aplikasi Web & Desktop untuk pelacakan kehadiran karyawan.",
        view_project: "Lihat Proyek",
        connect_title: "Hubungi Saya",
        connect_subtitle: "Silakan hubungi saya untuk kolaborasi atau sekadar menyapa!",
        email_me: "Email saya",
        name_label: "Nama",
        email_label: "Email",
        message_label: "Pesan",
        send_button: "Kirim Pesan",
        privacy_policy: "Kebijakan Privasi",
        accessibility_stmt: "Pernyataan Aksesibilitas"
    }
};

// Function to change page language
function changeLanguage(lang) {
    document.documentElement.lang = lang;

    // Update content elements based on data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Select and translate elements based on selector
    const translate_elements = {
        '.skills-title': 'skills_title',
        '#projects .section-subtitle': 'projects_subtitle',
        '#contact .section-subtitle': 'connect_subtitle',
        '.project-title': el => el.textContent.includes('Hotel') ? 'hotel_project' : 'attendance_project',
        '.project-description': el => el.textContent.includes('booking') ? 'hotel_desc' : 'attendance_description',
        '.project-link span': 'view_project',
        '.email-button span': 'email_me',
        'label[for="name"]': 'name_label',
        'label[for="email"]': 'email_label',
        'label[for="message"]': 'message_label',
        '.submit-btn': 'send_button',
        '.footer-link:first-child': 'privacy_policy',
        '.footer-link:last-child': 'accessibility_stmt'
    };

    for (const [selector, key] of Object.entries(translate_elements)) {
        document.querySelectorAll(selector).forEach(element => {
            const translation_key = typeof key === 'function' ? key(element) : key;
            const translation = translations[lang][translation_key];

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    const html_content = element.innerHTML;
                    const has_html = /<[a-z][\s\S]*>/i.test(html_content);

                    if (has_html) {
                        const temp = document.createElement('div');
                        temp.innerHTML = translation;
                        if (temp.children.length === 0) {
                            element.innerHTML = element.innerHTML.replace(/>([^<]*)</, `>${translation}<`);
                        } else {
                            element.innerHTML = translation;
                        }
                    } else {
                        element.textContent = translation;
                    }
                }
            }
        });
    }

    // Save language preference to local storage
    localStorage.setItem('portfolio_lang', lang);

    // Set active language button display
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((lang === 'en' && btn.textContent.includes('EN')) || (lang === 'id' && btn.textContent.includes('ID'))) {
            btn.classList.add('active');
        }
    });
}

// Form submission handler with Formspree integration
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Replace with your Formspree endpoint
    fetch("https://formspree.io/f/xkgrjgqa", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert(document.documentElement.lang === 'id' ?
                'Pesan terkirim! Terima kasih telah menghubungi saya.' :
                'Message sent! Thank you for reaching out.');
            form.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        alert(document.documentElement.lang === 'id' ?
            'Terjadi kesalahan. Silakan coba lagi nanti.' :
            'An error occurred. Please try again later.');
        console.error('Error:', error);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const saved_lang = localStorage.getItem('portfolio_lang') || 'en';
    changeLanguage(saved_lang);

    const contact_form = document.querySelector('.form');
    if (contact_form) {
        contact_form.addEventListener('submit', handleFormSubmit);
    }

    const faders = document.querySelectorAll('.fade-in');
    const appear_options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appear_on_scroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appear_options);

    faders.forEach(fader => {
        appear_on_scroll.observe(fader);
    });
});