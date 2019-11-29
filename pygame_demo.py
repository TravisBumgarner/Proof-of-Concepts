import pygame
import random

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 800
FPS = 30
BLACK = (0, 0, 0)
GREEN = (0, 128, 0)

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
        """ Called each frame. """
        x, y = pygame.mouse.get_pos()
        self.rect.y = y - self.rect.height / 2


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
        return self.rect.x <= 0 or (self.rect.x + self.rect.width) >= SCREEN_WIDTH

    def is_collided_with(self, sprite):
        return self.rect.colliderect(sprite.rect)


pygame.init()
pygame.display.set_caption('Pygame Demo')
screen = pygame.display.set_mode([SCREEN_WIDTH, SCREEN_HEIGHT])
clock = pygame.time.Clock()

pong = Pong(color=GREEN, width=20, height=20)
left_paddle = Paddle(side="left", color=GREEN, width=10, height=100)
right_paddle = Paddle(side="right", color=GREEN, width=10, height=100)
all_sprites_list = pygame.sprite.Group()
all_sprites_list.add(pong, left_paddle, right_paddle)

score = 0
done = False

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True

    screen.fill(BLACK)

    all_sprites_list.update()
    clock.tick(FPS)
    if pong.is_collided_with(left_paddle) or pong.is_collided_with(right_paddle):
        pong.handle_collision()
        score += 1

    if pong.has_lost():
        draw_text(screen, "Game Over :(", 50, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)

    all_sprites_list.draw(screen)
    draw_text(screen, str(score), 30, SCREEN_WIDTH / 2, 10)

    pygame.display.flip()
    if pong.has_lost():
        pygame.time.wait(3000)
        score = 0
        pong.reset_position()

