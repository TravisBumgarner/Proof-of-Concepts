# Setup

1. Indetify the chip used with your Arduino and replace it in the `format.sh` file. (The Arduino Mega uses `atmega16u2`
2. Write code you'll want to use with your Arduino and upload it from the Arduino IDE
3. Short the required pins. (The two pins directly to the right of `JP5` on the Arduino Mega is what I needed.) 
4. Run `./format keyboard`
5. Reconnect the Arduino, it should know function as a keyboard.
6. To upload new code - repeat step 3, run `./format arduino`, repeat step 5, repeat step 2. 

# Requirements

- `brew install dfu-programmer` 

# Resources
- https://www.lightroomqueen.com/keyboard-shortcuts/lrcc6/
- https://www.arduino.cc/en/Hacking/DFUProgramming8U2
- https://www.google.com/search?q=reset+16u2&rlz=1C5CHFA_enUS887US889&oq=reset+16u2&aqs=chrome..69i57j0.2767j0j4&sourceid=chrome&ie=UTF-8#kpvalbx=_QFfAXt-rGNOwytMPlMitwA424
- https://www.youtube.com/watch?v=wTbjmulNSlw
- https://github.com/BlitzCityDIY/arduinoMacroKeyboard
- https://www.usb.org/sites/default/files/documents/hut1_12v2.pdf
- http://mitchtech.net/arduino-usb-hid-keyboard/
