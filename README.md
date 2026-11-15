# Student Productivity App

A full-stack cross-platform mobile application built with **React Native (Expo)**, **Zustand**, **Node.js**, **Express**, and **MongoDB** to help students organize daily tasks and class schedules in one place.

## App Demo

https://github.com/user-attachments/assets/e6cff63f-bbbb-4cb7-9df1-553632a65257

## Download & Install (Android APK)

Want to test the app directly on an Android device without setting up a local environment?

1. Download **`Student-Productivity-v1.0.0.apk`** from the [**Latest Release**](../../releases/latest).
2. Open the downloaded file on your Android phone and tap **Install** (if prompted, tap **Settings → Allow from this source**).
3. Enter any name, email, and password on the login screen to create a local session and explore the dashboard.

> **Note on Cold Starts:** The backend REST API is hosted on Render's free tier (`https://student-productivity-backend-vcnn.onrender.com`). After 15 minutes of inactivity, the server spins down—so your very first request after opening the app may take **~50 seconds** to wake the server up.

## Key Features

- **Task Management:** Create, view, and manage daily to-dos with real-time persistence in a cloud MongoDB database.
- **Class Schedule Tracking:** Keep track of daily subjects and class routines cleanly separated from tasks.
- **Persistent Client-Side Sessions:** Built with `AsyncStorage` so users stay logged in across app restarts without needing to re-enter credentials.
- **Reactive Global State:** Powered by `Zustand` for lightweight, predictable state synchronization across screens.
- **Cloud-Hosted REST API:** Connected to a live Express + Mongoose backend ([Backend Repository](https://github.com/Rashigarg-gif/Student-productivity-backend)).

## Tech Stack

- **Frontend:** React Native, Expo, Zustand, AsyncStorage
- **Backend:** Node.js, Express.js, Mongoose ([`Student-productivity-backend`](https://github.com/Rashigarg-gif/Student-productivity-backend))
- **Database:** MongoDB
- **Deployment & Build:** Render (Backend Hosting), Expo Application Services / EAS (Standalone Android `.apk` Build)

## Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rashigarg-gif/Student-productivity.git
   cd Student-productivity
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npx expo start
   ```
   Scan the QR code in your terminal using **Expo Go** on Android or iOS, or press `a` to launch on an Android emulator.
