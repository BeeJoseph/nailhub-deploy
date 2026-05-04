import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import './Form.css'

function CreatePost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const currentUser = data?.user
      setUser(currentUser)
      if (!currentUser) navigate('/login')
    })
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    setError('')
    try {
      const { error: insertError } = await supabase.from('posts').insert({
        title,
        content: content || null,
        image_url: imageUrl || null,
        upvotes: 0,
        user_id: user.id,
      })
      if (insertError) throw insertError
      navigate('/')
    } catch (err) {
      setError(err.message || 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>Create a New Post 💅</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="post-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content (Optional)"
            rows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL (Optional)"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost