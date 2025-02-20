# Local Development

1. Setup XCode and Android Studio to run with emulators
1. `yarn` Install dependencies
1. `.env`
    1. `npx cap run --list ios` Grab ios emulator
    1. `npx cap run --list android` Grab android emulator 
    1. Populate `.env` with desired values. 
1. Launch
    1. web: `yarn run dev:web`
    1. ios: `yarn run dev:ios` (Note - This will also run web)
    1. android: `yarn run dev:android` (Note - This will also run web, takes a bit of time to initially load)

# Ship to Native

1. Build iOS
    1. `yarn run build:ios`
    1.  Press Play Button in XCode.

