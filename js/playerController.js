import {Component, Property, CollisionEventType} from '@wonderlandengine/api';

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
    direction;

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

        this.speed = 0.0;
        this.playerPos = [0, 1, -4];

        this.direction = 1;

        window.addEventListener('keydown', this.press.bind(this));
        window.addEventListener('keyup', this.release.bind(this));

        this.initCollision();
    }

    update(dt) {
        /* Called every frame. */

        this.playerCurrPos = this.object.getPositionLocal();

        //Left
        if(this.moveLeft === true){
            
            if(this.playerCurrPos[0] > -1){

                this.speed = -0.03;
                this.playerPos[0] += this.speed;
            }
        }

        //Right
        if(this.moveRight === true){

            if(this.playerCurrPos[0] < 1){
                
                this.speed = 0.03;
                this.playerPos[0] += this.speed;
            }
        }
        this.object.setPositionLocal(this.playerPos);
    }

    press(moving){

        if(moving.key === 'a') this.moveLeft = true; //Left
        if(moving.key === 'd') this.moveRight = true; //Right
    }

    release(moving){

        if(moving.key === 'a') this.moveLeft = false; //Left
        if(moving.key === 'd') this.moveRight = false; //Right
    }



    //Check Collision
    initCollision(){
        
        this.rigidBody = this.object.getComponent('physx');
        console.log("RigidBody", this.rigidBody);

        this.rigidBody.onCollision(

            function(type, other){

                var otherObj = other.object.name;

                if(type === CollisionEventType.Touch){

                    //console.log("Player collision check");

                    if(otherObj.includes("Enemy")){
                        
                        //console.log("Name :", otherObj);
                        setTimeout(() => {this.object.destroy();}, 1000);
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
