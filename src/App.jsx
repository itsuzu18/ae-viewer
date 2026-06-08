import { Canvas } from "@react-three/fiber"
import {
  Float,
  OrbitControls,
  useGLTF,
} from "@react-three/drei"
import * as THREE from "three"
import { useMemo } from "react"

function Logo() {
  const { scene } = useGLTF("/ae-logo-v2.glb")
  const  toonTexture = useMemo(() => {
    const colors = new Uint8Array([120, 150, 255])
    const texture = new THREE.DataTexture(colors, colors.length, 1, THREE.RedFormat)
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.needsUpdate = true
    return texture
    


  })

  scene.traverse((child) => {
    if (child.isMesh) {
      const originalColor = child.material.color;

      child.material = new THREE.MeshToonMaterial({
        color: originalColor,
        gradientMap: toonTexture, 

        });
    }
  })

  return (
    <Float
      speed={3}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <primitive
        object={scene}
        scale={0.5}
        rotation={[Math.PI / 2.5, 0.3, 0]}
      />
    </Float>
  )
}

export default function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <Canvas
      style={{ background: "transparent", }}

        gl={{ alpha: true }}
        camera={{
          position: [0, 0, 8],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.1} />

        <hemisphereLight
          intensity={0.7}
        />

        <directionalLight
          position={[3, 10, 8]}
          intensity={2}
        />

        <directionalLight
          position={[3, 3, 3]}
          intensity={1}
        />

        <Logo />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.08}
          rotateSpeed={0.8}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  )
}