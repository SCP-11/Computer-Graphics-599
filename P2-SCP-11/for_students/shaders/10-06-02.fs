/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

void main()
{

    vec3 light = vec3(1,1,1);
    vec3 dark = vec3(.5,.5,.5);
    vec3 green = vec3(0,1,0);

    float radius = 0.1;

    float x = v_uv.x * 8.0;
    float y = v_uv.y * 8.0;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    radius = 0.6-abs(y-4.0)/10.0;
    float d = sqrt(dx*dx + dy*dy);
    float dc = step(d,radius);
    
    // float dc2 = step(d,radius);
    // vec3 color = step(xc + yc, 2.0) == 1.0? green : dark;
    vec3 color = dark;
    gl_FragColor = vec4(mix(color,light,dc), 1.);
}

