import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Line } from '@react-three/drei'
import * as THREE from 'three'

// Matrix Rain Effect
function MatrixRain() {
  const groupRef = useRef()
  const [drops] = useState(() => {
    const drops = []
    for (let i = 0; i < 100; i++) {
      drops.push({
        x: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40,
        speed: 0.1 + Math.random() * 0.2,
        length: 3 + Math.random() * 5,
        offset: Math.random() * 20
      })
    }
    return drops
  })

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((line, i) => {
        const drop = drops[i]
        line.position.y = ((state.clock.elapsedTime * drop.speed + drop.offset) % 30) - 15
      })
    }
  })

  return (
    <group ref={groupRef}>
      {drops.map((drop, i) => (
        <Line
          key={i}
          points={[[drop.x, 0, drop.z], [drop.x, -drop.length, drop.z]]}
          color="#00ff41"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  )
}

// Connected Particle Network
function ParticleNetwork() {
  const pointsRef = useRef()
  const linesRef = useRef()
  const particleCount = 150
  const maxDistance = 5

  const particles = useMemo(() => {
    const positions = []
    const velocities = []

    for (let i = 0; i < particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      )
      velocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      )
    }

    return { positions: new Float32Array(positions), velocities }
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array

    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] += particles.velocities[i3]
      positions[i3 + 1] += particles.velocities[i3 + 1]
      positions[i3 + 2] += particles.velocities[i3 + 2]

      // Boundary check
      for (let j = 0; j < 3; j++) {
        if (Math.abs(positions[i3 + j]) > 15) {
          particles.velocities[i3 + j] *= -1
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Update connections
    if (linesRef.current) {
      const linePositions = []
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const i3 = i * 3
          const j3 = j * 3
          const dx = positions[i3] - positions[j3]
          const dy = positions[i3 + 1] - positions[j3 + 1]
          const dz = positions[i3 + 2] - positions[j3 + 2]
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < maxDistance) {
            linePositions.push(
              positions[i3], positions[i3 + 1], positions[i3 + 2],
              positions[j3], positions[j3 + 1], positions[j3 + 2]
            )
          }
        }
      }

      if (linePositions.length > 0) {
        const positionArray = new Float32Array(linePositions)
        linesRef.current.geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(positionArray, 3)
        )
      }
    }
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#00ff41"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={0}
            array={new Float32Array(0)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ff41" transparent opacity={0.2} />
      </lineSegments>
    </>
  )
}

// Enhanced Floating Geometry with variety
function FloatingGeometry({ position, scale, rotationSpeed, geometryType = 'octahedron' }) {
  const meshRef = useRef()

  const geometry = useMemo(() => {
    switch (geometryType) {
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />
      default:
        return <octahedronGeometry args={[1, 0]} />
    }
  }, [geometryType])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed[0]
      meshRef.current.rotation.y += delta * rotationSpeed[1]
      meshRef.current.rotation.z += delta * rotationSpeed[2]

      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.5
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color="#00ff41"
        wireframe
        emissive="#00ff41"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  )
}

// Pulsing Energy Rings
function EnergyRings() {
  const ringsRef = useRef()

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2
        ring.scale.set(scale, scale, scale)
        ring.rotation.x = state.clock.elapsedTime * 0.5
        ring.rotation.y = state.clock.elapsedTime * 0.3
      })
    }
  })

  return (
    <group ref={ringsRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0, -15 - i * 3]}>
          <torusGeometry args={[5 + i * 2, 0.1, 16, 100]} />
          <meshBasicMaterial
            color="#00ff41"
            transparent
            opacity={0.3 - i * 0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// Mouse follower effect
function MouseFollower() {
  const sphereRef = useRef()
  const [mouse] = useState(new THREE.Vector2())

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouse])

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.position.x = mouse.x * 8
      sphereRef.current.position.y = mouse.y * 8
    }
  })

  return (
    <mesh ref={sphereRef} position={[0, 0, 5]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial
        color="#00ff41"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  )
}

// Animated Grid
function AnimatedGrid() {
  const gridRef = useRef()

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = ((state.clock.elapsedTime * 2) % 20) - 10
    }
  })

  return (
    <>
      <group ref={gridRef}>
        <gridHelper
          args={[50, 50, '#00ff41', '#003311']}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        />
      </group>

      {/* Side grids for tunnel effect */}
      <gridHelper
        args={[50, 50, '#00ff41', '#002211']}
        rotation={[0, 0, Math.PI / 2]}
        position={[-15, 0, -10]}
      />
      <gridHelper
        args={[50, 50, '#00ff41', '#002211']}
        rotation={[0, 0, Math.PI / 2]}
        position={[15, 0, -10]}
      />
    </>
  )
}

export default function Background3D() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(180deg, #000000 0%, #001a00 50%, #000000 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ff41" />

        <MatrixRain />
        <ParticleNetwork />
        <MouseFollower />
        <EnergyRings />

        <FloatingGeometry
          position={[-8, 2, -5]}
          scale={1.5}
          rotationSpeed={[0.3, 0.2, 0.1]}
          geometryType="octahedron"
        />
        <FloatingGeometry
          position={[8, -2, -8]}
          scale={1.2}
          rotationSpeed={[-0.2, 0.3, -0.1]}
          geometryType="icosahedron"
        />
        <FloatingGeometry
          position={[0, 4, -10]}
          scale={0.8}
          rotationSpeed={[0.1, -0.2, 0.3]}
          geometryType="torus"
        />
        <FloatingGeometry
          position={[-5, -3, -7]}
          scale={1.0}
          rotationSpeed={[0.2, -0.1, 0.2]}
          geometryType="tetrahedron"
        />
        <FloatingGeometry
          position={[6, 3, -12]}
          scale={1.3}
          rotationSpeed={[-0.3, 0.2, -0.1]}
          geometryType="icosahedron"
        />

        <AnimatedGrid />
      </Canvas>
    </div>
  )
}
