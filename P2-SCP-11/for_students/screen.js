/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as Simple from "../libs/CS559-Framework/SimpleObjects.js";

/**
 *
 * @param {GrObject} obj
 * @param {number} [speed=1] - rotations per second
 */
function spinY(obj, speed = 1) {
  obj.stepWorld = function(delta, timeOfDay) {
    obj.objects.forEach(obj => obj.rotateY(((speed * delta) / 1000) * Math.PI));
  };
  return obj;
}
let fcg = new T.TextureLoader().load("rubric.png");
let metalnessMap = new T.TextureLoader().load("blackWhite.png");
let normalMap = new T.TextureLoader().load("normal.png");
let bumpMap = new T.TextureLoader().load("bump.png");
let cubeRenderTarget;
let cubeCamera;
let screenRenderTarget;
let screenCamera;
let screenTarget;
let world;
let screenRender = new T.WebGLRenderer();
screenRender.setSize(window.innerWidth, window.innerHeight);
export class Sphere2 extends GrObject {
    constructor(plain) {

        let mat = new T.MeshStandardMaterial(plain ? {color:"orange"} : {color:"white", map:fcg, side:T.DoubleSide});

        let geometry = new T.SphereGeometry(.51,32,32);

        let metal_mat = new T.MeshStandardMaterial({color:"white"})
        // metal_mat.map = bumpMap
        // metal_mat.metalnessMap = metalnessMap;
        metal_mat.metalness = 1;
        metal_mat.roughness = 0;
        // metal_mat.bumpMap = bumpMap;
        let mesh = new T.Mesh(geometry,metal_mat);



        super("Book"+(plain?"-plane":"-texture"),mesh);
        this.bgeom = geometry;
        this.mat = mat;

        
        // // Add directional light to the scene
        // let directionalLight = new T.DirectionalLight(0xff00ff, 10); // Color: white, Intensity: 1
        // directionalLight.position.set(0, 4, 0); // Set light position
        // directionalLight.lookAt(this.objects[0].position)
        // this.light = directionalLight;
        // Create cube render target
        cubeRenderTarget = new T.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: T.LinearMipmapLinearFilter } );
        metal_mat.envMap = cubeRenderTarget.texture;
        // Create cube camera
        cubeCamera = new T.CubeCamera( 0.1, 100000, cubeRenderTarget );

        // Update the render target cube

    }

    stepWorld(ms, daytime) {
        // this used to be .01 per step
        // however, we want to advance things based on the frame rate
        // if we get 60fps, that's 16 miliseconds
        this.objects[0].rotation.x += (0.01 * ms) / 16;
        this.objects[0].rotation.y += (0.01 * ms) / 16;
        cubeCamera.position.copy( this.objects[0].position );
        cubeCamera.update(world.renderer, world.scene);
      }

}

export class Screen extends GrObject {
  constructor(plain, screenTarget, height=7) {

      let geometry = new T.PlaneGeometry(8,4)

      let metal_mat = new T.MeshStandardMaterial({color:"white"})
      // metal_mat.metalnessMap = metalnessMap;
    //   metal_mat.metalness = .5;
    //   metal_mat.roughness = .5;
    //   metal_mat.map = fcg;
      // metal_mat.bumpMap = bumpMap;
      let mesh = new T.Mesh(geometry,metal_mat);

      // mesh.rotateZ(Math.PI/2)
      mesh.translateZ(-4)
      mesh.translateX(2)
      super("Book"+(plain?"-plane":"-texture"),mesh);
      this.bgeom = geometry;
      this.mat = metal_mat;
    // make bright
      // this.mat.emissive = 0xffffff;
      screenCamera = new T.PerspectiveCamera(60, 2, 0.1, 1000)
      screenCamera.translateY(height)
      screenCamera.translateZ(0)
      screenCamera.rotateY(-Math.PI)
      // screenCamera.rotateX(Math.PI/2)
      // screenCamera.add(new T.Mesh(new T.BoxGeometry(2,2, 2), new T.MeshBasicMaterial({color: 0x00ff00})));
      screenTarget.add(screenCamera);
      // // Add directional light to the scene
      // let directionalLight = new T.DirectionalLight(0xff00ff, 10); // Color: white, Intensity: 1
      // directionalLight.position.set(0, 4, 0); // Set light position
      // directionalLight.lookAt(this.objects[0].position)
      // this.light = directionalLight;
      // Create cube render target
      screenRenderTarget = new T.WebGLRenderTarget( 256,128);
      this.mat.map = screenRenderTarget.texture;
      //make bright
      // this.mat.emissive = 0xffffff;
      this.mat.lightMap = screenRenderTarget.texture;
      this.mat.lightMapIntensity = 100;
      // this.mat.emissiveMap = screenRenderTarget.texture;
      // this.mat.emissiveIntensity = 1000;

      // this.mat.map = fcg;
      // Create cube camera
      // cubeCamera = new T.CubeCamera( 0.1, 100000, cubeRenderTarget );

      // Update the render target cube

  }

  stepWorld(ms, daytime) {
      // this used to be .01 per step
      // however, we want to advance things based on the frame rate
      // if we get 60fps, that's 16 miliseconds
      // screenCamera.position.copy( screenTarget.position );
      
      // screenRender.setRenderTarget(screenRenderTarget);
      // screenRender.render(world.scene, screenCamera);
      world.renderer.setRenderTarget(screenRenderTarget);
      world.renderer.render(world.scene, screenCamera, screenRenderTarget);
      world.renderer.setRenderTarget(null);

      // this.mat.map = screenRenderTarget.texture;
      // screenCamera.update(world.renderer, world.scene);
      // screenCamera.updateProjectionMatrix();
    }

}


function test() {  
  let lights = [];
  // Add directional light to the scene
  let spotlight = new T.SpotLight(0xffffff, 100, 100); // Color: white, Intensity: 1

  spotlight.position.set(0, 10, 10); // Set light position
  spotlight.lookAt(0,0,0);
  lights.push(spotlight);
  let parentOfCanvas = document.getElementById("div1");
  // let 
  world = new GrWorld({ where: parentOfCanvas, lights:lights });

  /**
   * Some Stuff in the world to cast and receive shadows
   */
  // a high object to cast shadows on lower objects
  let gr = new T.Group();
  let mat = new T.MeshStandardMaterial({ color: "blue" });
  let geom = new T.TorusGeometry();
  let tmesh = new T.Mesh(geom, mat);
  tmesh.rotateX(Math.PI / 2);
  screenTarget = tmesh;
  tmesh.scale.set(0.5, 0.5, 0.25);
  tmesh.translateX(-2);
  gr.add(tmesh);
  gr.translateY(1);
  let highobj = new GrObject("high obj", gr);
  spinY(highobj);
  world.add(highobj);
  
  world.scene.add( cubeCamera );

  world.scene.traverse(function(object) {
    object.castShadow = true;
    object.receiveShadow = true;
  });

  /*
  world(function(object) {
    object.castShadow = true;
    object.receiveShadow = true;
});
*/
  spotlight.castShadow = true;

  world.renderer.shadowMap.enabled = true;
  world.renderer.shadowMap.type = T.BasicShadowMap;


  let sphere2 = new Sphere2();
// sphere2.objects[0].translateX(-1); // make it float a little above the table
sphere2.objects[0].translateY(1); // make it float a little above the table
sphere2.objects[0].scale.set(2,2,2);
world.add(sphere2);

let screen = new Screen();
// sphere2.objects[0].translateX(-1); // make it float a little above the table
screen.objects[0].translateY(1); // make it float a little above the table
screen.objects[0].scale.set(2,2,2);
world.add(screen);

world.scene.background = new T.CubeTextureLoader()
.setPath( 'skybox/' )
.load( [
            'posx.jpg',
            'negx.jpg',
            'posy.jpg',
            'negy.jpg',
            'posz.jpg',
            'negz.jpg'
        ] );

    world.scene.add( cubeCamera );

world.go();
}

export function add_screen(w, screenTarget, x, z, height=2, scale = 0.5) {
    // this.screenTarget = screenTarget;
    world = w;
    let screen = new Screen(true, screenTarget);
    screen.setPos(x, height, z);
    screen.objects[0].scale.set(scale,scale,scale);
    // screen.objects[0].rotateZ(-Math.PI/2)
    world.add(screen);
}
// test();

