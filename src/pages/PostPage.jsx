import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import './PostPage.css'

const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY
const LLM_ENDPOINT = import.meta.env.VITE_LLM_ENDPOINT

function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [llmSummary, setLlmSummary] = useState('')
  const [loadingSummary, setLoadingSummary] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null))
    fetchPost()
    fetchComments()
  }, [id])

  const fetchPost = async () => {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single()
    setPost(data)
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments(data || [])
  }

  const handleUpvote = async () => {
    const newCount = (post.upvotes || 0) + 1
    await supabase.from('posts').update({ upvotes: newCount }).eq('id', id)
    setPost({ ...post, upvotes: newCount })
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    await supabase.from('comments').insert({ post_id: id, content: newComment })
    setNewComment('')
    fetchComments()
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return
    await supabase.from('comments').delete().eq('post_id', id)
    await supabase.from('posts').delete().eq('id', id)
    navigate('/')
  }

  const handleDeleteComment = async (commentId) => {
    await supabase.from('comments').delete().eq('id', commentId)
    fetchComments()
  }

  const generateSummary = async () => {
    setLoadingSummary(true)
    try {
      const response = await fetch(LLM_ENDPOINT + 'api/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LLM_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'openai/gemma4:26b',
          messages: [{
            role: 'user',
            content: `Summarize this nail forum post in 2-3 sentences. Be friendly and informative.
Title: ${post.title}
Content: ${post.content || 'No content'}
Upvotes: ${post.upvotes || 0}
Comments: ${comments.map(c => c.content).join(', ') || 'None'}`
          }]
        })
      })
      const data = await response.json()
      setLlmSummary(data.content?.[0]?.text || 'Could not generate summary.')
    } catch {
      setLlmSummary('Summary unavailable right now.')
    }
    setLoadingSummary(false)
  }

  const timeAgo = (ts) => {
    const diff = Date.now() - new Date(ts)
    const hrs = Math.floor(diff / 3600000)
    const days = Math.floor(hrs / 24)
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hrs > 0) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`
    return 'just now'
  }

  if (loading) return (
    <div className="page">
      <Navbar />
      <div className="loader-box"><div className="spinner"></div><p>Loading...</p></div>
    </div>
  )

  if (!post) return (
    <div className="page"><Navbar /><p style={{padding:'40px', textAlign:'center'}}>Post not found.</p></div>
  )

  return (
    <div className="page">
      <Navbar />
      <div className="post-container">
        <p className="post-meta">Posted {timeAgo(post.created_at)}</p>
        <h1 className="post-heading">{post.title}</h1>
        {post.content && <p className="post-content">{post.content}</p>}
        {post.image_url && (
          <img className="post-image" src={post.image_url} alt="Post" />
        )}

        <div className="post-actions">
          <button className="upvote-btn" onClick={handleUpvote}>
            💖 {post.upvotes || 0} upvotes
          </button>
          <div className="edit-delete">
            <Link to={`/edit/${post.id}`} className="edit-btn">✏️ Edit</Link>
            <button className="delete-btn" onClick={handleDelete}>🗑️ Delete</button>
          </div>
        </div>

        {/* AI Summary */}
        <div className="ai-box">
          <button className="ai-btn" onClick={generateSummary} disabled={loadingSummary}>
            {loadingSummary ? '✨ Generating...' : '✨ Get AI Summary'}
          </button>
          {llmSummary && (
            <div className="ai-summary">
              <p className="ai-label">✨ AI Summary</p>
              <p>{llmSummary}</p>
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="comments-section">
          <h3>Comments ({comments.length})</h3>
          <div className="comments-list">
            {comments.map(c => (
              <div key={c.id} className="comment">
                <p>— {c.content}</p>
                <button className="del-comment" onClick={() => handleDeleteComment(c.id)}>✕</button>
              </div>
            ))}
          </div>
          <form className="comment-form" onSubmit={handleComment}>
            <input
              type="text"
              placeholder="Leave a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostPage