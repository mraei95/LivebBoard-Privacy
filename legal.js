/* Language switch: English / Arabic. Remembers the choice; without it, follows the browser language. */
(function () {
  var root = document.documentElement, key = "liveboard-lang", saved = null;
  try { saved = localStorage.getItem(key); } catch (e) {}
  function apply(lang) {
    root.setAttribute("data-ui", lang);
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    var b = document.getElementById("lang");
    if (b) b.textContent = lang === "ar" ? "English" : "العربية";
    var titles = document.querySelectorAll("title[data-" + lang + "]");
    if (titles.length) document.title = titles[0].getAttribute("data-" + lang);
  }
  var start = saved || ((navigator.language || "").toLowerCase().indexOf("ar") === 0 ? "ar" : "en");
  apply(start);
  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-ui") || start);
    var b = document.getElementById("lang");
    if (b) b.addEventListener("click", function () {
      var next = root.getAttribute("data-ui") === "ar" ? "en" : "ar";
      try { localStorage.setItem(key, next); } catch (e) {}
      apply(next);
    });
  });
})();
