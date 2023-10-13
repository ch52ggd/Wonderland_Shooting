import {Component, Property} from '@wonderlandengine/api';

/**
 * enemySpawner
 */
export class EnemySpawner extends Component {
    static TypeName = 'enemySpawner';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    time = 0;
    spawnInterval = 3;

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
    }

    update(dt) {
        /* Called every frame. */



        //Enemy spawn interval control
        this.time += dt;
        this.timeRound = Math.round(this.time);
        //console.log(this.timeRound);

        if(this.timeRound >= this.spawnInterval){

            this.time = 0;
            this.isEnemySpawn();
        }
    }



    isEnemySpawn(){
        //console.log("spawn?");
    }
}
