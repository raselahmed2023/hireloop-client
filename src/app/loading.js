

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F1A]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-indigo-500 animate-spin" />
        <p className="text-sm text-white/30 tracking-wide">Loading...</p>
      </div>
    </div>
  );
}