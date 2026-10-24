import type { NewsCardData } from '../types'

export const news: NewsCardData[] = [
  {
    id: 'news-klassiker', type: 'news', league: 'Bundesliga', category: 'IM FOKUS',
    title: 'Ein Spiel. Zwei Rivalen. Alles auf dem Platz.',
    subtitle: 'Wenn Dortmund auf Bayern trifft, zählt mehr als die Tabelle. Die Bühne für einen großen Fußballabend ist bereit.',
    image: '/images/stadium.jpg', imageAlt: 'Fußballstadion mit grünem Spielfeld und gefüllten Rängen unter Flutlicht',
    source: 'Flow Redaktion', published: 'Vor 12 Min.', readTime: '3 Min. Lesezeit',
    body: [
      'Die Ränge füllen sich, die Spannung steigt: In dieser fiktiven Vorschau trifft die Energie der Dortmunder auf die Spielkontrolle der Münchner. Ein Klassiker, der schon vor dem Anpfiff für Gesprächsstoff sorgt.',
      'Unser taktischer Blick: Dortmund könnte auf schnelle Ballgewinne und Läufe hinter die letzte Linie setzen. Bayern würde mit langen Ballbesitzphasen versuchen, das Tempo zu bestimmen. Entscheidend wäre der Raum zwischen Mittelfeld und Abwehr.',
      'Welche Idee setzt sich durch? In Football Flow kannst du direkt zur nächsten Karte wechseln und weitere Bundesliga-Geschichten und Demo-Spiele entdecken.',
    ],
  },
  {
    id: 'news-pressing', type: 'news', league: 'Bundesliga', category: 'TAKTIK-CHECK',
    title: 'Jung. Mutig. Kompromisslos.',
    subtitle: 'Früh attackieren, schnell umschalten: So könnte Stuttgart im nächsten Bundesliga-Duell für Überraschungen sorgen.',
    image: '/images/football.jpg', imageAlt: 'Fußball auf einem grünen Rasenplatz',
    source: 'Flow Analyse', published: 'Vor 35 Min.', readTime: '4 Min. Lesezeit',
    body: [
      'Diese Demo-Analyse beschreibt ein mögliches taktisches Szenario beim VfB Stuttgart: Junge Mittelfeldspieler übernehmen Verantwortung und verkürzen die Zeit zwischen Balleroberung und Abschluss.',
      'Ein Schlüssel ist die Positionierung ohne Ball. Rückt die Abwehr weit auf, wird das Spielfeld kleiner. Das eröffnet Chancen auf frühe Ballgewinne, verlangt aber zugleich ein gutes Timing bei der Absicherung.',
      'In dieser erfundenen Analyse steht die Spielidee im Mittelpunkt. Sie ist keine aktuelle Meldung und beruht nicht auf einer Live-Datenquelle.',
    ],
  },
  {
    id: 'news-flutlicht', type: 'news', league: 'Bundesliga', category: 'FLUTLICHT-FIEBER',
    title: 'Diese Nächte fühlen sich einfach anders an.',
    subtitle: 'Flutlicht, volle Ränge und große Träume. Ein Blick auf die Geschichten, die nur die Bundesliga schreibt.',
    image: '/images/night.jpg', imageAlt: 'Weitläufiges Fußballstadion mit Tribünen und Spielfeld',
    source: 'Flow Magazin', published: 'Vor 1 Std.', readTime: '2 Min. Lesezeit',
    body: [
      'Wenn das Stadion im Flutlicht leuchtet, entstehen besondere Fußballmomente. Diese fiktive Magazin-Geschichte fängt die Vorfreude auf einen Bundesliga-Abend ein.',
      'Für die Spieler geht es um jede zweite Chance, für die Fans um Erinnerungen. Auswärtsfahrten, Choreografien und die letzten Minuten eines engen Spiels machen den Reiz dieser Abende aus.',
      'Alle in Football Flow gezeigten Spielverläufe sind frei erfundene Beispieldaten. Diese Geschichte dient ausschließlich zur Demonstration des News-Formats.',
    ],
  },
  {
    id: 'news-bremen', type: 'news', league: 'Bundesliga', category: 'VOR DEM ANPFIFF',
    title: 'Neunzig Minuten. Tausend Möglichkeiten.',
    subtitle: 'Bremen empfängt Freiburg. Zwei Teams mit einer klaren Idee — und der Chance auf den nächsten großen Moment.',
    image: '/images/football.jpg', imageAlt: 'Ein Fußball liegt auf dem grünen Rasen',
    source: 'Flow Redaktion', published: 'Vor 2 Std.', readTime: '3 Min. Lesezeit',
    body: [
      'Diese fiktive Vorschau blickt auf das Demo-Duell zwischen Werder Bremen und dem SC Freiburg. Beide Mannschaften könnten auf kompakte Abstände und schnelle Angriffe über die Flügel setzen.',
      'Für Bremen wäre die Unterstützung von den Rängen ein Faktor. Freiburg könnte versuchen, das Tempo zunächst zu beruhigen und nach Ballgewinnen gezielt die freien Räume zu nutzen.',
      'Die Vorschau ist erfunden. Sie beschreibt kein tatsächliches Spiel und enthält keine bestätigten Aufstellungen oder aktuellen Mannschaftsmeldungen.',
    ],
  },
  {
    id: 'news-fans', type: 'news', league: 'Bundesliga', category: 'KURVENKULTUR',
    title: 'Der zwölfte Mann trägt keinen Namen.',
    subtitle: 'Die erste Fahne. Der letzte Gesang. Warum ein Bundesliga-Spiel weit mehr als 90 Minuten dauert.',
    image: '/images/night.jpg', imageAlt: 'Fußballstadion mit weitläufigen Tribünen und grünem Spielfeld',
    source: 'Flow Magazin', published: 'Vor 3 Std.', readTime: '2 Min. Lesezeit',
    body: [
      'Die Reise beginnt lange vor dem Anpfiff. Ein Treffpunkt, ein Schal, die vertrauten Stimmen auf dem Weg zum Stadion. Diese fiktive Reportage erzählt vom Gefühl eines Bundesliga-Spieltags.',
      'Auf der Tribüne werden aus vielen einzelnen Geschichten gemeinsame Erinnerungen. Ein später Treffer, eine Parade oder ein Gesang, der über das ganze Stadion wandert.',
      'Dieser Magazintext wurde für Football Flow geschrieben. Das Symbolbild zeigt kein konkret beschriebenes Ereignis; die Geschichte dient als Demo des News-Formats.',
    ],
  },
]
