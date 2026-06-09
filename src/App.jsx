import { Canvas, useFrame } from "@react-three/fiber"
import { Float, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { useMemo, useEffect, useRef } from "react"

function Model({
  path,
  position,
  rotation,
  scale = 0.5,
}) {
  const { scene } = useGLTF(path)

  const modelRef = useRef()

  const dragState = useRef({
    dragging: false,
    targetX: rotation?.[0] || 0,
    targetY: rotation?.[1] || 0,
  })

  const toonTexture = useMemo(() => {
    const colors = new Uint8Array([0, 120, 255])

    const texture = new THREE.DataTexture(
      colors,
      colors.length,
      1,
      THREE.RedFormat
    )

    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.needsUpdate = true

    return texture
  }, [])

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const originalColor =
          child.material?.color || "#ffffff"

        child.material = new THREE.MeshToonMaterial({
          color: originalColor,
          gradientMap: toonTexture,
        })
      }
    })
  }, [scene, toonTexture])

  useFrame(() => {
    if (!modelRef.current) return

    modelRef.current.rotation.x +=
      (dragState.current.targetX -
        modelRef.current.rotation.x) *
      0.1

    modelRef.current.rotation.y +=
      (dragState.current.targetY -
        modelRef.current.rotation.y) *
      0.1
  })

  return (
    <Float
      speed={3}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <primitive
        ref={modelRef}
        object={scene}
        scale={scale}
        position={position}
        rotation={rotation}
        onPointerDown={(e) => {
          e.stopPropagation()
          dragState.current.dragging = true
        }}
        onPointerUp={(e) => {
          e.stopPropagation()
          dragState.current.dragging = false
        }}
        onPointerLeave={() => {
          dragState.current.dragging = false
        }}
        onPointerMove={(e) => {
          if (!dragState.current.dragging) return

          dragState.current.targetY +=
            e.movementX * 0.01

          dragState.current.targetX +=
            e.movementY * 0.01
        }}
      />
    </Float>
  )
}

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <Canvas
        style={{
          background: "transparent",
        }}
        gl={{ alpha: true }}
        camera={{
          position: [0, 0, 8],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.2} />

        <hemisphereLight intensity={0.8} />

        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
        />

        <directionalLight
          position={[-5, 5, 5]}
          intensity={1}
        />

<Model
  path="/ae-logo-3d.glb"
  position={[-2.2, 1.5, 0]}
  rotation={[Math.PI / 2.5, 0.3, 0]}
  scale={0.5}
/>

<Model
  path="/ai-logo-3d.glb"
  position={[2.2, 1.5, 0]}
  rotation={[Math.PI / 2.5, -0.3, 0]}
  scale={0.5}
/>

<Model
  path="/ps-logo-3d.glb"
  position={[-2.2, -1.5, 0]}
  rotation={[Math.PI / 2.5, 0.15, 0]}
  scale={0.5}
/>

<Model
  path="/blender-logo-3d.glb"
  position={[2.2, -1.5, 0]}
  rotation={[Math.PI / 2.5, -0.15, 0]}
  scale={0.5}
/>

      </Canvas>
    </div>
  )
}