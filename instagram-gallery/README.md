## Instagram Gallery Section

Een Instagram-achtige galerijsectie met kaartjes, profielheader en een korte caption die automatisch afgekapt wordt met een "... meer" knop. De markup is Tailwind-first en gebruikt een klein JS-script om captions op 2 regels te beperken.

**Kenmerken**
1. Instagram-style kaart per post met acties (like, comment, share, save).
2. Automatisch afkappen van captions met “... meer”.
3. Responsive grid (1-2-4 kolommen).
4. Klaar voor snelle duplicatie van posts.

**Structuur**
1. `html/instagram-gallery.html` – de sectie markup.
2. `js/caption-more.js` – afkappen/expand van captions.
3. `assets/icons/` – SVG iconen (heart, comment, paper-plane, save).
4. `assets/images/` – voorbeeldafbeeldingen.

**Vereisten**
1. Tailwind CSS (of vergelijkbare utility classes) voor classes zoals `mx-auto`, `hidden`, `cursor-pointer`, `sm:grid-cols-2`, etc.
2. Een extra icoon `assets/icons/instagram-logo.svg` (wordt in de knop “Bekijk meer” gebruikt).
3. Post-afbeeldingen, bijvoorbeeld `assets/images/design-1.jpg` (wordt in de kaart gebruikt).

**Gebruik**
1. Plaats de HTML uit `html/instagram-gallery.html` in je pagina.
2. Zorg dat de asset-paden kloppen ten opzichte van het HTML-bestand.
3. Laad `js/caption-more.js` op dezelfde pagina (de script-tag staat onderaan de sectie).
4. Vervang account-naam, locatie en links naar jouw Instagram-profiel.
5. Dupliceer het `<article>` blok om meer posts toe te voegen.

**Aanpassen**
1. Titel en introtekst: pas de `<h2>` en `<p>` aan in de header van de sectie.
2. Kleuren: update de hex-kleuren in de classes (bijv. `text-[#7a6458]`, gradients).
3. Afbeeldingen: vervang `design-1.jpg` door je eigen beeldmateriaal.
4. Captions: wijzig de tekst in het `[data-caption-text]` blok.

**Asset checklist**
1. `assets/images/instagram-profile-picture.jpg` bestaat al.
2. Voeg nog toe:
3. `assets/images/design-1.jpg` (en extra beelden voor extra posts).
4. `assets/icons/instagram-logo.svg` voor de CTA-knop.

**Notities**
1. Het script bepaalt dynamisch of de caption langer is dan 2 regels en toont dan de “... meer” knop.
2. Bij resize wordt de afkapping opnieuw berekend.
