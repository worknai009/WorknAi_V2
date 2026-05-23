import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, subtitle, accent, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col gap-3 md:gap-4 max-w-3xl mb-8 md:mb-16 ${alignClass}`}
    >
      {eyebrow && <span className="chip">{eyebrow}</span>}
      <h2 className="display-h text-[clamp(2rem,5vw,3.75rem)] text-gradient">
        {title}
        {accent && (
          <>
            {' '}
            <span className="text-violet-300">{accent}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="text-lg text-ink-dim leading-relaxed max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}