/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

import {main} from "../examples/main.js";
import Tiger from "./tiger.js";
import { add_screen } from "./screen.js";
import { get_lights } from "./lights.js";
import { GrCrane, GrExcavator, GrFork, GrMiniLoader } from "./construction.js";
import Hanger from "./hanger.js";
import Drone from "./drone.js";
import Heli from "./heli.js";
import { Hip, Shed, Tree } from "./buildings.js";
import Console from "./console.js";
/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */
let lights = get_lights();
// make the world
let world = new GrWorld({
    // camera: /
    width: 800,
    height: 600,
    groundplanesize: 20,   
    lights: lights});

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
let tiger = new Tiger({
    cam: world.camera,
    Start : new T.Vector3(8, 0, 5),
    build : true,
    World : world,
    // track_time : 2,
});
tiger.setPos(8, 0, 5);
tiger.setScale(0.2);

world.add(tiger);

let hanger = new Hanger();
hanger.setPos(8,-.22,-1);
// factory.setScale(2);
world.add(hanger);
// let world = new GrWorld();

// let shed = new Shed();
// world.add(shed);
// let hip = new Hip();
// world.add(hip);

// let tree = new Tree();
// world.add(tree);
// let tree2 = new Tree();
// world.add(tree2);

world.go();




let drone = new Drone({target: tiger});
// drone.setPos(-8, 2 , 5);
world.add(drone);
// let spotlight = new T.SpotLight(0xffffff, 100, 100); // Color: white, Intensity: 1        
// spotlight.position.set(9, 5, 6); // Set light position
// // world.lights.push(spotlight);
// spotlight.lookAt(8,-5,5);
// world.scene.add(spotlight);
// add_screen(world, tiger.objects[0]);
add_screen(world,  tiger.objects[0], 8,10.5,12);
world.add(new Console({x: 8, z: 10, y: 10, size: 2, target: tiger.objects[0]}));
add_constructors(world);
// add_lights(world);
main(world);

// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
// highlight("SimpleHouse-5");
highlight("Helicopter-0");
// highlight("Track Car");
// highlight("MorphTest");

highlight("Fork Lift-0");
highlight("tiger");
///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();


function add_constructors(world){
    // world.add(new GrCrane());
    // world.add(new GrExcavator());
    world.add(new GrFork({x: 8, z: 0, y: 0, target: tiger}));
    world.add(new GrMiniLoader({x: -15, z: 10, y: 0}));
}