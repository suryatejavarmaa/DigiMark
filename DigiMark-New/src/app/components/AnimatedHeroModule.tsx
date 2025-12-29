import { motion } from 'motion/react';

export function AnimatedHeroModule() {
  return (
    <div
      style={{
        width: '100%',
        height: '280px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background Glow Effects */}
      <motion.div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(131, 102, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['-5%', '5%', '-5%'],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(157, 127, 255, 0.25) 0%, transparent 70%)',
          filter: 'blur(35px)',
          right: 0
        }}
        animate={{
          x: ['10%', '-10%', '10%'],
          y: ['5%', '-5%', '5%'],
          scale: [1.05, 1, 1.05]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
      />

      {/* Floating Card 1 - Large */}
      <motion.div
        style={{
          position: 'absolute',
          width: '140px',
          height: '100px',
          background: 'linear-gradient(135deg, #8366FF 0%, #9D7FFF 100%)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(131, 102, 255, 0.4)',
          top: '22%',
          left: '15%'
        }}
        animate={{
          rotateY: [0, 15, 0],
          rotateX: [0, -10, 0],
          y: [0, -8, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            width: '30px',
            height: '30px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '40px',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '3px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '12px',
            width: '60px',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '3px'
          }}
        />
      </motion.div>

      {/* Floating Card 2 - Medium */}
      <motion.div
        style={{
          position: 'absolute',
          width: '110px',
          height: '85px',
          background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
          borderRadius: '16px',
          boxShadow: '0 15px 40px rgba(131, 102, 255, 0.25)',
          top: '48%',
          right: '18%',
          border: '2px solid rgba(131, 102, 255, 0.2)'
        }}
        animate={{
          rotateY: [0, -12, 0],
          rotateX: [0, 8, 0],
          y: [0, 6, 0],
          x: [0, -5, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '24px',
            height: '24px',
            background: '#8366FF',
            borderRadius: '6px',
            opacity: 0.6
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            width: '50px',
            height: '5px',
            background: '#8366FF',
            borderRadius: '2.5px',
            opacity: 0.4
          }}
        />
      </motion.div>

      {/* Floating Ring/Circle */}
      <motion.div
        style={{
          position: 'absolute',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          border: '4px solid #8366FF',
          bottom: '18%',
          left: '25%',
          boxShadow: '0 10px 30px rgba(131, 102, 255, 0.3)'
        }}
        animate={{
          rotateZ: [0, 360],
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #8366FF 0%, #9D7FFF 100%)',
            borderRadius: '50%',
            opacity: 0.4
          }}
        />
      </motion.div>

      {/* Small Floating Dot 1 */}
      <motion.div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          background: '#8366FF',
          borderRadius: '50%',
          top: '18%',
          right: '25%',
          boxShadow: '0 5px 15px rgba(131, 102, 255, 0.5)'
        }}
        animate={{
          y: [0, -12, 0],
          x: [0, 6, 0],
          scale: [1, 1.25, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3
        }}
      />

      {/* Small Floating Dot 2 */}
      <motion.div
        style={{
          position: 'absolute',
          width: '16px',
          height: '16px',
          background: '#9D7FFF',
          borderRadius: '50%',
          bottom: '28%',
          right: '15%',
          boxShadow: '0 5px 15px rgba(157, 127, 255, 0.5)'
        }}
        animate={{
          y: [0, 8, 0],
          x: [0, -5, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
      />

      {/* Morphing Shape - Abstract Blob */}
      <motion.div
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, rgba(131, 102, 255, 0.15) 0%, rgba(157, 127, 255, 0.15) 100%)',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '2px solid rgba(131, 102, 255, 0.3)'
        }}
        animate={{
          borderRadius: [
            '40% 60% 70% 30% / 40% 50% 60% 50%',
            '60% 40% 30% 70% / 50% 60% 40% 60%',
            '40% 60% 70% 30% / 40% 50% 60% 50%'
          ],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Subtle Grid Lines */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(131, 102, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(131, 102, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          opacity: 0.5
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}