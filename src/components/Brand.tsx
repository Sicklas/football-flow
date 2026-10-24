export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className="brand" aria-label="Football Flow">
    <span className="brand-symbol"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M13 9h24l-5 8H21l-3 5h11l-5 8H13l-4 7H0z" fill="currentColor" /></svg></span>
    {!compact && <span>football<span className="brand-flow">flow<span className="brand-dot">.</span></span></span>}
  </div>
}
