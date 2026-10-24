import { ArrowDown, ArrowUp } from 'lucide-react'
import type { NewsCardData } from '../types'
import { voteCounts, type Vote } from '../lib/prototype'

export function NewsArticle({ article, featured, vote, onVote, onOpen }: {
  article: NewsCardData; featured: boolean; vote?: Vote; onVote: (vote: Vote) => void; onOpen: () => void
}) {
  const counts = voteCounts(article, vote)
  return <article className={`news-article ${featured ? 'featured' : 'compact'}`}>
    <button className="article-image-button" onClick={onOpen} aria-label={`Artikel öffnen: ${article.title}`}><img src={article.image} alt={article.imageAlt} loading={featured ? 'eager' : 'lazy'} /></button>
    <div className="article-content">
      <div className="article-topline"><span className="category-tag">{article.category}</span><time dateTime={article.publishedAt}>{article.published}</time></div>
      <button className="article-title" onClick={onOpen}><h2>{article.title}</h2></button>
      <p className="article-teaser">{article.subtitle}</p>
      <div className="article-footer"><span className="article-source"><span className="source-icon" aria-hidden="true">{article.source === 'kicker' ? 'k' : article.source === 'ZEIT ONLINE' ? 'Z' : article.source.slice(0, 1)}</span><span>{article.source}</span></span>
        <div className="vote-buttons" role="group" aria-label={`Relevanz bewerten: ${article.title}`}>
          <button className={`vote up ${vote === 'up' ? 'voted' : ''}`} aria-label="Relevant, informativ und lesenswert" title="Relevant, informativ und lesenswert" aria-pressed={vote === 'up'} onClick={() => onVote('up')}><ArrowUp size={19} /><span>{counts.up}</span></button>
          <button className={`vote down ${vote === 'down' ? 'voted' : ''}`} aria-label="Belanglos oder wenig informativ" title="Belanglos oder wenig informativ" aria-pressed={vote === 'down'} onClick={() => onVote('down')}><ArrowDown size={19} /><span>{counts.down}</span></button>
        </div>
      </div>
    </div>
  </article>
}
