import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Activities() {
  const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : '/api/activities/'
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getCollection(activitiesEndpoint).then(setActivities).catch(() => setError('Activities are unavailable right now.'))
  }, [activitiesEndpoint])

  return <DataPage eyebrow="TRAINING LOG" title="Activities" error={error}>
    <div className="data-list">{activities.map((activity) => <article className="data-row" key={activity._id}><strong>{activity.type}</strong><span>{activity.user?.username || activity.user || 'Unassigned'}</span><span>{activity.durationMinutes} min</span><b>{activity.points} pts</b></article>)}</div>
    {!activities.length && !error && <EmptyState text="No activities logged yet." />}
  </DataPage>
}

export function DataPage({ eyebrow, title, error, children }) { return <section className="data-page"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{error && <p className="alert alert-warning">{error}</p>}{children}</section> }
export function EmptyState({ text }) { return <p className="empty-state">{text}</p> }
export default Activities