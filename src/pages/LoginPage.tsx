import { useNavigate } from 'react-router-dom'
import { InfoPanel } from '../components/login/InfoPanel'
import { LoginCard } from '../components/login/LoginCard'
import { loginChecklist, loginTiles } from '../data/loginContent'
import '../styles/login.css'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/dashboard')
  }

  return (
    <div className="auth-shell">
      <div className="auth-layout">
        <InfoPanel
          title="XEMO"
          subtitle="Smart Social · Lingual AI"
          body="Orchestrate multilingual social conversations with an AI brain that understands tone, nuance, and intent across every network."
          tiles={loginTiles}
          checklist={loginChecklist}
          ctaLabel="Book a live demo"
        />

        <LoginCard
          onSubmit={handleLogin}
          onForgot={() => navigate('/dashboard')}
          onSignUp={() => navigate('/dashboard')}
        />
      </div>
    </div>
  )
}

export default LoginPage

