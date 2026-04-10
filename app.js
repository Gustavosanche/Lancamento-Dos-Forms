(function () {
  const FLAME_BACK_COUNT = 22;
  const FLAME_FRONT_COUNT = 20;
  const EMBER_COUNT = 28;

  function seedFlames(container, count, className, variantRoll) {
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = `flame ${className}`;
      const jitter = (Math.random() - 0.5) * 4;
      el.style.left = `${(i / count) * 100 + jitter}%`;
      el.style.setProperty("--dur", `${0.65 + Math.random() * 1.1}s`);
      el.style.animationDelay = `${-Math.random() * 3}s`;
      if (variantRoll && className === "flame--front") {
        const r = Math.random();
        if (r > 0.66) el.classList.add("flame--wide");
        else if (r < 0.33) el.classList.add("flame--thin");
      }
      container.appendChild(el);
    }
  }

  function seedEmbers(container) {
    if (!container) return;
    for (let i = 0; i < EMBER_COUNT; i++) {
      const em = document.createElement("span");
      em.className = "ember";
      em.style.left = `${8 + Math.random() * 84}%`;
      em.style.setProperty("--rise", `${2.8 + Math.random() * 3.2}s`);
      em.style.setProperty("--delay", `${-Math.random() * 6}s`);
      em.style.setProperty("--dx", `${(Math.random() - 0.5) * 80}px`);
      container.appendChild(em);
    }
  }

  function nextApril15() {
    const now = new Date();
    const y = now.getFullYear();
    const target = new Date(y, 3, 15, 0, 0, 0, 0);
    if (now >= target) {
      target.setFullYear(y + 1);
    }
    return target;
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function initCountdown() {
    const elD = document.getElementById("d");
    const elH = document.getElementById("h");
    const elM = document.getElementById("m");
    const elS = document.getElementById("s");
    const grid = document.getElementById("countdown");
    const shell = document.querySelector(".countdown-shell");
    const done = document.getElementById("done");

    function tick() {
      const target = nextApril15();
      const now = new Date();
      const ms = target - now;
      if (ms <= 0) {
        if (shell) shell.hidden = true;
        else grid.hidden = true;
        done.hidden = false;
        return;
      }
      const sec = Math.floor(ms / 1000);
      const d = Math.floor(sec / 86400);
      const h = Math.floor((sec % 86400) / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      elD.textContent = d;
      elH.textContent = pad(h);
      elM.textContent = pad(m);
      elS.textContent = pad(s);
    }

    tick();
    setInterval(tick, 1000);
  }

  seedFlames(document.getElementById("flames-back"), FLAME_BACK_COUNT, "flame--back", false);
  seedFlames(document.getElementById("flames"), FLAME_FRONT_COUNT, "flame--front", true);
  seedEmbers(document.getElementById("embers"));
  initCountdown();
})();
