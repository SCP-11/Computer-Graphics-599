/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// your buildings are defined in another file... you should import them
// here
export class Shed extends GrObject {
    constructor({x,y,z,size}) {
        let geometry = new T.BufferGeometry();
        // let geometry = new T.BoxGeometry(1,1,1)
        //
        // while the two triangles have 4 certices, we need to split the vertices
        // so that they can have different normals
        const vertices = new Float32Array( [
            0,0,0,
            2,0,0,
            0,.7,0,
            2,.7,0,
            2,0,1,
            2,.4,1,
            0,0,1,
            0,0.4,1, //7
            
            -.1,.7,-.1,
            -.1,.3,1.1,
            2.1,.7,-.1,
            2.1,.3,1.1, //11
            
            2.1,.9,-.1,
            2.1,.5,1.1,
            -.1,.5,1.1,
            -.1,.9,-.1, //15
        ]);
        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        // give it UVs
        
        geometry.computeVertexNormals();
        geometry.setIndex([
            0,2,1, 1,2,3,
            1,3,4, 4,3,5,
            4,5,6, 7,6,5,
            6,2,0, 6,7,2,

            8,10,9, 10,11,9,
            10,13,11, 10,12,13,
            13,14,11, 14,9,11,
            14,15,8, 8,9,14,
            15,12,10, 10,8,15,

            12,15,14, 12,14,13,
        ]);
        geometry.translate(0,0,0)
        const uvs = new Float32Array( [
            0,0,
            1,0,
            0,1,
            1,1,
            0,0,
            0,.5,
            1,0,
            1,.5,
        ]);
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        
        
        
        let tl = new T.TextureLoader().load("../textures/glass_window.png");
        let material = new T.MeshBasicMaterial({
        map: tl
        });
        //
        let mesh = new T.Mesh(geometry, material);
        mesh.scale.set(size,size,size)
        mesh.position.set(x, y, z);
        //
        super("Shed", mesh);
    }
}
export class Hip extends GrObject {
    constructor({x,y,z,size}) {
        let geometry = new T.BufferGeometry();
        // let geometry = new T.BoxGeometry(1,1,1)
        //
        // while the two triangles have 4 certices, we need to split the vertices
        // so that they can have different normals
        const vertices = new Float32Array( [
            0,0,0,
            1,0,0,
            0,.7,0,
            1,.7,0,
            1,0,1,
            1,.7,1,
            0,0,1,
            0,0.7,1, //7
            
            -.1,.7,-.1,
            -.1,.7,1.1,
            1.1,.7,-.1,
            1.1,.7,1.1, //11
            
            1.1,.9,-.1,
            1.1,.9,1.1,
            -.1,.9,1.1,
            -.1,.9,-.1, //15

            0.2,1.2,0.5,
            0.7,1.2,0.5,
        ]);
        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        // give it UVs
        
        geometry.computeVertexNormals();
        geometry.setIndex([
            0,2,1, 1,2,3,
            1,3,4, 4,3,5,
            4,5,6, 7,6,5,
            6,2,0, 6,7,2,

            8,10,9, 10,11,9,
            10,13,11, 10,12,13,
            13,14,11, 14,9,11,
            14,15,8, 8,9,14,
            15,12,10, 10,8,15,

            12,15,14, 12,14,13,
            15,17,12, 15,16,17,

            14,16,15,

            17,14,13, 16,14,17, 

            12,17,13,
        ]);
        geometry.translate(0,0,0)
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
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        
        
        
        let tl = new T.TextureLoader().load("../textures/house2.png");
        let material = new T.MeshBasicMaterial({
        map: tl
        });
        //
        let mesh = new T.Mesh(geometry, material);
        mesh.scale.set(size,size,size)
        mesh.position.set(x, y, z);
        //
        super("Hip", mesh);
    }
}
function shift(grobj, x) {
    grobj.objects[0].translateX(x);
    return grobj;
}

export class Tree extends GrObject {
    constructor({x,y,z,size}) {
        let geometry = new T.CylinderGeometry(0.1, 0.1, 1, 8);
        let material = new T.MeshStandardMaterial({color: "brown"});
        let mesh = new T.Mesh(geometry, material);
        let g2 = new T.ConeGeometry(.4, 1, 8);
        let m2 = new T.MeshStandardMaterial({color: "lightgreen"});
        let mesh2 = new T.Mesh(g2, m2);
        mesh2.translateY(1);
        mesh.add(mesh2);
        mesh.scale.set(size,size,size)
        mesh.position.set(x, y, z);
        super("Tree", mesh);
    }
}


