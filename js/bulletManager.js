import {Component, Property} from '@wonderlandengine/api';

import {PlayerController} from './playerController.js';
import {Bullet} from './bullet.js';

/**
 * bulletManager
 */
export class BulletManager extends Component {
    static TypeName = 'bulletManager';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),

        player: Property.object(),
        bullet: Property.object()
    };

    //playerController;
    //bullet;

    parentObj;

    static onRegister(engine) {
        /* Triggered when this component class is registered.
         * You can for instance register extra component types here
         * that your component may create. */
    }

    init() {
        //console.log('init() with param', this.param);
    }

    start() {
        //console.log('start() with param', this.param);

        this.playerComponent = this.player.getComponent(PlayerController);
        this.bulletComponent = this.bullet.getComponent(Bullet);
    }

    update(dt) {
        /* Called every frame. */
        
        //this.spawnBullet();
    }

    spawnBullet(){

        //var obj = this.engine.scene.addObject();
        //console.log(this.obj);
        //this.spawnPos = this.playerComponent.playerCurrPos;

        this.spawnPos = this.player.getPositionWorld();

        //this.bullet.setPositionWorld(this.spawnPos); //총알 생성 위치 = 플레이어 현재 위치
        this.bullet.setPositionWorld([this.spawnPos[0], this.spawnPos[1], this.spawnPos[2]]);

        // var newBullet;
        // newBullet = this.engine.scene.addObject(null, this.object);

        // newBullet.setPositionWorld(this.spawnPos);
        // newBullet.addComponent(Bullet);

        console.log("???");
    }
}
