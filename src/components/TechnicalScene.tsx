import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

function Greeble({ position, rotation, scale, color = "#1a1a1c" }: { position: [number, number, number], rotation?: [number, number, number], scale?: [number, number, number], color?: string }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0} roughness={1} emissive={color === "#00f5ff" ? "#00f5ff" : "black"} emissiveIntensity={color === "#00f5ff" ? 2 : 0} />
    </mesh>
  );
}

function SolarArray({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Panels */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[3, 1.5, 0.05]} />
        <meshStandardMaterial color="#050505" emissive="#004a8f" emissiveIntensity={0.2} metalness={0} roughness={1} />
      </mesh>
      {/* Bright Edge */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[3.05, 1.55, 0.02]} />
        <meshStandardMaterial color="#00f5ff" transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  );
}

function HabitatRing({ radius, width, position }: { radius: number, width: number, position: [number, number, number] }) {
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={ringRef} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, width, 16, 100]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={1} />
      </mesh>
      {/* Pulsing neon inner ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius - 0.1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={5} />
      </mesh>
      {/* Window lights on the ring */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={3} />
          </mesh>
        );
      })}
    </group>
  );
}

function Spine() {
  return (
    <group>
      {/* Main Segments */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 8, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={1} />
      </mesh>
      
      {/* Structural Collars */}
      {[...Array(6)].map((_, i) => (
        <group key={i} position={[0, (i - 2.5) * 1.5, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.45, 0.05, 16, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={0.8} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Central Reactor Hub */}
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#050505" metalness={0} roughness={1} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.9, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={5} />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.9, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={5} />
        </mesh>
      </group>

      {/* End Caps */}
      <mesh position={[0, 4, 0]}>
        <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={1} />
      </mesh>
      <mesh position={[0, -4, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={1} />
      </mesh>
    </group>
  );
}

export function SpaceStation() {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      group.current.rotation.z += 0.002;
    }
    if (coreRef.current) {
      const pulse = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2;
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + pulse * 4;
    }
  });

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 2]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Spine />
        
        {/* Pulsing Core Light Strips */}
        <mesh ref={coreRef}>
          <cylinderGeometry args={[0.42, 0.42, 7.8, 32]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2} transparent opacity={0.3} wireframe />
        </mesh>

        {/* Docking Modules */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 1.5, 16]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={1} />
        </mesh>
        <mesh position={[0, -2.5, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 1.5, 16]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={1} />
        </mesh>

        {/* Habitat Rings */}
        <HabitatRing radius={3.5} width={0.2} position={[0, 0, 0]} />
        <HabitatRing radius={2.5} width={0.15} position={[0, 1.2, 0]} />
        <HabitatRing radius={2.5} width={0.15} position={[0, -1.2, 0]} />

        {/* Solar Arrays - Vibrant Blue */}
        <SolarArray position={[0.5, 3, 0]} />
        <SolarArray position={[-0.5, 3, 0]} rotation={[0, Math.PI, 0]} />
        <SolarArray position={[0.5, -3, 0]} />
        <SolarArray position={[-0.5, -3, 0]} rotation={[0, Math.PI, 0]} />

        {/* Communication Dishes */}
        <group position={[0, 4, 0]}>
          <mesh rotation={[0, 0, 0.5]}>
            <coneGeometry args={[0.5, 0.3, 16]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={1} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8]} />
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2} />
          </mesh>
        </group>

        {/* Greebles / Technical Detail - Mixing Dark and Glowing */}
        {[...Array(50)].map((_, i) => (
          <Greeble 
            key={i} 
            position={[
              (Math.random() - 0.5) * 1.2,
              (Math.random() - 0.5) * 7.5,
              (Math.random() - 0.5) * 1.2
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            scale={[Math.random() * 0.25, Math.random() * 0.25, Math.random() * 0.25]}
            color={Math.random() > 0.8 ? "#00f5ff" : (Math.random() > 0.5 ? "#050505" : "#0a0a0a")}
          />
        ))}
      </Float>
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
      <spotLight position={[0, 20, 0]} angle={0.4} penumbra={1} intensity={3} color="#ffffff" castShadow />
    </group>
  );
}

export function TechnicalScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-80">
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 45 }}>
        <SpaceStation />
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <fog attach="fog" args={['#0a0a0c', 10, 30]} />
      </Canvas>
    </div>
  );
}
