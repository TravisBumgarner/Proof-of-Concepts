# import numpy as np
# import cv2


# WIDTH = 320
# HEIGHT = 240

# cam = cv2.VideoCapture(1)
# cam.set(cv2.CAP_PROP_FRAME_WIDTH, WIDTH)
# cam.set(cv2.CAP_PROP_FRAME_HEIGHT, HEIGHT)
# while True:
#     ret_val, img = cam.read()
#     hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
# print(img[int(WIDTH / 2), int(HEIGHT / 2)])
#     cv2.imshow("my webcam", img)
#     if cv2.waitKey(1) == 27:
#         break  # esc to quit
# cv2.destroyAllWindows()


import cv2
import numpy as np

cap = cv2.VideoCapture(1)

WIDTH = 320
HEIGHT = 240

cap.set(cv2.CAP_PROP_FRAME_WIDTH, WIDTH)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, HEIGHT)

while 1:

    # Take each frame
    _, frame = cap.read()

    # Convert BGR to HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    print(hsv[int(WIDTH / 2), int(HEIGHT / 2)])
    # define range of blue color in HSV
    lower_blue = np.array([90, 180, 200])
    upper_blue = np.array([110, 255, 255])

    # Threshold the HSV image to get only blue colors
    mask = cv2.inRange(hsv, lower_blue, upper_blue)

    # Bitwise-AND mask and original image
    res = cv2.bitwise_and(frame, frame, mask=mask)

    cv2.imshow("frame", frame)
    cv2.imshow("mask", mask)
    cv2.imshow("res", res)
    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        break

cv2.destroyAllWindows()
