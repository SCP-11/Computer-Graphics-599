/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

let renderer = new T.WebGLRenderer({preserveDrawingBuffer:true});
renderer.setSize(600, 400);
document.body.appendChild(renderer.domElement);
renderer.domElement.id = "canvas";

let scene = new T.Scene();


const objLoader = new OBJLoader();
// let body = new T.Mesh()

export default class Drone extends GrObject {
    constructor({target, h_offset}) {
        let drone_body = new T.Mesh()
        // Load the OBJ file
        objLoader.load(
            './Drone_body.obj', // Replace with the path to your OBJ file
            function (object) {
                // Add the loaded object to the scene
                // object.scale.set(.5, .5, .5)
                // object.position.set(0,.5,0)
                object.scale.set(.005,.005,.005)
                // object.rotateZ(Math.PI/2)
                drone_body.add(object)
                let material = new T.MeshStandardMaterial({
                    color: "black",
                    metalness: 0.7,
                    roughness: 0.9,
                })
    
                object.traverse(function (child) {
                    if (child instanceof T.Mesh) {
                        child.material = material;
                    }
                });
            }
        );

        

        let drone_propella = new T.Mesh()

        // drone_body.add(drone_propella)

        let drone_propellas = []
        let cloned_drone_propella = drone_propella.clone()
        drone_propellas.push(cloned_drone_propella)
        // cloned_drone_propella.scale.set(0.5, 0.5, 0.5);
        cloned_drone_propella.position.set(-0.8, .2, -0.8);
        drone_body.add(cloned_drone_propella);

        // let propella = new T.TorusGeometry().rotateX(Math.PI/3);
        cloned_drone_propella = drone_propella.clone()
        cloned_drone_propella.scale.set(-1,1,1)
        drone_propellas.push(cloned_drone_propella)
        cloned_drone_propella.position.set(0.8, .2, -0.8);
        drone_body.add(cloned_drone_propella);
        // cloned_drone_propella.scale.set(0.5, 0.5, 0.5);

        cloned_drone_propella = drone_propella.clone()
        drone_propellas.push(cloned_drone_propella)
        cloned_drone_propella.position.set(0.8, .2, 0.8);
        drone_body.add(cloned_drone_propella);
        // cloned_drone_propella.scale.set(0.5, 0.5, 0.5);

        cloned_drone_propella = drone_propella.clone()
        cloned_drone_propella.scale.set(-1,1,1)
        drone_propellas.push(cloned_drone_propella)
        cloned_drone_propella.position.set(-0.8, .2, 0.8);
        drone_body.add(cloned_drone_propella);
        // cloned_drone_propella.scale.set(0.5, 0.5, 0.5);
        objLoader.load(
            './Drone_propella.obj', // Replace with the path to your OBJ file
            function (object) {
                for (let i = 0; i< 4; i++){
                    let cloned = object.clone()
                    cloned.rotateX(-Math.PI/2)
                    cloned.scale.set(.1,.1,.1)
                    // object.rotateZ(Math.PI/2)
                    drone_propellas[i].add(cloned)
                    let material = new T.MeshStandardMaterial({
                        color: "blue",
                        metalness: 0.7,
                        roughness: 0.9,
                        emissive: 0xff0000, // Emissive color (red in this case)
                        emissiveIntensity: .6, // Emissive intensity (adjust as needed)
                    })
            
                    cloned.traverse(function (child) {
                        if (child instanceof T.Mesh) {
                            child.material = material;
                        }
                    });
                }
            }
        );
        let drone_ight = new T.SpotLight('white', 3, 5, Math.PI)
        // let tempDirectLight = new T.DirectionalLight('white', 1)
        // let x = new T.light
        drone_ight.position.set(0,-1,0)
        // tempLight.add(new T.Mesh(propella, propellaMaterial))
        // tempMesh.add(tempDirectLight)
        drone_body.add(drone_ight)
        // drone_body.position.set(0, h_offset, 0)


        super("Drone", drone_body);
        this.root = drone_body;
        this.drone_propellas = drone_propellas;
        this.time = 0;
        this.count = 0;
        this.target = target;
        this.init_pos = new T.Vector3(-20, 2 , 5)
        this.objects[0].position.set(this.init_pos.x, this.init_pos.y, this.init_pos.z)
        // this.root.position.y = h_offset;
    }

    stepWorld(delta, timeOfDay) {
        // console.log(delta)
        this.time += delta / 1000;
        this.count += delta
        let theta = this.time;
        const right = new T.Quaternion();
        right.setFromAxisAngle(new T.Vector3(0, 1, 0), -theta*10);
        const left = new T.Quaternion();
        left.setFromAxisAngle(new T.Vector3(0, 1, 0), theta*10);

        // let delta = timestamp - pre_time
        // for (let i = 0; i < 4; i++){
        // this.count += delta
        // pre_time = timestamp
        // }
        this.drone_propellas[0].setRotationFromQuaternion(right);
        this.drone_propellas[1].setRotationFromQuaternion(left);
        this.drone_propellas[2].setRotationFromQuaternion(right);
        this.drone_propellas[3].setRotationFromQuaternion(left);


        // radarMesh.lookAt(tempPos)
        if(this.target){
            // this.root.lookAt(this.target.position)
            let target_obj = this.target.objects[0]
            if(this.root.position.distanceTo(target_obj.position) < 15){
                let direction = new T.Vector3()
                direction.subVectors(target_obj.position, this.root.position).normalize()
                this.root.position.addScaledVector(direction, 0.08)

                if(this.root.position.distanceTo(target_obj.position) < 1){
                    this.target.destroy()
                    this.objects[0].position.set(this.init_pos.x, this.init_pos.y, this.init_pos.z)
                }
            } 
        }else{
            
            if (this.count/1000 < 1){
                this.root.position.x = this.root.position.x + delta/200
            }
            else if (this.count/1000 < 2){
                this.root.position.z = this.root.position.z + delta/200
            }
            else if (this.count/1000 < 3){
                this.root.position.x = this.root.position.x - delta/200
            }
            else if (this.count/1000 < 4){
                this.root.position.z = this.root.position.z - delta/200
            }else{
                this.count = 0
                this.root.position.x = -2
                this.root.position.z = -2
            }
        }
        // renderer.render(scene, camera);
        // window.requestAnimationFrame(animateLoop);
    }
}