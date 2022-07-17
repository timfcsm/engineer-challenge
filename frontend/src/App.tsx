import React from 'react'
import Navbar from './Navbar'

import './index.css'
import { Policies } from './components/Policies/Policies'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full p-8">
        <Policies />
      </div>
    </div>
  )
};


export default App;
