# Setup

Make temp readings from a Particle Boron available to a React frontend via an Express backend.

## Backend

1. `yarn` install dependencies
2. `yarn start`
3. Select `PORTS` tab in Visual Studio Code Terminal and port forward to `5005` Make sure port is set to PUBLIC. (Probs a security issue, don't leave open forever lol.)

## Boron

1. Navigate to https://console.particle.io/ and select Devices and then Integrations then `Add New Integration`
2. Select `Webhook`
 - Event Name is `tempF`
 - Enter in URL from step 3 of Backend setup, append `/data`
 - Request type is POST
 - Request format is JSON
 - Select Device (Read elsewhere to setup device)
3. Copy code from `boron/main.c` into text editor and upload to device at https://build.particle.io/

## Frontend

1. `yarn` install dependencies
2. `yarn start`

