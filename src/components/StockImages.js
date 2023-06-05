import List from './List'
import { useFirestoreContext} from '../context/FirestoreContext'
import { useAuthContext } from '../context/AuthContext'
import { useMemo } from 'react'


const StockImages = () => {
    const { state } = useFirestoreContext()
    const { currentUser } = useAuthContext()
    const username = currentUser?.displayName.split(' ').join('')
    const items = useMemo(() => {
        const filtered = state.items.filter((item) => {            
            return item.user === username?.toLowerCase()
        })

        return currentUser ? filtered : []
    }, [state.items, currentUser])
    return (
        <>
            <h1>My Stocks Images</h1>
            <List items={items} />
        </>
    )
}

export default StockImages