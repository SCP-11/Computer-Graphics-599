import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
export default class Heli extends Loaders.FbxGrObject {
    constructor(track) {
      super({
        fbx: "heli2.fbx",
        norm: 2.0,
        name: "Heli",
      });
      this.objects[0].scale.set(4,4,4)
      // this.
      let shaderMat = shaderMaterial("./shaders/10-10-01.vs", "./shaders/10-10-01.fs", {
        side: T.DoubleSide,
        uniforms: {
          time: { value: 0.0},
          resolution: { value: new T.Vector2(1, 1)},
    
        },
      });
      this.objects[0].material = shaderMat;
      let sphere = new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat });
      this.objects[0].add(sphere);
      // world.add(sphere);
      // sphere.stepWorld = function (delta, timeOfDay) {
      //   time += delta/20000
      //   shaderMat.uniforms.time.value = time;
      // }
    }
    stepWorld(delta, timeOfDay) {
    }
  }