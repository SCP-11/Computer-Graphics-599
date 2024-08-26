/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let map = new T.TextureLoader().load("./camo/fabric_0001_color_1k.jpg");
let normalMap = new T.TextureLoader().load("Metal_006_SD/Metal_006_normal.jpg");
let roughnessMap = new T.TextureLoader().load("Metal_006_SD/Metal_006_roughness.jpg");
let heightMap = new T.TextureLoader().load("Metal_006_SD/Metal_006_height.png");
let explosionMap = new T.TextureLoader().load("explosion.png");
// define your vehicles here - remember, they need to be imported
// into the "main" program
const body_color = new T.Color('hsl(60, 50%, 30%)'); // Hue: 60 (yellow), Saturation: 100% (fully saturated), Lightness: 80% (light yellow)
let material = new T.MeshStandardMaterial({
    color: body_color,
    map: map, 
    normalMap: normalMap, 
    roughnessMap: roughnessMap, 
    // bumpMap: heightMap, 
    // color: body_color
});

// let this.time = 0;
export default class Tiger extends GrObject {
    constructor({World, Start=new T.Vector3(), track, cam, build = false, track_time = 2, turret_time = 4, loop_time = 6}) {

        const lightYellow = new T.Color('hsl(60, 50%, 40%)'); // Hue: 60 (yellow), Saturation: 100% (fully saturated), Lightness: 80% (light yellow)

        let tiger_mesh = new T.Mesh();

        tiger_mesh.add(body())

        if(!build){
            // {wheels_l: wheels_l, wheels_r} = two_wheels()
            let lr_wheels = two_wheels()
            let l_wheels = lr_wheels.wheels_l
            let r_wheels = lr_wheels.wheels_r
            tiger_mesh.add(l_wheels)
            tiger_mesh.add(r_wheels)
            // tiger_mesh.add(wheels())
            let lr_tracks = two_track()
            let l_tracks = lr_tracks.leftTrack_mesh
            let r_tracks = lr_tracks.RightTrack_mesh
            tiger_mesh.add(l_tracks)
            tiger_mesh.add(r_tracks)
            // tiger_mesh.add(two_track())
            tiger_mesh.add(turret())
        }
        
        let explosion_geo = new T.PlaneGeometry(10,10)
        let explosion_mat = new T.MeshStandardMaterial({map: explosionMap, transparent: true, opacity: 0.8, emissive: lightYellow, emissiveIntensity:1})
        let explosion = new T.Mesh(explosion_geo, explosion_mat)
        explosion.translateY(4)

        tiger_mesh.add(explosion)
        tiger_mesh.add(new T.Mesh)
        // tiger_mesh.translateY(3)
        tiger_mesh.scale.set(.2,.2,.2)
        
        super("tiger", tiger_mesh);
        this.mat = material;
        this.build = build;
        this.time = 0;
        this.count = 0;
        this.track_time = track_time;
        this.turret_time = turret_time;
        // let lights = [];
        // Add directional light to the scene
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(12);
        this.ridePoint.translateZ(-10);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
        // world.push(spotlight);
        this.track = track;
        this.u = 0;
        this.Start = Start;
        this.World = World;
        // Effects
        this.explosion = explosion;
        this.explosion_lookat = new T.Vector3(0,0,0);
        this.explosion.scale.set(0,0,0);
        this.cam = cam;
        this.destroyed = false; 
        this.time = 0;
    }
    stepWorld(delta, timeOfDay) {
        // console.log(this.time)
        if(this.build){
            this.explosion.lookAt(this.cam.position);
            // this.explosion.scale.set(2*Math.sin(2*this.time), 2*Math.sin(2*this.time), 2*Math.sin(2*this.time));
            if(this.time < this.turret_time+ 20){
                this.time += delta/1000;
            }
            if(this.time > this.track_time){
                let track_animation_time = 2
                if(this.count < 1){
                    this.count = 1;
                    let lr_tracks = two_track()
                    this.l_tracks = lr_tracks.leftTrack_mesh
                    this.l_tracks.translateX(track_animation_time)
                    this.r_tracks = lr_tracks.RightTrack_mesh
                    this.l_tracks.translateX(-track_animation_time)
                    this.objects[0].add(this.l_tracks)
                    this.objects[0].add(this.r_tracks)

                    let lr_wheels = two_wheels()
                    this.l_wheels = lr_wheels.wheels_l
                    this.l_wheels.translateX(track_animation_time)
                    this.r_wheels = lr_wheels.wheels_r
                    this.r_wheels.translateX(-track_animation_time)
                    this.objects[0].add(this.l_wheels)
                    this.objects[0].add(this.r_wheels)
                }
                if(this.time < this.track_time + track_animation_time){
                    this.l_tracks?.position.setX(3.8 + track_animation_time - this.time + this.track_time)
                    this.r_tracks?.position.setX(-2.3 - track_animation_time + this.time - this.track_time)
                    this.l_wheels?.position.setX(4 + track_animation_time - this.time + this.track_time)
                    this.r_wheels?.position.setX(-4 - track_animation_time + this.time - this.track_time)
                }
            }
            if(this.time > this.turret_time){
                let track_animation_time = 2
                if(this.count < 2){
                    this.turret = turret()
                    this.objects[0].add(this.turret)
                    this.turret.translateY(track_animation_time)
                    this.count = 2;
                }
                if(this.time < this.turret_time + track_animation_time){
                    this.turret?.position.setY(6.1 + track_animation_time - this.time + this.turret_time)
                }
            }
            if(this.time > this.turret_time + 2 && this.time < this.turret_time + 13){
                // this.setPos(,0,0);
                // let cur = this.objects[0].position;
                // this.setPos(cur.x ,cur.y, cur.z+time/1000)
                this.objects[0].translateZ(2*delta/1000)   
            }if(this.time > this.turret_time + 5 && this.time < this.turret_time + 6){
                // this.setPos(,0,0);
                
                // let cur = this.objects[0].position;
                // this.setPos(cur.x ,cur.y, cur.z+time/1000)
                this.objects[0].rotateY(-2*delta/1000);
            }
            if(this.destroyed){
                if(this.explosion.scale.x <2){
                    let scale = this.explosion.scale.x + delta/100;
                    this.explosion.scale.set(scale, scale, scale);
                }else{
                    this.explosion.visible = false;
                }
                if(this.explosion.scale.x > 2){
                    
                    // this.objects[0].remove(this.explosion);
                    this.objects[0].remove(this.l_tracks);
                    this.objects[0].remove(this.r_tracks);
                    this.objects[0].remove(this.l_wheels);
                    this.objects[0].remove(this.r_wheels);
                    this.objects[0].remove(this.turret);
                    
                }
            }
        }else{
            if(this.track != undefined){
                this.u += delta / 2000;
                let pos = this.track.eval(this.u);
                this.objects[0].position.set(pos[0], pos[1], pos[2]);
                let dir = this.track.tangent(this.u);
                // since we can't easily construct the matrix, figure out the rotation
                // easy since this is 2D!
                let zAngle = Math.atan2(dir[2], dir[0]);
                // turn the object so the Z axis is facing in that direction
                this.objects[0].rotation.y = -zAngle - Math.PI / 2;
            }
        }
    }

    destroy(){
        this.destroyed = true;
    }

    getDestroy(){
        return this.destroyed;
    }

    reStart(){
        this.World.add(this)
        this.destroyed = false;
        this.time = 0;
        this.count = 0;
        this.explosion.visible = true;
        this.explosion.scale.set(0,0,0);
        this.objects[0].position.set(this.Start.x, this.Start.y, this.Start.z);
        this.objects[0].rotation.set(0,0,0);
    }
}       


function body(){
    let body_geometry = new T.BufferGeometry();
    // let geometry = new T.BoxGeometry(1,1,1)
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const body_vertices = new Float32Array( [
        //front
        -2,-1,6,  //0
        2,-1,6,  //1
        -2,0,6,   //2
        2,0,6,  //3

        -2,1,4, //4
        2,1,4,  //5
        4,1,4,
        4,2,4,
        -4,2,4,
        -4,1,4, //9

        -4,2,-6,
        -4,1,-6,    //11
        4,2,-6,
        4,1,-6,    //13

        -2,-2,5,    //14
        2,-2,5, //15

        -2,1,-6,
        2,1,-6, //17

        -2,-2,-6,
        2,-2,-6,//
    ]);
    body_geometry.setAttribute('position',new T.BufferAttribute(body_vertices,3));
    // body_geometry.computeVertexNormals();
    body_geometry.setIndex([
        0,1,2, 1,3,2,   //front plate
        2,3,4, 3,5,4,   //front angle

        //Front plate 2
        5,6,7,
        4,5,7, 4,7,8,
        4,8,9,

        10,9,8, 9,10,11,    //right

        12,7,6, 6,13,12,    //left

        10,8,7, 12,10,7,    //top

        14,1,0, 14,15,1,    //front bot

        //  right side bot
        0,2,4, 0,4,16, 0,16,18, 0,18,14,
        //  left side bot
        5,3,1, 17,5,1, 19,17,1, 15,19,1,

        11,10,16, 
        17,12,13,
        10,12,16, 16,12,17,
        16,17,18, 17,19,18,
    ]);
    const uvs = new Float32Array( [
        0,0,
        .3,0,
        0,.2,
        .3,.2,
        0.4,0,
        0.4,.2,
        .7,0,
        .7,.2, //7
        
        .7,.9,  //8
        .7,.9,  //9
        .7,.9,
        .7,.9,

        .7,.9,  //12
        .7,.9,  //13
        .7,.7,  //14
        .7,.7,  //15
        .8,.7,
        .8,.8,
    ]);
    body_geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
    
    body_geometry.translate(0,0,0)
    body_geometry.computeVertexNormals();
    let body_mesh = new T.Mesh(body_geometry, material);

    
    body_mesh.translateY(2.5)

    return body_mesh;
}

function two_wheels(){        
    /////////////////// Wheels  ////////////
    let first = 4;
    let last = -4;
    let wheel_mat = material;
    let wheel_height = 1;
    let wheels = new T.Mesh();
    let wheels_l = new T.Mesh();
    let wheels_r = new T.Mesh();
    for(let i = 0; i < 5; i++){
        let two_wheel = new T.Mesh()
        let wheel_r_geo = new T.CylinderGeometry(1, 1, .2, 10,1)
        wheel_r_geo.rotateZ(Math.PI/2);
        let wheel_r = new T.Mesh(wheel_r_geo, wheel_mat)
        // wheel_r.translateX(-4)
        wheel_r.translateZ(first - i/4*(first-last))
        wheels_r.add(wheel_r);
        let wheel_l_geo = new T.CylinderGeometry(1, 1, .2, 10,1)
        wheel_l_geo.rotateZ(Math.PI/2);
        let wheel_l = new T.Mesh(wheel_l_geo, wheel_mat)
        wheel_l.translateZ(first - i/4*(first-last))
        wheels_l.add(wheel_l);

        // two_wheel.
        // two_wheel.translateZ(first - i/4*(first-last))
        wheels.add(two_wheel)
    }
    wheels_l.translateX(4)
    wheels_r.translateX(-4)
    wheels_l.translateY(wheel_height)
    wheels_r.translateY(wheel_height)
    return {wheels_l, wheels_r};
}
function two_track(){
    let two_track = new T.Mesh()

    const shape = new T.Shape();
    // shape.
    shape.moveTo(5.4, 0);
    shape.lineTo(5.9, -1);
    shape.lineTo(5, -2);
    shape.lineTo(-5, -2);
    shape.lineTo(-5.5, -1);
    shape.lineTo(-5.5, -.8);
    shape.lineTo(-5.4, 0);
    // shape.lineTo(5, -1);
    // shape.lineTo(6, -.5);
    shape.closePath()

    // Define parameters for extrusion
    const extrudeSettings = {
        depth: 1.5, // Extrusion depth (thickness)
        bevelEnabled: true, // Enable bevels
        bevelThickness: 0.1, // Bevel thickness
        bevelSize: 0.1, // Bevel size
        bevelSegments: 2 // Number of bevel segments
    };
    // Create the extruded geometry using ExtrudeGeometry
    const geometry = new T.ExtrudeGeometry(shape, extrudeSettings);
    geometry.rotateY(-Math.PI/2)
    // Create a MeshBasicMaterial with a color
    // const track_material = new T.MeshBasicMaterial({ color: "black" });
    var track_material = new T.MeshStandardMaterial({
        color: "black",
        map: map, 
        normalMap: normalMap, 
        roughnessMap: roughnessMap, 
        // bumpMap: heightMap, 
        // color: body_color
    });
    // track_material.color = "black"
    // Create a Mesh using the geometry and material
    const leftTrack_mesh = new T.Mesh(geometry, track_material);
    leftTrack_mesh.translateX(-2.3)
    leftTrack_mesh.translateY(2)
    two_track.add(leftTrack_mesh)
    const RightTrack_mesh = new T.Mesh(geometry, track_material);
    RightTrack_mesh.translateX(3.8)
    RightTrack_mesh.translateY(2)
    two_track.add(RightTrack_mesh)
    // Add the mesh to the scene
    return {leftTrack_mesh, RightTrack_mesh};
}

function turret(){
    let turret = new T.Mesh()

    const shape = new T.Shape();
    // shape.
    shape.moveTo(1.5, 1);
    shape.lineTo(-1.5, 1);
    shape.lineTo(-2, 0);
    shape.quadraticCurveTo(-3,-3.5,0,-3.5)
    shape.quadraticCurveTo(3,-3.5,2,0)

    // shape.lineTo(5, -1);
    // shape.lineTo(6, -.5);
    shape.closePath()

    // Define parameters for extrusion
    const extrudeSettings = {
        depth: 1.5, // Extrusion depth (thickness)
        bevelEnabled: true, // Enable bevels
        bevelThickness: 0.1, // Bevel thickness
        bevelSize: 0.1, // Bevel size
        bevelSegments: 2 // Number of bevel segments
    };
    // Create the extruded geometry using ExtrudeGeometry
    const geometry = new T.ExtrudeGeometry(shape, extrudeSettings);
    geometry.rotateX(Math.PI/2)
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
    // Create a MeshBasicMaterial with a color
    const turret_color = new T.Color('hsl(60, 60%, 20%)'); // Hue: 60 (yellow), Saturation: 100% (fully saturated), Lightness: 80% (light yellow)

        
    // const material = new T.MeshBasicMaterial({ color: turret_color });
    let material = new T.MeshStandardMaterial({
        color: body_color,
        map: map, 
        normalMap: normalMap, 
        roughnessMap: roughnessMap, 
        // bumpMap: heightMap, 
        // color: body_color
    });
    // Create a Mesh using the geometry and material
    const turret_mesh = new T.Mesh(geometry, material);

    turret.add(turret_mesh)
    const c_color = new T.Color('hsl(60, 40%, 20%)'); // Hue: 60 (yellow), Saturation: 100% (fully saturated), Lightness: 80% (light yellow)

    // const c_material = new T.MeshBasicMaterial({ color: c_color });
    let c_material = material;
    let cannon = new T.Mesh()
    let cannon_geo = new T.CylinderGeometry(.35, .4, 2, 10, 1)
    cannon_geo.rotateX(Math.PI/2)
    cannon_geo.translate(0,-.6,2)
    cannon.add(new T.Mesh(cannon_geo, c_material))
    cannon_geo = new T.CylinderGeometry(.2, .25, 4, 10, 1)
    cannon_geo.rotateX(Math.PI/2)
    cannon_geo.translate(0,-.6,5)
    cannon.add(new T.Mesh(cannon_geo, c_material))

    turret.add(cannon)
    
    turret.translateY(6.1)
    turret.translateZ(1)
    turret.scale.set(1.1,1.1,1.1)
    // Add the mesh to the scene
    return turret;
}