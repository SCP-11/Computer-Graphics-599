import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

import { add_screen } from "./screen.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
export default class Console extends Loaders.FbxGrObject {
    constructor({x,y,z,size, target}) {
      super({
        fbx: "console.fbx",
        norm: 2.0,
        name: "console",
      });
      this.objects[0].rotateY(-Math.PI/2)
      this.objects[0].scale.set(4,4,4)
      this.objects[0].position.set(x,y,z)
      

    }
    stepWorld(delta, timeOfDay) {
    }
  }