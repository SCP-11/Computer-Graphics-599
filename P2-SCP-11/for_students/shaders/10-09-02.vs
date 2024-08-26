/*
 * Simple Shader
 * The student should make this more interesting, but the interesting parts
 * might be the fragment shader.
  */

/* pass interpolated variables to the fragment */
varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    // pass the texture coordinate to the fragment
    v_uv = uv;

    vec3 modifiedPos = vec3(position.x - mod(position.y, 2.0), position.y, position.z);  
    // compute the position in view space
    vec4 pos = (modelViewMatrix * vec4(position,1.0));
    
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * pos;
    
    // pass position to fragment shader
    v_position = pos.xyz;
    
    // compute the view-space normal and pass it to fragment shader
    v_normal = normalMatrix * normal;
}

