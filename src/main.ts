import { pixel_shader, vertex_shader } from './basic_shaders/basic.js';

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;

const GL_context = canvas.getContext("webgl2");
if (GL_context == null) {
    throw new Error("WebGL2 Not Supported");
}

canvas.width = window.outerWidth;
canvas.height = window.outerHeight;
console.debug("Canvas: %ox%o", canvas.width, canvas.height);

window.addEventListener('resize', () => {
    console.debug("Canvas Resized To: %ox%o", canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    GL_context.viewport(0, 0, GL_context.canvas.width, GL_context.canvas.height);
})

function compileShader(type: GLenum, source: string): WebGLShader {
    const shader = GL_context.createShader(type);
    GL_context.shaderSource(shader, source);
    GL_context.compileShader(shader);

    const compilation_result = GL_context.getShaderParameter(shader, GL_context.COMPILE_STATUS);
    if (compilation_result != true) {
        console.error("Failed to compile shader: " + GL_context.getShaderInfoLog(shader));
        GL_context.deleteShader(shader);
    }

    console.debug("Shader compiled successfully");
    return shader;
}

var vertexShaderCompiled = compileShader(GL_context.VERTEX_SHADER, vertex_shader);
var pixelShaderCompiled = compileShader(GL_context.FRAGMENT_SHADER, pixel_shader);

function drawloop() {
    GL_context.viewport(0, 0, canvas.width, canvas.height);
    GL_context.clearColor(0.0, 0.0, 0.0, 1.0);
    GL_context.clear(GL_context.COLOR_BUFFER_BIT);
    requestAnimationFrame(drawloop);
}
drawloop();
