(() => {
const copy = {"en":{"title":"Privacy Policy","language":"Language"},"ja":{"title":"プライバシーポリシー","language":"表示言語"},"zh-CN":{"title":"隐私政策","language":"语言"},"zh-TW":{"title":"隱私權政策","language":"顯示語言"},"ko-KR":{"title":"개인정보 처리방침","language":"언어"},"es-ES":{"title":"Política de privacidad","language":"Idioma"},"pt-BR":{"title":"Política de Privacidade","language":"Idioma"},"fr-FR":{"title":"Politique de confidentialité","language":"Langue"},"de-DE":{"title":"Datenschutzerklärung","language":"Sprache"},"it-IT":{"title":"Informativa sulla privacy","language":"Lingua"}};
const aliases = {"en-us":"en","ja-jp":"ja","zh-hans":"zh-CN","zh-hant":"zh-TW","ko":"ko-KR","es":"es-ES","pt":"pt-BR","fr":"fr-FR","de":"de-DE","it":"it-IT"};
const languageFromUrl = () => {
  const requested = location.hash.slice(1).toLowerCase();
  return Object.keys(copy).find(key => key.toLowerCase() === requested) || aliases[requested] || "en";
};

  const sections = [...document.querySelectorAll("section[data-policy-language]")];
  const links = [...document.querySelectorAll(".languages a[data-language]")];
  const heading = document.getElementById("policy-title");
  function show(language) {
    const labels = copy[language];
    document.documentElement.lang = language;
    document.documentElement.dataset.policyCurrent = language;
    document.title = `${labels.title} — Molymorph`;
    heading.textContent = labels.title;
    sections.forEach(section => { section.hidden = section.dataset.policyLanguage !== language; });
    links.forEach(link => {
      if (link.dataset.language === language) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    document.querySelector(".languages").setAttribute("aria-label", labels.language);
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
