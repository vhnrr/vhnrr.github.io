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
        bakery_project: "Bakery Management System",
        bakery_description: "Desktop application for bakery shop inventory and sales management.",
        view_project: "View Project",
        connect_title: "Let's Connect",
        connect_subtitle: "Feel free to reach out for collaborations or just to say hello!",
        email_me: "Email me",
        name_label: "Name",
        email_label: "Email",
        message_label: "Message",
        send_button: "Send Message",
        sending: "Sending...",
        privacy_policy: "Privacy Policy",
        accessibility_stmt: "Accessibility Statement",
        form_success: "Thank you! Your message has been sent.",
        form_error: "Oops! There was a problem sending your message."
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
        bakery_project: "Sistem Manajemen Bakery",
        bakery_description: "Aplikasi Desktop untuk manajemen inventori dan penjualan toko roti.",
        view_project: "Lihat Proyek",
        connect_title: "Hubungi Saya",
        connect_subtitle: "Silakan hubungi saya untuk kolaborasi atau sekadar menyapa!",
        email_me: "Email saya",
        name_label: "Nama",
        email_label: "Email",
        message_label: "Pesan",
        send_button: "Kirim Pesan",
        sending: "Mengirim...",
        privacy_policy: "Kebijakan Privasi",
        accessibility_stmt: "Pernyataan Aksesibilitas",
        form_success: "Terima kasih! Pesan Anda telah terkirim.",
        form_error: "Oops! Terjadi masalah saat mengirim pesan."
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
        '.project-title': el => {
            if (el.textContent.includes('Hotel')) return 'hotel_project';
            if (el.textContent.includes('Attendance')) return 'attendance_project';
            if (el.textContent.includes('Bakery')) return 'bakery_project';
            return null;
        },
        '.project-description': el => {
            if (el.textContent.includes('booking') || el.textContent.includes('pemesanan')) return 'hotel_description';
            if (el.textContent.includes('attendance') || el.textContent.includes('presensi')) return 'attendance_description';
            if (el.textContent.includes('bakery') || el.textContent.includes('toko roti')) return 'bakery_description';
            return null;
        },
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
// Form submission handler with Formspree integration
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const currentLang = document.documentElement.lang || 'en';
    
    // Set loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>${translations[currentLang].sending}</span>`;
    }
    
    // Clear previous status
    status.textContent = '';
    status.style.color = '';
    status.className = 'form-status'; // Reset class

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' // Helps Formspree identify AJAX requests
            }
        });

        if (response.ok) {
            // Success
            status.textContent = translations[currentLang].form_success;
            status.style.color = '#28a745';
            status.classList.add('success');
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                status.textContent = '';
            }, 5000);
        } else {
            // Handle Formspree validation errors
            const errorData = await response.json();
            if (errorData.errors) {
                throw new Error(errorData.errors.map(error => error.message).join(", "));
            } else {
                throw new Error(translations[currentLang].form_error);
            }
        }
    } catch (error) {
        // Network errors or other issues
        console.error('Form submission error:', error);
        status.textContent = error.message || translations[currentLang].form_error;
        status.style.color = '#dc3545';
        status.classList.add('error');
    } finally {
        // Reset button state
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>${translations[currentLang].send_button}</span>`;
        }
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const saved_lang = localStorage.getItem('portfolio_lang') || 'en';
    changeLanguage(saved_lang);

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