# 🌙 Falah Browser
### *Your Spiritual Lantern in the Digital World*

![Falah Browser Lantern](https://raw.githubusercontent.com/maifors/falah-browser/full-browser/desktop/public/lantern.png)

**Falah Browser** is a standalone, privacy-first desktop web browser (macOS, Windows, Linux) integrated with a Shariah guidance AI and a spiritual companion. It gently guides you toward content aligned with Islamic principles, reminds you of prayer times, and provides a calm space for daily reflection.

---

## ✨ Key Features

- **🛡️ AI Shariah Guidance**: Real-time page classification that whispers gentle reminders when content may not align with Islamic values.
- **🏮 Lantern Home (New Tab)**: A beautiful centerpiece featuring an animated lantern compass, daily Quranic verses/Hadiths, and a Sunnah checklist.
- **🕌 Prayer Reminders**: Never miss a prayer with automatic notifications and a live countdown based on your location.
- **🧘 Reflection Mode**: A dedicated, private space to reflect on your digital habits and purify your heart.
- **📿 Sunnah Checklist**: Track your daily Dhikr, Quran reading, and Sadaqah within your browser.

---

## 🏗️ System Requirements
- **macOS**: 11.0 (Big Sur) or later.
- **Windows**: Windows 10 or 11.
- **Python**: 3.9 or later (for local sidecar mode).
- **Node.js**: 18.x or later.

---

## 📥 Installation & Setup

### 1. Download & Install
- **macOS**: Download `FalahBrowser-1.0.0.dmg`. Drag **Falah Browser** to your `Applications` folder.
- **Windows**: Download `FalahBrowser-Setup-1.0.0.exe`. Follow the installation wizard.

### 2. Configure Your Spiritual Direction
1. Launch the browser.
2. Click the **Lantern Icon** in the toolbar.
3. Open **Settings** and set your **City** and **Country** for accurate prayer times.
4. Enable **Spiritual Reminders** to receive notifications.

### 3. Backend Setup (Local AI)
Falah uses a local sidecar process for maximum privacy:
```bash
cd backend
pip install -r requirements.txt
```
*The app will automatically spawn the AI server on launch.*

---

## 🌐 Remote AI Option
Prefer a cloud-based experience? You can connect to our hosted AI on Netlify:
- **URL**: `https://falah-api.netlify.app/classify`
- Update this in **Settings > Advanced > Backend URL**.

---

## 🛠️ For Developers

### Building from Source
```bash
# Clone the repository
git clone https://github.com/maifors/falah-browser.git
cd falah-browser/desktop

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build production binaries (.dmg, .exe)
npm run build
```

---

## 🤲 Contribution
Falah is an open-source project dedicated to the Ummah. We welcome contributions, bug reports, and suggestions for improving our guidance AI.

*"May this tool be a lantern on your path to success (Falah)."*

---

## 📄 License
This project is licensed under the MIT License.
