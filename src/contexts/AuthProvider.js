import { createContext, useContext, useEffect, useState } from "react";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithPopup, signOut } from "firebase/auth";
import { firebaseApp } from "../firebase/config";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const AuthContext = createContext()



export function useAuth() {
    return useContext( AuthContext )
}

export const AuthProvider = ( { children } ) => {
    
    const [currentUser, setcurrentUser] = useState({ loggedIn: false })
    let auth = getAuth()
    let provider = new GoogleAuthProvider()
    const db = getFirestore();

    function signIn() {
        return setPersistence( auth, browserLocalPersistence )
        .then( () => {
            signInWithPopup( auth, provider)
            .then( result => {
                console.log(result)
            })
        })
        .catch( err => console.error( err) )
    }

    function logOut () {
        signOut( auth )
        .then( ()  => {
            setcurrentUser({ loggedIn: false })
            alert('User has successfully logged out.')


        })
    }

    useEffect(() => {
        console.log( currentUser )
        onAuthStateChanged( auth, ( user ) => {
            if ( user ) {

                const userRef = doc( db, 'users', user.uid )
                setDoc( userRef, {email: user.email, name: user.displayName }, { merge: true } )

                setcurrentUser({
                    id: user.uid,
                    name: user.displayName,
                    image: user.photoURL,
                    email: user.email,
                    loggedIn: true
                })
            }
        })
    }, [ auth ])
    

    const values = {
        signIn, currentUser, logOut
    };

    return (
    <AuthContext.Provider value={ values }>
        { children }
    </AuthContext.Provider>
    )
}