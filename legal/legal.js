// Direct visits fall back to the site home; only return to history when the
// referring page belongs to this same site.
document.querySelector("[data-back]")?.addEventListener("click", (event) => {
  try {
    const home = new URL("../", window.location.href);
    const referrer = new URL(document.referrer);
    if (history.length > 1 && referrer.origin === home.origin && referrer.pathname.startsWith(home.pathname)) {
      event.preventDefault();
      history.back();
    }
  } catch {
    // The link's home destination remains available without a valid referrer.
  }
});
