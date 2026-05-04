import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import './Form.css'

function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else setSuccess('Check your email to confirm your account!')
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <h1>💅 Join NailHub</h1>
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
        <form className="auth-form" onSubmit={handleSignup}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
        <div className="divider">or</div>
        <button className="google-btn" onClick={handleGoogle}>
          <img src="https://www.google.com/favicon.ico" width="18" alt="Google" />
          Continue with Google
        </button>
        <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Signup