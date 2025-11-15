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

  // --- 🌟 🌟 🌟 ---
  // 🌟 وظيفة قياس الأنيميشن (هذا الكود الجديد)
  // --- 🌟 🌟 🌟 ---
  const measureAndSet = () => {
    const drawText = document.querySelector('.draw-text');
    if (!drawText) return; // لو العنصر مو موجود، لا تسوي شي

    try {
      // 1. قيس الطول الحقيقي للخط (وهو أصغر في الجوال)
      const length = drawText.getTotalLength();
      
      // 2. اطبع الطول هذا في الـ CSS كمتغير (عشان styles.css يستخدمه)
      drawText.style.setProperty('--stroke-length', length);
      
      // 3. (احتياط) أعد تشغيل الأنيميشن عشان ياخذ الطول الجديد
      drawText.style.animation = 'none';
      drawText.offsetHeight; /* (حركة عشان نجبر المتصفح "يشوف" التغيير) */
      drawText.style.animation = '';

    } catch(e) {
      console.error("Error measuring SVG text:", e);
      // (إذا فشل، استخدم الطول القديم كاحتياط)
      drawText.style.setProperty('--stroke-length', 3600);
    }
  };


  // --- 2. تبديل الحجم (مع التحقق) ---
  if (sizeBtn) {
    let big = false;
    sizeBtn.addEventListener('click', () => {
      big = !big;
      document.documentElement.style.fontSize = big ? '20px' : '16px';

      // --- 🌟 🌟 🌟 ---
      // 🌟 (هنا التعديل الثاني)
      // إذا المستخدم غير حجم الخط، لازم نرجع نقيس الأنيميشن
      // انتظر 0.35 ثانية (عشان الخط يكبر) بعدين قيس
      setTimeout(measureAndSet, 350); 
      // --- 🌟 🌟 🌟 ---
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
  // (تأكد إن الـ CSS عندك فيه كلاس .cursor-dot)
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  body.appendChild(cursorDot);

  window.addEventListener('mousemove', (e) => {
    cursorDot.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`;
  });


  // --- 5. 🌟 حركات الظهور والرسم (عند تحميل الصفحة) ---
  document.addEventListener('DOMContentLoaded', () => {

    // --- 🌟 🌟 🌟 ---
    // 🌟 (هنا التعديل الأول)
    // أول ما تفتح الصفحة، قيس طول الأنيميشن
    measureAndSet();
    // --- 🌟 🌟 🌟 ---
    
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
      // (عدلته لـ line بدل path احتياطاً)
      // إذا الفواصل عندك <path> رجعه لـ '.draw path'
      const length = line.getTotalLength();
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;
    });
  });

})(); // نهاية الـ IIFE
