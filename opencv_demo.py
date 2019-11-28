import numpy as np
import cv2


WIDTH = 320
HEIGHT = 240
camera = cv2.VideoCapture(1)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, WIDTH)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, HEIGHT)
# img = cv2.imread('shapes.png')

ret, frame = camera.read()
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

ret, thresh = cv2.threshold(gray, 127, 255, 1)

contours, h = cv2.findContours(thresh, 1, 2)

for cnt in contours:
    approx = cv2.approxPolyDP(cnt, 0.01 * cv2.arcLength(cnt, True), True)
    print(len(approx))
    if len(approx) == 5:
        print("pentagon")
        cv2.drawContours(frame, [cnt], 0, 255, -1)
    elif len(approx) == 3:
        print("triangle")
        cv2.drawContours(frame, [cnt], 0, (0, 255, 0), -1)
    elif len(approx) == 4:
        print("square")
        cv2.drawContours(frame, [cnt], 0, (0, 0, 255), -1)
    elif len(approx) == 9:
        print("half-circle")
        cv2.drawContours(frame, [cnt], 0, (255, 255, 0), -1)
    elif len(approx) > 15:
        print("circle")
        cv2.drawContours(frame, [cnt], 0, (0, 255, 255), -1)

cv2.imshow("img", frame)
cv2.waitKey(0)
cv2.destroyAllWindows()
