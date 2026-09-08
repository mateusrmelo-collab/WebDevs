(() => {
  "use strict";

  const CONFIG = Object.freeze({
    launchAt: "2026-09-15T00:00:00-03:00",
    portfolio: "https://mateusrmelo-collab.github.io/DevMateus/",
    eventTitle: "Lançamento DevMateus — Curso de desenvolvimento web",
    eventDescription:
      "Lançamento do curso de desenvolvimento web com Mateus Rodrigues. HTML, CSS, JavaScript, PHP, React e SQL. Este evento é um lembrete da data de lançamento, não uma aula agendada. Acompanhe as novidades no portfólio: https://mateusrmelo-collab.github.io/DevMateus/",
  });

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));
  const launchTime = new Date(CONFIG.launchAt).getTime();
  let hasLaunched = false;
  let toastTimer;

  function showToast(message) {
    clearTimeout(toastTimer);
    $("#toast-message").textContent = message;
    $("#toast").classList.add("visible");
    toastTimer = setTimeout(
      () => $("#toast").classList.remove("visible"),
      4200,
    );
  }

  function remainingTime(now = Date.now()) {
    const total = Math.max(0, Math.ceil((launchTime - now) / 1000));
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
      launched: now >= launchTime,
    };
  }

  function updateCountdown() {
    const remaining = remainingTime();
    for (const unit of ["days", "hours", "minutes", "seconds"]) {
      const value = String(remaining[unit]).padStart(2, "0");
      if ($("#" + unit).textContent !== value)
        $("#" + unit).textContent = value;
    }
    $(".countdown").setAttribute(
      "aria-label",
      remaining.launched
        ? "A data prevista de lançamento chegou."
        : `Faltam ${remaining.days} dias, ${remaining.hours} horas, ${remaining.minutes} minutos e ${remaining.seconds} segundos para o lançamento.`,
    );

    if (remaining.launched && !hasLaunched) {
      hasLaunched = true;
      $("#countdown-eyebrow").textContent = "A DATA DO LANÇAMENTO CHEGOU";
      $("#countdown-title").textContent = "Confira o próximo capítulo.";
      $("#launch-badge-text").textContent = "LANÇAMENTO · 15 DE SETEMBRO";
      $("#launch-status").textContent =
        "A data prevista de lançamento chegou. Acompanhe as novidades no portfólio de Mateus Rodrigues.";
      $("#calendar-title").textContent = "A data chegou. E agora?";
      $("#calendar-description").textContent =
        "A data prevista de lançamento já chegou. Acesse o portfólio de Mateus Rodrigues para acompanhar as novidades e informações sobre o curso.";
      $("#calendar-options").hidden = true;
      $("#launched-link").hidden = false;
      $$(".button[data-open-calendar]").forEach((button) => {
        button.firstChild.textContent = "Acompanhar o curso ";
      });
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateCountdown();
  });

  const menuToggle = $("#menu-toggle");
  const mobileNav = $("#mobile-nav");
  function closeMenu(restoreFocus = false) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    mobileNav.hidden = true;
    if (restoreFocus) menuToggle.focus();
  }
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Abrir menu" : "Fechar menu",
    );
    mobileNav.hidden = isOpen;
  });
  $$("a", mobileNav).forEach((link) =>
    link.addEventListener("click", () => closeMenu()),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!mobileNav.hidden && !event.target.closest(".site-header")) closeMenu();
  });
  window
    .matchMedia("(min-width: 761px)")
    .addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });

  if ("IntersectionObserver" in window) {
    const navigationLinks = $$(".desktop-nav a");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navigationLinks.forEach((link) => {
            const active = link.hash === "#" + entry.target.id;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    $$("main > section[id]").forEach((section) =>
      sectionObserver.observe(section),
    );
  }

  const examples = {
    html: {
      label: "HTML",
      code: `<!DOCTYPE html>\n<html lang="pt-BR">\n  <body>\n    <main class="meu-futuro">\n      <span>Meu primeiro projeto</span>\n      <h1 id="hello">Olá, mundo.</h1>\n      <p>Toda grande ideia começa aqui.</p>\n      <button id="start">\n        Dar o primeiro passo ↗\n      </button>\n    </main>\n  </body>\n</html>`,
    },
    css: {
      label: "CSS",
      code: `.meu-futuro {\n  background: #e9eddf;\n  color: #1e2816;\n  border-radius: 12px;\n  padding: 24px;\n}\n\nh1 { font-size: 36px; }\n\nbutton {\n  border: 0;\n  cursor: pointer;\n}`,
    },
    js: {
      label: "JavaScript",
      code: `const botao =\n  document.querySelector('#start');\nconst titulo =\n  document.querySelector('#hello');\n\nbotao.addEventListener('click', () => {\n  const iniciou =\n    botao.classList.toggle('ativo');\n\n  titulo.textContent = iniciou\n    ? 'Olá, dev.'\n    : 'Olá, mundo.';\n});`,
    },
  };
  function highlightLine(line, language) {
    const patterns = {
      html: /<!DOCTYPE[^>]*>|<\/?[\w-]+|\/?>|[\w-]+(?==)|"[^"]*"/g,
      css: /#[\da-fA-F]{3,8}\b|\.[\w-]+|[\w-]+(?=:)|\b\d+(?:px)?\b|\b(?:h1|button)\b/g,
      js: /'[^']*'|"[^"]*"|\b(?:const|let|function|return|export|default|import|from)\b|\b\d+\b/g,
    };
    const fragment = document.createDocumentFragment();
    let cursor = 0;

    for (const match of line.matchAll(patterns[language])) {
      fragment.append(document.createTextNode(line.slice(cursor, match.index)));
      const token = match[0];
      const span = document.createElement("span");
      let style = "syntax-keyword";

      if (/^["']/.test(token)) {
        style = "syntax-string";
      } else if (language === "html") {
        style = /^[<>\/]/.test(token) ? "syntax-tag" : "syntax-attribute";
      } else if (language === "css") {
        style = /^[#.]/.test(token)
          ? "syntax-selector"
          : /^\d/.test(token)
            ? "syntax-number"
            : "syntax-attribute";
      } else if (/^\d/.test(token)) {
        style = "syntax-number";
      }

      span.className = style;
      span.textContent = token;
      fragment.append(span);
      cursor = match.index + token.length;
    }

    fragment.append(document.createTextNode(line.slice(cursor) || ""));
    return fragment;
  }

  let activeCode = "html";
  const codeTabs = $$("[data-code]");
  function selectCode(language, focus = false) {
    if (!examples[language]) return;
    activeCode = language;
    codeTabs.forEach((tab) => {
      const isActive = tab.dataset.code === language;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      if (focus && isActive) tab.focus();
    });
    $("#code-panel").setAttribute("aria-labelledby", "tab-" + language);
    $("#editor-language").textContent = examples[language].label;
    const fragment = document.createDocumentFragment();

    examples[language].code.split("\n").forEach((line, index) => {
      const row = document.createElement("span");
      const lineNumber = document.createElement("span");
      const lineCode = document.createElement("span");

      row.className = "code-line";
      lineNumber.className = "line-number";
      lineNumber.setAttribute("aria-hidden", "true");
      lineNumber.textContent = String(index + 1);
      lineCode.className = "line-code";
      lineCode.append(highlightLine(line, language));
      row.append(lineNumber, lineCode);
      fragment.append(row);
    });

    $("#code-content").replaceChildren(fragment);
    const codeViewport = $("#code-panel pre");
    codeViewport.scrollTop = 0;
    codeViewport.scrollLeft = 0;
  }
  codeTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectCode(tab.dataset.code));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % codeTabs.length;
      if (event.key === "ArrowLeft")
        next = (index + codeTabs.length - 1) % codeTabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = codeTabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectCode(codeTabs[next].dataset.code, true);
      }
    });
  });
  selectCode("html");

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
    textarea.setAttribute("readonly", "");
    document.body.appendChild(textarea);
    textarea.select();
    let success = false;
    try {
      success = document.execCommand("copy");
    } catch (_) {}
    textarea.remove();
    $("#copy-code").focus({ preventScroll: true });
    return success;
  }
  $("#copy-code").addEventListener("click", async () => {
    const text = examples[activeCode].code;
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch (_) {}
    if (!success) success = fallbackCopy(text);
    showToast(
      success
        ? "Código copiado. Agora é com você!"
        : "Não foi possível copiar. Selecione o código para copiá-lo.",
    );
  });

  const previewButton = $("#start");
  previewButton.setAttribute("aria-pressed", "false");
  previewButton.addEventListener("click", () => {
    const started = previewButton.classList.toggle("ativo");
    previewButton.setAttribute("aria-pressed", String(started));
    const dot = document.createElement("span");
    dot.textContent = ".";
    $("#hello").replaceChildren(
      document.createTextNode(started ? "Olá, dev" : "Olá, mundo"),
      dot,
    );
    $("#preview-eyebrow").textContent = started
      ? "PRIMEIRO PASSO DADO"
      : "MEU PRIMEIRO PROJETO";
    $("#preview-description").textContent = started
      ? "Viu? Seu código já faz acontecer."
      : "Toda grande ideia começa aqui.";
    $("#preview-button-label").textContent = started
      ? "Testar de novo"
      : "Dar o primeiro passo";
    $("#project-preview").classList.toggle("project-started", started);
    if (started)
      showToast("Uma interação, um novo começo. Esse é o poder do JavaScript.");
  });

  for (const group of ["curriculum", "faq"]) {
    const details = $$(`details[name="${group}"]`);
    details.forEach((detail) =>
      detail.addEventListener("toggle", () => {
        if (detail.open)
          details.forEach((other) => {
            if (other !== detail) other.open = false;
          });
      }),
    );
  }

  const calendarDialog = $("#calendar-dialog");
  let calendarTrigger = null;
  $$("[data-open-calendar]").forEach((button) =>
    button.addEventListener("click", () => {
      closeMenu();
      calendarTrigger = button;
      updateCountdown();
      $("#dialog-status").textContent = "";
      calendarDialog.showModal();
      document.body.classList.add("modal-open");
    }),
  );
  function closeCalendar() {
    calendarDialog.close();
  }
  $("#close-calendar").addEventListener("click", closeCalendar);
  calendarDialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (calendarTrigger && calendarTrigger.getClientRects().length)
      calendarTrigger.focus({ preventScroll: true });
    else menuToggle.focus({ preventScroll: true });
  });
  calendarDialog.addEventListener("click", (event) => {
    if (event.target !== calendarDialog) return;
    const rect = calendarDialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      closeCalendar();
  });

  function calendarTimestamp(timestamp) {
    return new Date(timestamp)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");
  }
  const eventStart = calendarTimestamp(launchTime);
  const eventEnd = calendarTimestamp(launchTime + 30 * 60 * 1000);
  const googleParams = new URLSearchParams({
    action: "TEMPLATE",
    text: CONFIG.eventTitle,
    dates: eventStart + "/" + eventEnd,
    details: CONFIG.eventDescription,
    location: CONFIG.portfolio,
    ctz: "America/Sao_Paulo",
  });
  $("#google-calendar").href =
    "https://calendar.google.com/calendar/render?" + googleParams.toString();

  function icsEscape(text) {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function foldIcsLine(line) {
    const encoder = new TextEncoder();
    let result = "";
    let count = 0;
    for (const character of line) {
      const bytes = encoder.encode(character).length;
      if (count + bytes > 74) {
        result += "\r\n ";
        count = 1;
      }
      result += character;
      count += bytes;
    }
    return result;
  }
  function makeCalendarFile() {
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//DevMateus//Lançamento Web//PT-BR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:devmateus-lancamento-20260915@mateusrmelo-collab.github.io",
      "DTSTAMP:" + calendarTimestamp(Date.now()),
      "DTSTART:" + eventStart,
      "DTEND:" + eventEnd,
      "SUMMARY:" + icsEscape(CONFIG.eventTitle),
      "DESCRIPTION:" + icsEscape(CONFIG.eventDescription),
      "URL:" + CONFIG.portfolio,
      "TRANSP:TRANSPARENT",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "TRIGGER:-P1D",
      "DESCRIPTION:" +
        icsEscape(
          "Amanhã: lançamento do curso DevMateus com Mateus Rodrigues.",
        ),
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    return lines.map(foldIcsLine).join("\r\n") + "\r\n";
  }
  $("#download-calendar").addEventListener("click", () => {
    const blob = new Blob([makeCalendarFile()], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "devmateus-15-setembro-2026.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    $("#dialog-status").textContent =
      "Lembrete preparado! Abra o arquivo .ics no seu calendário para concluir. Se o download não iniciar na prévia, use o site em uma nova aba.";
  });
})();
