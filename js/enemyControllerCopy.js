import {Component, Property, PhysXComponent, CollisionEventType} from '@wonderlandengine/api';

/**
 * enemyControllerCopy
 */
export class EnemyControllerCopy extends Component {
    static TypeName = 'enemyControllerCopy';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    speed;

    check;

    physXComponent;

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
        this.enemyPos = [0.5, 4.0, -4.0];

        this.check = false;
        //this.physXComponent = this.object.getComponent(PhysXComponent);
        this.initCollision();
    }

    update(dt) {
        /* Called every frame. */

        this.isMove();
    }

    isMove(){

        this.enemyPos[1] -= this.speed; //Down
        this.object.setPositionLocal(this.enemyPos); //Enemy position setting

        this.enemyCurrPos = this.object.getPositionLocal(); //Get enemy's current position
        
        if(this.enemyCurrPos[1] < 0){

            //console.log("Down");
            this.enemyPos[1] = 4.0; //Reset enemy's y.position
        }
    }

    initCollision(){
        
        // newEnemy.addComponent(PhysXComponent, {
        //     shape: Shape.Box
        // });

        this.rigidBody = this.object.getComponent('physx');
        console.log("RigidBody", this.rigidBody);



        this.rigidBody.onCollision(

            function(type, other){

                if(type === CollisionEventType.Touch){

                    console.log("Collision check");
                    
                    setTimeout(() => {this.object.destroy();}, 0);

                    return;
                }
                else{
                    //console.log("!!!");
                    return;
                }

                
            }.bind(this)
        )
    }
}
