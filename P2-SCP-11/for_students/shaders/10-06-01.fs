/* a simple procedural texture */
/* the student should change this to implement a checkerboard */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

void main()
{

    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    float xc = floor(x);
    float yc = floor(y);

    bool xblack = mod(xc,2.0) == 0.0;
    bool yblack = mod(yc,2.0) == 1.0;
    
    bool black = (xblack && yblack) || (!xblack && !yblack);
    // vec3 green = vec3(0,1,0);
    // float dc2 = step(d,radius);
    vec3 color = black? light : dark;
    gl_FragColor = vec4(color, 1.);

}

