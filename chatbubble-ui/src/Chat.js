import React, {useState, useEffect, useContext} from 'react'
import {Link, Redirect} from '@reach/router'
import API from './Api'
import styled from '@emotion/styled'

//RealChatComponent(Desktop)
export const ChatComponent = () => {
    const [hiddenSearchFriend, setHiddenSearchFriend] = useState(true)
    const [auth, setAuth] = useState(true)
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [profile, setProfile] = useState(false)
    const [messages, setMessages] = useState([])

    //tempUser


    const GetAllUsers = async () => {
        try {
            const {data} = await API.getAllUsers()
            if (data.success) {
                return setUsers(data.users)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const GetMessages = async () => {
        try {

            //---------------Temp Data
            let tempUsers = {
                to  : 'Martial',
                from: 'Nicolas'
            }
            let messageKey = [tempUsers.from, tempUsers.to].sort().join('')
            //-----------------

            const {data} = await API.getMessages(messageKey)
            if (data.success) {
                return setMessages(data.messages)
            }
        } catch (error) {
            console.error(error)
        }
    }

    function handleSearch(event) {
        let value = event.target.value
        setSearch(value)
    }

    useEffect(() => {
        if (!API.isAuth()) {
            setAuth(false)
        }
        GetAllUsers()
        GetMessages()
    }, [hiddenSearchFriend])

    return (
        <div>
            {redirect ? <Redirect to="/" noThrow/> : null}
            {profile ? <Redirect to="/profile" noThrow/> : null}
            <WrapperCommand>
                <LogoutButton
                    onClick={() => {
                        API.logout()
                        setRedirect(true)
                    }}
                >
                    Logout
                </LogoutButton>
                <SettingsButton
                    onClick={() => {
                        setProfile(true)
                    }}
                >
                    Settings
                </SettingsButton>
            </WrapperCommand>
            <WrapperChat>
                {!auth ? <Redirect to="/signin" noThrow/> : null}
                <ContactList>
                    <h1>Vos contacts</h1>
                    <YourContactBox></YourContactBox>
                    {hiddenSearchFriend ? (
                        <AddFriendButton
                            onClick={() => {
                                setHiddenSearchFriend(false)
                            }}
                        >
                            Ajouter un contact
                        </AddFriendButton>
                    ) : (
                        <SearchAddFriend>
                            <input
                                type="text"
                                placeholder="recherche d'une personne"
                                onChange={handleSearch}
                            />
                            <BackButton
                                onClick={() => {
                                    setHiddenSearchFriend(true)
                                }}
                            >
                                {`<`}
                            </BackButton>
                        </SearchAddFriend>
                    )}
                    {hiddenSearchFriend ? null : (
                        <SearchList>
                            {users &&
                            users.map((user, index) => {
                                if (search === '' || searchTool(search, user.login))
                                    return (
                                        <UserSearch key={index}>
                                            <p>{user.login}</p>
                                        </UserSearch>
                                    )
                            })}
                        </SearchList>
                    )}
                </ContactList>
                <ConversationArea>
                    <ConversationBox>
                        {
                            messages && Object.entries(messages).map((content, index) => {
                                console.log(content)
                                if(content[1].from === 'Martial') {
                                    return <MessageUser key={index}><TextUserStyle>{content[1].message}</TextUserStyle></MessageUser>
                                } else {
                                    return <MessageContact key={index}><TextContactStyle>{content[1].message}</TextContactStyle></MessageContact>
                                }
                            })
                        }
                    </ConversationBox>
                    <WriteSendStyle>
                        <input type="text" placeholder="Ecrire votre message ici"/>
                        <SendButton>envoyer</SendButton>
                    </WriteSendStyle>
                </ConversationArea>
            </WrapperChat>
        </div>
    )
}

const searchTool = (search, user) => {
    let tableUserName = user.toLowerCase().split('')
    return tableUserName.join('').includes(search.toLowerCase())
}

const WrapperChat = styled.div`
  width: 1200px;
  height: 600px;
  border: solid 1px grey;
  border-radius: 9px;
  padding: 15px;
  display: flex;
  flex-direction: row;
`

const ContactList = styled.div`
  text-align: center;
  border-right: solid 2px grey;
  padding: 15px;
  width: 35%;
`

const TextUserStyle = styled.p`
    background-color: orangered;
    padding: 9px;
    border-radius: 9px;
`

const TextContactStyle = styled.p`
    background-color: coral;
    padding: 9px;
    border-radius: 9px;
`

const MessageUser = styled.div`
  margin-left: 60%;
  width: 200px;
`

const MessageContact = styled.div`
  margin-left: 10%;
  width: 200px;
`

const ConversationBox = styled.div`
  overflow: scroll;
  border: solid 1px grey;
  border-radius: 9px;
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
  border: solid 1px grey;
  border-radius: 9px;
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

const LogoutButton = styled.button`
  margin: 5px;
  cursor: pointer;
`

const SettingsButton = styled.button`
  margin: 5px;
  cursor: pointer;
`

const WrapperCommand = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`

const SearchList = styled.div`
  border: 1px solid grey;
  overflow: scroll;
  max-height: 200px;
  margin-top: 14px;
`

const UserSearch = styled.div`
  border: 1px solid grey;
  text-align: center;
  cursor: pointer;
`
