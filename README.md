# Talks Repository

👋🏻 Hi I'm Christopher Tineo, but you can call me Chris.

I'm a software engineer and I feel very passionate about open source and cloud native technologies.

I share my knowledge and experiences through talks and presentations at conferences and meetups.

So far, I've been a member of:

- Cloud Native Santo Domingo
- KCD New York

But I'm always open to join new communities.

🔗 Connect with me on [LinkedIn](https://www.linkedin.com/in/christopher-tineo/).

## Talks

To add a new session, add an entry to [`talks.json`](talks.json) and push to `main` — this table
regenerates automatically (see [`.github/workflows/update-readme.yml`](.github/workflows/update-readme.yml)).

<!-- TALKS:START -->
| Event | Title | Slides | Date |
| :--- | :--- | :--- | :--- |
| Coffee & Code Philly | Cloud Native & Kubernetes 101 | [HTML](https://tineoc.github.io/talks/cloud-native-k8s-101/) · [Lab](https://killercoda.com/tineoc/scenario/cloud-native-k8s-101) | July 2026 |
| SRE Day 2026 Q2 | This is fine: The Real Cost of "Free" Software | [HTML](https://tineoc.github.io/talks/sre-day-2026-q2/) · [PDF](slides/sre-day-2026-q2/sre-day-2026-q2.pdf) | Summer 2026 |
| Private Class at INTEC University | Masterclass Cloud Native & Open Source | [Slides](https://docs.google.com/presentation/d/11xAC6LqOMyUr9ii3dzjZQA94KfVtkNqQM2LYf67qJOw/edit?usp=sharing) | January 2026 |
| KCD NY 2025 | Empowering Cloud Native Development | [PDF](slides/ChristopherTineo_Empowering_Cloud_Native_Development_KCDNY2025.pdf) | Summer 2025 |
<!-- TALKS:END -->

Companion hands-on lab for Cloud Native & Kubernetes 101: [cloud-native-k8s-101-lab](https://github.com/TineoC/cloud-native-k8s-101-lab).

---

## How to Consume the Slide Decks

If you scanned a slides QR code at one of my presentations or are browsing this repository, here is how you can open and consume the slides:

### 📄 PDF Version (Best for Quick View & Mobile)
Click any of the **PDF** links in the table above. 
- The QR codes displayed at the end of my presentations point directly to these PDFs so you can save them and read them offline on any smartphone, tablet, or computer.

### 🌐 Interactive HTML Version (Best for Widescreen & Presenting)
Click any of the **HTML** links in the table above to open the slide deck directly in your browser. Since these are built using **Reveal.js**, you can interact with them using the following controls:
- **`Space` or `Arrow Keys`**: Go to the next or previous slide.
- **`T` key**: Toggle between **Dark Terminal** mode and **Light Cream** mode (high contrast).
- **`S` key**: Open the **Speaker Notes** window to view timing cues, detailed statistics, and extra background research.
- **`F` key**: View the presentation in fullscreen mode.
- **`Esc` key**: Toggle the grid-based slide overview map for fast jumping.

#### Running HTML Slides Locally
To run and view the HTML slides locally with all assets and interactive plugins functioning correctly:
1. Clone this repository:
   ```bash
   git clone https://github.com/TineoC/talks.git
   cd talks
   ```
2. Start a simple local web server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open [http://localhost:8000/slides/sre-day-2026-q2/index.html](http://localhost:8000/slides/sre-day-2026-q2/index.html) in your web browser.
