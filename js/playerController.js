import {Component, Property, CollisionEventType} from '@wonderlandengine/api';

import {BulletManager} from './bulletManager.js';
import {GameManager} from './gameManager.js';

/**
 * playerController
 */
export class PlayerController extends Component {
    static TypeName = 'playerController';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),

        bulletManager: Property.object(),
        gameManager: Property.object()
    };

    speed;

    moveLeft = false;
    moveRight = false;
    moveUp = false;
    moveDown = false;
    spaceBar = false;

    time = 0;
    spawnInterval = 0.2;

    isDie = false;

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

        this.bulletManager = this.bulletManager.getComponent(BulletManager);

        this.gameManager = this.gameManager.getComponent(GameManager);

        this.speed = 0.05;
        this.playerPos = [0, 0, -4];

        this.direction = 1;

        window.addEventListener('keydown', this.press.bind(this));
        window.addEventListener('keyup', this.release.bind(this));

        this.initCollision();
    }

    update(dt) {
        /* Called every frame. */

        this.time += dt;

        if(this.gameManager.isPlay === true){

            this.isMove();

            //Bullet shooting interval control
            if(this.spaceBar === true){

                if(this.time >= this.spawnInterval){

                    this.bulletManager.spawnBullet();
                    this.time = 0;
                }
            }
        }
        if(this.gameManager.isPlay === false){

            return;
        }
    }

    press(moving){

        if(moving.key === 'w' || moving.key === "ArrowUp") this.moveUp = true; //up
        if(moving.key === 's' || moving.key === "ArrowDown") this.moveDown = true; //Down
        if(moving.key === 'a' || moving.key === "ArrowLeft") this.moveLeft = true; //Left
        if(moving.key === 'd' || moving.key === "ArrowRight") this.moveRight = true; //Right

        if(moving.code === "Space") this.spaceBar = true;
    }

    release(moving){

        if(moving.key === 'w' || moving.key === "ArrowUp") this.moveUp = false; //up
        if(moving.key === 's' || moving.key === "ArrowDown") this.moveDown = false; //Down
        if(moving.key === 'a' || moving.key === "ArrowLeft") this.moveLeft = false; //Left
        if(moving.key === 'd' || moving.key === "ArrowRight") this.moveRight = false; //Right

        if(moving.code === "Space") this.spaceBar = false;
    }



    isMove(){

        this.playerCurrPos = this.object.getPositionWorld();

        if(this.moveUp === true){

            if(this.playerCurrPos[1] < 4) this.playerPos[1] += this.speed;
        }

        if(this.moveDown === true){

            if(this.playerCurrPos[1] > -1) this.playerPos[1] -= this.speed;
        }

        //Left
        if(this.moveLeft === true){
            
            if(this.playerCurrPos[0] > -2.25) this.playerPos[0] -= this.speed;
        }

        //Right
        if(this.moveRight === true){

            if(this.playerCurrPos[0] < 2.25) this.playerPos[0] += this.speed;
        }

        this.object.setPositionLocal(this.playerPos);
    }



    isReset(){

        this.playerPos = [0, 0, -4];
        this.playerCurrPos = [0, 0, -4];
    }



    //Check Collision
    initCollision(){
        
        this.rigidBody = this.object.getComponent('physx');
        //console.log("RigidBody", this.rigidBody);

        this.rigidBody.onCollision(

            function(type, other){

                var otherObj = other.object.name;

                if(type === CollisionEventType.Touch){

                    if(otherObj.includes("enemy")){
                        
                        //setTimeout(() => {this.object.destroy();}, 500);
                        this.gameManager.isPlay = false;

                        this.gameManager.score = 0;

                        this.isDie = true;
                    }

                    return;
                }
                else{

                    return;
                }
            }.bind(this)
        )
    }
}
