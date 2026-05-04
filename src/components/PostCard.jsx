import './PostCard.css'

function PostCard({ post, onClick }) {
  const timeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp)
    const mins = Math.floor(diff / 60000)
    const hrs = Math.floor(mins / 60)
    const days = Math.floor(hrs / 24)
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hrs > 0) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`
    return `${mins} minute${mins > 1 ? 's' : ''} ago`
  }

  return (
    <div className="post-card" onClick={onClick}>
      <p className="post-time">Posted {timeAgo(post.created_at)}</p>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-upvotes">💖 {post.upvotes || 0} upvotes</p>
    </div>
  )
}

export default PostCard