import { Link, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import './Navbar.css'

function Navbar({ search, setSearch }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null))
    supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">💅 NailHub</Link>
      {setSearch && (
        <input
          className="nav-search"
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      )}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
        {user ? (
          <>
            <span className="nav-user">👤 {user.email?.split('@')[0]}</span>
            <button className="nav-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar