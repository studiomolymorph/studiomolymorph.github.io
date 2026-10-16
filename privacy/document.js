(() => {
  const sections = [...document.querySelectorAll("section[data-policy-language]")];
  const links = [...document.querySelectorAll(".languages a[data-language]")];
  const heading = document.getElementById("policy-title");
  const divider = document.querySelector(".section-divider");
  const copy = {
    ja: { title: "プライバシーポリシー", language: "表示言語" },
    en: { title: "Privacy Policy", language: "Language" }
  };
  const languageFromUrl = () => location.hash === "#en" ? "en" : "ja";

  function show(language) {
    const labels = copy[language];
    document.documentElement.lang = language;
    document.title = `${labels.title} — Molymorph`;
    heading.textContent = labels.title;
    sections.forEach(section => { section.hidden = section.dataset.policyLanguage !== language; });
    links.forEach(link => {
      if (link.dataset.language === language) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    document.querySelector(".languages").setAttribute("aria-label", labels.language);
    divider.hidden = true;
  }

  links.forEach(link => link.addEventListener("click", event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const language = link.dataset.language;
    if (location.hash !== `#${language}`) history.pushState(null, "", `#${language}`);
    show(language);
  }));
  window.addEventListener("popstate", () => show(languageFromUrl()));
  window.addEventListener("hashchange", () => show(languageFromUrl()));
  show(languageFromUrl());
})();
