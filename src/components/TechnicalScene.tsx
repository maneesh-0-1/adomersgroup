import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

function Greeble({ position, rotation, scale }: { position: [number, number, number], rotation?: [number, number, number], scale?: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1a1a1c" metalness={1} roughness={0.3} />
    </mesh>
  );
}

function SolarArray({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Support Arm */}
      <mesh>
        <boxGeometry args={[4, 0.1, 0.1]} />
        <meshStandardMaterial color="#2e2e32" metalness={1} />
      </mesh>
      {/* Panels */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[3, 1.5, 0.05]} />
        <meshStandardMaterial color="#0a1a2f" emissive="#002a4a" emissiveIntensity={0.2} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Grid detailing on panels */}
      <mesh position={[2, 0, 0.03]}>
        <boxGeometry args={[3.01, 1.51, 0.01]} />
        <meshStandardMaterial color="#00f5ff" transparent opacity={0.1} wireframe />
      </mesh>
    </group>
  );
}

function HabitatRing({ radius, width, position }: { radius: number, width: number, position: [number, number, number] }) {
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={ringRef} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, width, 16, 100]} />
        <meshStandardMaterial color="#2e2e32" metalness={1} roughness={0.2} />
      </mesh>
      {/* Window lights on the ring */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2} />
          </mesh>
        );
      })}
    </group>
  );
}

export function SpaceStation() {
  const group = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      group.current.rotation.z += 0.002;
    }
  });

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 2]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Central Spine */}
        <mesh>
          <cylinderGeometry args={[0.4, 0.5, 8, 32]} />
          <meshStandardMaterial color="#1e1e24" metalness={1} roughness={0.2} />
        </mesh>
        
        {/* Docking Modules */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 1.5, 16]} />
          <meshStandardMaterial color="#2e2e32" metalness={1} />
        </mesh>
        <mesh position={[0, -2.5, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 1.5, 16]} />
          <meshStandardMaterial color="#2e2e32" metalness={1} />
        </mesh>

        {/* Habitat Rings */}
        <HabitatRing radius={3.5} width={0.2} position={[0, 0, 0]} />
        <HabitatRing radius={2.5} width={0.15} position={[0, 1.2, 0]} />
        <HabitatRing radius={2.5} width={0.15} position={[0, -1.2, 0]} />

        {/* Solar Arrays */}
        <SolarArray position={[0.5, 3, 0]} />
        <SolarArray position={[-0.5, 3, 0]} rotation={[0, Math.PI, 0]} />
        <SolarArray position={[0.5, -3, 0]} />
        <SolarArray position={[-0.5, -3, 0]} rotation={[0, Math.PI, 0]} />

        {/* Communication Dishes */}
        <group position={[0, 4, 0]}>
          <mesh rotation={[0, 0, 0.5]}>
            <coneGeometry args={[0.5, 0.3, 16]} />
            <meshStandardMaterial color="#a1a1aa" metalness={1} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8]} />
            <meshStandardMaterial color="#a1a1aa" />
          </mesh>
        </group>

        {/* Greebles / Technical Detail */}
        {[...Array(40)].map((_, i) => (
          <Greeble 
            key={i} 
            position={[
              (Math.random() - 0.5) * 1.2,
              (Math.random() - 0.5) * 7,
              (Math.random() - 0.5) * 1.2
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            scale={[Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2]}
          />
        ))}
      </Float>
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#blue" />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={2} color="#white" castShadow />
    </group>
  );
}

export function TechnicalScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 45 }}>
        <SpaceStation />
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <fog attach="fog" args={['#0a0a0c', 8, 25]} />
      </Canvas>
    </div>
  );
}
