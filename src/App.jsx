import { Canvas } from "@react-three/fiber"
import {
  Float,
  OrbitControls,
  useGLTF,
} from "@react-three/drei"

function Logo() {
  const { scene } = useGLTF("/ae-logo.glb")

  return (
    <Float
      speed={2}
      rotationIntensity={0.1}
      floatIntensity={0.3}
    >
      <primitive
        object={scene}
        scale={0.5}
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
        <ambientLight intensity={2} />

        <hemisphereLight
          intensity={1}
        />

        <directionalLight
          position={[3, 3, 3]}
          intensity={2}
        />

        <directionalLight
          position={[-3, -2, 2]}
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