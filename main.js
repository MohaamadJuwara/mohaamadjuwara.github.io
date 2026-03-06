document.addEventListener("DOMContentLoaded", () => {
  const greetingEl = document.getElementById("timeGreeting");
  const roleEl = document.getElementById("roleRotator");
  const yearEls = document.querySelectorAll("[data-auto-year]");
  const statEls = document.querySelectorAll(".stat-number[data-target]");

  if (greetingEl) {
    const hour = new Date().getHours();
    if (hour < 12) greetingEl.textContent = "Good morning, I'm";
    else if (hour < 18) greetingEl.textContent = "Good afternoon, I'm";
    else greetingEl.textContent = "Good evening, I'm";
  }

  if (roleEl && roleEl.dataset.roles) {
    const roles = roleEl.dataset.roles.split("|").map((r) => r.trim()).filter(Boolean);
    let roleIndex = 0;
    if (roles.length > 1) {
      setInterval(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleEl.textContent = roles[roleIndex];
      }, 2400);
    }
  }

  if (yearEls.length > 0) {
    const currentYear = String(new Date().getFullYear());
    yearEls.forEach((el) => {
      el.textContent = currentYear;
    });
  }

  if (statEls.length > 0) {
    const animateStat = (el) => {
      if (el.dataset.animated === "true") return;
      const target = Number(el.dataset.target || "0");
      const start = performance.now();
      const duration = 1200;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = `${value}+`;
        if (progress < 1) requestAnimationFrame(tick);
        else {
          el.textContent = `${target}+`;
          el.dataset.animated = "true";
        }
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateStat(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    statEls.forEach((el) => observer.observe(el));
  }
});