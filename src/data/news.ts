import type { NewsCardData } from '../types'

// Fictional, fixed-time articles for the prototype; source names mirror the reference.
// No article was fetched from or supplied by these publications.
export const news: NewsCardData[] = [
  {
    id: 'news-klassiker', type: 'news', league: 'Bundesliga', category: 'Spieltag',
    title: 'Kane führt Bayern zum nächsten Sieg – Dortmund bleibt in Schlagdistanz',
    subtitle: 'Der FC Bayern setzt sich gegen Dortmund mit 2:1 durch und bleibt weiter an der Tabellenspitze. Kane trifft erneut und baut seine beeindruckende Torserie aus.',
    image: '/images/kane-reference.webp', imageAlt: 'Harry Kane im Bayern-Trikot, Bild aus der bereitgestellten Designreferenz',
    source: 'kicker', published: 'vor 2 Stunden', publishedAt: '2026-10-24T16:00:00+02:00', readTime: '2 Min. Lesezeit', upvotes: 342, downvotes: 28,
    body: ['Diese fiktive Beispielmeldung übernimmt die Geschichte aus dem News-Mockup. Sie ist keine aktuelle Berichterstattung und steht unabhängig von den Demo-Spielständen im Spielebereich.', 'Bayern behält in diesem Beispielszenario die Kontrolle über das Spitzenspiel. Dortmund bleibt durch schnelle Gegenstöße gefährlich, doch der entscheidende Treffer fällt auf der anderen Seite.'],
  },
  {
    id: 'news-adeyemi', type: 'news', league: 'Bundesliga', category: 'Verletzungen',
    title: 'BVB bangt um Adeyemi – Einsatz gegen Leipzig fraglich',
    subtitle: 'Nach muskulären Problemen musste Adeyemi das Training vorzeitig beenden.',
    image: '/images/adeyemi-reference.webp', imageAlt: 'Karim Adeyemi im Dortmund-Trikot, Bild aus der Designreferenz',
    source: 'Sport1', published: 'vor 5 Stunden', publishedAt: '2026-10-24T13:00:00+02:00', readTime: '2 Min. Lesezeit', upvotes: 128, downvotes: 19,
    body: ['Fiktive Nachricht aus dem bereitgestellten Mockup: Im Beispielszenario muss Dortmund auf eine Trainingsunterbrechung reagieren. Eine Entscheidung über einen Einsatz steht noch aus.', 'Diese Demomeldung enthält keine bestätigte medizinische oder sportliche Information.'],
  },
  {
    id: 'news-alonso', type: 'news', league: 'Bundesliga', category: 'Transfers',
    title: 'Alonso bestätigt Interesse – Wirtz-Zukunft weiter offen',
    subtitle: 'Leverkusen-Trainer Xabi Alonso äußert sich zu den anhaltenden Spekulationen um Florian Wirtz.',
    image: '/images/alonso-reference.webp', imageAlt: 'Xabi Alonso am Spielfeldrand, Bild aus der Designreferenz',
    source: 'ZEIT ONLINE', published: 'vor 8 Stunden', publishedAt: '2026-10-24T10:00:00+02:00', readTime: '3 Min. Lesezeit', upvotes: 96, downvotes: 47,
    body: ['Diese erfundene Meldung bildet ausschließlich die Designreferenz nach. Die darin beschriebene Konstellation ist kein aktueller Sachstand.', 'Im fiktiven Szenario bleibt die Zukunft des Spielers offen. Die Geschichte demonstriert das Format einer Transfermeldung.'],
  },
  {
    id: 'news-pressing', type: 'news', league: 'Bundesliga', category: 'Analyse',
    title: 'Stuttgarts Pressing: mutig nach vorn, gemeinsam zurück',
    subtitle: 'Kurze Wege und schnelle Ballgewinne: Wie der VfB mit einer klaren Idee Räume schafft.',
    image: '/images/football.jpg', imageAlt: 'Symbolbild: Fußball auf einem grünen Rasenplatz',
    source: 'Flow Analyse', published: 'vor 10 Stunden', publishedAt: '2026-10-24T08:00:00+02:00', readTime: '4 Min. Lesezeit', upvotes: 84, downvotes: 6,
    body: ['Diese Demo-Analyse beschreibt ein mögliches taktisches Szenario beim VfB Stuttgart. Die Mannschaft rückt gemeinsam vor und verkürzt die Wege nach einem Ballverlust.', 'Alle taktischen Beobachtungen in dieser Beispielgeschichte sind erfunden und dienen zur Demonstration der Artikelansicht.'],
  },
  {
    id: 'news-fans', type: 'news', league: 'Bundesliga', category: 'Spieltag',
    title: 'Flutlicht an. Alltag aus. Die Bundesliga ist zurück.',
    subtitle: 'Neun Spiele, achtzehn Teams und ein Wochenende voller Geschichten. Der Spieltag im Überblick.',
    image: '/images/night.jpg', imageAlt: 'Symbolbild: Fußballstadion mit Tribünen und grünem Spielfeld',
    source: 'Flow Redaktion', published: 'vor 12 Stunden', publishedAt: '2026-10-24T06:00:00+02:00', readTime: '2 Min. Lesezeit', upvotes: 62, downvotes: 4,
    body: ['Diese fiktive Spieltagsvorschau stimmt auf neun beispielhafte Bundesliga-Begegnungen ein. Sie dient ausschließlich der Demonstration des Prototyps.', 'Die Fotos sind lokale Symbolbilder, die Ergebnisse und Geschichten sind frei erfunden.'],
  },
]
