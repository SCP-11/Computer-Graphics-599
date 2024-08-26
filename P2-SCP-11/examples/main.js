/*jshint esversion: 6 */
// @ts-check

//
// CS559 - Graphics Town - Workbook 12
// Example Code: 
// Example "Town"
//
// This sets up the town loading different objects. 
//
// It should be called from the onload function, after the world has been created

/** These imports are for the examples - feel free to remove them */
import { SimpleHouse } from "./house.js";
import { CircularTrack, TrackCube, TrackCar } from "./track.js";
import { Helicopter, Helipad } from "./helicopter.js";
import { ShinySculpture } from "./shinySculpture.js";
import { MorphTest } from "./morph.js";
import Tiger from "../for_students/tiger.js";
import { add_screen } from "../for_students/screen.js";
import Drone from "../for_students/drone.js";
import Heli from "../for_students/heli.js";
import { Hip, Shed, Tree } from "../for_students/buildings.js";
/********************************************************************** */
/** EXAMPLES - student should not use this! It is just for reference    */
/** you may use the sample objects, but not the sample layout           */
/***/
export function main(world) {
// make two rows of houses, mainly to give something to look at
  for (let i = -19; i < 20; i += 5) {
    if(i< -5 || i > 5){
      world.add(new Hip({ x: i, y: 0, z: -18, size: 2 }));}
    world.add(new Shed({ x: i, y: 0, z: -12, size: 2 }));
    world.add(new SimpleHouse({ x: i, z: -12 }));
    // world.add(new SimpleHouse({ x: i, z: 12 }));
  }

  for(let i = -19; i < 13; i += 3){
    
    if(i< -2 || i >2){
    world.add(new Tree({ x: i, y: 0, z: 17, size: 2 }));
    world.add(new Tree({ x: i+2, y: 0, z: 15, size: 2 }));
    }
  }
  for (let i = -5; i < 20; i += 5) {
    // world.add(new Hip({ x: 15, y: 0, z: i, size: 2 }));
    world.add(new Shed({ x: 15, y: 0, z: i, size: 2 }));
  }


  /** Race Track - with three things racing around */
  let track = new CircularTrack({ x: -8, z: 0, radius: 8});
  // let tc1 = new TrackCube(track);
  // let tc2 = new TrackCube(track);
  let tc3 = new TrackCar(track);
  let tiger = new Tiger({track: track});
  // tiger.setScale(0.2);
  // place things are different points on the track
  // tc2.u = 0.25;
  tc3.u = 0.125;
  tiger.u = 0.75;
  // and make sure they are in the world
  world.add(track);
  // world.add(tc1);
  // world.add(tc2);
  world.add(tc3);
  world.add(tiger);
  // add_screen(world, tiger.objects[0], 7);
  /** Helicopter - first make places for it to land*/

  world.add(new Helipad(-15, 0, 0));

  world.add(new Helipad(15, 0, 0));
  world.add(new Helipad(0, 0, -17));
  world.add(new Helipad(0, 0, 17));

  let copter = new Helicopter();
  world.add(copter);
  copter.getPads(world.objects);

  // these are testing objects
  world.add(new ShinySculpture(world));
  // world.add(new MorphTest({ x: 10, y: 3, r: 2 }));

  world.remove
}

