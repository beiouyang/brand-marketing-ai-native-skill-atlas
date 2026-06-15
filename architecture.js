(function () {
  const data = window.ARCHITECTURE_DATA;
  const modal = document.getElementById("detail-modal");
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  function cardTemplate(item) {
    return `
      <button class="skill-card arch-card" type="button" data-id="${item.id}">
        <span class="status ${item.statusType || "progress"}">${item.status}</span>
        <span class="card-top"><span class="tag">${item.tag}</span></span>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </button>
    `;
  }

  function renderLayers() {
    data.layers.forEach((layer) => {
      const grid = document.getElementById(`${layer.id}-grid`);
      if (!grid) return;
      grid.innerHTML = layer.cards.map(cardTemplate).join("");
    });
  }

  function renderGovernance() {
    const grid = document.getElementById("governance-grid");
    if (!grid) return;
    grid.innerHTML = data.governance.map(cardTemplate).join("");
  }

  function renderCaseStudy() {
    const cs = data.caseStudy;
    document.getElementById("case-title").textContent = cs.title;
    document.getElementById("case-summary").textContent = cs.summary;
    document.getElementById("case-req-id").textContent = cs.reqId;
    document.getElementById("case-mode").textContent = cs.mode;
    document.getElementById("case-owner").textContent = cs.owner;
    document.getElementById("case-duration").textContent = cs.duration;

    document.getElementById("case-parse").innerHTML = cs.parse.map((row) => `
      <li><span>${row.label}</span><span>${row.value}</span></li>
    `).join("");

    document.getElementById("case-tasks").innerHTML = cs.tasks.map((task) => `
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

    document.getElementById("case-phases").innerHTML = cs.phases.map((phase) => `
      <article class="phase-card">
        <h4>${phase.phase}</h4>
        <ul>${phase.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `).join("");

    document.getElementById("case-skills").innerHTML = cs.skillMap.map((row) => `
      <li>
        <span>${row.task}</span>
        <span>${row.skills.join(" + ")}</span>
        <span class="policy-pill">${row.policy}${row.adhoc ? "" : " · no adhoc"}</span>
      </li>
    `).join("");
  }

  function renderRoadmap() {
    const grid = document.getElementById("roadmap-grid");
    const summary = document.getElementById("roadmap-summary");
    if (!grid || !data.roadmap) return;

    if (summary) {
      summary.textContent = data.roadmap.subtitle || "";
    }

    grid.innerHTML = data.roadmap.phases.map((item, index) => `
      <article class="roadmap-card" style="--delay:${index * 0.08}s">
        <div class="roadmap-card-head">
          <p class="roadmap-phase">${item.phase}</p>
          <span class="roadmap-time">${item.time}</span>
        </div>
        <h4>${item.title}</h4>
        <p class="roadmap-goal">${item.goal || ""}</p>
        <ul>${item.items.map((entry) => `<li>${entry}</li>`).join("")}</ul>
        ${item.deliverables ? `
          <div class="roadmap-tags">
            ${item.deliverables.map((tag) => `<span class="roadmap-tag">${tag}</span>`).join("")}
          </div>
        ` : ""}
        ${item.outcome ? `<p class="roadmap-outcome">🎯 ${item.outcome}</p>` : ""}
      </article>
    `).join("");
  }

  function findCard(id) {
    for (const layer of data.layers) {
      const hit = layer.cards.find((card) => card.id === id);
      if (hit) return { ...hit, layer: layer.title };
    }
    const gov = data.governance.find((card) => card.id === id);
    if (gov) return { ...gov, layer: "治理机制" };
    return null;
  }

  function openModal(item) {
    document.getElementById("modal-kicker").textContent = `${item.layer} / ${item.tag}`;
    document.getElementById("modal-title").textContent = item.name;
    document.getElementById("modal-desc").textContent = item.desc;
    document.getElementById("modal-status").textContent = item.status;
    document.getElementById("modal-status").className = `status ${item.statusType || "progress"}`;
    document.getElementById("modal-capability").textContent = item.detail || "";
    document.getElementById("modal-impact").textContent = (item.points || []).map((point) => `· ${point}`).join("\n");
    document.getElementById("modal-hints").textContent = item.points ? item.points.join("；") : "";
    document.getElementById("modal-downloads").textContent = "";
    document.getElementById("modal-link-section").hidden = true;
    document.querySelector(".modal-panel").classList.remove("has-media-image");
    document.querySelector(".modal-media").classList.remove("has-image");
    document.getElementById("modal-media-image").hidden = true;
    document.getElementById("modal-media-placeholder").hidden = false;
    document.querySelector(".download-btn").hidden = true;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function bindCards() {
    document.querySelectorAll(".arch-card").forEach((card) => {
      card.addEventListener("click", () => {
        const item = findCard(card.dataset.id);
        if (item) openModal(item);
      });
    });
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
      if (link.getAttribute("href") !== "#overview") return;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.replaceState(null, "", "#overview");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
  }

  function initFlowAnimation() {
    const nodes = [...document.querySelectorAll(".flow-node")];
    nodes.forEach((node, index) => {
      node.style.setProperty("--flow-delay", `${index * 0.12}s`);
    });
  }

  function initDonut() {
    const canvas = document.getElementById("donut-canvas");
    if (!canvas) return;
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
      const tube = 0.48;
      const radius = 1.45;
      for (let i = 0; i < count; i += 1) {
        const theta = (i / count) * Math.PI * 2 * 55;
        const phi = ((i % 233) / 233) * Math.PI * 2;
        const jitter = Math.sin(i * 12.9898) * 0.018;
        const x = (radius + (tube + jitter) * Math.cos(phi)) * Math.cos(theta);
        const y = (radius + (tube + jitter) * Math.cos(phi)) * Math.sin(theta);
        const z = (tube + jitter) * Math.sin(phi);
        particles.push({
          ox: x, oy: y, oz: z, x, y, z, vx: 0, vy: 0, vz: 0,
          size: 0.65 + (i % 7) * 0.08, hot: i % 17 === 0
        });
      }
    }

    function rotate(point, ax, ay, az) {
      let { x, y, z } = point;
      const cx = Math.cos(ax), sx = Math.sin(ax);
      const cy = Math.cos(ay), sy = Math.sin(ay);
      const cz = Math.cos(az), sz = Math.sin(az);
      let y1 = y * cx - z * sx, z1 = y * sx + z * cx; y = y1; z = z1;
      let x1 = x * cy + z * sy; z1 = -x * sy + z * cy; x = x1; z = z1;
      x1 = x * cz - y * sz; y1 = x * sz + y * cz;
      return { x: x1, y: y1, z };
    }

    function project(point) {
      const scaleBase = Math.min(width, height) * 0.15;
      const depth = 4.2;
      const perspective = depth / (depth + point.z);
      return {
        x: width * 0.52 + point.x * scaleBase * perspective,
        y: height * 0.47 + point.y * scaleBase * perspective,
        p: perspective
      };
    }

    function animate() {
      frame += 0.008;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      const ax = 0.78 + Math.sin(frame * 0.7) * 0.06;
      const ay = frame * 0.9;
      const az = frame * 0.22;
      const influence = Math.min(width, height) * 0.16;

      for (const particle of particles) {
        const base = rotate({ x: particle.x, y: particle.y, z: particle.z }, ax, ay, az);
        const screen = project(base);
        if (pointer.active) {
          const dx = screen.x - pointer.x;
          const dy = screen.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < influence) {
            const force = (1 - distance / influence) * 0.035;
            const safeDistance = Math.max(distance, 18);
            particle.vx += (dx / safeDistance) * force;
            particle.vy += (dy / safeDistance) * force;
            particle.vz += (particle.hot ? 0.018 : -0.012) * force * 60;
          }
        }
        particle.vx += (particle.ox - particle.x) * 0.012;
        particle.vy += (particle.oy - particle.y) * 0.012;
        particle.vz += (particle.oz - particle.z) * 0.012;
        particle.vx *= 0.88; particle.vy *= 0.88; particle.vz *= 0.88;
        particle.x += particle.vx; particle.y += particle.vy; particle.z += particle.vz;
        const alpha = Math.max(0.12, Math.min(0.86, (base.z + 1.2) / 2.6));
        ctx.beginPath();
        ctx.fillStyle = particle.hot
          ? `rgba(85, 230, 209, ${alpha * 0.72})`
          : `rgba(218, 32, 90, ${alpha * 0.52})`;
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
      const fade = Math.max(0.22, 1 - window.scrollY / 520);
      canvas.style.opacity = fade.toFixed(2);
    }, { passive: true });
    resize();
    animate();
  }

  renderLayers();
  renderGovernance();
  renderCaseStudy();
  renderRoadmap();
  bindCards();
  bindNavigationState();
  typeTitle();
  initFlowAnimation();
  initDonut();

  modal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
