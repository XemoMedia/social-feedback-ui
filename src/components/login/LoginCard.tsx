import { useState, type FormEvent } from 'react'
import BrandMark from '../common/BrandMark'

const socialProviders = [
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H8.35v-2.9h2.09V9.41c0-2.06 1.23-3.2 3.11-3.2.9 0 1.84.16 1.84.16v2.02h-1.04c-1.02 0-1.33.64-1.33 1.3v1.56h2.27l-.36 2.9h-1.91V22c4.78-.81 8.44-4.95 8.44-9.94Z"
        />
      </svg>
    ),
  },
  {
    id: 'google',
    label: 'Continue with Google',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M21.35 11.1H12v2.96h5.35c-.24 1.2-.93 2.2-1.98 2.9v2.4h3.2c1.87-1.72 2.96-4.25 2.96-7.3 0-.7-.07-1.37-.18-1.96Z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.97-.9 6.64-2.5l-3.2-2.4c-.89.6-2.04.96-3.44.96-2.64 0-4.87-1.78-5.66-4.17h-3.3v2.56C5.78 19.98 8.64 22 12 22Z"
        />
        <path
          fill="#FBBC05"
          d="M6.34 13.89a6.57 6.57 0 0 1 0-4.21V7.12h-3.3a10 10 0 0 0 0 9.76l3.3-2.99Z"
        />
        <path
          fill="#EA4335"
          d="M12 6.58c1.47 0 2.78.5 3.82 1.47l2.87-2.88C16.96 3.45 14.7 2.5 12 2.5 8.64 2.5 5.78 4.52 4.04 7.36l3.3 2.5C7.13 8.36 9.36 6.58 12 6.58Z"
        />
      </svg>
    ),
  },
]

interface LoginCardProps {
  onSubmit: (payload: { email: string; password: string }) => void
  onForgot?: () => void
  onSignUp?: () => void
}

export const LoginCard = ({ onSubmit, onForgot, onSignUp }: LoginCardProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <section className="login-card">
      <div className="info-brand">
        <div className="logo-mark" aria-hidden="true">
          <BrandMark />
        </div>
        <div>
          <p className="brand-title">XEMO</p>
          <p className="brand-subtitle">AI Control Room Access</p>
        </div>
      </div>

      <h1 className="card-heading">Log in to XEMO</h1>

      <div className="social-buttons">
        {socialProviders.map((provider) => (
          <button key={provider.id} className={`social-btn ${provider.id}`} type="button">
            <span className="social-icon">{provider.icon}</span>
            {provider.label}
          </button>
        ))}
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" className="primary-btn">
          Log in
        </button>
      </form>

      <button type="button" className="muted-link" onClick={onForgot}>
        Forgot password?
      </button>

      <p className="signup-text">
        Don’t have an account?
        <button type="button" className="text-btn" onClick={onSignUp}>
          Sign up
        </button>
      </p>
    </section>
  )
}

