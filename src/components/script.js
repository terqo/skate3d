import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

let currentMount = null

      //scene
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        25,
        100 / 100,
        0.1,
        1000
    )

    camera.position.z = 3
    scene.add(camera)
    
    //renderer
    const renderer = new THREE.WebGLRenderer()


    //Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    //controls.target = new THREE.Vector3(3,3,3)
    controls.enableDamping = true 
    
    //resize
    const resize = () => {
      renderer.setSize(currentMount.clientWidth,
        currentMount.clientHeight)
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight
        camera.updateProjectionMatrix()
    }   
    window.addEventListener('resize', resize)

    //loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./3d/skate.glb',
        (gltf)=> {
            scene.add(gltf.scene)
        }
        
    )

    //lights
    //const AO = new THREE.AmbientLight('white', 0.8)
    //scene.add(AO)
    
    //const pointLight = new THREE.PointLight('blue', 12)
    //pointLight.position.y = 5
    //scene.add(pointLight) 
    
    const directional = new THREE.DirectionalLight('green',1.3)
    directional.position.set(7,7,7)
    //scene.add(directional)

    const enviromentMap = new THREE.CubeTextureLoader()
    const envMap = enviromentMap.load([
      './envmp/px.png',
      './envmp/nx.png',
      './envmp/py.png',
      './envmp/ny.png',
      './envmp/pz.png',
      './envmp/nz.png',
    ])
    scene.environment = envMap
    scene.background = envMap

    //render the scene 
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)

    }
    animate()
    

     //Mount Scene
     export const mountScene = (mountRef) => {
        currentMount = mountRef.current
        resize()
        currentMount.appendChild(renderer.domElement)
     }

     //clean Up Scene
    export const cleanupScene = () => {
        //scene.dispose()
        currentMount.removeChild(renderer.domElement)
     }