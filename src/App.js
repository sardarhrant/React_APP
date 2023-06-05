import { Fragment, useMemo, useContext, useEffect } from 'react'
import { useAuthContext } from './context/AuthContext'
import { Context } from './context/FirestoreContext'
import './App.css'
import List from './components/List'

function App() {
  const { state, read } = useContext(Context)
  const { authenticate } = useAuthContext()
  const count = useMemo(
    () => `You have ${state.items.length} image${state.items.length > 1 ? 's' : ''}`, [state.items]
  );

  useEffect(() => {
    read()
    authenticate()
  }, [])

  return (
      <Fragment>
       <>
        <h1 className='text-center'>Gallery</h1>
        {count}
        <List items={state.items}/>
       </>
    </Fragment>
  );
}

export default App;
