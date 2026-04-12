import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, useTexture, Environment, Cylinder, Sphere, Box, Torus, Cone } from "@react-three/drei";
import * as THREE from "three";

interface JudicialModelProps {
  scrollProgress: number;
  isMobile?: boolean;
}

export function JudicialModel({ scrollProgress, isMobile = false }: JudicialModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Group>(null);
  const leftPanRef = useRef<THREE.Group>(null);
  const rightPanRef = useRef<THREE.Group>(null);
  
  const { viewport } = useThree();

  // Use texture for environment map reflection
  const texture = useTexture("https://harmless-tapir-303.convex.cloud/api/storage/5a647fc0-408d-4c44-b3ea-20303f79d215");

  useFrame((state) => {
    if (!groupRef.current || !beamRef.current) return;

    const time = state.clock.elapsedTime;
    const baseHoverOffset = isMobile ? -0.12 : -0.25;
    const mobileFocusOffset = isMobile ? 0.05 : 0;
    const floatY =
      baseHoverOffset + Math.sin(time * 0.5) * 0.12 + Math.cos(time * 1.2) * 0.04;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      floatY + mobileFocusOffset,
      0.05,
    );
    const targetZOffset = isMobile ? -1.3 : 0;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZOffset,
      0.05,
    );

    // 2. Interactive Balance Physics
    const mouseTilt = state.pointer.x * 0.35; 
    const idleSway = Math.sin(time * 0.8) * 0.08; 
    
    const targetZ = mouseTilt + idleSway;
    beamRef.current.rotation.z = THREE.MathUtils.lerp(beamRef.current.rotation.z, targetZ, 0.03);

    // 3. Pan Physics (Counter-rotation + Independent Swing)
    if (leftPanRef.current) {
        const panSwing = Math.sin(time * 2.5) * 0.015; 
        leftPanRef.current.rotation.z = -beamRef.current.rotation.z + panSwing;
        // Add slight sway in X for realism
        leftPanRef.current.rotation.x = Math.sin(time * 1.5) * 0.02;
    }
    if (rightPanRef.current) {
        const panSwing = Math.cos(time * 2.3) * 0.015; 
        rightPanRef.current.rotation.z = -beamRef.current.rotation.z + panSwing;
        rightPanRef.current.rotation.x = Math.cos(time * 1.7) * 0.02;
    }

    // 4. Enhanced Parallax & 3D Presentation
    const targetRotationY = state.pointer.x * 0.2 + Math.sin(time * 0.2) * 0.1; 
    const targetRotationX = -state.pointer.y * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);

    // 5. Scale on scroll
    const baseScale = isMobile ? 1.12 : 1;
    const scrollInfluence = isMobile ? 0.04 : 0.15;
    const minScale = isMobile ? 0.98 : 0.85;
    const targetScale = Math.max(minScale, baseScale - scrollProgress * scrollInfluence);
    const currentScale = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(currentScale, targetScale, 0.05),
    );
  });

  const goldMaterial = (
    <meshStandardMaterial 
      color="#FFD700" 
      metalness={1} 
      roughness={0.2} 
      envMapIntensity={1.5}
    />
  );

  const darkGoldMaterial = (
    <meshStandardMaterial 
      color="#B8860B" 
      metalness={1} 
      roughness={0.3} 
      envMapIntensity={1.2}
    />
  );

  const silverMaterial = (
    <meshStandardMaterial 
      color="#C0C0C0" 
      metalness={1} 
      roughness={0.1} 
      envMapIntensity={2}
    />
  );

  const glowMaterial = (
    <meshStandardMaterial
      color="#fce9b3"
      emissive="#f7d26c"
      emissiveIntensity={1.8}
      metalness={0.4}
      roughness={0.4}
    />
  );

  const baseCoreMaterial = (
    <meshStandardMaterial
      color="#593014"
      metalness={0.6}
      roughness={0.6}
      envMapIntensity={0.8}
    />
  );

  const columnGlowMaterial = (
    <meshStandardMaterial
      color="#ffe5a1"
      emissive="#f7c972"
      emissiveIntensity={1.2}
      transparent
      opacity={0.18}
      roughness={0.2}
    />
  );

  // Helper for a 3-chain suspension system
  const ChainSystem = () => {
    const chainLen = 3.5;
    const spread = 0.8;
    // Calculate angle for chains to meet at top (0,0,0) from a circle of radius `spread` at y = -chainLen
    // We'll just place 3 cylinders rotated correctly
    const angle = Math.atan(spread / chainLen);
    const len = Math.sqrt(spread * spread + chainLen * chainLen);

    return (
      <group position={[0, 0, 0]}>
        {/* Top Ring */}
        <Torus args={[0.15, 0.03, 16, 32]} rotation={[0, Math.PI/2, 0]}>
            {goldMaterial}
        </Torus>
        
        {/* 3 Chains */}
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((rot, i) => (
            <group key={i} rotation={[0, rot, 0]}>
                <group rotation={[0, 0, angle]} position={[spread/2, -chainLen/2, 0]}>
                     <Cylinder args={[0.015, 0.015, len]} >
                        {silverMaterial}
                     </Cylinder>
                </group>
            </group>
        ))}
      </group>
    );
  };

  return (
    <>
      <Environment preset="city" />
      
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#FFD700"
      />
      <pointLight position={[-10, 5, -10]} intensity={1} color="#00ffff" />
      <pointLight position={[0, -3, 0]} intensity={3} distance={30} decay={2} color="#fddf8f" />
      <pointLight position={[0, -1.2, 0]} intensity={1.6} distance={18} decay={1.4} color="#ffe7a3" />
      <pointLight position={[0, 2.2, 0]} intensity={1.2} distance={16} decay={1.4} color="#ffeec9" />
      <spotLight position={[0, -1.5, 0]} angle={1.2} penumbra={0.7} intensity={2.4} color="#fbd784" />
      <pointLight position={[-3.4, 2.6, 0]} intensity={1.1} color="#ffdba6" decay={1.5} />
      <pointLight position={[3.4, 2.6, 0]} intensity={1.1} color="#ffdba6" decay={1.5} />

      <group ref={groupRef}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            
            {/* --- CENTRAL PILLAR (Indian Stambh Style) --- */}
            {/* Illuminated Base Platform */}
            <Cylinder args={[2.8, 3.2, 0.5, 64]} position={[0, -3.4, 0]}>
              {baseCoreMaterial}
            </Cylinder>
            <Cylinder args={[3.1, 3.1, 0.1, 64]} position={[0, -3.15, 0]}>
              {glowMaterial}
            </Cylinder>
            <mesh position={[0, -3.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[2.6, 3.4, 64]} />
              <meshStandardMaterial
                color="#ffe9a3"
                emissive="#f9d87c"
                emissiveIntensity={2}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, -0.8, 0]}>
              <cylinderGeometry args={[2.2, 0.9, 5.5, 64, 1, true]} />
              <meshStandardMaterial
                color="#fdf2c0"
                transparent
                opacity={0.12}
                emissive="#f5d97e"
                emissiveIntensity={0.9}
                side={THREE.DoubleSide}
              />
            </mesh>
            <Cylinder args={[1.9, 0.9, 7.4, 64, 1, true]} position={[0, -0.2, 0]}>
              {columnGlowMaterial}
            </Cylinder>
            {/* Base Tier 1 (Bottom) */}
            <Cylinder args={[1.4, 1.6, 0.2, 64]} position={[0, -2.8, 0]}>
              {darkGoldMaterial}
            </Cylinder>
            {/* Base Tier 2 */}
            <Cylinder args={[1.1, 1.3, 0.2, 64]} position={[0, -2.6, 0]}>
              {goldMaterial}
            </Cylinder>
            {/* Base Tier 3 */}
            <Cylinder args={[0.8, 1.0, 0.2, 64]} position={[0, -2.4, 0]}>
              {darkGoldMaterial}
            </Cylinder>
            
            {/* Main Column - Tapered */}
            <Cylinder args={[0.2, 0.35, 5.0, 32]} position={[0, 0.2, 0]}>
                {goldMaterial}
            </Cylinder>
            
            {/* Decorative Rings/Capital */}
            <Torus args={[0.25, 0.08, 16, 32]} position={[0, 2.2, 0]} rotation={[Math.PI/2, 0, 0]}>
                {darkGoldMaterial}
            </Torus>
            <Cylinder args={[0.3, 0.2, 0.4, 32]} position={[0, 2.5, 0]}>
                {goldMaterial}
            </Cylinder>
            
            {/* Top Finial (Ashoka Chakra / Lotus inspired shape) */}
            <Sphere args={[0.35, 32, 32]} position={[0, 3.2, 0]}>
                {goldMaterial}
            </Sphere>
            <Cone args={[0.1, 0.5, 32]} position={[0, 3.6, 0]}>
                {goldMaterial}
            </Cone>

            {/* --- THE BEAM (Rotates) --- */}
            <group ref={beamRef} position={[0, 2.7, 0]}>
                {/* Center Pivot Block */}
                <Box args={[0.6, 0.6, 0.6]} rotation={[0, Math.PI/4, 0]}>
                    {darkGoldMaterial}
                </Box>
                <Cylinder args={[0.15, 0.15, 0.7, 32]} rotation={[Math.PI/2, 0, 0]}>
                    {silverMaterial}
                </Cylinder>

                {/* Tapered Arms */}
                {/* Left Arm */}
                <group position={[-1.8, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                    <Cylinder args={[0.08, 0.18, 3.0, 32]}>
                        {goldMaterial}
                    </Cylinder>
                </group>
                {/* Right Arm */}
                <group position={[1.8, 0, 0]} rotation={[0, 0, -Math.PI/2]}>
                    <Cylinder args={[0.08, 0.18, 3.0, 32]}>
                        {goldMaterial}
                    </Cylinder>
                </group>
                
                {/* Decorative Ends */}
                <Sphere args={[0.15]} position={[-3.4, 0, 0]}>
                    {goldMaterial}
                </Sphere>
                <Sphere args={[0.15]} position={[3.4, 0, 0]}>
                    {goldMaterial}
                </Sphere>

                {/* --- LEFT PAN --- */}
                <group position={[-3.4, 0, 0]}>
                    <ChainSystem />
                    
                    {/* The Pan */}
                    <group ref={leftPanRef} position={[0, -3.5, 0]}>
                        {/* Bowl Shape - Shallower and wider */}
                        <mesh>
                            <sphereGeometry args={[1.3, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 3]} />
                            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
                        </mesh>
                        {/* Rim */}
                        <Torus args={[1.13, 0.08, 16, 64]} rotation={[Math.PI/2, 0, 0]} position={[0, 0.65, 0]}>
                            {darkGoldMaterial}
                        </Torus>
                    </group>
                </group>

                {/* --- RIGHT PAN --- */}
                <group position={[3.4, 0, 0]}>
                    <ChainSystem />

                    {/* The Pan */}
                    <group ref={rightPanRef} position={[0, -3.5, 0]}>
                        {/* Bowl Shape */}
                        <mesh>
                            <sphereGeometry args={[1.3, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 3]} />
                            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
                        </mesh>
                        {/* Rim */}
                        <Torus args={[1.13, 0.08, 16, 64]} rotation={[Math.PI/2, 0, 0]} position={[0, 0.65, 0]}>
                            {darkGoldMaterial}
                        </Torus>
                    </group>
                </group>
            </group>

            {/* Sparkles */}
            <Sparkles count={40} scale={10} size={4} speed={0.4} opacity={0.4} color="#FFD700" />
            <Sparkles count={30} scale={12} size={2} speed={0.3} opacity={0.3} color="#00ffff" />
        </Float>
      </group>
    </>
  );
}