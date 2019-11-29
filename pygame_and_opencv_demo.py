# import the necessary packages
from collections import deque
from imutils.video import VideoStream
import numpy as np
import argparse
import cv2
import imutils
import time
import pygame
import random

SCREEN_WIDTH = 700
SCREEN_HEIGHT = 400
FPS = 30
BLACK = (0, 0, 0)
GREEN = (0, 128, 0)
WEBCAM_HEIGHT = 400
paddle_location_as_percentage = 0

class Paddle(pygame.sprite.Sprite):
    def __init__(self, side, color, width, height):
        super().__init__()

        self.image = pygame.Surface([width, height])
        self.image.fill(GREEN)
        self.rect = self.image.get_rect()
        self.side = side
        self.reset_position()

    def reset_position(self):
        self.rect.x = 5 if self.side == "left" else SCREEN_WIDTH - (5 + self.rect.width)
        self.rect.y = (SCREEN_HEIGHT / 2) - self.rect.height / 2

    def update(self):
        """ Called each frame. """
        # x, y = pygame.mouse.get_pos()
        self.rect.y = (paddle_location_as_percentage * SCREEN_HEIGHT)- self.rect.height / 2


class Pong(pygame.sprite.Sprite):
    def __init__(self, color, width, height):
        super().__init__()

        self.image = pygame.Surface([width, height])
        self.image.fill(GREEN)
        self.rect = self.image.get_rect()
        self.reset_position()

    def get_random_velocity(self):
        polarity = 1 if random.random() < 0.5 else -1
        magnitude = random.randint(1, (SCREEN_WIDTH + SCREEN_HEIGHT) / 100)

        return polarity * magnitude

    def reset_position(self):
        self.rect.x = (SCREEN_WIDTH / 2) - self.rect.width / 2
        self.rect.y = (SCREEN_HEIGHT / 2) - self.rect.height / 2
        self.x_velocity = self.get_random_velocity()
        self.y_velocity = self.get_random_velocity()

    def update(self):
        """ Called each frame. """
        self.rect.x += self.x_velocity
        self.rect.y += self.y_velocity

        if self.rect.y <= 0 or self.rect.y >= SCREEN_HEIGHT - self.rect.height:
            self.y_velocity = -self.y_velocity

        if self.rect.x >= SCREEN_WIDTH - self.rect.width:
            self.x_velocity = -self.x_velocity

    def handle_collision(self):
        self.x_velocity = -self.x_velocity

    def has_lost(self):
        return self.rect.x <= 0 or self.rect.x >= SCREEN_WIDTH

    def is_collided_with(self, sprite):
        return self.rect.colliderect(sprite.rect)

pygame.init()
screen = pygame.display.set_mode([SCREEN_WIDTH, SCREEN_HEIGHT])
all_sprites_list = pygame.sprite.Group()

font_name = pygame.font.match_font("arial")
pygame.display.set_caption('Digi Fisi')

def draw_text(surf, text, size, x, y):
    font = pygame.font.Font(font_name, size)
    text_surface = font.render(text, True, GREEN)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    surf.blit(text_surface, text_rect)


done = False

clock = pygame.time.Clock()

pong = Pong(color=GREEN, width=20, height=20)
all_sprites_list.add(pong)
left_paddle = Paddle(side="left", color=GREEN, width=10, height=100)
right_paddle = Paddle(side="right", color=GREEN, width=10, height=100)
all_sprites_list.add(left_paddle, right_paddle)


# define the lower and upper boundaries of the "green"
# ball in the HSV color space, then initialize the
# list of tracked points
# Gotten from color_detection script.
blueLower = (90, 180, 200)
blueUpper = (110, 255, 255)
pts = deque(maxlen=10)

vs = VideoStream(src=0).start()

# allow the camera or video file to warm up
time.sleep(2.0)

score = 0
# keep looping
while True:
    # grab the current frame
    frame = vs.read()

    # handle the frame from VideoCapture or VideoStream
    # frame = frame[1] if args.get("video", False) else frame

    # if we are viewing a video and we did not grab a frame,
    # then we have reached the end of the video
    if frame is None:
        break

    # resize the frame, blur it, and convert it to the HSV
    # color space
    frame = imutils.resize(frame, height=WEBCAM_HEIGHT)

    blurred = cv2.GaussianBlur(frame, (11, 11), 0)
    hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

    # construct a mask for the color "green", then perform
    # a series of dilations and erosions to remove any small
    # blobs left in the mask
    mask = cv2.inRange(hsv, blueLower, blueUpper)
    # cv2.imshow("Mask", mask)
    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)
    
    # find contours in the mask and initialize the current
    # (x, y) center of the ball
    cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    center = None

    # only proceed if at least one contour was found
    if len(cnts) > 0:
        # find the largest contour in the mask, then use
        # it to compute the minimum enclosing circle and
        # centroid
        c = max(cnts, key=cv2.contourArea)
        ((x, y), radius) = cv2.minEnclosingCircle(c)
        M = cv2.moments(c)
        paddle_location_as_percentage = (y / WEBCAM_HEIGHT)
        print(paddle_location_as_percentage)
        center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))

    # update the points queue
    # This code below looks  weird. Deleted the loop.
    pts = [center]

    if pts[0] is not None:
        thickness = 10
        cv2.line(frame, pts[0], pts[0], (0, 0, 255), thickness)

    # show the frame to our screen
    # cv2.imshow("Frame", frame)
    key = cv2.waitKey(1) & 0xFF

    # if the 'q' key is pressed, stop the loop
    if key == ord("q"):
        break

    # vs.stop()

        # Clear the screen
    screen.fill(BLACK)
    
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame = np.rot90(frame)
    frame = pygame.surfarray.make_surface(frame)
    screen.blit(frame, (0,0))

    # Calls update() method on every sprite in the list
    all_sprites_list.update()
    clock.tick(FPS)
    if pong.is_collided_with(left_paddle) or pong.is_collided_with(right_paddle):
        pong.handle_collision()
        score += 1

    if pong.has_lost():
        draw_text(screen, "Game Over :(", 50, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
    # Draw all the spites
    all_sprites_list.draw(screen)
    draw_text(screen, str(score), 30, SCREEN_WIDTH / 2, 10)
    # Go ahead and update the screen with what we've drawn.
    pygame.display.flip()
    if pong.has_lost():
        pygame.time.wait(3000)
        score = 0
        pong.reset_position()

# close all windows
cv2.destroyAllWindows()
