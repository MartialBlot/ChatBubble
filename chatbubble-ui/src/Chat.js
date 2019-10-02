import React, {useState, useEffect, useContext} from 'react'
import {Redirect} from '@reach/router'
import API from './Api'
import styled from '@emotion/styled'

//TempChatPage
const Chat = () => {
    const [redirect, setRedirect] = useState(false)
    if (!API.isAuth()) return <Redirect to="/" noThrow/>
    return (
        <div>
            <div>
                <h1>Chat</h1>
                <h2>You are connected !</h2>
            </div>
            {redirect ? <Redirect to="/" noThrow/> : null}
            <div>
                <button
                    onClick={() => {
                        API.logout()
                        setRedirect(true)
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Chat

//RealChatComponent(Desktop)
export const ChatComponent = () => {

    const [hiddenSearchFriend, setHiddenSearchFriend] = useState(true)

    return <WrapperChat>
        <ContactList>
            <h1>Vos contactes</h1>
            <YourContactBox>

            </YourContactBox>
            {
                hiddenSearchFriend ? <AddFriendButton onClick={() => {
                    setHiddenSearchFriend(false)
                }}>
                    Ajouter un contacte
                </AddFriendButton> : <SearchAddFriend>
                    <input type='text' placeholder="recherche d'une personne"/>
                    <BackButton onClick={() => {
                        setHiddenSearchFriend(true)
                    }}>
                        {`<`}
                    </BackButton>
                </SearchAddFriend>
            }
        </ContactList>
        <ConversationArea>
            <ConversationBox>
            </ConversationBox>
            <WriteSendStyle>
                <input type="text" placeholder="Ecrire votre message ici"/>
                <SendButton>envoyer</SendButton>
            </WriteSendStyle>
        </ConversationArea>
    </WrapperChat>
}

const WrapperChat = styled.div`
  width: 1200px;
  height: 600px;
  border: solid 1px black;
  border-radius: 9px;
  padding: 15px;
  display: flex;
  flex-direction: row;
`

const ContactList = styled.div`
  text-align: center;
  border-right: solid 2px black;
  padding: 15px;
  width: 35%;
`

const ConversationBox = styled.div`
  border: solid 1px black;
  height: 92%;
`

const ConversationArea = styled.div`
  padding: 15px;
  width: 65%;
`

const WriteSendStyle = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`

const SendButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
`

const YourContactBox = styled.div`
  border: solid 1px black;
  height: 82%;
  margin-top: 15px;
`

const AddFriendButton = styled.button`
    margin-top: 15px;
    cursor: pointer;
`

const SearchAddFriend = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`

const BackButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
`
