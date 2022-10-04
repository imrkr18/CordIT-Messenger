import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRealTimeConversations, getRealtimeUsers, updateMessage } from '../../actions/user.action'
import Header from './../components/Header'
import './homepage.css'




const User = (props) => {

  const { user, onClick } = props

  return (
    <div className="displayName" onClick={()=>{onClick(user)}}>
      <div className="displayPic">
        <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="" />
      </div>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px' }}>
        <span style={{ fontWeight: 500 }}>{user.firstName} {user.lastName}</span>
        <span className={ user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
      </div>
    </div> 
  )
}




const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [ chatStarted, setChatStarted] = useState(false);
  const [ chatUser, setChatuser ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ userUid, setUserUid ] = useState(null);
  useEffect(() => {
    dispatch(getRealtimeUsers(auth.uid))
    // eslint-disable-next-line
  }, [])
  
  
  const initChat = (user) => {
    setChatStarted(true)
    setChatuser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid)
    dispatch(getRealTimeConversations({uid1: auth.uid, uid2: user.uid}))

    
  }
  
  const submitMessage = (e) => {
    const msgObj = {
      user_uid1 : auth.uid,
      user_uid2 : userUid,
      message
    }

    if(message !==""){
      dispatch(updateMessage(msgObj))
      .then(()=>{
        setMessage(''); 
      })
    }

    // console.log(msgObj)
  }
  
  
  return (
    <>
      <Header />
      <section className='container'>
        <div className="userList">
          {
            user.users.length > 0 ?
              user.users.map(user => {
                return (
                  <User onClick={initChat} 
                  key={user.uid} user={user} />
                )
              }) : null
          }


        </div>

        <div className="chatArea">
          <div className="chatHeader"> 
            {
              chatStarted?chatUser : null

            }
           </div>
          <div className="messageSection">
            {
              
              chatStarted?
              user.conversations?.map(conv => 
                
                <div style={{textAlign : conv.user_uid1===auth.uid ? 'right' : 'left'}}>
                  <p className="messageStyle">{conv.message}</p>
                </div>
              )
              : null  
            }
            
          </div>
            {
              chatStarted?
              <div className="chatControl">
                <textarea name="" id="" cols="300" rows="1" value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder='Message'></textarea>
                <button onClick={submitMessage}>Send</button>
              </div>  :  null     
            }
          
        </div>
      </section>
    </>
  )
}

export default HomePage