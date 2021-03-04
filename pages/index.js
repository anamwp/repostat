import Reposummery from '../components/Reposummery'
import Weeklycommitgraph from '../components/Weeklycommitgraph'
import styled from 'styled-components'
import "tailwindcss/tailwind.css"
import Pullrequest from '../components/Pullrequest';
import Latestrelase from '../components/Latestrelease';

const ContentWrapper = styled.div`
  /* width:70%;
  margin: 0 auto;
  text-align:center; */
  canvas{
    /* width:100% !important; */
    /* height:400px !important; */
  }
`;

export default function Home() {
  const repo= {
    owner : 'gatsbyjs', 
    name : 'gatsby',
    branch : 'master'
  }
  return (
    <ContentWrapper className="container max-w-screen-lg mx-auto text-center pt-8">
        <h2 className="text-black-300 font-bold capitalize text-2xl">{repo.name}</h2>
        <div className="grid gap-10 grid-cols-1 rounded mt-3 pt-3 items-center">
          <div>
              <Weeklycommitgraph repo = {repo}/>
              <div className="mt-10 rounded overflow-hidden">
                <Reposummery repo = {repo}/>
            </div>
          </div>
          {/* <div className="issueandpullrequest">
            <div className="p-10 group px-6 py-5 max-w-full mx-auto w-100 border border-indigo-500 border-opacity-25 cursor-pointer rounded-lg select-none overflow-hidden space-y-1 my-8">
              <h2>Pull Request</h2>
              <Latestrelase repo = {repo}/>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-10 group px-6 py-5 max-w-full mx-auto w-100 border border-indigo-500 border-opacity-25 cursor-pointer rounded-lg select-none overflow-hidden space-y-1 hover:bg-white hover:shadow-lg hover:border-transparent my-8">
              <h2>Issues</h2>
            </div>
          </div> */}
        </div>
        
    </ContentWrapper>
  )
}
