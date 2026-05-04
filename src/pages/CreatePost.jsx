import { useState } from 'react'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    await supabase.from('posts').insert({
      title,
      content: content || null,
      image_url: imageUrl || null,
      upvotes: 0,
    })
    navigate('/')
  }

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>Create a New Post 💅</h1>
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