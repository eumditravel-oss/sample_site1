/* Old footer URLs were hash fragments that the application rendered as 404s.
   Keep existing bookmarks working while leaving all other hash routes alone. */
(() => {
  const paths = {
    "#privacy": "privacy.html",
    "#terms": "terms.html",
    "#email": "email.html",
  };
  function redirectLegacyHash() {
    const destination = paths[window.location.hash];
    if (!destination) return;
    const legalDirectory = new URL("./legal/", document.baseURI);
    window.location.replace(new URL(destination, legalDirectory).href);
  }
  window.addEventListener("hashchange", redirectLegacyHash);
  redirectLegacyHash();
})();
