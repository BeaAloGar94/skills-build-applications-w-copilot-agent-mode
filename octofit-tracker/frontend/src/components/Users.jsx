import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import { DataPage, EmptyState } from './Activities.jsx'

export default function Users() {
  const [users, setUsers] = useState([]); const [error, setError] = useState('')
  useEffect(() => { getCollection('users').then(setUsers).catch(() => setError('Athletes are unavailable right now.')) }, [])
  return <DataPage eyebrow="THE COMMUNITY" title="Athletes" error={error}><div className="data-list">{users.map((user) => <article className="data-row" key={user._id || user.username}><strong>{user.username}</strong><span>{user.email}</span><b>{user.fitnessLevel || 'beginner'}</b></article>)}</div>{!users.length && !error && <EmptyState text="No athletes registered yet." />}</DataPage>
}