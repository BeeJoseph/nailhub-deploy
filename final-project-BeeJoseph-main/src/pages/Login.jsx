import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import './Form.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else navigate('/')
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  const handleReset = async () => {
    if (!email) { setError('Enter your email first'); return }
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    })
    setResetSent(true)
  }

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <h1>💅 Welcome Back</h1>
        {error && <p className="auth-error">{error}</p>}
        {resetSent && <p className="auth-success">Password reset email sent!</p>}
        <form className="auth-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        <button className="auth-form" style={{background:'none', border:'none', color:'#d4547a', cursor:'pointer', fontSize:'0.85rem'}} onClick={handleReset}>
          Forgot password?
        </button>
        <div className="divider">or</div>
        <button className="google-btn" onClick={handleGoogle}>
          <img src="https://www.google.com/favicon.ico" width="18" alt="Google" />
          Continue with Google
        </button>
        <p className="auth-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login