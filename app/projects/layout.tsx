export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-linear-to-tl from-slate-900/0 via-slate-900 to-slate-900/0">
      {children}
    </div>
  );
}
