/* The published page's work dialog is rendered by Radix in a body portal.
   Make the underlying page inert and restore focus to its opening control. */
(() => {
  let trigger = null;
  let triggerIndex = 0;
  let openingRoute = "";
  let dialogWasOpen = false;
  let rootWasInert = false;
  let focusedWorkButton = null;
  let repairScheduled = false;

  function rememberTrigger(event) {
    const button = event.target instanceof Element && event.target.closest(".hero__work-button");
    if (!button) return;
    trigger = button;
    triggerIndex = Array.from(document.querySelectorAll(".hero__work-button")).indexOf(button);
    openingRoute = window.location.href;
  }

  document.addEventListener("pointerdown", (event) => {
    rememberTrigger(event);
    if (event.target instanceof Element && !event.target.closest(".hero__work-button, .hero-work-modal")) focusedWorkButton = null;
  }, true);
  document.addEventListener("focusin", (event) => {
    rememberTrigger(event);
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest(".hero__work-button");
    if (button) focusedWorkButton = button;
    else if (!event.target.closest(".hero-work-modal")) focusedWorkButton = null;
  }, true);
  document.addEventListener("click", rememberTrigger, true);

  function restoreFocus() {
    const root = document.getElementById("root");
    if (window.location.href !== openingRoute || root?.inert || document.querySelector(".hero-work-modal")) return;
    const active = document.activeElement;
    if (active && active !== document.body && !active.closest(".hero-work-modal, .hero__work-button")) return;
    const button = trigger?.isConnected ? trigger : document.querySelectorAll(".hero__work-button")[triggerIndex];
    button?.focus({ preventScroll: true });
  }

  function syncDialog() {
    const dialog = document.querySelector('.hero-work-modal[data-state="open"]');
    const closingDialog = document.querySelector('.hero-work-modal[data-state="closed"]');
    const root = document.getElementById("root");
    if (dialog && !dialogWasOpen) {
      dialogWasOpen = true;
      if (root) {
        rootWasInert = root.inert;
        root.inert = true;
      }
      dialog.querySelector('[data-slot="dialog-close"]')?.setAttribute("aria-label", "시공 상세 닫기");
    } else if (!dialog && !closingDialog && dialogWasOpen) {
      dialogWasOpen = false;
      if (root) root.inert = rootWasInert;
      requestAnimationFrame(() => {
        restoreFocus();
        // Radix releases its focus scope after its exit animation.
        setTimeout(restoreFocus, 80);
        setTimeout(restoreFocus, 200);
      });
    }

    // The published carousel remounts the focused work button on each slide.
    if (!dialog && !closingDialog && !dialogWasOpen && !root?.inert && focusedWorkButton && !focusedWorkButton.isConnected && document.activeElement === document.body && !repairScheduled) {
      repairScheduled = true;
      requestAnimationFrame(() => { repairScheduled = false; restoreFocus(); });
    }
  }

  new MutationObserver(syncDialog).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-state"] });
  syncDialog();
})();

/* Example contact details in the published demo are not real recipients.
   Keep inquiry drafts usable without calling or emailing those placeholders. */
(() => {
  const examplePhone = "010-0000-0000";
  const exampleEmail = "contact@oo-construction.co.kr";
  const exampleAddress = "서울특별시 ○○구 현장로 24, 202호";

  function replaceText(node, from, to) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const text = walker.currentNode;
      if (text.nodeValue?.includes(from)) text.nodeValue = text.nodeValue.replaceAll(from, to);
    }
  }

  function markUnavailable(node, type) {
    node.dataset.placeholderContact = type;
    node.setAttribute("aria-disabled", "true");
    node.setAttribute("aria-label", type === "phone" ? "대표 전화번호 등록 준비 중" : "대표 이메일 등록 준비 중");
    if (node instanceof HTMLAnchorElement) node.removeAttribute("href");
    if (node instanceof HTMLButtonElement) node.disabled = true;
    replaceText(node, examplePhone, "대표번호 등록 준비 중");
    replaceText(node, exampleEmail, "대표 이메일 등록 준비 중");
    replaceText(node, "전화 문의하기", "대표번호 등록 준비 중");
    const action = node.querySelector("em");
    if (action && action.textContent !== "준비 중") action.textContent = "준비 중";
  }

  function hasExampleEmail() {
    return !!document.querySelector('[data-placeholder-contact="email"]');
  }

  function syncContacts() {
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach((link) => {
      const href = link.getAttribute("href")?.toLowerCase();
      if (href === `tel:${examplePhone}`) markUnavailable(link, "phone");
      else if (href === `mailto:${exampleEmail}`) markUnavailable(link, "email");
    });
    document.querySelectorAll(".floating-contact__detail").forEach((button) => {
      if (button.textContent?.includes(exampleEmail)) markUnavailable(button, "email");
    });
    document.querySelectorAll(".location-details").forEach((details) => {
      replaceText(details, examplePhone, "번호 등록 준비 중");
      replaceText(details, exampleAddress, "등록 준비 중");
    });
    document.querySelectorAll(".location-preview__copy, .footer-info").forEach((details) => {
      replaceText(details, exampleAddress, "주소 등록 준비 중");
    });

    const intro = document.querySelector(".mini-panel--form-full .form-intro");
    const message = "대표 이메일이 등록되지 않아 받는 사람을 직접 입력해야 합니다. 이메일 작성 창에서 확인한 뒤 직접 발송해 주세요. 입력 내용은 이 사이트에 저장되지 않습니다.";
    if (intro && hasExampleEmail() && intro.textContent !== message) intro.textContent = message;
  }

  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("[data-placeholder-contact]")) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches(".mini-panel--form-full .consultation-form") || !hasExampleEmail()) return;

    const fields = new FormData(form);
    const value = (name) => String(fields.get(name) ?? "").trim();
    const names = ["name", "phone", "location", "title", "workType", "schedule", "message"];
    const valid = names.every((name) => value(name))
      && /^01[0-9]-?\d{3,4}-?\d{4}$/.test(value("phone"))
      && value("title").length >= 2
      && fields.has("agreement");

    // Let the original app present its normal field-level validation errors.
    if (!valid) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    const subject = `[상담 문의] ${value("title")}`;
    const body = [
      "[선진건설 온라인상담]",
      `성함: ${value("name")}`,
      `연락처: ${value("phone")}`,
      `현장 위치: ${value("location")}`,
      `공정 유형: ${value("workType")}`,
      `희망 시기: ${value("schedule")}`,
      "",
      "문의 내용",
      value("message"),
      "",
      "사진·도면 등 참고파일은 이메일에 직접 첨부해 주세요.",
    ].join("\n");

    let status = form.querySelector(".contact-draft-status");
    if (!status) {
      status = document.createElement("p");
      status.className = "contact-draft-status";
      status.setAttribute("role", "status");
      form.append(status);
    }
    status.textContent = "이메일 작성 창에서 받는 사람을 직접 입력하고 내용을 확인한 뒤 보내 주세요. 자동 발송되지 않습니다.";
    const draft = document.createElement("a");
    draft.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    draft.click();
  }, true);

  new MutationObserver(syncContacts).observe(document.body, { childList: true, subtree: true });
  syncContacts();
})();

/* Keep the quick-inquiry fields in memory only while the existing app moves
   to its detailed inquiry form. The app itself still performs validation. */
(() => {
  let pendingInquiry = null;

  function onDetailedInquiry() {
    return location.hash.replace(/^#/, "").split("?")[0] === "/consultation";
  }

  function fillDetailedInquiry() {
    if (!pendingInquiry || !onDetailedInquiry()) return;
    const form = document.querySelector(".mini-panel--form-full .consultation-form");
    if (!form) return;
    const inquiry = pendingInquiry;
    pendingInquiry = null;

    const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    for (const name of ["name", "phone", "location"]) {
      const field = form.elements.namedItem(name);
      if (!(field instanceof HTMLInputElement) || field.value) continue;
      if (setValue) setValue.call(field, inquiry[name]);
      else field.value = inquiry[name];
      field.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // Only transfer consent when both forms show the exact same wording.
    const agreement = form.elements.namedItem("agreement");
    const consentText = agreement?.closest("label")?.textContent?.replace(/\s+/g, " ").trim();
    if (inquiry.agreed && inquiry.consentText && inquiry.consentText === consentText && agreement instanceof HTMLInputElement && !agreement.checked) agreement.click();
  }

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches(".mini-panel--desk .consultation-form")) return;
    const fields = new FormData(form);
    pendingInquiry = {
      name: String(fields.get("name") ?? ""),
      phone: String(fields.get("phone") ?? ""),
      location: String(fields.get("location") ?? ""),
      agreed: fields.has("agreement"),
      consentText: form.querySelector(".agreement")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
    };

    const valid = pendingInquiry.name.trim() && pendingInquiry.location.trim()
      && /^01[0-9]-?\d{3,4}-?\d{4}$/.test(pendingInquiry.phone.trim())
      && pendingInquiry.agreed;
    if (!valid) {
      pendingInquiry = null;
      return;
    }

    // Invalid submissions remain on the home page. Never carry a rejected
    // attempt into a later, unrelated visit to the detailed form.
    setTimeout(() => {
      if (!onDetailedInquiry()) pendingInquiry = null;
      else fillDetailedInquiry();
    }, 0);
  }, true);

  function syncInquiry() {
    const intro = document.querySelector(".mini-panel--desk .form-intro");
    const description = "성함, 연락처, 현장 위치를 입력하면 상세 문의 화면으로 이어지며 입력 내용도 함께 표시됩니다.";
    if (intro && intro.textContent !== description) intro.textContent = description;
    fillDetailedInquiry();
  }

  window.addEventListener("hashchange", syncInquiry);
  new MutationObserver(syncInquiry).observe(document.getElementById("root"), { childList: true, subtree: true });
  syncInquiry();
})();
