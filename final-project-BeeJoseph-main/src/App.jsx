import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabase } from './supabaseClient'
import Navbar from './components/Navbar'
import PostCard from './components/PostCard'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState('created_at')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [orderBy])

  const fetchPosts = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order(orderBy, { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <Navbar search={search} setSearch={setSearch} />
      <div className="feed-container">
        <div className="sort-bar">
          <span>Order by:</span>
          <button
            className={orderBy === 'created_at' ? 'sort-btn active' : 'sort-btn'}
            onClick={() => setOrderBy('created_at')}
          >
            Newest
          </button>
          <button
            className={orderBy === 'upvotes' ? 'sort-btn active' : 'sort-btn'}
            onClick={() => setOrderBy('upvotes')}
          >
            Most Popular
          </button>
        </div>

        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Loading posts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <p>No posts yet! 💅 Be the first to share.</p>
            <Link to="/create" className="create-btn">Create a Post</Link>
          </div>
        ) : (
          <div className="posts-list">
            {filtered.map(post => (
              <PostCard key={post.id} post={post} onClick={() => navigate(`/post/${post.id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App