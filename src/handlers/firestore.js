import { setDoc, doc, serverTimestamp, collection, getDocs} from 'firebase/firestore'
import { db } from '../lib/firebase.config';

export const Firestore = {
    readDocs: (...args) => {
        return new Promise(async resolve => {
            let docs = []
            const [ collection_name ] = args
            const ref = collection(db, 'stocks')
            try {
                const snapshots = await getDocs(ref)
                snapshots.forEach(doc => {
                    const d = { ...doc.data() }
                    docs.push(d)
                })

                resolve(docs)
            } catch (error) {
                console.log(error);
            }
        })
    },
    writeDoc: (...args) => {
        const [inputs, collection_name] = args;
        return new Promise(async resolve => {
            const randomIndex = Math.floor(Math.random() * 1000000000)
            try {
                debugger
                const docRef =  doc(db, 'stocks', `${randomIndex}`);
                await setDoc(docRef, {title: inputs.title, path: inputs.path, createdAt: serverTimestamp()});
                resolve('new doc siccessfully inserted')
            } catch(e) {
                console.log('aaaaaaaaaaaaaaaa');
            }
        })
    }
}