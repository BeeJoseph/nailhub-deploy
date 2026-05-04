import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import './Form.css'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from('posts').select('*').eq('id', id).single()
      if (data) {
        setTitle(data.title || '')
        setContent(data.content || '')
        setImageUrl(data.image_url || '')
      }
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('posts').update({
      title,
      content: content || null,
      image_url: imageUrl || null,
    }).eq('id', id)
    navigate(`/post/${id}`)
  }

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>Update Post ✏️</h1>
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
            {loading ? 'Saving...' : 'Update Post'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditPost