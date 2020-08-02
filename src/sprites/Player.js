import properties from "../properties";
import TileMath from "../utils/TileMath";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, map, tile) {
    super(scene, 0, 0, "player");
    this.map = map;

    this.buttonPressed = false;

    this.walkspeed = 9;
    this.frameRate = properties.animFrameRate * this.walkspeed;

    this.state = "normal";
    this.knockback = {};

    this.power = 10;

    this.healthMax = 50;
    this.health = this.healthMax;

    this.direction = "down";

    const { x, y } = TileMath.screenFromTile(tile);
    this.setPosition(x, y);

    this.setOrigin(0.5, 0.5);

    const name = "player";
    this.name = name;
    scene.physics.world.enable(this);
    scene.add.existing(this);

    scene.anims.create({
      key: "player_move_up",
      frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 1, first: 0 }),
      frameRate: this.frameRate,
      repeat: -1,
    });
    scene.anims.create({
      key: "player_move_down",
      frames: scene.anims.generateFrameNumbers("player", { start: 2, end: 3, first: 2 }),
      frameRate: this.frameRate,
      repeat: -1,
    });
    scene.anims.create({
      key: "player_move_left",
      frames: scene.anims.generateFrameNumbers("player", { start: 4, end: 5, first: 4 }),
      frameRate: this.frameRate,
      repeat: -1,
    });
    scene.anims.create({
      key: "player_move_right",
      frames: scene.anims.generateFrameNumbers("player", { start: 6, end: 7, first: 6 }),
      frameRate: this.frameRate,
      repeat: -1,
    });

    this.anims.play(`player_move_down`, true);
    const stopFrame = this.anims.currentAnim.frames[0];
    this.anims.stopOnFrame(stopFrame);

    this.body.setCollideWorldBounds(true);
  }

  isOnTile(tile) {
    const pTile = this.map.worldToTileXY(this.x, this.y);
    return pTile.x === tile.x && pTile.y === tile.y;
  }

  stateChange(newState) {
    if (this.state === "normal") {
      if (newState === "knockback") {
        this.state = "knockback";
      }
    } else if (this.state === "knockback") {
      if (newState === "normal") {
        this.state = "normal";
      }
    }
  }

  collideWithMap() {
    this.anims.stop();
    this.body.setVelocity(0, 0);
  }

  update(scene, delta, keys) {
    switch (this.state) {
      case "knockback": {
        this.updateKnockback(delta);
        break;
      }
      case "normal": {
        this.updateNormal(delta, keys);
        break;
      }
    }
  }

  updateKnockback(delta) {
    const deltaKnockbackForce = this.knockback.force * delta;
    switch (this.knockback.direction) {
      case "up": {
        this.body.setVelocity(0, -deltaKnockbackForce);
        break;
      }
      case "down": {
        this.body.setVelocity(0, deltaKnockbackForce);
        break;
      }
      case "left": {
        this.body.setVelocity(-deltaKnockbackForce, 0);
        break;
      }
      case "right": {
        this.body.setVelocity(deltaKnockbackForce, 0);
        break;
      }
    }
  }

  updateNormal(delta, keys) {
    this.buttonPressed = true;
    const deltaWalkspeed = this.walkspeed * delta;
    if (keys.up.isDown) {
      // console.log('Keys: up');
      this.anims.play("player_move_up", true);
      this.body.setVelocity(0, -deltaWalkspeed);
      this.direction = "up";
    } else if (keys.down.isDown) {
      // console.log('Keys: down');
      this.anims.play("player_move_down", true);
      this.body.setVelocity(0, deltaWalkspeed);
      this.direction = "down";
    } else if (keys.left.isDown) {
      // console.log('Keys: left');
      this.anims.play("player_move_left", true);
      this.body.setVelocity(-deltaWalkspeed, 0);
      this.direction = "left";
    } else if (keys.right.isDown) {
      // console.log('Keys: right');
      this.anims.play("player_move_right", true);
      this.body.setVelocity(deltaWalkspeed, 0);
      this.direction = "right";
    } else {
      this.anims.stop();
      this.body.setVelocity(0, 0);
      this.buttonPressed = false;
    }
  }
}
