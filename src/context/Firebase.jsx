import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    query,
    signInWithEmailAndPassword,
    signInWithPopup,
    where,
} from "firebase/auth";

import { addDoc, collection, getDoc, getDocs, getFirestore } from "firebase/firestore";

import { createContext, useContext, useEffect } from "react";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(fireStore, 'books', bookId, "orders")
        const result = await addDoc(collectionRef, {
            userID: user.uid,
            displayName: user.displayName,
            userEmail: user.email,
            photoURL: user.photoURL,
            qty: Number(qty),
        })
        return result;
    }
    const fetchMyBooks = async () => {
        if(!user) return null 
        const collectionRef = collection(fireStore, 'books')
        const q = query(collection, where("userID", '==', user.uid))

        const result = await getDocs(q)
        return result ;

    }

    const getOrders = async(bookId)=>{
        const collectionRef = collection(fireStore, 'books', bookId, "orders")
        const result = await getDocs(collectionRef)
        return result;
    }
    
    const isLoggedIn = user ? true : false;

    return <FirebaseContext.Provider value={{
        signupUser,
        loginUser,
        signInWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user , //"whole object to access"
        getOrders,

    }} >
        {props.children}
    </FirebaseContext.Provider>
}
