import * as ROT from "rot-js";

ROT.RNG.setSeed(Date.now());

export default {
  debug: false,
  rng: ROT.RNG,
  width: 320,
  height: 208,
  hudHeight: 32,
  scale: 3,
  tileWidth: 16,
  tileHeight: 16,
  mapWidthTiles: 100,
  mapHeightTiles: 100,
  knockbackMillis: 100,
  cameraPauseMillis: 2000,
  animFrameRate: 3,
};
