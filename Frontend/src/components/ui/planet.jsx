import { motion } from 'framer-motion';

// Beautiful glowing planet/orb component with rings - inspired by the reference image
export default function Planet({ size = 320, className = '', showRings = true }) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(192,132,255,0.8) 0%, rgba(122,59,255,0.4) 40%, transparent 70%)',
        }}
      />

      {/* Orbital rings */}
      {showRings && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border border-violet-400/30"
            style={{ transform: 'rotateX(75deg)', boxShadow: '0 0 20px rgba(192,132,255,0.3)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-violet-300/20"
            style={{ transform: 'rotateX(75deg) rotateZ(20deg)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          {/* Orbiting dot */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className="absolute w-3 h-3 rounded-full bg-neon shadow-[0_0_20px_#c084ff]"
              style={{ top: '50%', left: '100%', transform: 'translate(-50%, -50%) rotateX(75deg)' }}
            />
          </motion.div>
        </>
      )}

      {/* Main planet sphere */}
      <motion.div
        className="absolute inset-[15%] rounded-full overflow-hidden"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #d8c7ff 0%, #9a6bff 20%, #5b2bcc 50%, #1a0b3d 90%)',
          boxShadow:
            'inset -30px -30px 80px rgba(0,0,0,0.6), 0 0 80px rgba(122,59,255,0.6), 0 0 160px rgba(192,132,255,0.3)',
        }}
      >
        {/* Surface details */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at 70% 60%, rgba(255,255,255,0.4) 0%, transparent 30%), radial-gradient(circle at 20% 80%, rgba(0,0,0,0.4) 0%, transparent 40%)',
          }}
        />
        {/* Highlight */}
        <div
          className="absolute top-[10%] left-[15%] w-[40%] h-[30%] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
      </motion.div>

      {/* Small floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-neon"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            boxShadow: '0 0 6px #c084ff',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}