import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark"><span>O</span> OctoFit Tracker</div>
        <nav aria-label="Primary navigation">
          {[
            ['/', 'Overview'],
            ['/activities', 'Activities'],
            ['/leaderboard', 'Leaderboard'],
            ['/teams', 'Teams'],
            ['/users', 'Users'],
            ['/workouts', 'Workouts'],
          ].map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">MERGINGTON HIGH SCHOOL / FITNESS HUB</p>
      <h1>Move with purpose.</h1>
      <p className="lede">Track your training, find your crew, and turn small wins into momentum.</p>
      <div className="overview-grid">
        <NavLink to="/activities" className="feature-panel panel-coral"><span>01</span><strong>Log activity</strong><small>Keep your streak alive</small></NavLink>
        <NavLink to="/leaderboard" className="feature-panel panel-ink"><span>02</span><strong>See the leaderboard</strong><small>Friendly competition, visible progress</small></NavLink>
        <NavLink to="/workouts" className="feature-panel panel-sage"><span>03</span><strong>Choose a workout</strong><small>Suggestions tuned to your level</small></NavLink>
      </div>
    </section>
  )
}

export default App
