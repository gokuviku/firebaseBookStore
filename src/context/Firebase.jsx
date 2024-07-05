import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    query,
    where,
} from "firebase/auth";

import { addDoc, collection, getFirestore, getDocs, getDoc } from "firebase/firestore";

import { createContext, useContext, useEffect } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const fireStore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

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

    const isLoggedIn = user ? true : false;

    const handleCreateNewListing = async (name, isbnNumber, price, coverPic) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${coverPic.name}`)
        const uploadResult = await uploadBytes(imageRef, coverPic)
        return await addDoc(collection(fireStore, 'books'), {
            name,
            isbnNumber,
            price,
            imageURL: uploadResult.ref.fullPath, //for coverpic
            userID: user.uid,
            userEmail: user.email,
            diplayName: user.displayName,
            photoURL: user.photoURL,
        })
    }

    const listAllBooks = () => {
        return getDocs(collection(fireStore, "books"),)
    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path))
    }

    const getBookById = async (id) => {
        const docRef = doc(collection(fireStore, 'books', id))
        const result = await getDoc(docRef)
        return result
    }

    const placeOrder = async (bookId,qty)=>{
        const collectionRef = collection(firestore,'books',bookId,"orders")
        const result =await addDoc(collectionRef,{
            userID:user.uid,
            displayName:user.displayName,
            userEmail:user.email,
            photoURL:user.photoURL,
            qty:Number(qty),
        })
        return result;
    }

    return <FirebaseContext.Provider value={{
        signupUser,
        loginUser,
        signInWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder
        
    }} >
        {props.children}
    </FirebaseContext.Provider>
}
