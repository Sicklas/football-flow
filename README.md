# Football Flow — V0.2

**Zero Bullshit – Fußball auf den Punkt.** Ein privater, mobiloptimierter Bundesliga-Prototyp in React, TypeScript und Vite. Spiele und News sind getrennte Bereiche. Die Oberfläche folgt den bereitgestellten Spiele- und News-Mockups: Anthrazit, kompakte Karten, rote Live-Markierung und eine dezente grüne Linie unter dem aktiven Navigationspunkt.

## Starten

Node.js **ab 22.18** oder Node 24 und pnpm verwenden:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Im Browser **http://127.0.0.1:5173** öffnen. Alternativ funktionieren `npm install` und `npm run dev`.

Für einen Test am iPhone im selben WLAN:

```bash
pnpm dev --host 0.0.0.0
```

Die von Vite ausgegebene Netzwerkadresse in Safari öffnen. Gegebenenfalls den Zugriff im lokalen Netzwerk in der Betriebssystem-Firewall erlauben.

## Bedienung

- **Spiele:** fünf wählbare Spieltage (6–10), jeweils neun Begegnungen und alle 18 Vereine. Auswahl durch Spieltagsbuttons, Pfeile oder horizontales Wischen über die Auswahl. Laufende Spiele stehen vor geplanten, dann folgen beendete Spiele. Ergebnis, Anstoßzeit, Status und Minute sind direkt sichtbar.
- **News:** chronologisch sortierte Beispielmeldungen mit großer erster Karte, kompakten Folgekarten und natürlichem vertikalem Scrollen. Die Kategorien filtern lokal; „Top-News“ zeigt alle Meldungen weiterhin chronologisch.
- **Voting:** Pfeil nach oben = relevant und informativ, nach unten = belanglos oder wenig informativ. Ein erneuter Klick nimmt die Stimme zurück; der andere Pfeil ändert sie. Die Zähler reagieren unmittelbar. Stimmen bleiben nach Neuladen erhalten.
- **Start:** Gibt es am aktuellen Demo-Spieltag ein Live-Spiel, startet eine neue Sitzung bei Spiele, sonst bei News. Ein manueller Bereichswechsel hat innerhalb derselben Browser-Tab-Sitzung Vorrang, auch nach Neuladen. Die Regel hängt vom aktuellen Demo-Spieltag ab, nicht vom zuletzt angesehenen Spieltag.
- **Details und Merkliste:** Begegnung, Artikelbild oder Überschrift öffnet den nativen Dialog. Lesezeichen werden lokal gespeichert. Die kleine Lesezeichen-Schaltfläche neben dem Seitentitel filtert gespeicherte Beiträge im jeweiligen Bereich. Escape oder × schließt den Dialog und gibt den Fokus zurück.
- **Suche:** Lupe neben dem Untertitel öffnet die Suche nach Vereinen und Themen. Beide Hauptbereiche nutzen dieselbe Suche und Merkliste.

Die Bottom Navigation bleibt sichtbar und berücksichtigt iPhone-Safe-Areas. Es gibt genau zwei Hauptbereiche, keinen „Mehr“-Tab.

## Prüfen und bauen

```bash
pnpm test
pnpm build
pnpm preview
```

`test` verwendet den vorhandenen Node-Test-Runner. Die Prüfungen decken Datenumfang, 18 unterschiedliche Teams je Spieltag, Spielstatus-Sortierung, Startlogik, Such-/Merklistenfilter, Tor-/Ergebniskonsistenz, chronologische News und den vollständigen Voting-Zyklus einschließlich beschädigter Speicherdaten ab.

`build` führt TypeScript-Prüfung und Vite-Produktionsbuild aus. Das Ergebnis liegt in `dist/`. `preview` stellt diesen Build normalerweise auf Port 4173 bereit.

### Manuell am iPhone prüfen

1. In einem neuen Tab öffnen: Der Demo-Spieltag 8 enthält zwei Live-Spiele und startet im Spielebereich.
2. Alle neun Begegnungen ansehen. Zwischen Spieltag 6–10 wechseln, Pfeile und horizontales Wischen über die Auswahl ausprobieren.
3. Auf News wechseln: Die erste Nachricht ist groß, danach folgen kompakte Karten. Normal scrollen; es gibt kein Einrasten auf volle Bildschirmseiten.
4. Eine Nachricht hochvoten, anschließend heruntervoten, dieselbe Stimme wieder zurücknehmen. Hochvoten und neu laden: Stimme und Bereich bleiben erhalten.
5. Kategorie, Suche, Artikel-/Spieldetails sowie Speichern und Merklistenfilter prüfen. Geplante Spiele zeigen keine vorgetäuschten Spielstatistiken.
6. Bis ans Ende scrollen: Die letzte Karte darf nicht von der Navigation verdeckt werden. Auch bei 320 px Breite darf die Seite keinen horizontalen Überlauf haben.

## Struktur

```text
src/
  App.tsx                         Bereiche, Filter, Sitzung und Dialoge
  components/
    LeagueHeader.tsx              Gemeinsamer Bundesliga-Header
    BottomNavigation.tsx          Spiele / News, aktiver Unterstrich
    MatchdaySelector.tsx          Spieltag, Pfeile und Touch-Gesten
    MatchRow.tsx                  Kompakte Begegnung
    NewsArticle.tsx               Große / kompakte News mit Voting
    DetailModal.tsx               Artikel, Spieldetails und Merkliste
    TeamCrest.tsx                 Lokales Wappen oder Monogramm
  data/
    matchdays.ts                  Fünf Spieltage mit neun Spielen
    matches.ts                    Aktueller Demo-Spieltag
    news.ts                       Fünf chronologische Beispielmeldungen
    teams.ts                      18 Vereine
    feed.ts                       Gemeinsames Such-/Merklisteninventar
  hooks/
    useVotes.ts                   Lokale Stimmen
    useSavedCards.ts              Lokale Merkliste
  lib/
    prototype.ts                  Sortierung, Startlogik, Voting
    filterFeed.ts                 Such- und Merklistenfilter
  styles.css                      Gemeinsame responsive Designsprache
public/images/                    Lokale Referenz- und Symbolbilder
```

Die bisherige Swipe-Oberfläche, Desktop-Seitenleiste und deren ungenutzte Komponenten wurden durch die neuen Ansichten ersetzt. Bestehende Such-, Merklisten- und Detailfunktionen sind in die neue Oberfläche integriert. Es wurden keine Dependencies hinzugefügt.

## Demodaten und Bildherkunft

**Alle Nachrichten, Ergebnisse, Minuten, Ereignisse und Statistiken sind frei erfundene, eingefrorene Beispieldaten.** „Live“ bedeutet im Prototyp keinen echten Live-Ticker. Zeitangaben sind feste Demo-Werte. Die News-Szenarien und genannten Quellen folgen der bereitgestellten Designreferenz und sind keine aktuellen Artikel dieser Redaktionen.

Die Bilddateien `*-reference.webp` und `clubs/*.png` wurden aus den vom Nutzer bereitgestellten Mockups extrahiert, damit die private Designvorschau diesen möglichst genau entspricht. Das Mockup liefert 16 Wappen; St. Pauli und Kiel verwenden lokal gerenderte Monogramm-Platzhalter für die zusätzliche neunte Begegnung. Die Referenzbilder liefern keinen Nachweis über Nutzungsrechte an Fotos oder Marken. Vor einer öffentlichen Veröffentlichung müssen diese Rechte geklärt oder die Assets ersetzt werden.

Weitere lokale Symbolfotos aus der bestehenden Version stammen von Unsplash:

- [Stadion](https://images.unsplash.com/photo-1522778119026-d647f0596c20)
- [Fußball auf Rasen](https://images.unsplash.com/photo-1574629810360-7efbbe195018)
- [Flutlicht](https://images.unsplash.com/photo-1459865264687-595d652de67e)

Icons: Lucide, ISC-Lizenz. Systemschriften, keine externen Font-Abfragen. Keine API, RSS, KI-Zusammenfassung, Datenbank, Authentifizierung, Kommentare, Push oder Monetarisierung.

Speicher: `football-flow:votes:v1` und `football-flow:saved:v1` in Local Storage, `football-flow:section:v02` in Session Storage. Bei gesperrtem oder beschädigtem Speicher bleibt die App innerhalb der laufenden Sitzung bedienbar. Es werden keine Nutzungsdaten übertragen.

## Visuelle Prüfung

Das [Prüfprotokoll](docs/QA.md) dokumentiert die geprüften Interaktionen und Bildschirmbreiten.
