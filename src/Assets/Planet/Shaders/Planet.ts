
const _VS = `

varying vec3 v_Pos;
varying mat3 m_Model;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_Pos = position;
    m_Model = mat3(modelMatrix);
}
`;

const _FS = `

uniform float Min;
uniform float Max;
uniform vec3 water;
uniform vec3 sand;
uniform vec3 grass;
uniform vec3 lowMt;
uniform vec3 midMt;
uniform vec3 upperMt;

varying vec3 v_Pos;
varying mat3 m_Model;

void main() {
    vec3 Plocal = transpose(inverse(m_Model)) * v_Pos;

    float lerpedVal = (length(Plocal) - Min)/(Max - Min);

    vec3 color = water; //ocean blue
    if (lerpedVal > 0.72) {
        color = upperMt;
    } else if (lerpedVal > 0.49) {
        color = midMt;
    } else if (lerpedVal > 0.26) {
        color = lowMt;
    } else if (lerpedVal > 0.076) {
        color = grass;
    } else if (lerpedVal > 0.0) {
        color = sand;
    }

    gl_FragColor = vec4(color, 1.0);
}
`;



export { _VS, _FS };
