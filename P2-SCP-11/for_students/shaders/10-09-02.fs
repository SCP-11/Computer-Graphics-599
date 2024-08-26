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


 // get the texture from the program
 uniform sampler2D tex;
 uniform sampler2D bump;
void main()
{
    vec3 baseColor = texture2D(tex, v_uv).xyz;
    vec3 bumpMapColor = texture(bump, v_uv).rgb;
    vec3 normalMap = normalize(bumpMapColor * 2.0 - 1.0);
    vec3 normal = normalize(v_normal + normalMap);
    // get the view direction in view-space coordinates
    // remember in view space, the camera is the origin
    vec3 viewDir = normalize( - v_position);

    // convert the lighting direction in view-space coordinates
    vec3 lightDir = normalize((viewMatrix * vec4(lightDirWorld,0.)).xyz);
    // re-normalize the interpolated normal vector
    // vec3 normal = normalize(v_normal);
    // get angle of reflection to compute alignment
    // without using `reflect`, alignment can be computed by taking the halfway vetor H and evaluating dot(N,H)
    vec3 reflDir = reflect(-lightDir,normal);
    float alignment = max(dot(viewDir,reflDir),0.);
    // specular highlight color
    vec3 diffuse = baseColor * max(dot(normal,lightDir),0.);
    vec3 specular = specularColor * pow(alignment,pow(2.,shininess));
    gl_FragColor = vec4(clamp(diffuse+specular,0.,1.),1);
}

