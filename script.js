const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade'
    },
    scene: Main
};

new Phaser.Game(config);