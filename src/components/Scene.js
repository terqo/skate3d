import {useRef, useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const Scene = () => {

  const mountRef = useRef(null)
  useEffect(() => {
      const currentMount = mountRef.current

      //scene
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        25,
        currentMount.clientWidth / currentMount.clientHeight,
        0.1,
        1000
    )

    camera.position.z = 3
    scene.add(camera)
    
    //renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)

    //Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    //controls.target = new THREE.Vector3(3,3,3)
    controls.enableDamping = true 

    //loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./3d/skate.glb',
        (gltf)=> {
            scene.add(gltf.scene)
        }
        
    )

    //lights
    const AO = new THREE.AmbientLight('white', 1.5)
    scene.add(AO)
    
    //render the scene 
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)

    }
    animate()
    
    //clean up scene 
    return () => {
      currentMount.removeChild(renderer.domElement)
    }
    
  }, [])

  return (
    <div 
      className='Contenedor3D'
      ref={mountRef}
      style={{width: '100%', height:'100vh'}}
    >

    </div>
  )
}

export default Scene