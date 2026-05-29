"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Custom hook to lerp camera movement based on scroll and mouse
function CameraController({ scroll }: { scroll: number }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2, 8));
  const targetLook = useRef(new THREE.Vector3(0, 1.2, 0));
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    // Define camera coordinates at different scroll stages
    // 0.0 -> Living Room
    // 0.3 -> Kitchen
    // 0.6 -> Bedroom
    // 1.0 -> Workspace
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const zOffset = isMobile ? 2.5 : 0;

    if (scroll < 0.25) {
      // Living Room View
      const t = scroll / 0.25;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, -3, t),
        THREE.MathUtils.lerp(1.8, 2.0, t),
        THREE.MathUtils.lerp(7 + zOffset, 5 + zOffset, t)
      );
      targetLook.current.set(
        THREE.MathUtils.lerp(0, -2, t),
        THREE.MathUtils.lerp(1.0, 1.2, t),
        THREE.MathUtils.lerp(0, -1, t)
      );
    } else if (scroll < 0.55) {
      // Kitchen View
      const t = (scroll - 0.25) / 0.3;
      targetPos.current.set(
        THREE.MathUtils.lerp(-3, 3, t),
        THREE.MathUtils.lerp(2.0, 2.2, t),
        THREE.MathUtils.lerp(5 + zOffset, 4.5 + zOffset, t)
      );
      targetLook.current.set(
        THREE.MathUtils.lerp(-2, 2.5, t),
        THREE.MathUtils.lerp(1.2, 1.1, t),
        THREE.MathUtils.lerp(-1, 0, t)
      );
    } else if (scroll < 0.85) {
      // Bedroom View
      const t = (scroll - 0.55) / 0.3;
      targetPos.current.set(
        THREE.MathUtils.lerp(3, -1, t),
        THREE.MathUtils.lerp(2.2, 1.9, t),
        THREE.MathUtils.lerp(4.5 + zOffset, 4 + zOffset, t)
      );
      targetLook.current.set(
        THREE.MathUtils.lerp(2.5, -0.8, t),
        THREE.MathUtils.lerp(1.1, 0.9, t),
        THREE.MathUtils.lerp(0, -2, t)
      );
    } else {
      // Workspace View
      const t = (scroll - 0.85) / 0.15;
      targetPos.current.set(
        THREE.MathUtils.lerp(-1, 2, t),
        THREE.MathUtils.lerp(1.9, 1.5, t),
        THREE.MathUtils.lerp(4 + zOffset, 3 + zOffset, t)
      );
      targetLook.current.set(
        THREE.MathUtils.lerp(-0.8, 1.8, t),
        THREE.MathUtils.lerp(0.9, 0.8, t),
        THREE.MathUtils.lerp(-2, -0.5, t)
      );
    }

    // Add gentle parallax from mouse
    const currentTargetPos = new THREE.Vector3().copy(targetPos.current);
    currentTargetPos.x += mouse.current.x * 0.8;
    currentTargetPos.y -= mouse.current.y * 0.6;

    // Smoothly lerp camera position
    camera.position.lerp(currentTargetPos, 0.05);

    // Smoothly lerp camera looking direction
    const currentLook = new THREE.Vector3();
    // Use dummy 3D object to look at lerped position
    currentLook.lerp(targetLook.current, 0.05);
    camera.lookAt(targetLook.current);
  });

  return null;
}

// Procedural Sofa Model
function DesignerSofa(props: any) {
  return (
    <group {...props}>
      {/* Sofa Base Plinth (Wood) */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.15, 1.2]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Main Seat Cushion */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.35, 1.1]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.8} />
      </mesh>

      {/* Sofa Backrest */}
      <mesh position={[0, 0.9, -0.45]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.7, 0.25]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.8} />
      </mesh>

      {/* Left Armrest */}
      <mesh position={[-1.5, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.6, 1.12]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.8} />
      </mesh>

      {/* Right Armrest */}
      <mesh position={[1.5, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.6, 1.12]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.8} />
      </mesh>

      {/* Luxury Gold Side Table Attachment */}
      <mesh position={[1.8, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[1.8, 0.05, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

// Procedural Plant
function IndoorPlant(props: any) {
  return (
    <group {...props}>
      {/* Gold Pot */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.25, 0.6, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.33, 0.33, 0.05, 16]} />
        <meshStandardMaterial color="#37271E" roughness={0.9} />
      </mesh>

      {/* Plant Stems/Leaves */}
      <group position={[0, 0.6, 0]}>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const height = 0.8 + Math.random() * 0.5;
          const curve = 0.2 + Math.random() * 0.3;
          return (
            <group key={i} rotation={[0.2 + Math.random() * 0.4, angle, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.015, 0.005, height, 8]} />
                <meshStandardMaterial color="#4B5E3C" roughness={0.7} />
              </mesh>
              {/* Leaf blade */}
              <mesh position={[0, height / 2, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
                <boxGeometry args={[0.12, 0.3, 0.01]} />
                <meshStandardMaterial color="#3F4F30" roughness={0.6} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

// Procedural Kitchen Counter & Cabinet
function KitchenSection(props: any) {
  return (
    <group {...props}>
      {/* Counter Base (Wood Panel) */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.0, 1.0]} />
        <meshStandardMaterial color="#1F2937" roughness={0.5} />
      </mesh>

      {/* Countertop (Marble) */}
      <mesh position={[0, 1.025, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.84, 0.05, 1.04]} />
        <meshStandardMaterial color="#F3F4F6" roughness={0.15} />
      </mesh>

      {/* Gold Basin */}
      <mesh position={[-0.8, 1.05, 0]} castShadow>
        <boxGeometry args={[0.6, 0.01, 0.4]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Designer Brass Faucet */}
      <group position={[-0.8, 1.06, -0.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.15, 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.01, 0.16, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Modern Pendant Lamp (Hanging from ceiling) */}
      <group position={[0, 2.5, 0]}>
        <mesh position={[0, -0.6, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glowing bulb */}
        <mesh position={[0, -0.68, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#FFF" />
        </mesh>
        <pointLight position={[0, -0.7, 0]} intensity={1.5} color="#FCE8B2" distance={4} castShadow />
      </group>

      {/* Stool 1 */}
      <group position={[0.4, 0, 0.8]}>
        {/* Stool Legs */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.03, 0.7, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
        {/* Stool Seat */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 16]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.3} />
        </mesh>
      </group>

      {/* Stool 2 */}
      <group position={[-0.4, 0, 0.8]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.03, 0.7, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 16]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Procedural Bedroom
function BedroomSection(props: any) {
  return (
    <group {...props}>
      {/* Headboard */}
      <mesh position={[0, 0.7, -0.9]} castShadow>
        <boxGeometry args={[2.4, 1.4, 0.15]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.6} />
      </mesh>
      
      {/* Bed Base */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.4, 1.8]} />
        <meshStandardMaterial color="#1F2937" roughness={0.8} />
      </mesh>

      {/* Bed Mattress */}
      <mesh position={[0, 0.5, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.3, 1.7]} />
        <meshStandardMaterial color="#F9F7F4" roughness={0.9} />
      </mesh>

      {/* Duvet / Blanket (Warm Gold accent) */}
      <mesh position={[0, 0.58, 0.4]} castShadow>
        <boxGeometry args={[2.12, 0.15, 1.0]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.85} />
      </mesh>

      {/* Pillows */}
      <mesh position={[-0.5, 0.68, -0.6]} castShadow>
        <boxGeometry args={[0.7, 0.15, 0.4]} />
        <meshStandardMaterial color="#FFF" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.68, -0.6]} castShadow>
        <boxGeometry args={[0.7, 0.15, 0.4]} />
        <meshStandardMaterial color="#FFF" roughness={0.9} />
      </mesh>

      {/* Bedside Table */}
      <group position={[1.4, 0, -0.8]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#1F2937" roughness={0.5} />
        </mesh>
        {/* Table Lamp */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.72, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.16, 0.16, 12]} />
          <meshStandardMaterial color="#F9F7F4" roughness={0.9} />
        </mesh>
        <pointLight position={[0, 0.8, 0]} intensity={1.2} color="#FCE8B2" distance={3} />
      </group>
    </group>
  );
}

// Procedural Workspace
function WorkspaceSection(props: any) {
  return (
    <group {...props}>
      {/* Floating Wooden Desk */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.08, 0.8]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.4} />
      </mesh>
      {/* Golden Desk legs */}
      <mesh position={[-0.9, 0.375, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.75, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} />
      </mesh>
      <mesh position={[0.9, 0.375, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.75, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} />
      </mesh>

      {/* Architectural Chair */}
      <group position={[0, 0, 0.7]} rotation={[0, Math.PI, 0]}>
        {/* Chair Base */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.03, 0.5, 8]} />
          <meshStandardMaterial color="#111827" metalness={0.8} />
        </mesh>
        {/* Chair Seat */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.45, 0.05, 0.45]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.7} />
        </mesh>
        {/* Chair Backrest */}
        <mesh position={[0, 0.8, -0.2]} castShadow>
          <boxGeometry args={[0.4, 0.5, 0.04]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>
      </group>

      {/* Sleek Laptop */}
      <group position={[0, 0.8, -0.1]}>
        {/* Laptop base */}
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.015, 0.24]} />
          <meshStandardMaterial color="#E5E7EB" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Laptop Screen */}
        <mesh position={[0, 0.12, -0.11]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.34, 0.22, 0.01]} />
          <meshStandardMaterial color="#1F2937" roughness={0.4} />
        </mesh>
      </group>

      {/* Modern Desk Lamp */}
      <group position={[-0.7, 0.8, -0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
        <mesh position={[0.05, 0.2, 0]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.4, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
        <mesh position={[0.15, 0.38, 0]} rotation={[0, 0, 0.5]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.1, 16]} />
          <meshStandardMaterial color="#111827" roughness={0.3} />
        </mesh>
        <pointLight position={[0.15, 0.3, 0]} intensity={1.5} color="#FFF" distance={2} />
      </group>
    </group>
  );
}

// 3D Scene Wrapper
export default function ThreeHeroScene({ scroll }: { scroll: number }) {
  return (
    <div className="w-full h-full">
      <Canvas shadows gl={{ antialias: true }} dpr={[1, 2]}>
        {/* Camera Setup */}
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
        <CameraController scroll={scroll} />

        {/* Ambient background stars/dust */}
        <Stars radius={100} depth={50} count={500} factor={4} saturation={0.5} fade speed={1} />

        {/* Floating dust particles in the room */}
        <ambientLight intensity={0.4} />
        
        {/* Luxury Gold Sun/Key Light */}
        <directionalLight
          position={[5, 10, 3]}
          intensity={1.8}
          color="#FFF7E6"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        {/* Soft fill light */}
        <pointLight position={[-6, 5, 2]} intensity={0.6} color="#E0F2FE" />
        
        {/* Floor and Walls of the interactive 3D studio */}
        <group>
          {/* Wooden Flooring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[30, 20]} />
            <meshStandardMaterial color="#2B1A0E" roughness={0.3} metalness={0.15} />
          </mesh>

          {/* Luxury Room Separators / Back Wall Panels */}
          {/* Main Wall */}
          <mesh position={[0, 2.5, -4]} castShadow receiveShadow>
            <boxGeometry args={[30, 5, 0.2]} />
            <meshStandardMaterial color="#111827" roughness={0.9} />
          </mesh>

          {/* Wall Panel lines / Accent profiles */}
          {[...Array(7)].map((_, i) => (
            <mesh key={i} position={[(i - 3) * 4, 2.5, -3.88]} castShadow>
              <boxGeometry args={[0.04, 5, 0.04]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
            </mesh>
          ))}

          {/* Large Window Panel */}
          <group position={[0, 2.5, -3.95]}>
            {/* Window Frame */}
            <mesh position={[0, 0.4, 0]} castShadow>
              <boxGeometry args={[8, 3.2, 0.15]} />
              <meshStandardMaterial color="#1A1A1A" roughness={0.4} />
            </mesh>
            {/* Inside Window opening */}
            <mesh position={[0, 0.4, -0.02]}>
              <planeGeometry args={[7.8, 3.0]} />
              <meshBasicMaterial color="#88B8C8" transparent opacity={0.35} />
            </mesh>
            {/* Landscape background plane behind the window */}
            <mesh position={[0, 0.4, -0.8]}>
              <planeGeometry args={[15, 8]} />
              <meshBasicMaterial color="#E9D8A6" />
            </mesh>
          </group>
        </group>

        {/* 3D Room Zones - Spatially arranged */}
        
        {/* 1. Living Room Zone (Scroll 0.0) */}
        <group position={[0, 0, 0]}>
          <DesignerSofa position={[0, 0, 0]} />
          <IndoorPlant position={[-2.2, 0, 0.2]} />
          {/* Area rug */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.5]} receiveShadow>
            <planeGeometry args={[3.4, 2.2]} />
            <meshStandardMaterial color="#F3E5AB" roughness={0.95} />
          </mesh>
          <pointLight position={[0, 2.2, 0.8]} intensity={1.5} color="#D4AF37" distance={5} castShadow />
        </group>

        {/* 2. Kitchen Zone (Scroll 0.3) */}
        <group position={[3.5, 0, -1.2]}>
          <KitchenSection />
        </group>

        {/* 3. Bedroom Zone (Scroll 0.6) */}
        <group position={[-3.8, 0, -1.8]}>
          <BedroomSection />
        </group>

        {/* 4. Workspace Zone (Scroll 1.0) */}
        <group position={[1.5, 0, -2.5]}>
          <WorkspaceSection />
        </group>

        {/* Soft atmospheric Fog */}
        <fog attach="fog" args={["#111827", 5, 20]} />
      </Canvas>
    </div>
  );
}
