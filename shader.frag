#version 330
 
in vec2 texCoordV;
 
out vec4 colorOut;
 
void main() {
 
colorOut = vec4(texCoord, 0.0, 0.0);    
}
