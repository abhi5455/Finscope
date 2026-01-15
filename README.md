# Finscope

**Track your funds with peace of mind**

A modern cross-platform mobile financial management application built with React Native, enabling users to monitor their finances seamlessly across iOS and Android devices.

---

## 🎯 Project Overview

Finscope is a personal finance tracking application designed to provide users with comprehensive financial oversight through an intuitive mobile interface. The application leverages React Native's cross-platform capabilities to deliver a consistent user experience across both iOS and Android platforms.

## 📱 Demo & Download

### Try the App
Download the latest Android APK: **[Download Finscope APK](https://drive.google.com/drive/folders/1HVVY4Q7nwJLVel52WemkyCmZxmPoW-sz?usp=sharing)**

> **Note**: Replace `YOUR_GOOGLE_DRIVE_LINK_HERE` with your actual Google Drive shareable link

### Screenshots

<div align="left">
  <img width="200" height="700" alt="FinscopeImg1" src="https://github.com/user-attachments/assets/1d6c05ac-4ec6-4668-b625-f508fc7b2108" />
  <img width="200" height="700" alt="FinscopeImg2" src="https://github.com/user-attachments/assets/ef526f15-7c8d-4375-b100-eb8d33fcbc53" />
  <img width="200" height="700" alt="FinscopeImg3" src="https://github.com/user-attachments/assets/9cbdac31-548a-48e0-beda-b8ea65fb1bce" />
  <img width="200" height="700" alt="FinscopeImg4" src="https://github.com/user-attachments/assets/94caf950-7d4d-4dfe-8995-34ff35e225df" />
</div>


## ✨ Key Features

- **Cross-Platform Compatibility**: Single codebase deployment for iOS and Android
- **Financial Tracking**: Monitor and categorize expenses and income
- **Real-time Updates**: Instant synchronization of financial data
- **Intuitive UI/UX**: Clean, user-friendly interface built with NativeWind (Tailwind CSS for React Native)
- **Secure Data Handling**: Implementation of industry-standard security practices for financial data

## 🛠️ Technology Stack

### Core Technologies
- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **React Navigation** - Routing and navigation
- **NativeWind** - Tailwind CSS integration for React Native

## 🚀 Getting Started

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/abhi5455/Finscope.git
cd Finscope
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Install iOS dependencies** (macOS only)
```bash
bundle install
cd ios
bundle exec pod install
cd ..
```

### Running the Application

#### Start Metro Bundler
```bash
npm start
# or
yarn start
```

#### Run on Android
```bash
npm run android
# or
yarn android
```

#### Run on iOS
```bash
npm run ios
# or
yarn ios
```

## 📦 Build for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
Build through Xcode or use:
```bash
npx react-native run-ios --configuration Release
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
