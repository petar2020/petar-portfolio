export const SITE_URL = 'https://petararsic.rs'

export function ContentSection({ title, children, raised = false }) {
  return (
    <section className={`border-b border-line py-12 sm:py-16 ${raised ? 'bg-ink-850' : 'bg-ink-900'}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {title && <h2 className="mb-6 font-display text-2xl font-bold text-paper sm:text-3xl">{title}</h2>}
        {children}
      </div>
    </section>
  )
}

export function Paragraphs({ items }) {
  return <div className="space-y-4 text-paper-dim leading-relaxed">{items.map((text, i) => <p key={i}>{text}</p>)}</div>
}

export function ContentFAQ({ items }) {
  return <div className="divide-y divide-line border-y border-line">{items.map((item) => (
    <details key={item.question} className="group py-5">
      <summary className="cursor-pointer font-display text-lg font-semibold text-paper marker:text-teal-bright">{item.question}</summary>
      <p className="mt-4 leading-relaxed text-paper-dim">{item.answer}</p>
    </details>
  ))}</div>
}

export function ContentTable({ caption, headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-ink-800">
      <table className="w-full table-fixed text-left text-sm leading-relaxed text-paper-dim">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-ink-850 text-paper"><tr>{headers.map((header) => <th key={header} scope="col" className="break-words px-2 py-4 sm:px-4">{header}</th>)}</tr></thead>
        <tbody className="divide-y divide-line">{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0
          ? <th key={j} scope="row" className="break-words px-2 py-4 font-semibold text-paper sm:px-4">{cell}</th>
          : <td key={j} className="break-words px-2 py-4 align-top sm:px-4">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export function faqSchema(faq) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }
}

export function breadcrumbSchema(title, url, locale = 'sr') {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Petar Arsić', item: `${SITE_URL}/${locale}` },
    { '@type': 'ListItem', position: 2, name: title, item: url },
  ] }
}
