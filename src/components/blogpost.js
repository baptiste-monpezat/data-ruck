import * as React from "react"
import Tag from "./tag"

const BlogPost = ({ title, date, excerpt, categories }) => (
    <div>
        <div className="oa-article-date">{date}</div>
        <div className="oa-article-title">{title}</div>
        {excerpt && <div className="oa-article-excerpt">{excerpt}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
            {(categories || '').split('|').filter(Boolean).map(cat => <Tag key={cat} category={cat} />)}
        </div>
    </div>
)

export default BlogPost
