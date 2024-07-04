import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";

import { createContext, useContext, useEffect } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBgjQ9EIqJBufiIWS89BawEe8CzD4FpCjE",
    authDomain: "bookify-8a8d1.firebaseapp.com",
    projectId: "bookify-8a8d1",
    storageBucket: "bookify-8a8d1.appspot.com",
    messagingSenderId: "722703322253",
    appId: "1:722703322253:web:6de2874019210325d126c4"
};

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()

const FirebaseContext = createContext(null)
export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
    const [user, setUser] = (null)
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            console.log('user', user)
            if (user) setUser(user)
            else setUser(null)

        })
    }, [])

    const signupUser = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password)

    const loginUser = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password)

    const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)

    const isLoggedIn = user ? true : false ;

    return <FirebaseContext.Provider value={{
        signupUser,
        loginUser,
        signInWithGoogle,
        isLoggedIn,
    }} >
        {props.children}
    </FirebaseContext.Provider>
}
