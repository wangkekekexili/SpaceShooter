effects.starField.startScreenEffect();
const player: Sprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . e e . . . . . . . . . . . .
    . . e e c c c c c c c . . . . .
    . . . . e c c c c c c . . . . .
    . . 2 2 e e . . . . . . . . . .
    . . 2 2 2 e e e e e e e e . . .
    . . . . . e 7 7 7 7 7 7 e e . .
    . . . . . e 7 7 7 7 7 7 e e . .
    . . 2 2 2 e e e e e e e e . . .
    . . 2 2 e e . . . . . . . . . .
    . . . e e c c c c c c . . . . .
    . . e e c c c c c c c . . . . .
    . . e e . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player);
controller.moveSprite(player);
player.setStayInScreen(true);
info.setLife(5);
const laser = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . 9 9 9 9 . . . .
        . . . . . . 9 9 9 9 9 9 9 . . .
        . . . 9 9 9 9 9 9 9 9 9 9 . . .
        . . . . . 9 9 9 9 9 9 9 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    if (doubleFireMode && doubleFireMode.lifespan > 0) {
        const up = sprites.createProjectileFromSprite(laser, player, 50, 0);
        const down = sprites.createProjectileFromSprite(laser, player, 50, 0);
        up.y -= 5;
        down.y += 5;
    } else {
        sprites.createProjectileFromSprite(laser, player, 50, 0);
    }
});

game.onUpdateInterval(2000, function() {
    const enermy = sprites.create(img`
        . . . . . . . . 2 3 . . . . . .
        . . . . . . . . 2 3 . . . . . .
        . . . . 4 4 4 2 2 3 . . . . . .
        . . . . 4 4 2 2 2 3 . . . . . .
        . . . . . 2 2 2 2 2 3 . . . . .
        . . . . 2 2 2 2 2 2 3 . . . . .
        . . . 2 2 2 2 2 2 2 3 . . . . .
        . . . 2 2 2 2 2 2 2 3 . . . . .
        . . . 2 2 2 2 2 2 2 3 . . . . .
        . . . 2 2 2 2 2 2 2 3 . . . . .
        . . . . 2 2 2 2 2 2 3 . . . . .
        . . . . 2 2 2 2 2 2 3 . . . . .
        . . . . 4 2 2 2 2 3 . . . . . .
        . . . . 4 4 4 2 2 3 . . . . . .
        . . . . . . . 2 2 3 . . . . . .
        . . . . . . . 2 2 3 . . . . . .
    `, SpriteKind.Enemy);
    enermy.x = scene.screenWidth();
    enermy.vx = -20;
    enermy.y = Math.randomRange(10, scene.screenHeight() - 10); 
    const statusBar = statusbars.create(15, 1, StatusBarKind.EnemyHealth);
    statusBar.value = 100;
    statusBar.attachToSprite(enermy);
});
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, (player, enemy) => {
    info.changeLifeBy(-1);
    onEnemyDeath(enemy);
    scene.cameraShake(4, 500);
});
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, (projectile, enermy) => {
    projectile.destroy();
    const statusBar = statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, enermy);
    statusBar.value -= 20;
});
statusbars.onZero(StatusBarKind.EnemyHealth, (status) => {
    onEnemyDeath(status.spriteAttachedTo());
    info.changeScoreBy(1);
})

namespace SpriteKind {
    export const PowerUp = SpriteKind.create();
    export const Mode = SpriteKind.create();
}

function onEnemyDeath(enemy: Sprite) {
    if (Math.percentChance(80)) {
        const powerup = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . 2 2 2 2 2 2 2 2 2 . . .
            . . . . 2 d d d d d d d 2 . . .
            . . . . 2 d 6 6 6 6 6 d 2 . . .
            . . . . 2 d 6 d d d 6 d 2 . . .
            . . . . 2 d 6 d d d 6 d 2 . . .
            . . . . 2 d 6 6 6 6 6 d 2 . . .
            . . . . 2 d 6 d d d d d 2 . . .
            . . . . 2 2 6 d d d d 2 2 . . .
            . . . . . 2 2 2 d d 2 2 . . . .
            . . . . . . . 2 2 2 2 . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.PowerUp);
        powerup.x = enemy.x;
        powerup.y = enemy.y;
    }
    enemy.destroy(effects.disintegrate, 500);
}

let doubleFireMode: Sprite = null;
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, (player, powerUp) => {
    doubleFireMode = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 2 . . . . . . 2 . . . .
        . . . . 2 . . . . . . 2 . . . .
        . . 2 2 2 2 2 . . 2 2 2 2 2 . .
        . . . . 2 . . . . . . 2 . . . .
        . . . . 2 . . . . . . 2 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Mode);
    doubleFireMode.x = 40;
    doubleFireMode.y = 5;
    doubleFireMode.lifespan = 10000
    powerUp.destroy();
});