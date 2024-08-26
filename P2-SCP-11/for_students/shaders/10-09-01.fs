/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

varying vec3 v_normal;
varying vec3 v_position;
uniform float shininess;

// note that this is in WORLD COORDINATES
const vec3 lightDirWorld = vec3(1,1,1);
const vec3 specularColor = vec3(1,1,1);

// uniform vec3 cameraPosition;

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
    vec3 baseColor = mix(dark,light,dc);
    // vec4 baseColor = vec4(, 1.);

    
    // get the view direction in view-space coordinates
    // remember in view space, the camera is the origin
    vec3 viewDir = normalize( - v_position);

    // convert the lighting direction in view-space coordinates
    vec3 lightDir = normalize((viewMatrix * vec4(lightDirWorld,0.)).xyz);
    // re-normalize the interpolated normal vector
    vec3 normal = normalize(v_normal);
    // get angle of reflection to compute alignment
    // without using `reflect`, alignment can be computed by taking the halfway vetor H and evaluating dot(N,H)
    vec3 reflDir = reflect(-lightDir,normal);
    float alignment = max(dot(viewDir,reflDir),0.);
    // specular highlight color
    vec3 diffuse = baseColor * max(dot(normal,lightDir),0.);
    vec3 specular = specularColor * pow(alignment,pow(2.,shininess));
    gl_FragColor = vec4(clamp(diffuse+specular,0.,1.),1);
}

