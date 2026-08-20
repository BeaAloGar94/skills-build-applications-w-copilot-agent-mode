import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import { DataPage, EmptyState } from './Activities.jsx'

export default function Leaderboard() {
  const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` : '/api/leaderboard/'
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection(leaderboardEndpoint).then(setRows).catch(() => setError('Leaderboard is unavailable right now.')) }, [leaderboardEndpoint])
  return <DataPage eyebrow="THE SCOREBOARD" title="Leaderboard" error={error}>
    <div className="leaderboard">{rows.map((row, index) => <article className="rank-row" key={row._id || row.user}><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{row.user?.username || row.user || 'Athlete'}</strong><span>{row.activities} activities</span><b>{row.points} pts</b></article>)}</div>
    {!rows.length && !error && <EmptyState text="The leaderboard is waiting for its first challenger." />}
  </DataPage>
}