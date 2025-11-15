// IIFE (نفس طريقتك)
(function() {
  const body = document.body;
  const themeBtn = document.getElementById('themeBtn');
  const sizeBtn = document.getElementById('sizeBtn');
  const progressBar = document.getElementById('progressBar');

  // --- 1. تبديل الثيم (مع التحقق) ---
  // أضفت التحقق (if) عشان لو الزر مو موجود، الكود ما يخرب
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
  // (تأكد إن الـ CSS عندك فيه كلاس .cursor-dot)
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  body.appendChild(cursorDot);

  window.addEventListener('mousemove', (e) => {
    // (اطرح نصف حجم النقطة عشان الماوس يجي في النص)
    // مثلاً لو حجمها 25px:
    cursorDot.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`;
  });


  // --- 5. 🌟 حركات الظهور والرسم (عند تحميل الصفحة) ---
  document.addEventListener('DOMContentLoaded', () => {
    
    // --- إعداد الـ Observer ---
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        
        // 🌟🌟🌟 هنا كان الخطأ وتم تصحيحه 🌟🌟🌟
        if (e.isIntersecting) { // <--- الصح
          
          e.target.classList.add('in-view'); 
          observer.unobserve(e.target); 
        }
      }
    }, { 
      threshold: 0.12 // يشتغل لما 12% من العنصر يظهر
    });

    // راقب كل العناصر
    document.querySelectorAll('.reveal, .draw').forEach(el => observer.observe(el));

    // --- إعداد حركة "رسم" الفواصل (SVG) ---
    document.querySelectorAll('.draw path').forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });
  });

})(); // نهاية الـ IIFE