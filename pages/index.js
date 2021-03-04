import Reposummery from '../components/Reposummery'
import Weeklycommitgraph from '../components/Weeklycommitgraph'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  width:70%;
  margin: 0 auto;
  text-align:center;
  canvas{
    width:100%;
    height:auto;
  }
`;

export default function Home() {
  const repo= {
    owner : 'elementor', 
    name : 'elementor',
    branch : 'master'
  }
  return (
    <ContentWrapper>
        <h2>{repo.name.toUpperCase()}</h2>
        <div>
          <Weeklycommitgraph/>
        </div>
        <div>
            <Reposummery repo = {repo}/>
        </div>
    </ContentWrapper>
  )
}
