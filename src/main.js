import "phaser";

import properties from "./properties";

import BootScene from "./scenes/BootScene";
import HudScene from "./scenes/HudScene";
import GameScene from "./scenes/GameScene";

const config = {
  type: Phaser.WEBGL,
  pixelArt: true,
  roundPixels: true,
  scale: {
    width: properties.width,
    height: properties.height,
    zoom: properties.scale,
  },
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      // debug: {
      //   showBody: properties.debug,
      //   showStaticBody: properties.debug,
      // },
    },
  },
  scene: [BootScene, HudScene, GameScene],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
