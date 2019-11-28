import numpy as np
import cv2
import pygame
from pygame.locals import *

WIDTH = 320
HEIGHT = 240

cap = cv2.VideoCapture(1)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, WIDTH)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, HEIGHT)
pygame.init()
pygame.display.set_caption("OpenCV camera stream on Pygame")
screen = pygame.display.set_mode([WIDTH, HEIGHT])

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Our operations on the frame come here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # img = cv2.line(gray, (0, 0), (511, 511), (255, 0, 0), 5)
    ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
    # Display the resulting frame
    cv2.imshow("frame", thresh)

    screen.fill([125, 0, 0])
    # screen.blit(frame, (0, 0))
    pygame.display.update()

    # Draw a diagonal blue line with thickness of 5 px
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
