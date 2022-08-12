
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

varying vec3 v_Pos;
varying mat3 m_Model;

void main() {
    vec3 Plocal = transpose(inverse(m_Model)) * v_Pos;

    float lerpedVal = (length(Plocal) - Min)/(Max - Min);

    vec3 color = vec3(0.1302065, 0.3667024, 0.8962264); //ocean blue
    if (lerpedVal > 0.72) {
        color = vec3(1, 1, 1);
    } else if (lerpedVal > 0.49) {
        color = vec3(0.2730966, 0.2830189, 0.2707369);
    } else if (lerpedVal > 0.26) {
        color = vec3(0.4850605, 0.5377358, 0.4788893);
    } else if (lerpedVal > 0.076) {
        color = vec3(0.1158939, 0.8962264, 0.1132965);
    } else if (lerpedVal > 0.0) {
        color = vec3(0.7917321, 0.8679245, 0.3881096);
    }

    gl_FragColor = vec4(color, 1.0);
}
`;



export { _VS, _FS };
