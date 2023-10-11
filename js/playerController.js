import {Component, Property} from '@wonderlandengine/api';

/**
 * playerController
 */
export class PlayerController extends Component {
    static TypeName = 'playerController';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    speed;
    moveLeft = false;
    moveRight = false;

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

        this.speed = 0.03;
        this.playerPos = [0, 1, -4];

        window.addEventListener('keydown', this.press.bind(this));
        window.addEventListener('keyup', this.release.bind(this));

    }

    update(dt) {
        /* Called every frame. */

        // if(this.moveLeft === true) this.playerPos[0] -= this.speed;
        // if(this.moveRight === true) this.playerPos[0] += this.speed;

        // this.object.setPositionLocal(this.playerPos);

        this.playerCurrPos = this.object.getPositionLocal();
        
        if(this.playerCurrPos[0] > -1 && this.playerCurrPos[0] < 1){
            if(this.moveLeft === true) this.playerPos[0] -= this.speed;
            if(this.moveRight === true) this.playerPos[0] += this.speed;
        }
        this.object.setPositionLocal(this.playerPos);
    }

    press(moving){

        if(moving.key === 'a') this.moveLeft = true;

        if(moving.key === 'd') this.moveRight = true;
    }

    release(moving){

        if(moving.key === 'a') this.moveLeft = false;

        if(moving.key === 'd') this.moveRight = false;
    }
}
