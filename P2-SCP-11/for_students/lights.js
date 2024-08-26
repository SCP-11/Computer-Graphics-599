
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
// import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export function get_lights(){
    let lights = [];
    // Add directional light to the scene
    let spotlight = new T.SpotLight(0xffffff, 100, 100); // Color: white, Intensity: 1
    
    spotlight.position.set(15, 5, 15); // Set light position
    spotlight.lookAt(15,0,15);
    lights.push(spotlight);
    
    let directionalLight = new T.DirectionalLight(0xffffff, 6);
    directionalLight.position.set(0, 10, 10);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    lights.push(directionalLight);
    
    // world.lights = lights;
    return lights;
}