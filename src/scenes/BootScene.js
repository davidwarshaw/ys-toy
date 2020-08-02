export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    // Misc
    this.load.image("font-small", "assets/fonts/atari_like.png");
    this.load.image("select-frame", "assets/images/select_frame.png");
    this.load.image("window-small", "assets/images/window_small.png");
    this.load.image("window-big", "assets/images/window_big.png");
    this.load.image("window-intro", "assets/images/window_intro.png");

    // Maps
    this.load.image("ys_ii_tileset_extruded", "assets/maps/ys_ii_tileset_extruded.png");
    this.load.tilemapTiledJSON("basic-map", "assets/maps/basic-map.json");

    // Sprites
    this.load.spritesheet("player", "assets/images/players_spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0,
    });
    this.load.spritesheet("enemies", "assets/images/ys_enemies_spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 8,
      spacing: 8,
    });
  }

  create() {
    this.playState = {};
    this.scene.start("GameScene", this.playState);
    this.scene.start("HudScene", this.playState);
  }
}
