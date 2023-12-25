### Running this example

1. Install dependencies `npm i`
2. Change the host address to your local IP
   2. Run `npm ipconfig getifaddr en0`
   3. Replace `192.168.100.3` in `server.js`, `reproduce-bug.js` and `capacitor.config.json` files to you local IP
4. Run backend server `npm run start-server`
5. Build project `npm run build`
6. Sync and run Android `npx cap sync android && npx cap run android`
7. Choose any emulator
8. Open `chrome://inspect` in Google Chrome and click Inspect on the emulator
9. Click the button in the app to see that the last (XMLHttpRequest) doesn't work with `content-type` header. 

