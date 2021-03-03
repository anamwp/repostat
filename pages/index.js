import Reposummery from '../components/Reposummery'
import styles from '../styles/Home.module.css'

export default function Home() {
  const repo= {
    owner : 'elementor', 
    name : 'elementor',
    branch : 'master'
  }
  return (
    <div className={styles.container}>
        <h2>{repo.name.toUpperCase()}</h2>
        <div>
            <Reposummery repo = {repo}/>
        </div>
    </div>
  )
}
