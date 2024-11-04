import './services/styles/App.css'
import Routers from './services/routes'
import LoadingComponent from './atoms/loadingComponent/index.jsx'
import { useSelector } from 'react-redux'

function App() {
  const isLoading = useSelector((state) => state.app.isLoading);
  
  return (
    <>
    <LoadingComponent loading={isLoading}/>
    <Routers />
    </>
  )
}

export default App
