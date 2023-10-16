import {Component, Property, PhysXComponent, Shape} from '@wonderlandengine/api';

import {EnemyControllerPhysX} from './enemyControllerPhysX.js';

/**
 * enemySpawner
 */
export class EnemySpawner extends Component {
    static TypeName = 'enemySpawner';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0), 

        enemy: Property.object(),

        enemyMesh: Property.mesh(),
        enemyMaterial: Property.material()
    };

    time = 0;
    spawnInterval = 1.0;

    max = 2.25;

    change = true;

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

        this.enemyComponent = this.enemy.getComponent(EnemyControllerPhysX);
    }

    update(dt) {
        /* Called every frame. */

        //Enemy spawn interval control
        this.time += dt;
        //this.timeRound = Math.round(this.time);
        //console.log(this.timeRound);

        if(this.time >= this.spawnInterval){

            this.time = 0;
            this.change = !this.change;
            this.isEnemySpawn();
        }
    }



    isEnemySpawn(){
        //console.log("spawn?");

        this.spawnPosX1 = Math.random() * this.max;
        
        this.spawnPosx2 = this.spawnPosX1 * -1;
        

        this.newEnemyPos = [0, 10, -4];

        var newEnemy = this.engine.scene.addObject(null);

        newEnemy.addComponent('mesh',{
            mesh: this.enemyMesh,
            material: this.enemyMaterial
        })

        newEnemy.scaleLocal([[0.15], [0.15], [0.1]]);

        if(this.change === true){

            this.newEnemyPos[0] = this.spawnPosX1;
        }
        if(this.change === false){

            this.newEnemyPos[0] = this.spawnPosx2;
        }
        
        newEnemy.setPositionWorld(this.newEnemyPos);

        newEnemy.addComponent(PhysXComponent, {
            shape: Shape.Box,
            extents: [[0.15], [0.15], [0.1]],
            // groupsMask: (1 << 4) | (1 << 5) | (1 << 6) | (1 << 3),
            // blocksMask: (1 << 4) | (1 << 5) | (1 << 6) | (1 << 3),

            allowSimulation: true,
            trigger: false,
            allowQuery: true,
            simulate: true,
            static: false,
            gravity: false,
            kinematic: true
        });

        newEnemy.addComponent(EnemyControllerPhysX);
    }
}
