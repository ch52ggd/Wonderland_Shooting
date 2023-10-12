import {Component, Property, PhysXComponent, CollisionEventType} from '@wonderlandengine/api';

import {GameManager} from './gameManager.js';
/**
 * enemyControllerPhsx
 */
export class EnemyControllerPhsx extends Component {
    static TypeName = 'enemyControllerPhsx';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),

        gameManager: Property.object()
    };

    gameManager;

    speed;

    //physXComponent;

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

        this.gameManager = this.gameManager.getComponent(GameManager);

        this.speed = 0.03;
        this.enemyPos = [0, 6.0, -4.0];

        //this.physXComponent = this.object.getComponent(PhysXComponent);
        this.initCollision();
    }

    update(dt) {
        /* Called every frame. */

        //this.isMove();
    }

    isMove(){

        this.enemyPos[1] -= this.speed; //Down
        this.object.setPositionLocal(this.enemyPos); //Enemy position setting

        this.enemyCurrPos = this.object.getPositionLocal(); //Get enemy's current position
        
        if(this.enemyCurrPos[1] < -10){

            this.enemyPos[1] = 6.0; //Reset enemy's y.position
            //this.object.destroy();
        }
    }

    initCollision(){
        
        this.rigidBody = this.object.getComponent('physx');
        console.log("RigidBody", this.rigidBody);

        this.rigidBody.onCollision(

            function(type, other){

                if(type === CollisionEventType.Touch){

                    var otherObj = other.object.name;

                    //console.log("Enemy collision check");

                    if(otherObj.includes("Player")){
                        
                        console.log("Name :", otherObj);
                        //setTimeout(() => {this.object.destroy();}, 1000);
                    }

                    if(otherObj.includes("Bullet")){

                        this.gameManager.isKill();

                        console.log("Name :", otherObj);
                        //setTimeout(() => {this.object.destroy();}, 50);
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
