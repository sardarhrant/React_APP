import { Fragment, useMemo, useContext, useEffect } from 'react'
import Layout from './components/Layout'
import Card from './components/Card'
import { useAuthContext } from './context/AuthContext'
import { Context } from './context/FirestoreContext'
import './App.css'

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
       <Layout>
        <h1 className='text-center'>Gallery</h1>
        {count}
        <div className='row'>
            {state.items.map((media, index)=> <Card key={index} {...media}/>)}
        </div>
       </Layout>
    </Fragment>
  );
}

export default App;
