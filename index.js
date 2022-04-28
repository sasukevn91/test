//import { OrbitControls } from "./OrbitControls.js"
//import { PLYLoader } from "./"


window.addEventListener("DOMContentLoaded", () => {
    init()
} );

const scene = new THREE.Scene()

function init() {
    const light = new THREE.SpotLight()
    light.position.set(20, 20, 20)
    scene.add(light)
    
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 40
    
    const renderer = new THREE.WebGLRenderer()
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    
    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    

    

    console.log("scene", scene);
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }
    
    function animate() {
        requestAnimationFrame(animate)
    
        controls.update()
    
        render()
    
    }
    
    function render() {
        renderer.render(scene, camera)
    }
    
    animate()
}



console.log("points", pointCloud)


function geometryBBNullAlert(){console.log("bounding box of geometry is null.");};
function plyLoader(path) {
    const material = new THREE.PointsMaterial({
        vertexColors: true,//頂点の色付けを有効にする
        size: 0.03,
    });
    const loader = new THREE.PLYLoader()
    loader.load(path,
    function (geometry) {
        geometry.computeVertexNormals()
        const pointCloud = new THREE.Points(geometry, material);
        pointCloud.rotateX(-Math.PI / 2)
        scene.add(pointCloud);
    },
    (error) => {
        console.log(error)
    });
}