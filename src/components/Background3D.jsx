import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const StarLayer = ({ count, size, speed, opacity }) => {
  const ref = useRef();
  const { mouse } = useThree();
  
  // Create stars in a deeper box [Width, Height, Depth]
  const positions = useMemo(() => {
    const arr = random.inBox(new Float32Array(count * 3), { sides: [15, 15, 10] });
    for (let i = 0; i < arr.length; i++) if (isNaN(arr[i])) arr[i] = 0;
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    // Diagonal Movement: Constant and Ultra Smooth
    // Moving from Top-Right towards Bottom-Left
    ref.current.position.x -= delta * speed;
    ref.current.position.y -= delta * speed * 0.4;
    
    // Smooth Seamless Looping
    if (ref.current.position.x < -7.5) ref.current.position.x = 7.5;
    if (ref.current.position.y < -7.5) ref.current.position.y = 7.5;

    // Interactive Parallax Depth: Responsive to Mouse
    const targetX = (mouse.x * 0.2);
    const targetY = (mouse.y * 0.2);
    ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.05;

    // Soft Twinkling: Modulate point size slightly over time
    // We achieve this via subtle Z rotation in this ref instance
    ref.current.rotation.z += delta * speed * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={1} /* Additive blending for the "soft glow" */
        opacity={opacity}
      />
    </Points>
  );
};

const Background3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: '#000000', // Pure pitch-black night sky
      pointerEvents: 'none'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Parallax Star Layers: Varying Count, Size, and Speed */}
        <StarLayer count={4000} size={0.015} speed={0.04} opacity={0.4} />  {/* Far/Small Stars */}
        <StarLayer count={2500} size={0.028} speed={0.08} opacity={0.7} />  {/* Mid Stars */}
        <StarLayer count={1200} size={0.045} speed={0.15} opacity={0.9} />  {/* Near/Large Stars */}
        
      </Canvas>
    </div>
  );
};

export default Background3D;





