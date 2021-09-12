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
controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    sprites.createProjectileFromSprite(img`
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
    `, player, 50, 0);
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, (player, enermy) => {
    info.changeLifeBy(-1);
    enermy.destroy(effects.disintegrate, 500);
    scene.cameraShake(4, 500);
});
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, (projectile, enermy) => {
    projectile.destroy();
    enermy.destroy(effects.disintegrate, 500);
    info.changeScoreBy(1);
});