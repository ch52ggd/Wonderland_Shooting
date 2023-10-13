import {Component, Property, CollisionEventType} from '@wonderlandengine/api';

import {PlayerController} from './playerController.js';

/**
 * bullet
 */
export class Bullet extends Component {
    static TypeName = 'bullet';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),

        player: Property.object()
    };

    speed;

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

        //this.playerComponent = this.player.getComponent(PlayerController);

        this.speed = 0.1;
        this.bulletPos = [0, 0, 0];

        //this.initCollision();
    }

    update(dt) {
        /* Called every frame. */
    }



    /*
    shootingBullet(){

        //this.bulletPos[1] += this.speed;

        //this.object.setPositionWorld(this.bulletPos);
        this.bulletCurrPos = this.object.getPositionWorld(); //Get bullet's current position
        
        if(this.bulletCurrPos[1] > 6){

            this.bulletPos[1] = 1.0; //Reset bullet's y.position
            //this.object.destroy();
        }        
    }
    */



    //Collision check
    initCollision(){
        
        this.rigidBody = this.object.getComponent('physx');
        console.log("RigidBody", this.rigidBody);

        this.rigidBody.onCollision(

            function(type, other){

                if(type === CollisionEventType.Touch){

                    var otherObj = other.object.name;

                    //console.log("Bullet collision check");

                    if(otherObj.includes("Enemy")){
                        
                        //console.log("Name :", otherObj);
                        setTimeout(() => {this.object.destroy();}, 50);
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
