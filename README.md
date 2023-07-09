## Check the App: https://expo.dev/@dev_leena/accessride-user
## Demo Video of App: https://www.youtube.com/watch?v=_LFAOy8A7iE&ab_channel=AnkeshBanerjee

# Get Started with Expo
To use Expo, you need to have the following tools installed on your machine:

1. Node.js LTS release - Only Node.js LTS releases (even-numbered) are recommended.
As Node.js officially states, "Production applications should only use Active LTS or Maintenance LTS releases". You can install Node.js using a version management tool (such as nvm or volta or any other of your choice) to switch between different Node.js versions.
2. Git for source control.
3. Watchman (for Linux or macOS users).
   
 After installing Node.js, you can use npx to create a new app with this command:
 
 npx create-expo-app --template   

## Expo CLI
Expo CLI is part of the expo package, and you can use it by leveraging npx — a Node.js package runner. To start your app, open the terminal on your development machine and run the npx expo command:

npx expo


## Expo Go
Now that Expo CLI is working, in the next step, let's learn about one of the fastest ways to test your project using Expo Go.Expo Go is a free, open-source client for testing React Native apps on Android and iOS devices without building anything locally. It allows you to open up apps served through Expo CLI and run your projects faster when developing them.
Install Expo Go on your device
It is available on both the Android Play Store and iOS App Store.

Android Play Store - Android Lollipop (5) and greater
iOS App Store - iOS 13 and greater

## How it works
Expo Go is a native app that is installed on your device. When you run npx expo start in your project, Expo CLI starts a development server and generates a QR code. You can then open the Expo Go app on your device and scan the QR code to connect to the dev server.


npx expo start
