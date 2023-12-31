import React, {useContext, useState, useEffect} from 'react'
import { auth } from '../firebase.js'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(email, password){
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email){
        currentUser.updateEmail(email);
    }

    function updatePassword(password){
        currentUser.updatePassword(password);
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user) 
            setLoading(false); 
        })
        return unsubscribe;
    }, [])

    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return <AuthContext.Provider value = {value}>{!loading && children}</AuthContext.Provider>
}
