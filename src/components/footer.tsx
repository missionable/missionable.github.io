export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm font-semibold text-white">
            Mission<span className="text-navy-300">Able</span> Systems
          </p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} MissionAble Systems. All rights
            reserved.
          </p>
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
          Connecting exceptional tech talent with the organizations that need
          them.
        </p>
      </div>
    </footer>
  );
}
