import { getAuth, updateProfile } from "firebase/auth"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
// import { useSelector } from 'react-redux'
import { getFirestore, updateDoc, doc, setDoc } from 'firebase/firestore'
import { authConstants } from "./constants"

export const signup = (user) => {

    return async (dispatch) => {
        
        const db = getFirestore();

        dispatch({
            type : `${authConstants.USER_LOGIN}_REQUEST`
        });
        const auth = getAuth();
        console.log(auth)
        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(data => {
            // console.log(data);
            const name = `${user.firstName} ${user.lastName}`
            updateProfile(auth.currentUser, {
                displayName: name,

            })
            .then(()=>{
                // Updated successfully
                setDoc(doc(db, 'users', data.user.uid),{
                    firstName : user.firstName,
                    lastName : user.lastName,
                    uid : data.user.uid,
                    createdAt : new Date(),
                    isOnline : true
                })
                .then(()=>{
                    //successfully entered the data
                    const loggedInuser = {
                        firstName : user.firstName,
                        lastName : user.lastName,
                        uid : data.user.uid,
                        email : user.email    
                    }
                    localStorage.setItem('user', JSON.stringify(loggedInuser));
                    alert("user logged in successfully");

                    dispatch({
                        type : `${authConstants.USER_LOGIN}_SUCCESS`,
                        payload : {
                            user : loggedInuser
                        }
                    })
                })
                .catch((error)=>{
                    // console.log(error);
                    alert(error.message)
                    dispatch({
                        type : `${authConstants.USER_LOGIN}_FAILURE`,
                        payload : {
                            error 
                        }
                    });
                })
            })
        })
        .catch(error => {
            alert(error.message);
            // console.log(error);
        });
    }
}


export const signin = (user) => {
    return async dispatch => {

        dispatch({
            type: `${authConstants.USER_LOGIN}_REQUEST`
        });

        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((data) => {
            // console.log(data);
            alert("user logged in successfully");
            
            const name = data.user.displayName.split(" ")
            const firstName = name[0]
            const lastName = name[1]
            
            const loggedInuser = {
                firstName ,
                lastName ,
                uid : data.user.uid,
                email : data.user.email    
            }
            const db = getFirestore();
            const onlineRef = doc(db, "users", data.user.uid);
            
            updateDoc(onlineRef,{
                isOnline : true,
            })
            
            localStorage.setItem('user', JSON.stringify(loggedInuser));
            dispatch({
                type : `${authConstants.USER_LOGIN}_SUCCESS`,
                payload : { user : loggedInuser}
            })
            
        })
        .catch(error => {
            alert(error.message);
            dispatch({
                type : `${authConstants.USER_LOGIN}_FAILURE`,
                payload:{ error }
            })
        })
            

    }
}

export const isLoggedInUser = () => {
    
    return dispatch => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null; 
        if(user){
            dispatch({
                type : `${authConstants.USER_LOGIN}_SUCCESS`,
                payload : { user : user }
            })
        }
        else{
            dispatch({
                type : `${authConstants.USER_LOGIN}_FAILURE`,
                payload : { error : "Login again please" }
            })
        }
 
    }
}

export const logout = (uid) => {
    return async dispatch => {
        dispatch({
            type : `${authConstants.USER_LOGOUT}_REQUEST`,
        });
        const db = getFirestore();
        const onlineRef = doc(db, "users", uid);

        updateDoc(onlineRef,{
            isOnline : false,
        })
        .then(()=>{
            const auth = getAuth();
            signOut(auth)
            .then(()=>{
                localStorage.clear();
                alert("You are logged out successfully")
                dispatch({
                    type : `${authConstants.USER_LOGOUT}_SUCCESS`,
                });
            })
            .catch(error => {
                dispatch({
                    type : `${authConstants.USER_LOGOUT}_FAILURE`,
                    payload:{ error }
                })
            })
        })
        .catch(error=>{
            localStorage.clear()
            alert("You are logged out. Please Refresh your browser.");
        })

        
    }
}