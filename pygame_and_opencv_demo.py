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

font_name = pygame.font.match_font("arial")


def draw_text(surf, text, size, x, y):
    font = pygame.font.Font(font_name, size)
    text_surface = font.render(text, True, GREEN)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    surf.blit(text_surface, text_rect)


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
        self.rect.y = (
            paddle_location_as_percentage * SCREEN_HEIGHT
        ) - self.rect.height / 2


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
clock = pygame.time.Clock()
pygame.display.set_caption("OpenCV and Pong")


pong = Pong(color=GREEN, width=20, height=20)
left_paddle = Paddle(side="left", color=GREEN, width=10, height=100)
right_paddle = Paddle(side="right", color=GREEN, width=10, height=100)
all_sprites_list = pygame.sprite.Group()
all_sprites_list.add(pong, left_paddle, right_paddle)


paddle_lower_threshold = (90, 180, 200)
paddle_upper_threshold = (110, 255, 255)
if not paddle_lower_threshold and not paddle_upper_threshold:
    raise KeyError(
        "Run color_calibration.py in utilities and paste the values for paddle_lower_threshold and paddle_upper_threshold."
    )

pts = deque(maxlen=10)

vs = VideoStream(src=0).start()

# allow the camera or video file to warm up
time.sleep(2.0)

score = 0

while True:
    frame = vs.read()
    if frame is None:
        break

    frame = imutils.resize(frame, height=WEBCAM_HEIGHT)

    blurred = cv2.GaussianBlur(frame, (11, 11), 0)
    hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, paddle_lower_threshold, paddle_upper_threshold)
    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)

    cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    center = None

    if len(cnts) > 0:
        c = max(cnts, key=cv2.contourArea)
        ((x, y), radius) = cv2.minEnclosingCircle(c)
        M = cv2.moments(c)
        paddle_location_as_percentage = y / WEBCAM_HEIGHT
        center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))

    if center:
        cv2.circle(frame, center, 3, (0, 0, 0), 5)

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
    screen.blit(frame, (0, 0))

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
