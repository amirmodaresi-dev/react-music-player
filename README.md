# react-music-player 🎵

`react-music-player` is a dynamic, responsive React web application designed for browsing artists and streaming songs. Built with modern React tools, it features full internationalization support (English & Persian with RTL/LTR layouts), audio playback controls, and client-side playlist management.

---

## 🚀 Features

* **Audio Player:** Global playback bar supporting Play, Pause, Next, Previous, and continuous track timeline navigation.
* **Multilingual Support (i18n):** Complete internationalization (English & Persian) with dynamic text and full RTL/LTR direction switching.
* **Favorites System:** Save and manage favorite songs easily using React Context.
* **Responsive Navigation:** Multi-page routing for Browsing Songs, Artist Profiles, Song Details, and Favorites.
* **Mock REST API Integration:** Powered by `json-server` and `Axios` for fetching music and artist metadata.

---

## 🛠️ Tech Stack

* **Frontend:** React 18, Vite, React Router DOM
* **State Management & Context:** React Context API (`FavoritesContext`)
* **Internationalization:** i18next, react-i18next
* **HTTP Client:** Axios
* **Mock Server:** JSON Server

---

## ⚙️ Getting Started

### 1. Prerequisites
Make sure you have **Node.js** installed on your machine.

### 2. Installation
Clone the repository and install the project dependencies:

```bash
git clone https://github.com/amirmodaresi-dev/react-music-player.git
cd react-music-player
npm install
```

### 3. Running the Mock Server

Start json-server on port 3001 to serve the music and artist data from db.json:

```bash
npx json-server --watch db.json --port 3001
```

### 4. Running the Development Application

In a separate terminal, launch the Vite development server:

```bash
npm run dev
```
