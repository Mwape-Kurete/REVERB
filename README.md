<img width="2779" height="865" alt="GBANNER" src="https://github.com/user-attachments/assets/3b723496-d696-4f08-9df0-c8516985d750" />

<h4 align="center">An audio journaling mobile app</h4>

---

# REVERB

<details>
<summary>📑 <strong>Table of Contents</strong> (Click to expand)</summary>

1. [**About The Project**](#about-the-project)  
   ↳ 1.1 [Project Description](#11-project-description)  
   ↳ 1.2 [Built With](#12-built-with)  
2. [**Getting Started**](#getting-started)  
   ↳ 2.1 [Prerequisites](#21-prerequisites)  
   ↳ 2.2 [How to Install](#22-how-to-install)  
3. [**Features & Usage**](#features--usage)  
4. [**Demonstration**](#demonstration)  
5. [**Highlights & Challenges**](#highlights--challenges)  
6. [**Roadmap & Future Implementations**](#roadmap--future-implementations)  
7. [**Contributing & Licenses**](#contributing--licenses)  
8. [**Authors & Contact Info**](#authors--contact-info)  
9. [**Acknowledgements**](#acknowledgements)  
</details>

---

## About The Project   
Making journaling fun and effortless through voice

### 1.1 Project Description 
**REVERB** is a mobile audio journaling app that empowers users to capture their thoughts, emotions, and reflections through voice recordings. It simplifies the journaling process by allowing users to record, tag moods, associate songs, and create meaningful audio entries that can be revisited over time.

Built with React Native and Expo for a smooth, cross-platform mobile experience, REVERB focuses on:

- **Audio Recording:** High-quality, easy-to-use recording features with a dynamic UI.  
- **Song Association:** Users can search and associate songs with their entries to enhance emotional context.  
- **Mood Tracking:** Attach moods and reflections to each recording for holistic journaling insights.  
- **Timeline & Playback:** Easily browse and play back past recordings via an intuitive timeline.

REVERB helps users connect with their memories and emotions in a seamless, engaging way.

### 1.2 Built With 

**Frontend**  
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)

**Backend & APIs**  
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) ![Last.fm API](https://img.shields.io/badge/Last.fm-DC0A0A?style=for-the-badge&logo=lastdotfm&logoColor=white)

---

## Getting Started

### 2.1 Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white) Version 18 or higher  
- ![Expo CLI](https://img.shields.io/badge/Expo_CLI-000000?style=flat-square&logo=expo&logoColor=white) Installed globally (`npm install -g expo-cli`)

> 💡 Recommended: Use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions efficiently.

### 2.2 How to Install 
1. Clone the repository:
   ```
   git clone https://github.com//Mwape-Kurete/REVERB.git
   cd reverb-app
   ```
2. Install dependencies:
   ```
   npm install
   ```
4. Run the app:
   ```
   npm run start
   ```
   Run on your device or emulator via Expo Go.
---

## Features & Usage

### Core Features

- 🎙️ **Audio Recording & Playback:** Record and playback journal entries with simple controls.  
- 🎵 **Song Search & Association:** Integrate Last.fm API for searching and tagging songs.  
- 😌 **Mood & Reflection Tagging:** Add emotional context to each recording.  
- 📅 **Timeline View:** Browse recordings chronologically with playback capabilities.

---
## Demonstration
link to the demonstration video -> [Demo Video Link](https://drive.google.com/file/d/1qWJTB9itqY_CgXoGRsSUDAn0Vy0U3gCP/view?usp=sharing)

### Final Mobile UI Design 
<img width="2250" height="1688" alt="8" src="https://github.com/user-attachments/assets/73ec6e68-fb90-4e4c-be44-bf7f1475d736" />
<img width="2250" height="1688" alt="7" src="https://github.com/user-attachments/assets/659ff30c-a1cc-454c-adf0-90deaf0fe19f" />
<img width="2250" height="1688" alt="6" src="https://github.com/user-attachments/assets/7e22d02d-b41e-4eab-98cf-2132f66e557b" />
<img width="2250" height="1688" alt="5" src="https://github.com/user-attachments/assets/736c8c4a-febb-4da0-951f-41a6f032cab8" />
<img width="2250" height="1688" alt="4" src="https://github.com/user-attachments/assets/5c281a93-af17-4915-9cae-f27ab6db539c" />
<img width="2250" height="1688" alt="3" src="https://github.com/user-attachments/assets/91f46e5c-5eec-423d-8f45-a3fd9055f091" />
<img width="2250" height="1688" alt="2" src="https://github.com/user-attachments/assets/72f6d9d2-c7e0-4275-9643-eef9ddb10c7d" />
<img width="2250" height="1688" alt="1" src="https://github.com/user-attachments/assets/a4e46d8a-ab3f-41b7-84a4-bdfb347c4dee" />


## Highlights & Challenges
Throughout the development of the CC School Management System 

### Highlights 
| Feature              | Highlights                                         |
|----------------------|--------------------------------------------------|
| Audio Recording      | Made easy with Expo-audio to achieve high-quality audio  |
| Audio Recording Animation     | This reusable component made feedback screens and UI feel seamless and immersive   |
| Song Search API      | Last.fm integration for music tagging    |
| Mood Tagging         | Attach emotional states to each entry             |
| Playback Timeline    | Smooth navigation and playback of past recordings, easily delete audio with an on-hold feature      |

### Challenges
| Feature              | Challenges                                        |
|----------------------|--------------------------------------------------|
| Audio Playback       | Updates to Expo-audio meant restructuring code slightly to ensure it was up to date and functional    |
| API Integration      | Initial Last.fm integration       |
| Recording Animation  | Making this thematic and a usable component came with challenges  |
| Data Sync            | Sync between local & cloud audio storage and managing Firebase Storage limits with custom contexts & hooks |

## Roadmap & Future Implementations

- Smart Notifications for journaling reminders  
- Sentiment Analysis from voice recordings & reflection quiz to deepen introspective learning
- Cross-device Cloud Sync and Backup  
- Social Sharing of journal entries  
- AI-generated playback summaries
- Spotify playlist creation based on a smart weekly summary

---

## Contributing & Licenses
> This project was developed as part of a university course requirement and is currently private and non-commercial.  
No external contributions are being accepted at this time. 

## Author & Contact Info
Built with ❤️ by: [Mwape Kurete](https://github.com//Mwape-Kurete)

---

## 🎶 The Coding Vibes

While building REVERB, I often listened to this awesome Spotify playlist to stay inspired:

[Spotify Playlist](https://open.spotify.com/playlist/34GTY7rng3MytqBKudSfBw?si=8b59d08508aa412d) — enjoy the tunes that inspired the app!
  
## Acknowledgements 
Special thanks to:
- **React-Native** and the open-source community
- **Expo** for powerful cross-platform mobile tooling
- **Last.Fm API** 
