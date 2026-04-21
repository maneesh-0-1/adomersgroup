import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

export function Turbine() {
  const group = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      group.current.rotation.z += 0.002;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Central Core */}
        <mesh>
          <cylinderGeometry args={[0.5, 0.8, 4, 32]} />
          <meshStandardMaterial color="#2e2e32" metalness={1} roughness={0.2} />
        </mesh>
        
        {/* Fan Blades */}
        {[...Array(12)].map((_, i) => (
          <group key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]}>
            <mesh position={[1.5, 0, 0]} rotation={[0.4, 0, 0]}>
              <boxGeometry args={[2.5, 0.05, 0.5]} />
              <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.5} metalness={0.8} transparent opacity={0.8} />
            </mesh>
          </group>
        ))}

        {/* Outer Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1} />
        </mesh>
        
        {/* Inner Hub */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#2e2e32" metalness={1} roughness={0.1} />
        </mesh>
      </Float>
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
      <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
    </group>
  );
}

export function TechnicalScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <Turbine />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <fog attach="fog" args={['#0a0a0c', 5, 20]} />
      </Canvas>
    </div>
  );
}
