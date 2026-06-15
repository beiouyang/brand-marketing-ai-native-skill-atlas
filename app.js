(function () {
  const data = window.BRAIN_DATA;
  const allItems = [...data.application, ...data.execution, ...data.rules].flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.title, groupId: group.id }))
  );

  const applicationGrid = document.getElementById("application-grid");
  const executionGrid = document.getElementById("execution-grid");
  const wikiGrid = document.getElementById("wiki-grid");
  const searchInput = document.getElementById("global-search");
  const modal = document.getElementById("detail-modal");
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const orchestrationLayer = document.getElementById("orchestration-layer");

  function renderGroups(container, groups) {
    container.innerHTML = groups.map((group) => `
      <section class="lane" data-group="${group.id}">
        <div class="lane-header">
          <h3>${group.title}</h3>
          <p>${group.summary}</p>
        </div>
        <div class="cards">
          ${group.items.map(cardTemplate).join("")}
        </div>
      </section>
    `).join("");
  }

  function cardTemplate(item) {
    return `
      <button class="skill-card" type="button" data-id="${item.id}">
        <span class="status ${item.statusType}">${item.status}</span>
        <span class="card-top">
          <span class="tag">${item.tag}</span>
        </span>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <span class="impact">${formatImpact(item.impact)}</span>
      </button>
    `;
  }

  function formatImpact(impact) {
    return `💡 ${String(impact || "").replace(/^💡\s*/, "")}`;
  }

  function renderWiki() {
    wikiGrid.innerHTML = data.wiki.map((item) => `
      <article class="wiki-card">
        <span class="tag">${item.tag || "规则"}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <ul>
          ${item.entries.map((entry) => `<li><span>${entry[0]}</span><span>${entry[1]}</span></li>`).join("")}
        </ul>
      </article>
    `).join("");
  }

  function renderOrchestrationCase() {
    const caseStudy = window.ARCHITECTURE_DATA && window.ARCHITECTURE_DATA.caseStudy;
    if (!orchestrationLayer || !caseStudy) return;

    document.getElementById("home-case-title").textContent = caseStudy.title;
    document.getElementById("home-case-summary").textContent = caseStudy.summary;
    document.getElementById("home-case-req-id").textContent = caseStudy.reqId;
    document.getElementById("home-case-mode").textContent = caseStudy.mode;
    document.getElementById("home-case-owner").textContent = caseStudy.owner;
    document.getElementById("home-case-duration").textContent = caseStudy.duration;

    document.getElementById("home-case-parse").innerHTML = caseStudy.parse.map((row) => `
      <li><span>${row.label}</span><span>${row.value}</span></li>
    `).join("");

    document.getElementById("home-case-phases").innerHTML = caseStudy.phases.map((phase) => `
      <article class="phase-card">
        <h4>${phase.phase}</h4>
        <ul>${phase.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `).join("");

    document.getElementById("home-case-tasks").innerHTML = caseStudy.tasks.map((task) => `
      <tr>
        <td>${task.id}</td>
        <td>${task.name}</td>
        <td>${task.exec}</td>
        <td><span class="level-pill">${task.level}</span></td>
        <td>${task.gate}</td>
        <td>${task.deps}</td>
        <td>${task.days}</td>
      </tr>
    `).join("");

    document.getElementById("home-case-skills").innerHTML = caseStudy.skillMap.map((row) => `
      <li>
        <span>${row.task}</span>
        <span>${row.skills.join(" + ")}</span>
        <span class="policy-pill">${row.policy}${row.adhoc ? "" : " · no adhoc"}</span>
      </li>
    `).join("");
  }

  function revealOrchestrationCase() {
    if (!orchestrationLayer) return;
    orchestrationLayer.classList.add("is-open");
    orchestrationLayer.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bindCards() {
    document.querySelectorAll(".skill-card").forEach((card) => {
      card.addEventListener("click", () => {
        const item = allItems.find((entry) => entry.id === card.dataset.id);
        if (item) openModal(item);
      });
    });
  }

  function openModal(item) {
    document.getElementById("modal-kicker").textContent = `${item.group} / ${item.tag}`;
    document.getElementById("modal-title").textContent = item.name;
    document.getElementById("modal-desc").textContent = item.desc;
    document.getElementById("modal-status").textContent = item.status;
    document.getElementById("modal-status").className = `status ${item.statusType}`;
    document.getElementById("modal-downloads").textContent = `Downloads ${item.downloads.toLocaleString("zh-CN")}`;
    document.getElementById("modal-capability").textContent = item.capability;
    document.getElementById("modal-impact").textContent = formatImpact(item.impact);
    document.getElementById("modal-hints").textContent = item.hints || "这里可以放团队常用提问 输入模板或调用建议";
    renderModalLink(item.externalLink);
    renderModalMedia(item.mediaImage);
    renderDownloadLink(item.downloadLink, item.downloadLabel, item.downloadEnabled);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function renderDownloadLink(downloadLink, label = "Download Skill", enabledWithoutLink = false) {
    const button = document.querySelector(".download-btn");
    button.onclick = null;
    delete button.dataset.href;
    button.textContent = label || "Download Skill";

    if (!downloadLink && !enabledWithoutLink) {
      button.disabled = true;
      button.setAttribute("aria-disabled", "true");
      return;
    }

    button.disabled = false;
    button.removeAttribute("aria-disabled");
    if (!downloadLink) return;

    button.dataset.href = downloadLink;
    button.onclick = () => {
      window.open(downloadLink, "_blank", "noopener");
    };
  }

  function renderModalMedia(mediaImage) {
    const media = document.querySelector(".modal-media");
    const panel = media.closest(".modal-panel");
    const image = document.getElementById("modal-media-image");
    const placeholder = document.getElementById("modal-media-placeholder");

    if (!mediaImage || !mediaImage.src) {
      panel.classList.remove("has-media-image");
      media.classList.remove("has-image");
      image.hidden = true;
      image.removeAttribute("src");
      image.alt = "";
      placeholder.hidden = false;
      return;
    }

    panel.classList.add("has-media-image");
    media.classList.add("has-image");
    image.src = mediaImage.src;
    image.alt = mediaImage.alt || "";
    image.hidden = false;
    placeholder.hidden = true;
  }

  function renderModalLink(externalLink) {
    const section = document.getElementById("modal-link-section");
    const link = document.getElementById("modal-link");
    const label = document.getElementById("modal-link-label");

    if (!externalLink || !externalLink.url) {
      section.hidden = true;
      link.removeAttribute("href");
      label.textContent = "";
      return;
    }

    section.hidden = false;
    link.href = externalLink.url;
    label.textContent = externalLink.label || externalLink.url;
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function normalize(text) {
    return String(text || "").toLowerCase().replace(/\s+/g, "");
  }

  function applySearch(rawQuery) {
    const query = normalize(rawQuery);
    let visible = 0;

    document.querySelectorAll(".skill-card").forEach((card) => {
      const item = allItems.find((entry) => entry.id === card.dataset.id);
      const haystack = normalize([item.name, item.tag, item.desc, item.status, item.impact, item.group].join(" "));
      const matched = !query || haystack.includes(query);
      card.hidden = !matched;
      if (matched) visible += 1;
    });

    document.querySelectorAll(".lane").forEach((lane) => {
      const shown = [...lane.querySelectorAll(".skill-card")].some((card) => !card.hidden);
      lane.hidden = !shown;
    });

    return visible;
  }

  function typeTitle() {
    const target = document.getElementById("type-title");
    const text = target.dataset.text;
    let index = 0;
    const timer = window.setInterval(() => {
      target.textContent = text.slice(0, index);
      index += 1;
      if (index > text.length) window.clearInterval(timer);
    }, 48);
  }

  function initUI() {
    renderGroups(applicationGrid, data.application);
    renderGroups(executionGrid, data.execution);
    renderWiki();
    renderOrchestrationCase();
    bindCards();
    bindNavigationState();
    typeTitle();

    document.querySelector(".search").addEventListener("submit", (event) => {
      event.preventDefault();
      applySearch(searchInput.value);
      document.getElementById("application-layer").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    searchInput.addEventListener("input", () => applySearch(searchInput.value));

    document.querySelectorAll(".hints button, .hints a").forEach((button) => {
      button.addEventListener("click", () => {
        searchInput.value = button.dataset.query;
        if (button.dataset.case === "app16-promo") {
          applySearch("");
          revealOrchestrationCase();
          return;
        }
        applySearch(searchInput.value);
        document.getElementById("application-layer").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    modal.addEventListener("click", (event) => {
      if (event.target.hasAttribute("data-close")) closeModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  function bindNavigationState() {
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    function updateActiveLink() {
      const current = sections.reduce((active, section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 140 ? section : active;
      }, sections[0]);

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
      });
    }

    navLinks.forEach((link) => {
      if (link.getAttribute("href") !== "#user-layer") return;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.replaceState(null, "", "#user-layer");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
  }

  function initDonut() {
    const canvas = document.getElementById("donut-canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    const pointer = { x: -9999, y: -9999, active: false };
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;

    function particleCount() {
      if (window.innerWidth < 720) return 1300;
      if (window.innerWidth < 1180) return 1900;
      return 3200;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    }

    function createParticles() {
      const count = particleCount();
      particles = [];
      const tube = .48;
      const radius = 1.45;
      for (let i = 0; i < count; i += 1) {
        const theta = (i / count) * Math.PI * 2 * 55;
        const phi = (i % 233) / 233 * Math.PI * 2;
        const jitter = Math.sin(i * 12.9898) * .018;
        const x = (radius + (tube + jitter) * Math.cos(phi)) * Math.cos(theta);
        const y = (radius + (tube + jitter) * Math.cos(phi)) * Math.sin(theta);
        const z = (tube + jitter) * Math.sin(phi);
        particles.push({
          ox: x,
          oy: y,
          oz: z,
          x,
          y,
          z,
          vx: 0,
          vy: 0,
          vz: 0,
          size: .65 + (i % 7) * .08,
          hot: i % 17 === 0
        });
      }
    }

    function rotate(point, ax, ay, az) {
      let { x, y, z } = point;
      const cx = Math.cos(ax);
      const sx = Math.sin(ax);
      const cy = Math.cos(ay);
      const sy = Math.sin(ay);
      const cz = Math.cos(az);
      const sz = Math.sin(az);

      let y1 = y * cx - z * sx;
      let z1 = y * sx + z * cx;
      y = y1;
      z = z1;

      let x1 = x * cy + z * sy;
      z1 = -x * sy + z * cy;
      x = x1;
      z = z1;

      x1 = x * cz - y * sz;
      y1 = x * sz + y * cz;
      return { x: x1, y: y1, z };
    }

    function project(point) {
      const scaleBase = Math.min(width, height) * .15;
      const depth = 4.2;
      const perspective = depth / (depth + point.z);
      return {
        x: width * .52 + point.x * scaleBase * perspective,
        y: height * .47 + point.y * scaleBase * perspective,
        p: perspective
      };
    }

    function animate() {
      frame += .008;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const ax = .78 + Math.sin(frame * .7) * .06;
      const ay = frame * .9;
      const az = frame * .22;
      const influence = Math.min(width, height) * .16;

      for (const particle of particles) {
        const base = rotate({ x: particle.x, y: particle.y, z: particle.z }, ax, ay, az);
        const screen = project(base);

        if (pointer.active) {
          const dx = screen.x - pointer.x;
          const dy = screen.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < influence) {
            const force = (1 - distance / influence) * .035;
            const safeDistance = Math.max(distance, 18);
            particle.vx += (dx / safeDistance) * force;
            particle.vy += (dy / safeDistance) * force;
            particle.vz += (particle.hot ? .018 : -.012) * force * 60;
          }
        }

        particle.vx += (particle.ox - particle.x) * .012;
        particle.vy += (particle.oy - particle.y) * .012;
        particle.vz += (particle.oz - particle.z) * .012;
        particle.vx *= .88;
        particle.vy *= .88;
        particle.vz *= .88;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        const alpha = Math.max(.12, Math.min(.86, (base.z + 1.2) / 2.6));
        ctx.beginPath();
        ctx.fillStyle = particle.hot
          ? `rgba(85, 230, 209, ${alpha * .72})`
          : `rgba(218, 32, 90, ${alpha * .52})`;
        ctx.arc(screen.x, screen.y, particle.size * screen.p, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(animate);
    }

    function setPointer(event) {
      const touch = event.touches && event.touches[0];
      pointer.x = touch ? touch.clientX : event.clientX;
      pointer.y = touch ? touch.clientY : event.clientY;
      pointer.active = true;
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", setPointer);
    window.addEventListener("pointerleave", () => { pointer.active = false; });
    window.addEventListener("touchmove", setPointer, { passive: true });
    window.addEventListener("touchend", () => { pointer.active = false; });
    window.addEventListener("scroll", () => {
      const fade = Math.max(.22, 1 - window.scrollY / 520);
      canvas.style.opacity = fade.toFixed(2);
    }, { passive: true });

    resize();
    animate();
  }

  initUI();
  initDonut();
})();
