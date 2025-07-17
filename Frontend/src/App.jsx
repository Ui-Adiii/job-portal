import React from 'react'
import { Button } from './components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from './store/theme/themeSlice'

const App = () => {
  const {theme} =useSelector((state)=>state.theme)
  const dispatch=useDispatch();

  console.log(theme);
  return (
    <div >
      <Button
      onClick={()=>dispatch(toggleTheme())}
      >Click</Button>
    </div>
  )
}

export default App