import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // if we dont use a useRef, an infinite loop will occur in useEffect
    // _query is an array and react sees it as different on every function call
    // since it is a dependency, react will reevaluate infinitely
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            setDocuments(results)
            setError(null)
        }, (err) => {
            console.log(err)
            setError('could not fetch the data')
        })

        //unsub on unmount
        return () => unsubscribe()

    }, [collection, query, orderBy])

    return { documents, error }
}