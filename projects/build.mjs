// Generates one case-study page per project from the data below.
// Run from the repo root:  node projects/build.mjs
import { writeFileSync } from 'node:fs';

const GH = 'https://github.com/Letlhogonolo-Kgatshe/';
const PROJECTS = [
    {
        slug: 'smartx', title: 'Smart-X', subtitle: 'IoT data ingestion, forecasting & mesh routing', year: '2026', role: 'Solo developer · PROG7312 (Advanced Programming)',
        stack: ['ASP.NET Core 8 Minimal API', 'Blazor Server', 'xUnit', 'Docker Compose', 'C#'],
        links: [['Code', GH + 'smartx-iot-gateway'], ['Final demo', 'https://youtu.be/s4NIdMSn380'], ['Part 2 demo', 'https://youtu.be/OjAtpvBV-6c']],
        img: 'smartx.jpg', imgAlt: 'Smart-X live telemetry dashboard with fleet health score and critical devices',
        metrics: [['676', 'passing xUnit tests in CI'], ['37', 'test fixtures'], ['5', 'projects: API, dashboard, simulator, shared, tests']],
        problem: 'A fleet of IoT sensors streams readings into a gateway every few seconds. Some packets are malformed, some devices drop offline, and some readings cross dangerous thresholds. Operators need to know, at a glance, which device needs attention first, what is likely to go wrong next, and how to keep data flowing when a link fails.',
        built: [
            'A Minimal API gateway that registers devices from a sensor catalogue (with validated MAC addresses and a Facility → Zone → Room hierarchy) and ingests typed telemetry through a pipeline with observers.',
            'A separate simulator project that streams packets and injects anomalies on purpose, so the system can be demonstrated realistically.',
            'Reading history kept in an AVL tree, short-term forecasting, and a suggestions engine with a proactive dispatcher that pushes actions to a live command stream.',
            'A wireless mesh view: devices form a weighted graph, routes follow a minimum spanning tree, and the network heals itself when a node drops (the Topology page).',
            'A Blazor Server dashboard with a fleet health score, search backed by a trie, live readings and encrypted file attachments per device.',
        ],
        decisions: [
            ['Data structures chosen for the job', 'An AVL tree keeps each device\'s history sorted for fast range queries, a trie gives instant search as you type, and a weighted graph with a minimum spanning tree decides mesh routes.'],
            ['Generic, typed telemetry', 'A generic TelemetryPacket<T> carries double, int and bool readings without boxing to object, so invalid types fail at compile time.'],
            ['No database where none is needed', 'State is held in memory and snapshotted to JSON on a timer and on shutdown, so the system survives restarts without the overhead of running a database.'],
        ],
        results: ['676 xUnit tests in 37 fixtures run on every push.', 'One-command start with Docker Compose.', 'Demo videos for Part 1, Part 2 and the Final PoE.'],
    },
    {
        slug: 'collective', title: 'Collective', subtitle: 'A marketplace, transport board and messaging app for students', year: '2026', role: 'Solo developer · PROG7314 (Programming 3D)',
        stack: ['Kotlin', 'Jetpack Compose', 'MVVM & Hilt', 'Firebase Auth & Firestore', 'Node.js & TypeScript', 'GitHub Actions'],
        links: [['Code', GH + 'collective'], ['Video demo', 'https://1drv.ms/v/c/2a750ce9fd96870b/IQC-3WC2xFySRb22O44PqtBnATGgic65yr3vV3LgCW4VhbM']],
        img: 'collective.jpg', imgAlt: 'Three Collective screens: the services marketplace, the planner-style home and the transport map with rides',
        metrics: [['237', 'unit tests: 126 Android, 111 backend'], ['3', 'languages: English, Afrikaans, Setswana'], ['6', 'Cape Town campuses in the seed data']],
        problem: 'Students in Cape Town trade tutoring, lifts and favours through scattered WhatsApp groups. There is no way to see who is offering what, whether a driver can be trusted, or what you have signed up for this week. I wanted one app for finding services, sharing rides and talking to the people involved.',
        built: [
            'A services marketplace where students offer, edit and book tutoring, tech help, design and errands, with ratings, reviews and an appointment-style booking flow.',
            'A transport board laid out like Uber: a full-screen map, From/To search, routes drawn with OSRM, and one-off trips or regular carpools in a bottom sheet. Only verified drivers can offer rides.',
            'Live, per-person messaging with edit, delete, block and report, and a planner-style home with the week\'s plan, points and badges.',
            'Sign-in with email, Google (Credential Manager) or fingerprint, an optional app lock, notification switches per event and departure reminders that fire even when the app is closed.',
            'An admin side that reviews reports and approves or revokes drivers after an in-person check, plus a small Node/TypeScript API for push notifications.',
        ],
        decisions: [
            ['Offline first', 'Firestore\'s on-device cache serves saved data with no connection and queues writes, uploading them on reconnect. The app shows an offline banner and marks messages as "Sending…".'],
            ['Trust before transport', 'Rides can only be offered by drivers an admin has approved, and an admin can revoke that status. Security rules on Firestore enforce who can read and change each record.'],
            ['No secrets in the repo', 'The shared password for the sample accounts is read from an environment variable when the seed runs, so it is never committed.'],
        ],
        results: ['Final POE version 1.0.0, with a full walkthrough on video.', '126 Android and 111 backend unit tests run by GitHub Actions on every push.', 'Runs in English, Afrikaans and Setswana, switchable at runtime.'],
    },
    {
        slug: 'hustlehub-plus', title: 'HustleHub+', subtitle: 'A secure freelance marketplace', year: '2026', role: 'Team of four · INSY7314 (Application Development Security)',
        stack: ['React & Vite', 'Node.js & Express 5', 'MongoDB', 'JWT & bcrypt', 'Docker', 'Postman & Newman', 'GitHub Actions'],
        links: [['Code', GH + 'hustlehub-plus'], ['Final demo', 'https://youtu.be/KpMu77Uqex8'], ['Part 2 demo', 'https://youtu.be/5EMVoo-9elM']],
        img: 'hustlehub-plus.jpg', imgAlt: 'HustleHub+ freelancer income dashboard showing total earned, estimated tax, take-home and paid bookings',
        metrics: [['124', 'API requests in the Newman suite, 0 failing'], ['176', 'Newman assertions'], ['80', 'frontend tests']],
        problem: 'Freelancers and clients need a place to list gigs, book them and pay, but a marketplace that handles accounts and money is a target. The brief was to build one that is secure by design, prove it with tests and scans, and show freelancers what they earn after tax.',
        built: [
            'Built with Funi, Nomsa and Kwethukubonga. Clients browse and book gigs with simulated payments, freelancers manage their own gigs, and admins see all users and bookings.',
            'My part: the freelancer income dashboard, with monthly income and income-against-tax charts and their tests.',
            'My part: the Postman collection run with Newman in CI, covering bookings, income and tax, admin access and the security headers.',
            'My part: security fixes for login and sessions: logins take the same time for unknown emails, passwords must be 12 or more characters and no more than 72 bytes, and logging out ends every session.',
            'I also merged each member\'s final POE work into the release and wrote the dashboard and final POE sections of the README.',
        ],
        decisions: [
            ['The role comes from the database', 'The user is loaded on every request, so a changed role or a deleted account takes effect immediately instead of when the token expires.'],
            ['Tax worked out on the server', 'The SARS 2026/27 brackets live in one frozen config file. Income is read from the freelancer\'s own transactions inside the database query, and no amount from the request is trusted.'],
            ['Security checks in the pipeline', 'Every push runs ESLint, Semgrep and npm audit next to the tests, and the API sets CSP and other security headers, rate-limits requests and runs over HTTPS in Docker.'],
        ],
        results: ['Newman: 124 requests and 176 assertions, none failing.', '80 frontend tests and 50 API unit tests.', 'Final POE delivered with a demo video, 9 November 2026.'],
    },
    {
        slug: 'safe', title: 'SAFE', subtitle: 'South African Financial Education', year: '2025–2026', role: 'Solo entry (Team Arctic) · SA Intervarsity Hackathon 2025',
        stack: ['JavaScript', 'Tailwind CSS', 'Chart.js', 'GitHub Pages & Actions'],
        links: [['Live site', 'https://letlhogonolo-kgatshe.github.io/SAFE/'], ['Code', GH + 'SAFE']],
        img: 'safe.jpg', imgAlt: 'SAFE homepage: Money conversations, made simple',
        metrics: [['88', 'glossary terms with rand examples'], ['8', 'money calculators'], ['47', 'curated SA & global resources']],
        problem: 'When I started learning about money, the useful resources were scattered across dozens of sites and channels, full of jargon and often written for other countries. Beginners in South Africa need one trustworthy place that explains the basics in plain language, using local rules and rand amounts.',
        built: [
            'A 12-step learning path from first budget to first investment, with progress saved on the visitor\'s device.',
            'A searchable glossary of 88 South African terms (TFSA, two-pot retirement, transfer duty, debt review…) with rand examples, saved terms and a flashcard quiz.',
            'Eight calculators: budget (50/30/20), debt payoff (snowball vs avalanche), savings goal, net worth, investment growth, loan & bond, property costs and a live currency converter.',
            'A risk-free stock market game, plus a curated library of SA creators described in their own words.',
        ],
        decisions: [
            ['Correctness over looks', 'The original property calculator used made-up transfer duty brackets. It now uses the SARS table (no duty up to R1,210,000), checked against SARS\'s published figures.'],
            ['Privacy by default', 'Budgets, saved terms and game progress live only in the visitor\'s browser, never on a server.'],
            ['Pages, not one endless scroll', 'The single page had grown past 15,000px. It is now six focused pages with a shared layout, and the glossary loads 24 terms at a time.'],
        ],
        results: ['Fixed the live deploy (Pages was publishing the repo root instead of src/), so the site loads at its public URL.', 'Fixed a broken mobile menu and the game crashing on its final day.', 'Content lives in data files, so new terms and resources can be added without touching layout code.'],
    },
    {
        slug: 'entice-feed', title: 'Entice Feed', subtitle: 'Agri-SaaS website with real El Niño forecasting', year: '2025–2026', role: 'Freelance · design, development & data modelling',
        stack: ['JavaScript', 'Tailwind CSS', 'Chart.js', 'Node.js', 'GitHub Actions', 'Open-Meteo · NOAA · World Bank APIs'],
        links: [['Live site', 'https://letlhogonolo-kgatshe.github.io/entice-feed-website/'], ['Code', GH + 'entice-feed-website']],
        img: 'entice-feed.jpg', imgAlt: 'Entice Feed homepage with the live El Niño watch',
        metrics: [['−8.8%', 'SA cereal yield per +1 El Niño index (fitted)'], ['5', 'free public data sources'], ['Weekly', 'automatic data refresh']],
        problem: 'Entice Feed is building a platform that connects every player in South Africa\'s agricultural value chain. Many agritech sites either pitch investors or talk over farmers. The client needed a site that explains the platform plainly, and proves its value with real insight rather than stock charts.',
        built: [
            'A five-page site (Home, Platform, Live data, Plans, Contact) with a "who it\'s for" role picker that opens each stakeholder\'s tools directly.',
            'A Node.js data pipeline, run weekly by GitHub Actions, that pulls NOAA\'s El Niño index, World Bank yields and maize prices, ECB exchange rates and ECMWF seasonal rainfall.',
            'Models fitted from the data on every run: an El Niño outlook, a harvest outlook (yield vs El Niño since 1980) and a rand maize price forecast with 80% ranges.',
            'Live 7-day weather and soil moisture per growing region, fetched directly in the browser.',
        ],
        decisions: [
            ['Learn effects, don\'t assume them', 'Every coefficient is fitted from the data. The model found El Niño cuts SA yields by ~9% per point, but historically lowers world maize prices. The page explains this rather than hiding it.'],
            ['Honest by design', 'A methodology panel states sources and limitations, and demo auction and tracking rows are labelled as sample data.'],
            ['No server to maintain', 'A scheduled GitHub Action rebuilds the data file, so the site stays static, fast and free to host.'],
        ],
        results: ['With a very strong El Niño developing (ONI +2.16 in Aug 2026), the model projects the 2027 harvest at ~16% below trend.', 'The pipeline was verified end to end on GitHub, where it fetched, fitted and committed fresh data.', 'Fixed broken icons (an invalid Font Awesome kit), dead navigation links and forms that sent nothing.'],
    },
    {
        slug: 'glms', title: 'GLMS', subtitle: 'Logistics contract management', year: '2026', role: 'Solo developer · PROG7311 (Enterprise Application Development)',
        stack: ['ASP.NET Core (.NET 10) Web API', 'Blazor Server', 'Entity Framework Core', 'SQL Server', 'Swagger', 'xUnit & Moq'],
        links: [['Code', GH + 'glms-contract-management'], ['Video demo', 'https://youtu.be/TWxagCLS1yQ']],
        img: 'glms.jpg', imgAlt: 'GLMS dashboard with contract counts by status',
        metrics: [['59', 'passing xUnit tests in CI'], ['3', 'Gang-of-Four patterns'], ['2', 'tiers: REST API + Blazor UI']],
        problem: 'A logistics company manages contracts and service requests for international clients. Service requests must never be raised against an inactive or expired contract, every status change must be auditable, and signed agreements need to be stored safely.',
        built: [
            'A REST API (EF Core, SQL Server, Swagger) for clients, contracts, service requests and the audit log.',
            'A Blazor Server frontend: dashboard, contract hub with date and status filters, PDF uploads, and service requests with a live USD → ZAR conversion.',
            'A 59-test xUnit suite covering the patterns, validation, currency maths, file checks and an end-to-end workflow on an in-memory database.',
        ],
        decisions: [
            ['Factory', 'Creates contracts in the correct initial state (Draft or Active), and rejects end dates on or before the start date.'],
            ['Observer', 'Every contract status change notifies an observer that writes to the audit log, so auditing can\'t be forgotten.'],
            ['Strategy', 'Composable validation strategies (active status + valid dates) block invalid service requests before they reach the database.'],
        ],
        results: ['59 tests run on every push through GitHub Actions.', 'Only genuine .pdf uploads are accepted, with .exe, .php, double extensions and similar rejected.', 'A seeded demo database makes the system easy to evaluate.'],
    },
    {
        slug: 'penny-wise', title: 'Penny Wise', subtitle: 'Android budgeting app', year: '2026', role: 'Developer · PROG7313 (Programming 3C)',
        stack: ['Kotlin', 'Jetpack Compose', 'Firebase Auth', 'Cloud Firestore', 'Coroutines & Flow', 'JUnit'],
        links: [['Code', GH + 'penny-wise-budget-app'], ['Video demo', 'https://youtu.be/w4Cir029GtA']],
        img: 'penny-wise.jpg', imgAlt: 'Penny Wise welcome screen on an Android phone',
        metrics: [['5', 'core screens'], ['7', 'achievement badges'], ['9', 'unit tests in CI']],
        problem: 'Most people abandon budgeting apps within weeks. Penny Wise makes tracking expenses against monthly goals visual and rewarding, so logging spending becomes a habit.',
        built: [
            'Home, Add expense, Totals, Goals and History screens in Jetpack Compose (Material 3, dark theme).',
            'Per-user data in Cloud Firestore, exposed as Kotlin Flows so every screen updates live.',
            'Spending charts by category, min/max monthly goals, receipt photos, and gamification with XP and badges.',
        ],
        decisions: [
            ['MVVM + repository', 'One repository is the single source of truth, and Firestore snapshot listeners are wrapped in callbackFlow.'],
            ['Testable rules', 'XP, badge and spending-status rules live in pure Kotlin functions, so they are tested on the JVM without Android or Firebase.'],
            ['Secrets stay out of git', 'CI builds with a placeholder Firebase config, and the real google-services.json is never committed.'],
        ],
        results: ['Found and fixed a real bug. XP and the Streak badge were counted from the 5 most recent expenses, so XP stopped at 50 and Streak could never unlock.', 'CI runs the unit tests and builds a debug APK on every push.', 'Corrected outdated docs that described a local database and a stored password.'],
    },
    {
        slug: 'abc-retail', title: 'ABC Retail', subtitle: 'Cloud e-commerce on Azure', year: '2025', role: 'Solo developer · CLDV6212 (Cloud Development B, 93%)',
        stack: ['.NET 8 MVC', 'Azure Table, Blob, Queue & File Storage', 'Azure Functions v4', 'ASP.NET Core Identity', 'SQL Server'],
        links: [['Code', GH + 'abc-retail-azure']],
        img: 'abc-retail.jpg', imgAlt: 'ABC Retail product list for a signed-in customer, with images from Blob Storage',
        metrics: [['4', 'Azure storage services'], ['4', 'Azure Functions'], ['93%', 'final module mark']],
        problem: 'A retail store needs customers, products, orders, images, contracts and transactions stored reliably in the cloud, with each type of data in the service that suits it, and it must keep working if a cloud function is unavailable.',
        built: [
            'Customers, products, orders and carts in Table Storage; product images in Blob Storage behind 60-minute SAS URLs; contracts in an Azure File Share; transactions in Queue Storage.',
            'Four HTTP-triggered Azure Functions for storage writes, with a fallback to direct SDK calls if a function fails.',
            'SQL Server Identity with Admin and Customer roles, a cart with a live badge, and an admin order workflow.',
        ],
        decisions: [
            ['Right store for each data type', 'Structured records go to tables, binary files to blobs, documents to file shares and events to queues.'],
            ['Resilience', 'Orders are always saved, through the function if possible and directly if not, and the user sees a clear warning.'],
            ['Security hygiene', 'Before publishing, real storage keys, SQL passwords and publish profiles were removed from the code and replaced with local-emulator settings.'],
        ],
        results: ['Final module mark of 93%.', 'Runs locally against the Azurite emulator, with no Azure account needed to evaluate it.', 'A later review found that product, customer and order management was open to anyone. It is now admin-only, and customers get a working Add to cart flow.'],
    },
    {
        slug: 'cyber-aware-chatbot', title: 'Cyber Aware Chatbot', subtitle: 'Teaching cybersecurity through conversation', year: '2025', role: 'Solo developer · PROG6221 (Programming 2A)',
        stack: ['C#', 'WPF', 'MVVM', '.NET 8', 'xUnit', 'Newtonsoft.Json'],
        links: [['Code', GH + 'cyber-aware-chatbot']],
        img: 'cyber-aware-chatbot.jpg', imgAlt: 'Cyber Aware Chatbot answering What is phishing?',
        metrics: [['23', 'passing xUnit tests in CI'], ['12+', 'security topics with synonyms'], ['3', 'themes: light, dark, blue']],
        problem: 'Most people learn about phishing and weak passwords only after something goes wrong. The goal was a friendly desktop app that teaches security through conversation, quizzes and small tasks.',
        built: [
            'A conversational engine that maps questions and synonyms ("2fa", "virus") to topics, with deeper answers when you type "more".',
            'Sentiment-aware replies, guided password and phishing tutorials, a quiz with points, and a security to-do list with reminders.',
            'An activity log and saved progress (JSON), in a WPF MVVM interface.',
        ],
        decisions: [
            ['Tests found a real bug', 'Greeting detection used Contains("hi"), so "What is phishing?" (p-hi-shing) got "Hi there!" instead of an answer. It now uses whole-word matching, with regression tests.'],
            ['Fixed the build', 'The greeting audio file was declared twice, which broke the build, and was embedded where the code expected a file on disk. Both are fixed.'],
        ],
        results: ['23 tests run on Windows CI on every push.', 'Grew from a console chatbot (Part 1) into a full WPF app (Part 3).'],
    },
    {
        slug: 'ascend', title: 'Ascend', subtitle: 'A personal curriculum app', year: '2026', role: 'Solo · personal tool I use every day',
        stack: ['JavaScript', 'HTML & CSS', 'GitHub Gist API', 'Web app manifest', 'GitHub Pages'],
        links: [['Live app', 'https://letlhogonolo-kgatshe.github.io/ascend/'], ['Code', GH + 'ascend']],
        img: 'ascend.jpg', imgAlt: "Ascend's Today view with the day's sessions, daily minimums and weekly targets",
        metrics: [['8 weeks', 'per learning season'], ['37', 'milestones on the data analyst path'], ['1 file', 'no framework or build step']],
        problem: 'I was learning data analytics, photography and reading from scattered notes and bookmarks, with no weekly plan and no way to see whether I was keeping up. I wanted one place that tells me what to do today, tracks what I actually did, and works on both my laptop and my phone.',
        built: [
            'A curriculum in eight-week seasons, with five views: Today, Learn, Reading, Plan and Progress.',
            'A 37-milestone path to a junior data analyst job (CV and applications, Excel, Power BI, SQL, statistics, Python, three portfolio projects), ordered by what current Cape Town job listings ask for.',
            'Weekly study targets per subject, daily minimums, streaks and a session log, so progress is measured in minutes studied and pages read.',
            'A list of upcoming Cape Town events for field trips, loaded from a data file that is refreshed every Monday.',
        ],
        decisions: [
            ['One file, no framework', 'The whole app is a single HTML file with no dependencies or build step. It loads fast and can be added to a phone home screen.'],
            ['Progress stays private', 'Everything is saved in the browser. Sync across devices is opt-in and uses a secret GitHub gist, with a token that only has the gist permission, so there is no server and no account to create.'],
            ['Content separate from code', 'Events live in events.json, so they can be refreshed weekly without touching the app.'],
        ],
        results: ['Live on GitHub Pages and in daily use since 29 October 2026.', 'Season 1 runs from 26 October to 20 December 2026.', 'The data path feeds this portfolio: its milestones include the projects and case studies shown here.'],
    },
];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const page = (p, i) => {
    const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length], next = PROJECTS[(i + 1) % PROJECTS.length];
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.title)}: ${esc(p.subtitle)} | Letlhogonolo Kgatshe</title>
  <meta name="description" content="Case study: ${esc(p.title)}, ${esc(p.subtitle)}. ${esc(p.problem.split('. ')[0])}.">
  <link rel="canonical" href="https://letlhogonolo-kgatshe.github.io/projects/${p.slug}.html">
  <meta property="og:title" content="${esc(p.title)}: ${esc(p.subtitle)}">
  <meta property="og:image" content="https://letlhogonolo-kgatshe.github.io/${p.img ? 'img/projects/' + p.img : 'profile.jpg'}">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav">
    <div class="container nav-inner">
      <a href="../index.html" class="logo">Letlhogonolo Kgatshe</a>
      <nav class="nav-links nav-links-case">
        <a href="../index.html#projects">All projects</a>
        <a href="../Letlhogonolo-Kgatshe-CV.pdf" class="btn btn-small" target="_blank" rel="noopener">CV</a>
      </nav>
    </div>
  </header>

  <main id="main" class="container case">
    <h1>${esc(p.title)}<span class="case-sub">${esc(p.subtitle)}</span></h1>
    <p class="meta case-meta">${esc(p.year)} · ${esc(p.role)}</p>
    <div class="case-links">${p.links.map(([l, h]) => `<a href="${h}" target="_blank" rel="noopener" class="btn${l === p.links[0][0] ? '' : ' btn-ghost'}">${l}</a>`).join('')}</div>
    <ul class="tags case-tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>

    <div class="case-metrics">${p.metrics.map(([v, l]) => `<div class="stat"><span class="stat-value">${esc(v)}</span><span class="stat-label">${esc(l)}</span></div>`).join('')}</div>

    ${p.img ? `<figure class="case-figure${p.imgContain ? ' case-figure-contain' : ''}"><img src="../img/projects/${p.img}" alt="${esc(p.imgAlt)}" width="800" height="500"></figure>` : ''}

    <section class="case-section"><h2>The problem</h2><p>${esc(p.problem)}</p></section>
    <section class="case-section"><h2>What I built</h2><ul class="points">${p.built.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></section>
    <section class="case-section"><h2>Key decisions</h2><div class="case-decisions">${p.decisions.map(([t, d]) => `<div class="case-decision"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div></section>
    <section class="case-section"><h2>Results</h2><ul class="points">${p.results.map((r) => `<li>${esc(r)}</li>`).join('')}</ul></section>

    <nav class="case-pager" aria-label="More projects">
      <a href="${prev.slug}.html" class="card"><span class="kicker">Previous project</span><strong>${esc(prev.title)}</strong></a>
      <a href="${next.slug}.html" class="card case-pager-next"><span class="kicker">Next project</span><strong>${esc(next.title)}</strong></a>
    </nav>
  </main>

  <footer class="container footer">
    <span>© ${new Date().getFullYear()} Letlhogonolo Kgatshe</span>
    <a href="mailto:Tlhogikgatshe@gmail.com">Tlhogikgatshe@gmail.com</a>
  </footer>
</body>
</html>
`;
};
PROJECTS.forEach((p, i) => writeFileSync(new URL(`./${p.slug}.html`, import.meta.url), page(p, i)));
console.log(`Wrote ${PROJECTS.length} case studies: ${PROJECTS.map((p) => p.slug).join(', ')}`);
