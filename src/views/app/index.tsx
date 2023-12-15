import React from 'react'
import { useToDoStore } from '../../data/stores/useToDoStore'
import styles from './index.module.scss'
import InputPlus from '../components/InputPlus'
import InputTask from '../components/InputTasks'

const App: React.FC = () => {
const [
  tasks,
  createTask,
  updateTask,
  removeTask
] = useToDoStore(state => [
  state.tasks,
  state.createTask,
  state.updateTask,
  state.removeTask,
])

  console.log(tasks);
  
  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputPlus onAdd={(title) => {
          if(title) {
            createTask(title)
          }
        }}/>
      </section>
      <section className={styles.articleSection}>
        {!tasks.length &&(
          <p className={styles.articleText}>На данный момент задач нет</p>
        )}
        {
          tasks.map((task) => (
            <InputTask 
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
            />
          ))
        }
      </section>
    </article>
  )
}

export default App