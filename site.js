// Shared interactivity for all Yaazhi Labs pages

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Nav scrolled state
const nav = document.getElementById('nav');
if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Cursor glow
const glow = document.getElementById('cursorGlow');
if (glow && !matchMedia('(pointer: coarse)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let gx = mx, gy = my;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    function loopGlow() {
        gx += (mx - gx) * 0.08;
        gy += (my - gy) * 0.08;
        glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
        requestAnimationFrame(loopGlow);
    }
    loopGlow();
} else if (glow) {
    glow.style.display = 'none';
}

// 3D tilt on cards
document.querySelectorAll('.tilt').forEach(card => {
    let raf = null;
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            card.style.transform = `rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
        });
    });
    card.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = '';
    });
});

// Magnetic buttons
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});
