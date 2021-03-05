import Reposummery from '../components/Reposummery'
import Weeklycommitgraph from '../components/Weeklycommitgraph'
import "tailwindcss/tailwind.css"

export default function Home() {
  const repo= {
    owner : 'gatsbyjs', 
    name : 'gatsby',
    branch : 'master'
  }
  return (
    <div className="container max-w-screen-lg mx-auto text-center pt-8">
        
        <h2 className="text-black-300 font-bold capitalize text-2xl">
            {repo.name}
        </h2>
        
        <div className="mt-4 pt-3 items-center">
            <Weeklycommitgraph repo = {repo}/>
            <Reposummery repo = {repo}/>
        </div>
        
    </div>
  )
}
