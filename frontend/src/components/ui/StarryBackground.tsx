import { useEffect, useState, useMemo } from 'react';

const StarryBackground = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const starCount = useMemo(() => {
    return Math.max(150, Math.floor((windowSize.width * windowSize.height) / 10000));
  }, [windowSize.width, windowSize.height]);

  const fixedStars = useMemo(() => {
    return Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.8 + 0.2,
      animationDuration: Math.random() * 5 + 3,
      animationDelay: Math.random() * 5
    }));
  }, [starCount]);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: Math.random() * 50,
      left: Math.random() * 50,
      animationDuration: Math.random() * 10 + 10,
      animationDelay: Math.random() * 20
    }));
  }, []);

  const keyframesStyle = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }
    @keyframes shooting {
      0% { transform: translateX(0) translateY(0); opacity: 1; }
      70% { opacity: 1; }
      100% { transform: translateX(300px) translateY(300px); opacity: 0; }
    }
  `;

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0 bg-black">
      {fixedStars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.width + 'px',
            height: star.height + 'px',
            top: star.top + '%',
            left: star.left + '%',
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration}s infinite ${star.animationDelay}s`
          }}
        />
      ))}

      {shootingStars.map((star) => (
        <div
          key={`shooting-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            width: '2px',
            height: '2px',
            top: star.top + '%',
            left: star.left + '%',
            boxShadow: '0 0 5px 1px rgba(255, 255, 255, 0.7)',
            animation: `shooting ${star.animationDuration}s infinite ${star.animationDelay}s linear`
          }}
        />
      ))}

      <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
    </div>
  );
};

export default StarryBackground;
