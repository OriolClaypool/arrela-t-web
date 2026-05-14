import { useEffect, useRef } from 'react'

const statements = [
  'Cada producte té una història.',
  'Cada productor, una vida dedicada al territori.',
  "Arrela't entra, escolta i ho explica.",
  'Perquè el camp mereix ser vist.',
]

function Statement({ text }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <p ref={ref} className="narrative__statement fade-in">
      {text}
    </p>
  )
}

export default function ScrollNarrative() {
  return (
    <section className="narrative">
      <div className="narrative__inner">
        {statements.map((text, i) => (
          <Statement key={i} text={text} />
        ))}
      </div>
    </section>
  )
}
