# Football Flow — MVP V1

Ein responsiver Bundesliga-Prototyp mit bildschirmhohem Swipe-Feed. React, TypeScript, Vite und Tailwind CSS. Dark Mode, limettengrüne Akzente und lokal gespeicherte Fußballfotos.

## Lokal starten

Voraussetzung: **Node.js ab 22.18** (alternativ Node 24 LTS) und npm oder pnpm.

```bash
npm install
npm run dev
```

Im Browser die ausgegebene lokale Adresse öffnen, normalerweise **http://127.0.0.1:5173**. Der Server ist standardmäßig nur lokal erreichbar.

Alternativ mit pnpm (Lockfile enthalten):

```bash
pnpm install
pnpm dev
```

## Prüfen und bauen

```bash
npm test
npm run build
npm run preview
```

`build` prüft TypeScript und erzeugt die statische Anwendung unter `dist/`. `preview` zeigt diesen Produktionsbuild lokal, normalerweise auf Port 4173. Tests prüfen Kartenumfang, ausschließlichen Bundesliga-Inhalt, Filter, Suche, Merkliste sowie die Konsistenz zwischen Spielständen und Ereignissen.

## Feed und Bedienung

- **Volle Bildschirmhöhe:** Jede News- oder Spielkarte ist exakt so hoch wie der sichtbare Browserbereich (`100dvh`). Es gibt keinen separaten Seitenkopf und keine untere Navigationsleiste, die Kartenhöhe abziehen.
- **Hochformat:** Auf größeren Fenstern ist der Feed auf `56.25dvh` Breite begrenzt — das entspricht genau 9:16. Auf schmalen Smartphones füllt er den verfügbaren Bildschirm ohne seitliche Ränder. Bei abweichenden Smartphone-Seitenverhältnissen hat die volle Bildschirmfläche Vorrang.
- **Overlay:** Branding, Suche, Merkliste und die Auswahl „Für dich“, „News“, „Spiele“ liegen über der Karte. Der Feed selbst scrollt dahinter weiter.
- **Touch:** Vertikal wischen. CSS Scroll Snap lässt jede Karte einrasten.
- **Desktop:** Mausrad, Trackpad, Pfeile neben dem Feed, Fortschrittspunkte oder Tastatur ↑ / ↓ / PageUp / PageDown.
- **Details:** Bild, Überschrift bzw. Spielstand oder den unteren Detail-Button antippen. Details können intern scrollen. Schließen über ×, Escape oder den Hintergrund.
- **Suche:** Lupe oben, z. B. „Frankfurt“, „Stuttgart“ oder „Flutlicht“.
- **Merkliste:** Lesezeichen auf einer Karte antippen. Die gespeicherten Karten über das Lesezeichen oben rechts oder die Desktop-Seitenleiste öffnen. Speicherung unter `football-flow:saved:v1` im lokalen Browser.

## Aktueller Umfang

**Nur Bundesliga-News und Spiele**, keine separaten Statistik-Karten und keine anderen Ligen. Neun gemischte Karten: fünf News-Stories und vier Demo-Spiele. News enthalten ein Symbolbild, Quelle, relative Demo-Zeit und Artikeltext. Spielkarten enthalten Platzhalter-Wappen, Ergebnis, Minute und Status. Ihre Detailansicht zeigt Ereignisse und beispielhafte Spielvergleiche.

**Alle Nachrichten, Ergebnisse, Ereignisse und Vergleichswerte sind frei erfundene Demodaten.** Relative Zeitangaben sind illustrative Werte und aktualisieren sich nicht. „Live“ ist ein eingefrorener Demo-Status, kein tatsächlicher Live-Ticker. Jede Karte und Detailansicht ist entsprechend gekennzeichnet. Wappen sind eigens gestaltete Monogramm-Platzhalter, keine offiziellen Vereinslogos.

Es gibt keine kostenpflichtigen APIs, keine Analyse-Dienste, keinen Login und kein Backend. Nach Installation und Start sind auch die Fotos lokal verfügbar. Die Merkliste wird nicht an einen Server übertragen.

## Architektur

```text
src/
  App.tsx                   Zustände, Hochformat-Layout und Feed-Navigation
  types.ts                  News-/Match-Typen und Datenmodelle
  components/
    Cards.tsx               News-, Match- und Leerkarten
    DetailModal.tsx         Native Dialoge mit Fokusmanagement
    Sidebar.tsx             Desktop-Navigation, nur Bundesliga
    Brand.tsx               Football-Flow-Branding
    TeamCrest.tsx           Lokale Platzhalter-Wappen
  data/
    feed.ts                 Gemischter Feed, spätere API-Grenze
    news.ts                 Fünf fiktive Bundesliga-Stories
    matches.ts              Vier Demo-Spiele und Ereignisse
    teams.ts                Bundesliga-Teams und Wappenfarben
  hooks/useSavedCards.ts     Lokale Merkliste mit Fehlerbehandlung
  lib/filterFeed.ts          Kombinierbare Such- und Filterlogik
  styles.css                Tailwind und responsives Design-System
public/
  images/                   Lokal gespeicherte Symbolbilder
  favicon.svg
tests/feed.test.mjs          Funktions- und Datenprüfungen
```

Für eine spätere API-Anbindung die Antworten in die Typen aus `src/types.ts` überführen und die Datenquelle in `src/data/feed.ts` ersetzen. Kartenkomponenten und Filter bleiben unabhängig vom Anbieter. Private API-Schlüssel später über einen Backend-Proxy verwenden.

## Zugänglichkeit

Beschriftete Schaltflächen, sichtbare Fokuszustände, tastaturbedienbarer Feed und native `<dialog>`-Detailansichten mit Fokusfalle und Fokusrückgabe. `prefers-reduced-motion` reduziert Animationen und schaltet die programmatische Scrollanimation aus. Alle Details sind über beschriftete Buttons erreichbar.

## Bilder und Icons

Die Fotos sind lokal unter `public/images/` gespeichert. Sie dienen als Symbolbilder und zeigen nicht die fiktiv beschriebenen Spiele. Originaldateien bei Unsplash:

- [Stadion / Klassiker](https://images.unsplash.com/photo-1522778119026-d647f0596c20)
- [Fußball auf Rasen](https://images.unsplash.com/photo-1574629810360-7efbbe195018)
- [Stadion / Flutlicht-Geschichte](https://images.unsplash.com/photo-1459865264687-595d652de67e)

Icons: [Lucide](https://lucide.dev/), ISC-Lizenz. Schrift: lokale Systemschriften, keine externen Font-Abfragen.

## Versionsverwaltung

GitHub-Repository: [Sicklas/football-flow](https://github.com/Sicklas/football-flow), Branch `main`. Der lokale Ordner ist über `origin` mit diesem Repository verbunden. Als lokaler Git-Autor ist dieselbe Identität wie im bestehenden GitHub-Commit hinterlegt: Niklas mit der GitHub-No-Reply-Adresse. Projektdateien, Bilder und Lockfile werden versioniert; `node_modules/`, `dist/` und lokale Vorschau-Dateien bleiben ausgeschlossen.
