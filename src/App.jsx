import { useState } from 'react'
import './App.css'
import Form from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h2>Heeloow</h2>
    <Form />
    </>
  )
}

export default App
