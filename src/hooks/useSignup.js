import { useState, useEffect } from "react"
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"


export const useSignup = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // add a profile photo to a user
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const photoURL = await img.ref.getDownloadURL()

            // add username and a photo url to a user
            await res.user.updateProfile({ displayName, photoURL })

            //create a user document
            await projectFirestore.collection('users').doc(res.user.uid).set({
                online: true,
                displayName,
                photoURL
            })

            //dispatch login action
            dispatch({ type: "LOGIN", payload: res.user })


            // update state
            if (!isCanceled){
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCanceled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        setIsCanceled(false)
        return () => setIsCanceled(true)
    }, [])

    return { error, isPending, signup }
}