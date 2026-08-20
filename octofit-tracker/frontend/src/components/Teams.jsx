import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import { DataPage, EmptyState } from './Activities.jsx'

export default function Teams() {
  const [teams, setTeams] = useState([]); const [error, setError] = useState('')
  useEffect(() => { getCollection('/api/teams/').then(setTeams).catch(() => setError('Teams are unavailable right now.')) }, [])
  return <DataPage eyebrow="FIND YOUR CREW" title="Teams" error={error}><div className="tile-grid">{teams.map((team) => <article className="tile" key={team._id || team.name}><span className="tile-number">{String(team.members?.length || 0).padStart(2, '0')}</span><h2>{team.name}</h2><p>members</p>{team.members?.length > 0 && <small>{team.members.map((member) => member.username).join(' · ')}</small>}</article>)}</div>{!teams.length && !error && <EmptyState text="No teams created yet." />}</DataPage>
}