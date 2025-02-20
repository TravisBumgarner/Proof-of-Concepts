# Local Development

1. Setup XCode and Android to run with emulators
1. `yarn` Install dependencies
1. `.env`
    1. `npx cap run --list ios` Grab ios emulator
    1. `npx cap run --list android` Grab ios emulator (Only had iOS setup already so not sure the full steps here)
    1. Populate `.env` with desired values. 
1. Launch
    1. web: `yarn run dev:web`
    1. ios: `yarn run dev:ios` (Note - This will also run web)
    1. android: Not yet implemented.

# Ship to Native

1. Build iOS
    1. `yarn run build:ios`
    1.  Press Play Button in XCode.

