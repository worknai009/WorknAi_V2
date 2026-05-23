export function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-400 animate-spin" />
        <div className="absolute inset-2 rounded-full bg-violet-500/30 blur-md animate-pulse" />
      </div>
      <p className="text-sm text-ink-dim">{label}</p>
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', subtitle = 'Check back soon.' }) {
  return (
    <div className="glass p-12 text-center">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-violet-500/20 flex items-center justify-center text-3xl">
        ✨
      </div>
      <h3 className="font-display text-2xl mb-2">{title}</h3>
      <p className="text-ink-dim">{subtitle}</p>
    </div>
  );
}