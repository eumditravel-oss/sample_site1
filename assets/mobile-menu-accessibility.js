/*
 * The published application is a prebuilt React bundle. Keep its routing and
 * content intact while rendering the mobile navigation outside its blurred
 * sticky header. Links are read from the existing desktop navigation.
 */
(() => {
  "use strict";

  let activeMenu = null;

  function element(tag, className, text) {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (text) result.textContent = text;
    return result;
  }

  function routeOf(href) {
    try {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash.startsWith("#/")) return null;
      return url.hash.slice(1).split("?")[0].replace(/\/+$/, "") || "/";
    } catch {
      return null;
    }
  }

  function currentRoute() {
    return routeOf(window.location.href) || "/";
  }

  function closestNavigationLink(links, route) {
    const candidates = links.map((link) => ({ link, route: routeOf(link.href) })).filter((item) => item.route && item.route !== "/");
    const exact = candidates.find((item) => item.route === route);
    if (exact) return exact.link;
    return candidates.filter((item) => route.startsWith(`${item.route}/`)).sort((a, b) => b.route.length - a.route.length)[0]?.link || null;
  }

  function makeChevron() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "m6 9 6 6 6-6");
    svg.append(path);
    return svg;
  }

  function openMenu(trigger) {
    if (activeMenu) return;
    const header = trigger.closest(".site-header");
    const root = document.getElementById("root");
    const groups = header && [...header.querySelectorAll(".desktop-nav__item")];
    if (!root || !groups || !groups.length) return;
    const route = currentRoute();
    const desktopLinks = groups.flatMap((group) => [...group.querySelectorAll(".desktop-nav__submenu a")]);
    const currentLink = closestNavigationLink(desktopLinks, route);

    const panel = document.getElementById("accessible-mobile-nav");
    if (!panel) return;

    const top = element("div", "mobile-nav-panel__top");
    const logo = header.querySelector(".brand-mark")?.cloneNode(true);
    if (logo) top.append(logo);
    const close = element("button", "menu-button accessible-mobile-nav__close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "메뉴 닫기");
    top.append(close);

    const body = element("div", "accessible-mobile-nav__body");
    body.append(element("p", "mobile-nav-panel__label", "MENU"));
    const nav = element("nav");
    nav.setAttribute("aria-label", "모바일 주요 메뉴");
    const submenus = [];

    groups.forEach((group, index) => {
      const sourceButton = group.querySelector("button");
      const sourceLinks = group.querySelectorAll(".desktop-nav__submenu a");
      if (!sourceButton || !sourceLinks.length) return;
      const currentSection = [...sourceLinks].includes(currentLink);

      const section = element("div", "mobile-nav-group");
      const button = element("button", "", sourceButton.textContent.trim());
      const submenu = element("div", "mobile-nav-sub");
      button.type = "button";
      if (currentSection) section.setAttribute("data-current-section", "true");
      button.setAttribute("aria-expanded", String(currentSection));
      button.setAttribute("aria-controls", `accessible-mobile-submenu-${index}`);
      button.append(makeChevron());
      submenu.id = `accessible-mobile-submenu-${index}`;
      submenu.hidden = !currentSection;
      submenu.setAttribute("aria-hidden", String(!currentSection));
      submenu.classList.toggle("is-open", currentSection);

      sourceLinks.forEach((source) => {
        const link = element("a", "", source.textContent.trim());
        link.href = source.href;
        if (routeOf(source.href) === route) link.setAttribute("aria-current", "page");
        submenu.append(link);
      });

      button.addEventListener("click", () => {
        const shouldOpen = button.getAttribute("aria-expanded") !== "true";
        submenus.forEach(({ button: otherButton, submenu: otherSubmenu }) => {
          const expanded = otherButton === button && shouldOpen;
          otherButton.setAttribute("aria-expanded", String(expanded));
          otherSubmenu.hidden = !expanded;
          otherSubmenu.setAttribute("aria-hidden", String(!expanded));
          otherSubmenu.classList.toggle("is-open", expanded);
        });
      });
      submenus.push({ button, submenu });
      section.append(button, submenu);
      nav.append(section);
    });
    body.append(nav);

    const onlineConsultation = desktopLinks.find((link) => routeOf(link.href) === "/consultation");
    if (onlineConsultation) {
      const inquiry = element("a", "accessible-mobile-nav__inquiry", "온라인 상담 신청");
      inquiry.href = onlineConsultation.href;
      const arrow = element("span", "", "→");
      arrow.setAttribute("aria-hidden", "true");
      inquiry.append(arrow);
      body.append(inquiry);
    }

    const phone = document.querySelector('.footer-call a[href^="tel:"]')
      || document.querySelector('a[href^="tel:"]');
    const phoneDigits = phone ? phone.href.replace(/^tel:/i, "").replace(/\D/g, "") : "";
    const hasRealPhone = !!phone && phoneDigits !== "01000000000";
    const contact = element(hasRealPhone ? "a" : "div", "mobile-nav-panel__contact", hasRealPhone ? "빠른 전화 문의" : "대표 전화번호 준비 중");
    if (hasRealPhone) {
      contact.href = phone.href;
      contact.append(element("b", "", phone.textContent.trim()));
    }
    body.append(contact);
    panel.append(top, body);

    const previous = {
      rootInert: root.inert,
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
      hadBodyClass: document.body.classList.contains("mobile-menu-open"),
      expanded: trigger.getAttribute("aria-expanded"),
      controls: trigger.getAttribute("aria-controls"),
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    };

    function restoreAttribute(node, name, value) {
      if (value === null) node.removeAttribute(name);
      else node.setAttribute(name, value);
    }

    function closeMenu(restoreFocus = true) {
      if (activeMenu !== panel) return;
      activeMenu = null;
      document.removeEventListener("keydown", keydown, true);
      document.removeEventListener("focusin", focusin, true);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onResize);
      root.inert = previous.rootInert;
      document.body.style.overflow = previous.bodyOverflow;
      document.documentElement.style.overflow = previous.htmlOverflow;
      if (!previous.hadBodyClass) document.body.classList.remove("mobile-menu-open");
      restoreAttribute(trigger, "aria-expanded", previous.expanded);
      restoreAttribute(trigger, "aria-controls", previous.controls);
      panel.hidden = true;
      panel.onclick = null;
      panel.replaceChildren();
      if (restoreFocus && (window.scrollX !== previous.scrollX || window.scrollY !== previous.scrollY)) {
        const oldScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(previous.scrollX, previous.scrollY);
        document.documentElement.style.scrollBehavior = oldScrollBehavior;
      }
      if (restoreFocus && trigger.isConnected && trigger.getClientRects().length) {
        trigger.focus({ preventScroll: true });
      }
    }

    function focusable() {
      return [...panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter((node) => !node.closest("[hidden]") && node.getClientRects().length);
    }

    function keydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeMenu();
      } else if (event.key === "Tab") {
        const items = focusable();
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) {
          event.preventDefault();
          panel.focus();
        } else if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    function focusin(event) {
      if (!panel.contains(event.target)) close.focus({ preventScroll: true });
    }
    function onHashChange() { closeMenu(false); }
    function onResize() { if (window.matchMedia("(min-width: 1001px)").matches) closeMenu(false); }

    close.addEventListener("click", () => closeMenu());
    panel.onclick = (event) => {
      const link = event.target.closest("a[href]");
      if (link) closeMenu();
    };
    panel.hidden = false;
    activeMenu = panel;
    close.focus({ preventScroll: true });
    root.inert = true;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("mobile-menu-open");
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-controls", panel.id);
    document.addEventListener("keydown", keydown, true);
    document.addEventListener("focusin", focusin, true);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onResize);
  }

  // Keep the controlled element present even while the menu is closed.
  const panel = element("div", "mobile-nav-panel accessible-mobile-nav");
  panel.id = "accessible-mobile-nav";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", "모바일 메뉴");
  panel.tabIndex = -1;
  document.body.append(panel);

  function syncNavigation() {
    const trigger = document.querySelector('.site-header .menu-button[aria-label="메뉴 열기"]');
    if (trigger) {
      if (trigger.getAttribute("aria-controls") !== panel.id) trigger.setAttribute("aria-controls", panel.id);
      if (!activeMenu && trigger.getAttribute("aria-expanded") !== "false") trigger.setAttribute("aria-expanded", "false");
    }

    const route = currentRoute();
    const groups = [...document.querySelectorAll(".desktop-nav__item")];
    const links = groups.flatMap((group) => [...group.querySelectorAll(".desktop-nav__submenu a")]);
    const currentLink = closestNavigationLink(links, route);
    groups.forEach((group) => {
      const button = group.querySelector("button");
      if (button) button.removeAttribute("aria-haspopup");
      if (currentLink && group.contains(currentLink)) group.setAttribute("data-current-section", "true");
      else group.removeAttribute("data-current-section");
    });
    [...links, ...document.querySelectorAll(".sub-navigation nav a")].forEach((link) => {
      if (links.includes(link)) link.removeAttribute("role");
      if (routeOf(link.href) === route) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    // The published SPA treats the old footer fragments as routes. Point only
    // those three legacy links at static documents under this project instead.
    const legalPages = {
      "#privacy": "./legal/privacy.html",
      "#terms": "./legal/terms.html",
      "#email": "./legal/email.html",
    };
    document.querySelectorAll(".site-footer .footer-bottom a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      const target = legalPages[href] || (Object.values(legalPages).includes(href) ? href : null);
      if (!target) return;
      if (href !== target) link.setAttribute("href", target);
      link.setAttribute("target", "_blank");
      const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
      rel.add("noopener");
      link.setAttribute("rel", [...rel].join(" "));
      if (!link.querySelector("[data-legal-new-window]")) {
        const notice = element("span", "footer-legal-new-window", " (새 창)");
        notice.setAttribute("data-legal-new-window", "");
        link.append(notice);
      }
    });
  }
  new MutationObserver(syncNavigation).observe(document.getElementById("root"), { childList: true, subtree: true });
  window.addEventListener("hashchange", syncNavigation);
  syncNavigation();

  // Capture the original trigger before React opens its header-contained menu.
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest('.site-header .menu-button[aria-label="메뉴 열기"]');
    if (!trigger) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openMenu(trigger);
  }, true);
})();
