import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";

export default class Hanger extends Loaders.FbxGrObject {
    constructor(track) {
      super({
        fbx: "hanger.fbx",
        norm: 2.0,
        name: "Hanger",
      });
      this.objects[0].scale.set(20,20,20)
      // this.

    }
    stepWorld(delta, timeOfDay) {
    }
  }