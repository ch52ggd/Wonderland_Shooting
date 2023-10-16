import {Component, Property, CollisionEventType} from '@wonderlandengine/api';

import {GameManager} from './gameManager.js';

/**
 * enemyControllerPhysX
 */
export class EnemyControllerPhysX extends Component {
    static TypeName = 'enemyControllerPhysX';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),

        gameManager: Property.object()
    };

    gameManager;

    speed = 0.05;

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

        this.initCollision();
    }

    update(dt) {
        /* Called every frame. */

        this.enemyPos = this.object.getPositionWorld();

        this.object.setPositionWorld([this.enemyPos[0], this.enemyPos[1] - this.speed, this.enemyPos[2]]);

        if(this.enemyPos[1] < -1){

            this.object.destroy();
        }
    }



    // isMove(){

    //     this.enemyPos[1] -= this.speed; //Down
    //     this.object.setPositionWorld(this.enemyPos); //Enemy position setting

    //     this.enemyCurrPos = this.object.getPositionWorld(); //Get enemy's current position
        
    //     if(this.enemyCurrPos[1] < -10){

    //         this.enemyPos[1] = 6.0; //Reset enemy's y.position
    //         //this.object.destroy();
    //     }
    // }

    initCollision(){
        
        this.rigidBody = this.object.getComponent('physx');
        //console.log("RigidBody", this.rigidBody);

        this.rigidBody.onCollision(

            function(type, other){

                if(type === CollisionEventType.Touch){

                    var otherObj = other.object.name;

                    //console.log("Enemy collision check");

                    if(otherObj.includes("player")){
                        
                        //console.log("Name :", otherObj);
                        //setTimeout(() => {this.object.destroy();}, 1000);
                    }

                    if(otherObj.includes("bullet")){

                        //this.gameManager.isKill();

                        console.log("Name :", otherObj);
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
