// IIFE (نفس طريقتك)
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const html = document.documentElement;
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
        html.style.fontSize = big ? '20px' : '16px';
      });
    }

    // --- 3. مؤشر القراءة (مع التحقق) ---
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = html.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, docHeight > 0 ? scrollTop / docHeight : 0));
        progressBar.style.width = (progress * 100).toFixed(1) + '%';
      });
    }

    // --- 4. 🌟 المؤشر الجديد (Cursor Dot) - ديسكتوب فقط ---
    const isFinePointer =
      window.matchMedia && window.matchMedia('(pointer: fine)').matches;

    if (isFinePointer) {
      const cursorDot = document.createElement('div');
      cursorDot.className = 'cursor-dot';
      body.appendChild(cursorDot);

      // نخلي الحركة وما تسبب شريط أفقي
      window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
      });
    }

    // --- 5. 🌟 حركات الظهور والرسم (عند تحميل الصفحة) ---

    // إعداد الـ Observer
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.12,
      }
    );

    // راقب كل العناصر اللي عليها .reveal أو .draw
    document.querySelectorAll('.reveal, .draw').forEach((el) => observer.observe(el));

    // إعداد حركة "رسم" الفواصل (SVG)
    document.querySelectorAll('.draw line').forEach((line) => {
      try {
        const length = line.getTotalLength();
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;
      } catch (e) {
        // بعض العناصر يمكن ما تدعم getTotalLength، نتجاهلها
      }
    });
  });
})(); // نهاية الـ IIFE
