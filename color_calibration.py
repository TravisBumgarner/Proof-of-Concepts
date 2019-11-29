import cv2
import numpy as np

camera = cv2.VideoCapture(0)

CAMERA_WIDTH = 320
CAMERA_HEIGHT = 240

X_CENTER = int(CAMERA_WIDTH / 2)
Y_CENTER = int(CAMERA_HEIGHT / 2)
CROSSHAIR_THICKNESS = 2
CROSSHAIR_RADIUS = 15

camera.set(cv2.CAP_PROP_FRAME_WIDTH, CAMERA_WIDTH)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, CAMERA_HEIGHT)


while 1:

    _, frame = camera.read()

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    print(hsv[X_CENTER, Y_CENTER])
    # define range of blue color in HSV
    lower_mask_bound = np.array([90, 180, 200])
    upper_mask_bound = np.array([110, 255, 255])

    # Threshold the HSV image to get only blue colors
    mask = cv2.inRange(hsv, lower_mask_bound, upper_mask_bound)

    # Bitwise-AND mask and original image
    res = cv2.bitwise_and(frame, frame, mask=mask)

    cv2.line(
        frame,
        (X_CENTER - CROSSHAIR_RADIUS, Y_CENTER),
        (X_CENTER + CROSSHAIR_RADIUS, Y_CENTER),
        (0, 0, 0),
        CROSSHAIR_THICKNESS,
    )
    cv2.line(
        frame,
        (X_CENTER, Y_CENTER - CROSSHAIR_RADIUS),
        (X_CENTER, Y_CENTER + CROSSHAIR_RADIUS),
        (0, 0, 0),
        CROSSHAIR_THICKNESS,
    )
    cv2.imshow("frame", frame)
    cv2.imshow("mask", mask)
    cv2.imshow("res", res)
    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        break

cv2.destroyAllWindows()
