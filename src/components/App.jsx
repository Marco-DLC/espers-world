import { useState } from 'react'
import '../App.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className='App'>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
    </div>
  )
}

export default App
