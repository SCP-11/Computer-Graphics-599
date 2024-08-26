/*
 * Simple Shader
 * The student should make this more interesting, but the interesting parts
 * might be the fragment shader.
  */

/* pass interpolated variables to the fragment */
varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

uniform float time;
/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    // pass the texture coordinate to the fragment
    v_uv = uv;

    // print("time: ", time);
    // float multiplier = (1.0 + 0.2*sin(abs(position.y) * 2000000.0));
    float multiplier = (1.0 + 0.2*sin(position.y * 30.0 + 2.0 * time));
    // float multiplier = (1.0 + time);
    float modifiedX = position.x * multiplier;
    float modifiedZ = position.z * multiplier;
    vec3 modifiedPos = vec3(modifiedX, position.y, modifiedZ);  
    // vec3 modifiedPos = vec3(position.x + 2.0, position.y, position.z);  
    // compute the position in view space
    vec4 pos = (modelViewMatrix * vec4(modifiedPos,1.0));
    
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * pos;
    
    // pass position to fragment shader
    v_position = pos.xyz;
    
    // compute the view-space normal and pass it to fragment shader
    v_normal = normalMatrix * normal;
}

