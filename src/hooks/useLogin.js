import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        // sign the user in
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            // change online status to true
            await projectFirestore.collection('users').doc(res.user.uid).update({ online: true })

            // update state
            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }
        catch(err) {
            if (!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true)
    }, [])

    return { login, error, isPending}

}