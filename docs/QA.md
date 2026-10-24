# V0.2 — Prüfprotokoll

Stand: 24. Oktober 2026.

## Automatische Prüfungen

- `pnpm test`: 11 Tests erfolgreich.
- `pnpm build`: TypeScript und Vite-Produktionsbuild erfolgreich.
- `git diff --check`: erfolgreich.

## Browserprüfung

Mit Playwright und Chromium gegen die lokale Vite-App geprüft. Browser und Testwerkzeuge wurden ausschließlich außerhalb des Projekts für die Qualitätssicherung bereitgestellt; die Dependencies und das Lockfile des Projekts bleiben unverändert.

Geprüfte Viewport-Breiten: **320, 375, 390, 430, 768 und 1440 CSS-Pixel**. Die schmalen Ansichten wurden mit Touch-/Mobil-Emulation geprüft. Das ersetzt keinen Test auf einem physischen iPhone oder in Safari.

Erfolgreiche Interaktionsprüfungen:

- Neun Begegnungen auf jedem der fünf Spieltage; die Datenprüfung stellt zusätzlich 18 unterschiedliche Teams je Spieltag sicher.
- Spieltagsbuttons, vorheriger/nächster Spieltag und horizontale Touch-Geste. Eine vertikale Geste wechselt den Spieltag nicht.
- Wechsel zwischen Spiele und News, korrekter aktiver Navigationspunkt und Erhalt der manuellen Bereichswahl nach Neuladen.
- Hochvoten, Wechsel zur Gegenstimme, Zurücknehmen und Wiederherstellen einer gespeicherten Stimme nach Neuladen; Zähler und `aria-pressed` stimmen überein.
- Kategorienfilter, Suchbegriff und Schließen der Suche mit Escape.
- Detailansicht, Speichern, Merklistenfilter, Escape und Fokus-Rückgabe.
- Voting und Bereichswechsel bleiben bei gesperrtem Local/Session Storage bedienbar.
- Keine horizontalen Seitenüberläufe in beiden Bereichen bei allen geprüften Breiten.
- Alle fünf Spieltagsbuttons passen bei 390 px vollständig in die Auswahl.
- Die neunte Begegnung ist nach Scrollen vollständig oberhalb der festen Navigation erreichbar.
- Keine JavaScript-Seitenfehler, fehlerhaften Bilder oder externen Daten-/Bildabrufe.

## Visueller Abgleich

Die bereitgestellten Mockups wurden mit Screenshots der Umsetzung verglichen. Geprüft wurden dunkle Grundflächen, Kartenradien, Header, lokale Logos/Bilder, zentrale Spielstände, rote Live-Badges, große erste News-Karte, kompakte Folgekarten und die grüne aktive Navigationslinie. Lange Vereinsnamen werden bei knappen Breiten gekürzt. Bayern München wird wie in der Referenz zweizeilig angezeigt.

Bewusste Unterschiede aus dem V0.2-Auftrag: zwei Navigationspunkte; neun statt acht Begegnungen; kleine Such- und Merklistenwerkzeuge erhalten die vorhandenen Funktionen. Die neunte Begegnung verwendet zwei Monogramm-Wappen, weil diese Vereine im Referenzbild nicht abgebildet sind.

Die Umsetzung wurde zusätzlich anhand von Screenshots mit 390 × 844 CSS-Pixeln gegen beide Referenzen geprüft.
