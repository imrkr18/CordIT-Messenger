import { userConstants } from "./constants"
import { getFirestore, query, collection, onSnapshot, addDoc, where, orderBy } from 'firebase/firestore'

export const getRealtimeUsers = (uid) =>{

    return async (dispatch) =>{

        dispatch({
            type : `${userConstants.GET_REALTIME_USERS}_REQUEST`
        });

        const db = getFirestore();

        const q = query(collection(db, "users"));
        onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function(doc){
                if(doc.data().uid !== uid ){
                    users.push(doc.data());
                }
            });
            // console.log(users, uid);

            dispatch({
                type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                payload : { users }
            })
        });
        return q;
    }
}

export const updateMessage = (msgObj) => {

    return async dispatch => {
        const db = getFirestore();

        try{
            addDoc(collection(db,'conversation'),{
                ...msgObj,
                isView: false,
                createdAt: new Date(),
                
            })
            .then((data)=>{
                console.log("updated")

            })
            .catch(e =>{
                console.log(e)
            })
        }
        catch(e){
            console.error(e);
        }

    }
}

export const getRealTimeConversations = (user) => {
    return async dispatch => {
        const db = getFirestore();
        const q = query(collection(db, 'conversation'), orderBy('createdAt'),where('user_uid1','in',[user.uid1, user.uid2]));
        // console.log(q)
        onSnapshot(q, (querySnapshot)=>{

            const conversations = []

            querySnapshot.forEach( doc => {
                if((doc.data().user_uid1 === user.uid1 && doc.data().user_uid2 === user.uid2) 
                || (doc.data().user_uid1 === user.uid2 && doc.data().user_uid2 === user.uid1)) 
                {
                    conversations.push(doc.data())
                }

            })
            dispatch({
                type : userConstants.GET_REALTIME_MESSAGES,
                payload : { conversations }
            })
            // console.log(conversations)
        })
    }
}