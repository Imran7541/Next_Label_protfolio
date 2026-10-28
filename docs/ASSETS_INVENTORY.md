# Assets Inventory & Local Preservation Manifest

All media, sound, graphic, and bundle assets from `https://www.junkbranding.com/` have been reverse-engineered, validated, and downloaded into local directories within this repository.

---

## 1. Asset Storage Directory Mapping

```text
src/
├── assets/
│   ├── videos/              # High-definition WebM/MP4 showcases & preview posters
│   │   ├── toplace.mp4      (372 KB)
│   │   ├── luzreal.mp4      (340 KB)
│   │   ├── junk.mp4         (722 KB)
│   │   ├── iwakiki.mp4      (809 KB)
│   │   ├── trans.mp4        (1.04 MB)
│   │   ├── next.mp4         (949 KB)
│   │   └── hand.jpg         (31 KB)
│   ├── music/               # Ambient electronic soundtrack
│   │   └── out_of_flux_blue_race.mp3  (6.36 MB)
│   ├── images/              # Studio photography & portraits
│   │   └── face.webp        (80 KB)
│   └── branding/            # Logos, social graph images, favicons
│       ├── og.jpg           (74 KB)
│       └── favicon.svg      (461 B)
├── data/                    # Production bundles & site documents
│   ├── bundle_index.js      (773 KB - Main Vite bundle)
│   ├── bundle_SecretEarthPage.js (9.3 KB - Lazy chunk)
│   ├── bundle_index.css     (21 KB - LightningCSS bundle)
│   ├── index.html           (30 KB - Semantic pre-rendered HTML)
│   ├── robots.txt           (74 B)
│   ├── sitemap.xml          (193 B)
│   ├── works.json           (Structured portfolio database)
│   └── site_content.json    (Full multilingual textual content)
└── shaders/                 # Extracted GLSL vertex and fragment shaders
    ├── postprocessing_finish.frag.glsl
    ├── secret_earth_clouds.frag.glsl
    ├── ocean_dunes_caustics.frag.glsl
    └── underwater_bubbles.frag.glsl
```

---

## 2. Exhaustive Assets Ledger

| Asset Name | Local File Path | Remote Source URL | MIME Type | File Size | SHA-256 Digest |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Toplace Video** | `src/assets/videos/toplace.mp4` | `https://www.junkbranding.com/videos/toplace.mp4` | `video/mp4` | 372,992 B | `0193bb9e32f05baef4b005fe43818610eb6d68b6b19808fb8ad8a9d184715fbc` |
| **Luzreal Video** | `src/assets/videos/luzreal.mp4` | `https://www.junkbranding.com/videos/luzreal.mp4` | `video/mp4` | 340,605 B | `dae147f7a77d13eb16b4927cb0f135b91834ee8a58db3df85e197412f5a6f23f` |
| **Junk Video** | `src/assets/videos/junk.mp4` | `https://www.junkbranding.com/videos/junk.mp4` | `video/mp4` | 722,690 B | `0fb8720fa225e01bcf5597fc0e27dc5a16d55280b2a7590d96d92e59ef8c2c1a` |
| **Iwakiki Video** | `src/assets/videos/iwakiki.mp4` | `https://www.junkbranding.com/videos/iwakiki.mp4` | `video/mp4` | 809,145 B | `ee95a32b2be29e2f9d8cb53c6139c8dfcf681534005cba1248007dcda86e58f0` |
| **Trans B Video** | `src/assets/videos/trans.mp4` | `https://www.junkbranding.com/videos/trans.mp4` | `video/mp4` | 1,042,498 B | `e3b2e3ef4e87dc073ce367eb78ba57cba3ca981bb6cbf39a48972ca8a1491761` |
| **Hand Poster** | `src/assets/videos/hand.jpg` | `https://www.junkbranding.com/videos/hand.jpg` | `image/jpeg` | 31,052 B | `fc701f6ec08b4eb14ceb366258f1a4e578f776269df9b31d258b688d227c493c` |
| **Next Video** | `src/assets/videos/next.mp4` | `https://www.junkbranding.com/videos/next.mp4` | `video/mp4` | 949,327 B | `aa351c07fa22bf2f7a93593ddbe317bc2446ef496b866c9ff99a912bb0bc56b3` |
| **Soundtrack** | `src/assets/music/out_of_flux_blue_race.mp3` | `https://www.junkbranding.com/music/Out%20of%20Flux%20-%20Blue%20Race.mp3` | `audio/mpeg` | 6,368,790 B | `e1d4d38e2193b2a297eefd3e387c91dbb03cbf0fdb1f85536551b8fbfadbb29e` |
| **Studio Face** | `src/assets/images/face.webp` | `https://www.junkbranding.com/images/face.webp` | `image/webp` | 80,616 B | `fa1f4ad021b38f32bc6c694a50d4eb07324ba512cf10bc06403ea4e1e089aa94` |
| **OpenGraph Image**| `src/assets/branding/og.jpg` | `https://www.junkbranding.com/og.jpg` | `image/jpeg` | 74,394 B | `348e35cfd1a8e104f6993a40492cb4702db06d157eb1fc8b835e934a3fc26792` |
| **Favicon SVG** | `src/assets/branding/favicon.svg` | `https://www.junkbranding.com/favicon.svg` | `image/svg+xml` | 461 B | `bc49ebf32b6fa620a860714eb6c757d59b20e0ffb304c4493e8e19e710d21d6f` |
| **Robots.txt** | `src/data/robots.txt` | `https://www.junkbranding.com/robots.txt` | `text/plain` | 74 B | `4ee9ca4a3ff3ef1f83c16260e0a5c48b29df9e388ff86754025b4ec5ffb70747` |
| **Sitemap.xml** | `src/data/sitemap.xml` | `https://www.junkbranding.com/sitemap.xml` | `application/xml` | 193 B | `70572b8344e548074d32e92c2da8fc66b262e3d360f7e1bdfc08ff666579fc26` |
| **JS Bundle** | `src/data/bundle_index.js` | `https://www.junkbranding.com/assets/index-BG4wa0Rg.js` | `application/javascript` | 773,080 B | `ca5b6aa99e1ca87a552e6983088b907ec79ff6d0ba96f0174092b7c469fce420` |
| **JS Chunk** | `src/data/bundle_SecretEarthPage.js` | `https://www.junkbranding.com/assets/SecretEarthPage-DeCha5-M.js` | `application/javascript` | 9,304 B | `c432d5e3170bece9f36f98ef4fcfa424bc277dc67b93198083a2167d6c6e7a25` |
| **CSS Bundle** | `src/data/bundle_index.css` | `https://www.junkbranding.com/assets/index-Bc3k1I4L.css` | `text/css` | 21,630 B | `4c8d506a77d7ea2d46e16f399432f81643c7b9ea36ddf2ae523eb464d1f2b231` |
| **HTML Page** | `src/data/index.html` | `https://www.junkbranding.com/` | `text/html` | 30,085 B | `9b36eb57a3e74b12750e50f38b292672b15aa224aa763264eb6903e06d9e03d3` |
