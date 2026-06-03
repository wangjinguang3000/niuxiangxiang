/* ============================================================
   草原爱宠营 品牌官网 | 沉浸式草原交互脚本
   ============================================================ */
(function(){
  "use strict";

  // === 导航栏 ===
  function initNav() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    var nav = document.querySelector(".nav");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function() {
      toggle.classList.toggle("active");
      links.classList.toggle("active");
      document.body.style.overflow = links.classList.contains("active") ? "hidden" : "";
    });

    links.querySelectorAll("a").forEach(function(a) {
      a.addEventListener("click", function() {
        toggle.classList.remove("active");
        links.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    if (nav) {
      window.addEventListener("scroll", function() {
        nav.classList.toggle("scrolled", window.scrollY > 10);
      }, { passive: true });
    }

    var path = window.location.pathname.split("/").pop() || "index.html";
    links.querySelectorAll("a").forEach(function(a) {
      var href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        a.classList.add("active");
      }
    });
  }

  // === 滚动显现动画 ===
  function initReveal() {
    var reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    function check() {
      var h = window.innerHeight;
      reveals.forEach(function(el) {
        var top = el.getBoundingClientRect().top;
        if (top < h - 60) el.classList.add("visible");
      });
    }
    window.addEventListener("scroll", check, { passive: true });
    check();
  }

  // === FAQ 折叠 ===
  function initFaq() {
    document.querySelectorAll(".faq-q").forEach(function(q) {
      q.addEventListener("click", function() {
        this.parentElement.classList.toggle("open");
      });
    });
  }

  // === 模态框 ===
  function initModal() {
    document.querySelectorAll("[data-modal]").forEach(function(trigger) {
      trigger.addEventListener("click", function(e) {
        e.preventDefault();
        var id = this.getAttribute("data-modal");
        var overlay = document.getElementById(id);
        if (overlay) overlay.classList.add("active");
      });
    });
    document.querySelectorAll(".modal-overlay").forEach(function(overlay) {
      overlay.addEventListener("click", function(e) {
        if (e.target === overlay) overlay.classList.remove("active");
      });
    });
    document.querySelectorAll(".modal-close").forEach(function(btn) {
      btn.addEventListener("click", function() {
        this.closest(".modal-overlay").classList.remove("active");
      });
    });
  }

  // === 倒计时 ===
  function initCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;
    var target = new Date(el.getAttribute("data-target")).getTime();
    function tick() {
      var now = Date.now();
      var d = target - now;
      if (d <= 0) { el.innerHTML = '<span style="font-size:1.1rem;">已截止</span>'; return; }
      var days = Math.floor(d / 86400000);
      var hrs = Math.floor((d % 86400000) / 3600000);
      var mins = Math.floor((d % 3600000) / 60000);
      el.innerHTML = '<span>距早鸟截止</span> <span style="font-size:1.4rem;">' + days + '</span>天 <span style="font-size:1.4rem;">' + hrs + '</span>时 <span style="font-size:1.4rem;">' + mins + '</span>分';
    }
    tick();
    setInterval(tick, 60000);
  }

  // === 报名费用计算器 ===
  function initCalc() {
    var select = document.getElementById("package-select");
    var display = document.getElementById("calc-price");
    if (!select || !display) return;
    var prices = { "early": "¥1,780", "full": "¥1,980", "watch": "¥1,280" };
    select.addEventListener("change", function() {
      display.textContent = prices[this.value] || "";
    });
    display.textContent = prices[select.value] || "";
  }

  // === 视频懒加载 ===
  function initLazyVideo() {
    document.querySelectorAll("video[data-src]").forEach(function(v) {
      v.setAttribute("src", v.getAttribute("data-src"));
      v.removeAttribute("data-src");
    });
  }

  // === 视差滚动效果 ===
  function initParallax() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var bg = hero.style.backgroundImage;
    window.addEventListener("scroll", function() {
      var scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        hero.style.backgroundPositionY = (scroll * 0.4) + "px";
      }
    }, { passive: true });
  }

  // === 浮动云朵 ===
  function initClouds() {
    var container = document.createElement("div");
    container.className = "clouds-container";
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;";
    document.body.prepend(container);

    var cloudCount = 4;
    for (var i = 0; i < cloudCount; i++) {
      var cloud = document.createElement("div");
      cloud.className = "cloud";
      var size = 0.6 + Math.random() * 1.2;
      var top = 5 + Math.random() * 25;
      var duration = 30 + Math.random() * 40;
      var delay = Math.random() * 30;
      cloud.style.cssText = 
        "top:" + top + "%;" +
        "animation-duration:" + duration + "s;" +
        "animation-delay:-" + delay + "s;" +
        "transform:scale(" + size + ");";
      container.appendChild(cloud);
    }
  }

  // === 草坪波动（底部装饰） ===
  function initGrassWave() {
    var sections = document.querySelectorAll(".grass-wave");
    if (!sections.length) return;
    
    function updateWave() {
      var scrollY = window.scrollY;
      sections.forEach(function(sec) {
        var rect = sec.getBoundingClientRect();
        var offset = (scrollY * 0.1 + rect.top) % 100;
        sec.style.setProperty("--wave-offset", offset + "px");
      });
    }
    window.addEventListener("scroll", updateWave, { passive: true });
  }

  // === 萤火虫效果（夜间页面用） ===
  function initFireflies() {
    var nightSection = document.querySelector(".sky-night, .night-scene");
    if (!nightSection) return;
    
    var container = document.createElement("div");
    container.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden;";
    nightSection.style.position = "relative";
    nightSection.appendChild(container);

    for (var i = 0; i < 15; i++) {
      var fly = document.createElement("div");
      fly.className = "firefly";
      fly.style.cssText =
        "left:" + (Math.random() * 90 + 5) + "%;" +
        "top:" + (Math.random() * 80 + 10) + "%;" +
        "animation-delay:-" + (Math.random() * 5) + "s;" +
        "animation-duration:" + (2 + Math.random() * 4) + "s;";
      container.appendChild(fly);
    }
  }

  // === 数字递增动画 ===
  function initCountUp() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute("data-count"));
          var duration = 1500;
          var start = performance.now();
          var initial = 0;

          function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(initial + (target - initial) * eased);
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    nums.forEach(function(n) { observer.observe(n); });
  }

  // === 灯箱效果 ===
  function initLightbox() {
    document.querySelectorAll(".gallery-item, [data-lightbox]").forEach(function(item) {
      item.addEventListener("click", function() {
        var imgSrc = item.querySelector("img") ? item.querySelector("img").src : item.getAttribute("data-lightbox");
        if (!imgSrc) return;

        var lb = document.createElement("div");
        lb.className = "lightbox";
        lb.innerHTML = '<img src="' + imgSrc + '" alt="放大查看">';
        document.body.appendChild(lb);
        document.body.style.overflow = "hidden";

        requestAnimationFrame(function() { lb.classList.add("active"); });

        lb.addEventListener("click", function() {
          lb.classList.remove("active");
          setTimeout(function() {
            lb.remove();
            document.body.style.overflow = "";
          }, 300);
        });

        document.addEventListener("keydown", function esc(e) {
          if (e.key === "Escape") {
            lb.classList.remove("active");
            setTimeout(function() {
              lb.remove();
              document.body.style.overflow = "";
            }, 300);
            document.removeEventListener("keydown", esc);
          }
        });
      });
    });
  }

  // === 平滑锚点滚动 ===
  function initSmoothScroll() {
    document.querySelectorAll('a[href*="#"]').forEach(function(a) {
      var href = a.getAttribute("href");
      if (!href || href === "#" || href.indexOf("#") !== 0) return;
      
      a.addEventListener("click", function(e) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var navH = document.querySelector(".nav") ? 70 : 0;
          var top = target.getBoundingClientRect().top + window.scrollY - navH;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      });
    });
  }

  // === 回到顶部 ===
  function initBackToTop() {
    var fab = document.querySelector(".fab");
    if (!fab) return;

    var isScrolling;
    window.addEventListener("scroll", function() {
      fab.style.opacity = window.scrollY > 500 ? "1" : "0";
      fab.style.pointerEvents = window.scrollY > 500 ? "auto" : "none";
      clearTimeout(isScrolling);
    }, { passive: true });

    fab.addEventListener("click", function(e) {
      if (window.scrollY > 100) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  // === 初始化 ===
  document.addEventListener("DOMContentLoaded", function() {
    initNav();
    initReveal();
    initFaq();
    initModal();
    initCountdown();
    initCalc();
    initLazyVideo();
    initParallax();
    initClouds();
    initGrassWave();
    initFireflies();
    initCountUp();
    initLightbox();
    initSmoothScroll();
    initBackToTop();
  });
})();
