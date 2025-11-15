// IIFE (نفس طريقتك)
(function() {
  const body = document.body;
  const themeBtn = document.getElementById('themeBtn');
  const sizeBtn = document.getElementById('sizeBtn');
  const progressBar = document.getElementById('progressBar');

  // --- 1. تبديل الثيم (مع التحقق) ---
  if (themeBtn) {
    let themeIndex = 1;
    themeBtn.addEventListener('click', () => {
      themeIndex = (themeIndex % 3) + 1;
      body.classList.remove('theme-1', 'theme-2', 'theme-3');
      body.classList.add('theme-' + themeIndex);
    });
  }

  // --- 2. تبديل الحجم (مع التحقق) ---
  if (sizeBtn) {
    let big = false;
    sizeBtn.addEventListener('click', () => {
      big = !big;
      document.documentElement.style.fontSize = big ? '20px' : '16px';
    });
  }

  // --- 3. مؤشر القراءة (مع التحقق) ---
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / (docHeight || 1)));
      progressBar.style.width = (progress * 100).toFixed(1) + '%';
    });
  }

  // --- 4. 🌟 المؤشر الجديد (Cursor Dot) ---
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  body.appendChild(cursorDot);

  window.addEventListener('mousemove', (e) => {
    cursorDot.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`;
  });


  // --- 5. 🌟 حركات الظهور والرسم (عند تحميل الصفحة) ---
  document.addEventListener('DOMContentLoaded', () => {
    
    // --- إعداد الـ Observer ---
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { 
          e.target.classList.add('in-view'); 
          observer.unobserve(e.target); 
        }
      }
    }, { 
      threshold: 0.12 
    });

    // راقب كل العناصر
    document.querySelectorAll('.reveal, .draw').forEach(el => observer.observe(el));

    // --- إعداد حركة "رسم" الفواصل (SVG) ---
    // (هذا الكود حق الفواصل اللي تحت العناوين)
    document.querySelectorAll('.draw line').forEach(line => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;
    });
  });

})(); // نهاية الـ IIFE
