(function(){
  'use strict';

  /* ---- Year ---- */
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* ---- Navbar scroll ---- */
  var nb = document.getElementById('nb');
  window.addEventListener('scroll', function(){
    nb.classList[window.scrollY > 40 ? 'add' : 'remove']('sc');
  }, {passive:true});

  /* ---- Mobile menu ---- */
  window.toggleMenu = function(){
    document.getElementById('hbg').classList.toggle('open');
    document.getElementById('mm').classList.toggle('open');
  };

  /* ---- Fade-up on scroll ---- */
  var fuEls = document.querySelectorAll('.fu');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); }
      });
    },{threshold:0.12});
    fuEls.forEach(function(el){ io.observe(el); });
  } else {
    fuEls.forEach(function(el){ el.classList.add('vis'); });
  }

  /* ---- Language toggle ---- */
  var lang = 'id';

  window.setLang = function(l){
    lang = l;

    /* Toggle class-based elements (spans, inline) */
    document.querySelectorAll('[data-lang]').forEach(function(el){
      el.classList[el.dataset.lang === l ? 'add' : 'remove']('on');
    });

    /* Toggle block-level elements using inline style */
    document.querySelectorAll('p[data-lang], .hs[data-lang], .section-sub[data-lang]').forEach(function(el){
      el.style.display = el.dataset.lang === l ? 'block' : 'none';
    });

    /* Team description paragraphs (.tmd) */
    document.querySelectorAll('.tmd').forEach(function(el){
      el.classList[el.dataset.lang === l ? 'add' : 'remove']('on');
    });

    /* Form success paragraphs */
    document.querySelectorAll('#fSuccess p[data-lang]').forEach(function(el){
      el.style.display = el.dataset.lang === l ? 'block' : 'none';
    });

    /* Lang buttons */
    document.querySelectorAll('.lb').forEach(function(btn){
      btn.classList[btn.textContent.trim().toLowerCase() === l ? 'add' : 'remove']('act');
    });

    document.documentElement.lang = l;
  };

  /* ---- Active nav highlight ---- */
  var secs = document.querySelectorAll('section[id]');
  var nlinks = document.querySelectorAll('.nlinks a, .mm a');
  window.addEventListener('scroll', function(){
    var sy = window.scrollY + 120;
    secs.forEach(function(s){
      if(sy >= s.offsetTop && sy < s.offsetTop + s.offsetHeight){
        nlinks.forEach(function(a){
          a.style.color = a.getAttribute('href') === '#' + s.id ? 'var(--gold)' : '';
        });
      }
    });
  }, {passive:true});

  /* ---- Contact form ---- */
  window.handleSubmit = function(e) {
    e.preventDefault();

    const emailTujuan = "customerservice@ptga.my.id";
    const name = document.getElementById('fname').value;
    const emailUser = document.getElementById('femail').value;
    const subject = document.getElementById('fsubject').value;
    const message = document.getElementById('fmsg').value;

    // Menyusun isi body email
    // %0D%0A adalah kode untuk baris baru (Enter)
    const bodyEmail = `Nama: ${name}\n` +
                      `Email Pengirim: ${emailUser}\n` +
                      `Pesan:\n${message}`;

    // Membuat Link mailto
    const mailtoLink = `mailto:${emailTujuan}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyEmail)}`;

    // Eksekusi: Membuka aplikasi email default user
    window.location.href = mailtoLink;

    // --- Logika UI Sukses (Opsional) ---
    var form = document.getElementById('cForm');
    var succ = document.getElementById('fSuccess');
    var btn  = document.getElementById('fBtn');

    btn.disabled = true;
    btn.style.opacity = '0.65';

    setTimeout(function() {
      form.style.display = 'none';
      if (succ) {
        succ.style.display = 'block';
        succ.querySelectorAll('p[data-lang]').forEach(function(p) {
          p.style.display = p.dataset.lang === (window.lang || 'id') ? 'block' : 'none';
        });
      }

      setTimeout(function() {
        form.reset();
        form.style.display = 'flex';
        if (succ) succ.style.display = 'none';
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 5000);
    }, 500);
  };

})();