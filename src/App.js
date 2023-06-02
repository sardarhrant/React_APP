import { Fragment, useMemo, useContext, useEffect } from 'react';
import Layout from './components/Layout';
import Card from './components/Card'
import './App.css';
import { Context } from './context';

function App() {
  const { state, read } = useContext(Context)
  const count = useMemo(
    () => `You have ${state.items.length} image${state.items.length > 1 ? 's' : ''}`, [state.items]
  );

  useEffect(() => {
    read()
  }, [])

  return (
      <Fragment>
       <Layout>
        <h1 className='text-center'>Gallery</h1>
        {count}
        <div className='row'>
            {state.items.map((photo, index)=> <Card key={index} src={photo.path}/>)}
        </div>
       </Layout>
    </Fragment>
  );
}

export default App;
