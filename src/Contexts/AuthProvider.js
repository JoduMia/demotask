import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../Firebase/firebase.config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthContext = createContext();

//main react component
const AuthProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);



    //google signin ------>
   const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
   };

   const signWithEmailPass = (email,password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

   const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const emailPassRegister = (email,password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const githubAuth = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  }

  const updateUserInfo = (profile) => {
    return updateProfile(auth.currentUser, profile)
  }

  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser)
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      if(currentUser === null || currentUser.emailVerified){
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    }
  },[]);

   const authInfo = {
    googleSignIn,
    signWithEmailPass,
    emailPassRegister,
    logOut,
    updateUserInfo,
    verifyEmail,
    githubAuth,
    user,
    loading,
    setLoading
   }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider