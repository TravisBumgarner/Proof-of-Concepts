if [ "$1" == "arduino" ]; then
	sudo dfu-programmer atmega16u2 erase;
	sudo dfu-programmer atmega16u2 flash --debug 1 Arduino-usbserial-uno.hex;
	sudo dfu-programmer atmega16u2 reset;
fi
if [ "$1" == "keyboard" ]; then
        sudo dfu-programmer atmega16u2 erase;
        sudo dfu-programmer atmega16u2 flash --debug 1 Arduino-keyboard-0.3.hex;
        sudo dfu-programmer atmega16u2 reset;
fi
echo "Replug Arduino"
