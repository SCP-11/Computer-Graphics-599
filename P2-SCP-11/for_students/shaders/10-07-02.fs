/* a simple procedural texture */
/* the student should change this to implement a checkerboard */

/* passed interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

void main()
{
    // float dc = .5;


    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    float xc = floor(x);
    float yc = floor(y);

    float xor = mod(xc+yc,2.0);
    // vec3 green = vec3(0,1,0);
    // float dc2 = step(d,radius);
    float blur = 0.02;
    float d = .01;
    float a = blur > -.5 ? blur: fwidth(d);
    
    float dx = xor - (xor*2.0-1.0)*(1.0-smoothstep(- a,a,min(x-xc, xc-x+1.0)));
    float dy = xor - (xor*2.0-1.0)*(1.0-smoothstep(- a,a,min(y-yc, yc-y+1.0)));
    float dxor = mod(xc+yc,2.0);
    // vec3 color = mix(light,dark,xor);
    float dc = xor > 0.0?min(dx,dy):max(dx,dy);
    vec3 color = mix(light,dark,dc);
    gl_FragColor = vec4(color, 1.);

    // gl_FragColor = vec4(mix(light,dark,dc), 1.);
}

