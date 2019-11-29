import cv2
import numpy as np

camera = cv2.VideoCapture(0)

CAMERA_WIDTH = 640
CAMERA_HEIGHT = 480

X_CENTER = int(CAMERA_WIDTH / 2)
Y_CENTER = int(CAMERA_HEIGHT / 2)
CROSSHAIR_THICKNESS = 2
CROSSHAIR_RADIUS = 15
MAX_CHANGE_PER_READING = 3
ENLARGE_MASK_BOUND_THRESHOLD_BY = 10

camera.set(cv2.CAP_PROP_FRAME_WIDTH, CAMERA_WIDTH)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, CAMERA_HEIGHT)

h_lower = 255
s_lower = 255
v_lower = 255

h_upper = 0
s_upper = 0
v_upper = 0

is_calibrating = False

print("Press the spacebar the begin and end readings.")
while True:
    lower_mask_bound = np.array([h_lower, s_lower, v_lower])
    upper_mask_bound = np.array([h_upper, s_upper, v_upper])

    _, frame = camera.read()
    frame = cv2.flip(frame, 1)
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    key = cv2.waitKey(10)
    if key == 27:
        break
    if key == ord(" "):
        if not is_calibrating:
            h_lower = 255
            s_lower = 255
            v_lower = 255

            h_upper = 0
            s_upper = 0
            v_upper = 0

            is_calibrating = True
            print("Calibrating...")
        elif is_calibrating:
            is_calibrating = False
            print("Calibration Finished.")
            print("Actual Lower and Upper Bounds:", lower_mask_bound, upper_mask_bound)
            print(
                f"Expanded each way by {ENLARGE_MASK_BOUND_THRESHOLD_BY}:",
                [x - ENLARGE_MASK_BOUND_THRESHOLD_BY for x in lower_mask_bound],
                [x + ENLARGE_MASK_BOUND_THRESHOLD_BY for x in upper_mask_bound],
            )

    if is_calibrating:
        h_reading, s_reading, v_reading = hsv[X_CENTER, Y_CENTER]

        if h_reading < h_lower:
            h_lower -= min(abs(h_lower - h_reading), MAX_CHANGE_PER_READING)
        if h_reading > h_upper:
            h_upper += min(abs(h_upper - h_reading), MAX_CHANGE_PER_READING)

        if s_reading < s_lower:
            s_lower -= min(abs(s_lower - s_reading), MAX_CHANGE_PER_READING)
        if s_reading > s_upper:
            s_upper += min(abs(s_upper - s_reading), MAX_CHANGE_PER_READING)

        if v_reading < v_lower:
            v_lower -= min(abs(v_lower - v_reading), MAX_CHANGE_PER_READING)
        if v_reading > v_upper:
            v_upper += min(abs(v_upper - v_reading), MAX_CHANGE_PER_READING)

        if h_lower == h_upper or s_lower == s_upper or v_lower == v_upper:
            # cv2.inRange will fail if lower == upper. As calibration first starts, these numbers will collide.
            continue

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

    concatenate_images = np.concatenate((frame, res), axis=1)
    cv2.imshow("Calibration", concatenate_images)

cv2.destroyAllWindows()
