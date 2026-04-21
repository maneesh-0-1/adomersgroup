import React, { useEffect, useState, useMemo } from 'react';

export const BackgroundFluid: React.FC = () => {
  const [particleCount, setParticleCount] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      setParticleCount(window.innerWidth < 768 ? 15 : 50);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      size: `${Math.random() * 30 + 10}vw`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 20 + 20}s`, // Slower movement
      opacity: Math.random() * 0.3 + 0.2, // Reduced opacity
      delay: `-${Math.random() * 20}s`,
    }));
  }, [particleCount]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-30">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
            background: 'radial-gradient(circle at center, #008b8b 0%, #004d4d 50%, #001f1f 100%)',
            mixBlendMode: typeof window !== 'undefined' && window.innerWidth < 768 ? 'normal' : 'screen',
            filter: 'blur(60px)', // Increased blur
            animation: `fluid-sweep ${particle.duration} ease-in-out infinite alternate`,
            animationDelay: particle.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
