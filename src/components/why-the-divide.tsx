
// import WhyTheDividePoster from "../../public/images/fearless-exploration/why-the-divide-v8.svg";

// export default function WhyTheDivide() {
// 	return <WhyTheDividePoster></WhyTheDividePoster>
// }

// The following code was generated with v0 AI (over several iterations) and needs to be cleaned up.

"use client"


import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useRef } from "react"
import { Text, Text3D, Center } from "@react-three/drei"
import * as THREE from "three"

// Brick dimensions
const BRICK_LENGTH = 0.8
const BRICK_HEIGHT = 0.3
const BRICK_DEPTH = 0.4
const MORTAR_GAP = 0.05

// Word pairs and their colors
const WORD_PAIRS = [
  { left: "Dynamic", right: "Static", color: "#FF5252" }, // Red
  { left: "Procedural", right: "Manual", color: "#4CAF50" }, // Green
  { left: "Live", right: "One-Off", color: "#2196F3" }, // Blue
  { left: "Non-Destructive", right: "Destructive", color: "#FFC107" }, // Yellow
  { left: "Indirect", right: "Direct", color: "#9C27B0" }, // Purple
]

export function BrickWall() {
  const wallRef = useRef<THREE.Group>(null)

  // Wall dimensions
  const wallWidth = 12
  const wallHeight = 4

  // Calculate number of bricks needed
  const bricksPerRow = Math.floor(wallWidth / (BRICK_LENGTH + MORTAR_GAP))
  const numRows = Math.floor(wallHeight / (BRICK_HEIGHT + MORTAR_GAP))

  // Generate brick colors
  const generateBrickColor = () => {
    const baseColor = new THREE.Color("#a85232")
    const hue = THREE.MathUtils.randFloat(-0.03, 0.03)
    const saturation = THREE.MathUtils.randFloat(-0.1, 0.1)
    const lightness = THREE.MathUtils.randFloat(-0.1, 0.1)

    baseColor.offsetHSL(hue, saturation, lightness)
    return baseColor
  }

  // Define hole positions (missing bricks)
  const holePositions = [
    { row: 3, col: 3 },
    { row: 5, col: 7 },
    { row: 7, col: 4 },
    { row: 9, col: 9 },
    { row: 11, col: 5 },
  ]

  // Check if a position has a hole
  const hasHole = (row: number, col: number) => {
    return holePositions.some((hole) => hole.row === row && hole.col === col)
  }

  // Generate bricks for the main wall
  const generateBricks = () => {
    const bricks: JSX.Element[] = []

    // Generate main wall bricks
    for (let row = 0; row < numRows; row++) {
      const isOddRow = row % 2 === 1
      const rowOffset = isOddRow ? (BRICK_LENGTH + MORTAR_GAP) / 2 : 0
      const actualBricksInRow = isOddRow ? bricksPerRow - 1 : bricksPerRow

      for (let col = 0; col < actualBricksInRow; col++) {
        // Skip if this position has a hole
        if (hasHole(row, col)) continue

        const xPos = col * (BRICK_LENGTH + MORTAR_GAP) - wallWidth / 2 + BRICK_LENGTH / 2 + rowOffset
        const yPos = row * (BRICK_HEIGHT + MORTAR_GAP) + BRICK_HEIGHT / 2

        // Add slight variation to each brick
        const xVariation = THREE.MathUtils.randFloatSpread(0.02)
        const yVariation = THREE.MathUtils.randFloatSpread(0.02)
        const rotVariation = THREE.MathUtils.randFloatSpread(0.02)

        bricks.push(
          <mesh
            key={`brick-${row}-${col}`}
            castShadow
            receiveShadow
            position={[xPos + xVariation, yPos + yVariation, 0]}
            rotation={[0, 0, rotVariation]}
          >
            <boxGeometry args={[BRICK_LENGTH, BRICK_HEIGHT, BRICK_DEPTH]} />
            <meshStandardMaterial
              color={generateBrickColor()}
              roughness={THREE.MathUtils.randFloat(0.7, 0.9)}
              metalness={0.1}
            />
          </mesh>,
        )
      }
    }

    // Generate crenelations as a continuation of the wall
    // First, add a continuous top row
    const topRowY = numRows * (BRICK_HEIGHT + MORTAR_GAP) + BRICK_HEIGHT / 2

    for (let col = 0; col < bricksPerRow; col++) {
      const xPos = col * (BRICK_LENGTH + MORTAR_GAP) - wallWidth / 2 + BRICK_LENGTH / 2

      bricks.push(
        <mesh key={`top-row-${col}`} castShadow receiveShadow position={[xPos, topRowY, 0]}>
          <boxGeometry args={[BRICK_LENGTH, BRICK_HEIGHT, BRICK_DEPTH]} />
          <meshStandardMaterial
            color={generateBrickColor()}
            roughness={THREE.MathUtils.randFloat(0.7, 0.9)}
            metalness={0.1}
          />
        </mesh>,
      )
    }

    // Now add the actual crenelations (merlons)
    // We'll add a merlon every other position
    const merlonHeight = BRICK_HEIGHT * 3
    const merlonY = topRowY + merlonHeight / 2 + BRICK_HEIGHT / 2 + MORTAR_GAP

    for (let col = 0; col < bricksPerRow; col += 2) {
      const xPos = col * (BRICK_LENGTH + MORTAR_GAP) - wallWidth / 2 + BRICK_LENGTH / 2

      // Each merlon is a stack of bricks
      for (let row = 0; row < 3; row++) {
        const brickY = merlonY - merlonHeight / 2 + row * (BRICK_HEIGHT + MORTAR_GAP) + BRICK_HEIGHT / 2

        bricks.push(
          <mesh key={`merlon-${col}-${row}`} castShadow receiveShadow position={[xPos, brickY, 0]}>
            <boxGeometry args={[BRICK_LENGTH, BRICK_HEIGHT, BRICK_DEPTH]} />
            <meshStandardMaterial
              color={generateBrickColor()}
              roughness={THREE.MathUtils.randFloat(0.7, 0.9)}
              metalness={0.1}
            />
          </mesh>,
        )
      }
    }

    return bricks
  }

  // Generate cords going through the holes - using simple cylinders
  const generateCords = () => {
    const cords = []

    holePositions.forEach((hole, index) => {
      const isOddRow = hole.row % 2 === 1
      const rowOffset = isOddRow ? (BRICK_LENGTH + MORTAR_GAP) / 2 : 0

      const xPos = hole.col * (BRICK_LENGTH + MORTAR_GAP) - wallWidth / 2 + BRICK_LENGTH / 2 + rowOffset
      const yPos = hole.row * (BRICK_HEIGHT + MORTAR_GAP) + BRICK_HEIGHT / 2

      // Create a cylinder that goes through the wall along the Z-axis
      // The rotation [Math.PI/2, 0, 0] rotates it to align with the Z-axis
      cords.push(
        <mesh key={`cord-${index}`} position={[xPos, yPos, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 8, 16]} />
          <meshStandardMaterial
            color={WORD_PAIRS[index].color}
            emissive={WORD_PAIRS[index].color}
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>,
      )

      // Add spheres at the ends for better visibility
      cords.push(
        <mesh key={`cord-end-left-${index}`} position={[xPos, yPos, -4]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={WORD_PAIRS[index].color}
            emissive={WORD_PAIRS[index].color}
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>,
      )

      cords.push(
        <mesh key={`cord-end-right-${index}`} position={[xPos, yPos, 4]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={WORD_PAIRS[index].color}
            emissive={WORD_PAIRS[index].color}
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>,
      )
    })

    return cords
  }

  // Generate text labels for both sides
  const generateLabels = () => {
    const labels = []

    // Position for the main title - restored to Text3D
    labels.push(
      <Center key="main-title" position={[0, wallHeight / 2, BRICK_DEPTH / 2 + 0.1]}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={1}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Why the divide?
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.7} />
        </Text3D>
      </Center>,
    )

    // Generate word pairs
    holePositions.forEach((hole, index) => {
      const isOddRow = hole.row % 2 === 1
      const rowOffset = isOddRow ? (BRICK_LENGTH + MORTAR_GAP) / 2 : 0

      const xPos = hole.col * (BRICK_LENGTH + MORTAR_GAP) - wallWidth / 2 + BRICK_LENGTH / 2 + rowOffset
      const yPos = hole.row * (BRICK_HEIGHT + MORTAR_GAP) + BRICK_HEIGHT / 2

      // Left side word (behind the wall)
      labels.push(
        <Text
          key={`left-word-${index}`}
          position={[xPos, yPos, -4]}
          fontSize={0.4}
          color={WORD_PAIRS[index].color}
          anchorX="right"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {WORD_PAIRS[index].left}
        </Text>,
      )

      // Right side word (in front of the wall)
      labels.push(
        <Text
          key={`right-word-${index}`}
          position={[xPos, yPos, 4]}
          fontSize={0.4}
          color={WORD_PAIRS[index].color}
          anchorX="left"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {WORD_PAIRS[index].right}
        </Text>,
      )
    })

    return labels
  }

  return (
    <group ref={wallRef}>
      {/* Individual bricks including crenelations */}
      {generateBricks()}

      {/* Colored cords */}
      {generateCords()}

      {/* Text labels */}
      {generateLabels()}

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#718096" roughness={1} />
      </mesh>
    </group>
  )
}


export default function WhyTheDivide() {
  // Calculate the correct isometric angle: arctan(1/sqrt(2)) ≈ 35.264°
  const isometricAngle = Math.atan(1 / Math.sqrt(2))

  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        orthographic
        camera={{
          position: [0, 0, 100], // Position doesn't matter for orthographic, just needs to face the scene
          zoom: 25, // Adjusted zoom to see both sides of the wall
          near: 0.1,
          far: 1000,
        }}
      >
        <color attach="background" args={["#f5f5f5"]} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} castShadow />

        {/* Apply true isometric rotation to the entire scene */}
        <group
          rotation={[
            isometricAngle, // X rotation: ~35.264° (arctan(1/√2))
            -Math.PI / 4, // Y rotation: -45°
            0, // No Z rotation
          ]}
        >
          <BrickWall />
        </group>

        <Environment preset="city" />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  )
}

