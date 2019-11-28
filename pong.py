import pygame
import random

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
FPS = 30


BLACK = (0, 0, 0)
GREEN = (0, 128, 0)


def get_random_velocity():
    polarity = 1 if random.random() < 0.5 else -1
    magnitude = random.randint(1, (SCREEN_WIDTH + SCREEN_HEIGHT) / 100)

    return polarity * magnitude


class Paddle(pygame.sprite.Sprite):
    def __init__(self, color, width, height):
        super().__init__()

        self.image = pygame.Surface([width, height])
        self.image.fill(GREEN)
        self.rect = self.image.get_rect()
        self.reset_pos()

    def reset_pos(self):
        self.rect.x = 0
        self.rect.y = (SCREEN_HEIGHT / 2) - self.rect.height / 2

    def update(self):
        """ Called each frame. """

        if self.rect.y <= 0 or self.rect.y >= SCREEN_HEIGHT - self.rect.height:
            self.y_velocity = -self.y_velocity

        if self.rect.x <= 0 or self.rect.x >= SCREEN_WIDTH - self.rect.width:
            self.x_velocity = -self.x_velocity


class Pong(pygame.sprite.Sprite):
    def __init__(self, color, width, height):
        super().__init__()

        self.image = pygame.Surface([width, height])
        self.image.fill(GREEN)
        self.rect = self.image.get_rect()
        self.reset_pos()

    def reset_pos(self):
        self.rect.x = (SCREEN_WIDTH / 2) - self.rect.width / 2
        self.rect.y = (SCREEN_HEIGHT / 2) - self.rect.height / 2
        self.x_velocity = get_random_velocity()
        self.y_velocity = get_random_velocity()

    def update(self):
        """ Called each frame. """
        self.rect.x += self.x_velocity
        self.rect.y += self.y_velocity
        print(self.rect.x)

        if self.rect.y <= 0 or self.rect.y >= SCREEN_HEIGHT - self.rect.height:
            self.y_velocity = -self.y_velocity

        if self.rect.x <= 0 or self.rect.x >= SCREEN_WIDTH - self.rect.width:
            self.x_velocity = -self.x_velocity


pygame.init()
screen = pygame.display.set_mode([SCREEN_WIDTH, SCREEN_HEIGHT])
all_sprites_list = pygame.sprite.Group()

done = False

clock = pygame.time.Clock()

pong = Pong(color=GREEN, width=50, height=50)
all_sprites_list.add(pong)
while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True

    # Clear the screen
    screen.fill(BLACK)
    # Calls update() method on every sprite in the list
    all_sprites_list.update()
    clock.tick(FPS)
    # Draw all the spites
    all_sprites_list.draw(screen)
    # Go ahead and update the screen with what we've drawn.
    pygame.display.flip()
