export function Card({ children, className = '' }) {
  return <section className={`panel ${className}`}>{children}</section>
}

export function DarkCard({ children, className = '' }) {
  return <section className={`panel-dark ${className}`}>{children}</section>
}
