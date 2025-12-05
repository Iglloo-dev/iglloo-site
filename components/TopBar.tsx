// components/TopBar.tsx
export default function TopBar() {
  return (
    <div className="w-full bg-emerald-600 text-emerald-50 text-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:px-6">
        {/* Left: email */}
        <div className="flex items-center gap-2">
          <span aria-hidden="true">✉</span>
          <span>info@iglloo.online</span>
        </div>

        {/* Right: socials + support text */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 md:flex">
            <a href="#" aria-label="Facebook" className="hover:text-emerald-200">
              f
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-emerald-200">
              t
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-emerald-200">
              in
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-emerald-200">
              li
            </a>
          </div>
          <span className="font-semibold">
            24/7 Online Support: +1 917-443-3355
          </span>
        </div>
      </div>
    </div>
  );
}
