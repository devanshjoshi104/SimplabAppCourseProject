# SimplabAppCourseProject
Simplab helps students to perform their **physics textbook experiments virtually**.
It aims to give practical knowledge to students who don't have access to good laboratories in their school.
The idea also covers the current situation of **COVID-19** as Simplab can also be used by any school or university to provide a virtual physics lab to their students and teachers.

## What exactly Simplab is?
Simplab in simple words is simply a virtual platform to simulate physics experiments, which offers the following features-
- All simualtions has some initial setup like to perform `current and electricity` experiments, it has a battery, a voltmeter etc.
- All the component will be connected, no efforts needed to coonect anything.
- A student can change the parameters and select from over a wide range of variables.
- Run simulation, ofcourse!
- Teacher/instructor can check the progress of any student in real-time.
- It supports RTC, so the teacher/instructor could easily comunicates with their students through chat/voice.

## What problem does Simplab solve?
- Due to **COVID-19**, most schools and universities are shut, resulting in a lack of practical knowledge from lab experiments.

## How to Setup Simplab on your Device
### Installing dependencies
You will need Node, the React Native command line interface, a JDK, and Android Studio.
You will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.
#### Node, JDK
We recommend installing Node via Chocolatey, a popular package manager for Windows.

If you want to be able to switch between different Node versions, you might want to install Node via nvm-windows, a Node version manager for Windows.

React Native also requires Java SE Development Kit (JDK), which can be installed using Chocolatey as well.

Open an Administrator Command Prompt (right click Command Prompt and select "Run as Administrator"), then run the following command:
```
choco install -y nodejs.install openjdk8
```
If you have already installed Node on your system, make sure it is Node 12 or newer. If you already have a JDK on your system, make sure it is version 8 or newer.

### Android development environment

Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

#### 1. Install Android Studio
Download and install Android Studio. While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device
- If you are not already using Hyper-V: Performance (Intel ® HAXM) (See here for AMD or Hyper-V)

Then, click "Next" to install all of these components.

#### 2. Install the Android SDK
Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 10 (Q) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "Configure" button and select "SDK Manager".

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 10 (Q) entry, then make sure the following items are checked:

- Android SDK Platform 29"\n"
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 29.0.2 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#### 3. Configure the ANDROID_HOME environment variable
The React Native tools require some environment variables to be set up in order to build apps with native code.

- Open the Windows Control Panel.
- Click on User Accounts, then click User Accounts again
- Click on Change my environment variables
- Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK:

You can find the actual location of the SDK in the Android Studio "Settings" dialog, under Appearance & Behavior → System Settings → Android SDK.

Open a new Command Prompt window to ensure the new environment variable is loaded before proceeding to the next step.

- Open powershell
- Copy and paste Get-ChildItem -Path Env:\ into powershell
- Verify ANDROID_HOME has been added

#### 4. Add platform-tools to Path
- Open the Windows Control Panel.
- Click on User Accounts, then click User Accounts again
- Click on Change my environment variables
- Select the Path variable.
- Click Edit.
- Click New and add the path to platform-tools to the list.

### Running React native application
Run the following commands:
- Clone the repo
```
git clone https://github.com/Anikait143/Simplab.git
```
- Change directory to simplab/Simplab_App
```
cd simplab/Simplab_App
```
- To install dependencies
```
npm install
```
- Plug in your physical device in to your computer using a USB cable and run
```
npx react-native run-android
```


