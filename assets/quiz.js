/* Quiz-Baustein (Sokrates). Markup:
   <form class="quiz">
     <fieldset data-richtig="b">
       <legend>Frage</legend>
       <label><input type="radio" name="q1" value="a"> Antwort</label> …
       <p class="rueckmeldung" aria-live="polite"></p>
       <p class="erklaerung" hidden>Warum …</p>
     </fieldset> …
     <p class="ergebnis" aria-live="polite"></p>
   </form>
   Rückmeldung sofort bei Auswahl; die Erklärung erscheint erst bei richtiger Antwort.
   Gezählt wird jeweils der erste Versuch. Nichts wird gespeichert. */
(function () {
  document.querySelectorAll("form.quiz").forEach(function (form) {
    var fragen = form.querySelectorAll("fieldset[data-richtig]");
    var ergebnis = form.querySelector(".ergebnis");
    var ersterVersuch = {};

    form.addEventListener("submit", function (e) { e.preventDefault(); });

    fragen.forEach(function (frage, i) {
      var rueckmeldung = frage.querySelector(".rueckmeldung");
      var erklaerung = frage.querySelector(".erklaerung");

      frage.addEventListener("change", function (e) {
        var richtig = e.target.value === frage.dataset.richtig;
        if (!(i in ersterVersuch)) ersterVersuch[i] = richtig;

        rueckmeldung.textContent = richtig
          ? "Richtig."
          : "Noch nicht. Denk an die Probe und versuch es noch einmal.";
        rueckmeldung.className = "rueckmeldung " + (richtig ? "richtig" : "falsch");
        if (erklaerung) erklaerung.hidden = !richtig;

        var beantwortet = Object.keys(ersterVersuch).length;
        if (ergebnis && beantwortet === fragen.length) {
          var treffer = Object.keys(ersterVersuch).filter(function (k) { return ersterVersuch[k]; }).length;
          ergebnis.textContent = "Beim ersten Versuch richtig: " + treffer + " von " + fragen.length + ".";
        }
      });
    });
  });
})();
