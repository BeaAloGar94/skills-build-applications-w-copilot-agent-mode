import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import { DataPage, EmptyState } from './Activities.jsx'

export default function Workouts() {
  const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : '/api/workouts/'
  const [workouts, setWorkouts] = useState([]); const [error, setError] = useState('')
  useEffect(() => { getCollection(workoutsEndpoint).then(setWorkouts).catch(() => setError('Workouts are unavailable right now.')) }, [workoutsEndpoint])
  return <DataPage eyebrow="TODAY'S OPTIONS" title="Workouts" error={error}><div className="tile-grid">{workouts.map((workout) => <article className="tile" key={workout._id || workout.title}><span className="pill">{workout.fitnessLevel}</span><h2>{workout.title}</h2><p>{workout.durationMinutes} minutes / {workout.type}</p><small>{workout.description}</small></article>)}</div>{!workouts.length && !error && <EmptyState text="No workouts available yet." />}</DataPage>
}