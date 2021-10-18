import react, { useState } from 'react'
import './UserLogIn.css'

function UserLogIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  return (
    <form className="log-in-form">
      <label>
        {' '}
        Username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="email"
          name="username"
          required
        />
      </label>
      <label>
        {' '}
        Password:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          required
        />
      </label>
      <label>
        {' '}
        Confirm Password:
        <input
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          name="passwordConfirmation"
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  )
}

export default UserLogIn
