import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from "react"

//styles
import './Dashboard.css'

//components
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'

export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const filteredProjects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if (u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'marketing':
      case 'sales':
        return document.category === currentFilter
      default:
        return true
    }
  }) : null

  return (
    <div>
        <h2 className="page-title">Dashboard</h2>
        {error && <p className="error">{error}</p>}
        {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
        {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  )
}
