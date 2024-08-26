/*
 * Placeholder shader
 * The student should replace this with their own shader file.
 */
varying vec2 v_uv;

void main() {
    // the main output of the shader (the vertex position)
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

