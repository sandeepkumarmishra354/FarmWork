import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedSprout({ size = 100, color = "var(--primary)" }: { size?: number, color?: string }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { 
        pathLength: { type: "spring", duration: 2.5, bounce: 0 },
        opacity: { duration: 0.5 }
      } 
    }
  };

  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.path variants={draw} d="M12 22v-9" />
      <motion.path variants={draw} d="M12 13c-2.5-4-6.5-5-9-3-1.5 1-1.5 3.5 1.5 5 2.5 1 5-1 7.5-2" />
      <motion.path variants={draw} d="M12 13c2.5-4 6.5-5 9-3 1.5 1 1.5 3.5-1.5 5-2.5 1-5-1-7.5-2" />
    </motion.svg>
  );
}

export function AnimatedSun({ size = 100, color = "#F59E0B" }: { size?: number, color?: string }) {
  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="12" cy="12" r="4" fill="rgba(245, 158, 11, 0.2)" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </motion.svg>
  );
}

export function BlobBackground() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden', opacity: 0.4, pointerEvents: 'none' }}>
      <motion.svg 
        viewBox="0 0 800 800" 
        style={{ position: 'absolute', top: '-20%', right: '-10%', width: '100%', height: '100%' }}
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M470.5,317.5c28.5-27.5,69-37.5,108.5-24c40.5,13.5,76,46,87.5,86.5c11,39.5-2.5,83-29,114.5c-27,31.5-68.5,50-109,49 c-41-1.5-81-22.5-104.5-54C400,457.5,395,414,409.5,376.5C424,339,442.5,345.5,470.5,317.5z" fill="var(--primary-glow)" />
      </motion.svg>
      {/* Secondary Blob */}
      <motion.svg 
        viewBox="0 0 800 800" 
        style={{ position: 'absolute', bottom: '-20%', left: '-20%', width: '120%', height: '120%' }}
        animate={{
          rotate: [0, -5, 5, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M410.5,333.5c41-26,95-23.5,134.5,4.5c39.5,28.5,61,81.5,50,129.5c-11.5,47.5-54,82-102.5,91.5 c-48.5,9.5-101.5-6.5-135-42.5C324,481,311,424.5,330.5,381.5C350,338.5,369,359.5,410.5,333.5z" fill="var(--accent-glow)" />
      </motion.svg>
    </div>
  );
}
