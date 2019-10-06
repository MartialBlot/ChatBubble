import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import styled from "@emotion/styled";
import decode from "jwt-decode";
import { Loading } from "./Loading";
import Modal from "./Modal";

//RealChatComponent(Desktop)
export const ChatComponent = () => {
  const [hiddenSearchFriend, setHiddenSearchFriend] = useState(true);
  const [auth, setAuth] = useState(true);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [profile, setProfile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [loop, setLoop] = useState(false);

  //tempUser

  const GetAllUsers = async () => {
    try {
      const { data } = await API.getAllUsers();
      if (data.success) {
        return setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const PostMessage = async () => {
    if (message === "") return;
    try {
      let form = {
        to: currentContact,
        from: userId,
        message: message && message,
        date: "10/10/2019"
      };
      const { data } = await API.postMessage(form);
      if (data.success) {
        console.log("message envoyé");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const AddContact = async contact => {
    // attention decale de 1 (je clique sur martial j'ai rien je reclique j'ai martial je clique sur nico j'ai martial etc...)
    setCurrentContact(contact);
    try {
      let form = {
        to: currentContact,
        from: userId,
        message: "",
        date: "noTime"
      };
      const { data } = await API.postMessage(form);
      if (data.success) {
        console.log("contact ajouté");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetNodeUsers = async () => {
    try {
      const { data } = await API.getNodeUsers();
      let userContact = [];
      if (data.success) {
        let nodeUsers = data.nodeUsers;
        nodeUsers.map(contact => {
          let users = contact.split("-");
          if (users[0] === userId || users[1] === userId) {
            let i = users.indexOf(userId);
            users.splice(i, 1);
            userContact.push(users.join(""));
          }
        });
        return setContacts(userContact);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetMessages = async () => {
    console.log("updatemessage");
    setLoop(false);
    try {
      let messageKey = [userId && userId, currentContact].sort().join("-");
      const { data } = await API.getMessages(messageKey);
      if (data.success) {
        setLoop(true);
        return setMessages(data.messages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleSearch(event) {
    let value = event.target.value;
    setSearch(value);
  }

  function handleMessage(event) {
    let value = event.target.value;
    setMessage(value);
  }

  useEffect(() => {
    if (!API.isAuth()) {
      setAuth(false);
    }
    let answer = decode(localStorage.getItem("token-chatbubble"));
    setUserId(answer.username);
    userId === "" ? setLoading(true) : setLoading(false);
    GetAllUsers();
    GetNodeUsers();
    GetMessages();
  }, [userId, hiddenSearchFriend, currentContact]);

  return (
    <div>
      {redirect ? <Redirect to="/" noThrow /> : null}
      {loop ? GetMessages() : null}
      {profile ? <Redirect to="/profile" noThrow /> : null}
      {loading ? (
        <Modal>
          <Loading />
        </Modal>
      ) : null}
      <WrapperCommand>
        <LogoutButton
          onClick={() => {
            API.logout();
            setRedirect(true);
          }}
        >
          Logout
        </LogoutButton>
        <SettingsButton
          onClick={() => {
            setProfile(true);
          }}
        >
          Settings
        </SettingsButton>
      </WrapperCommand>
      <WrapperChat>
        {!auth ? <Redirect to="/signin" noThrow /> : null}
        <ContactList>
          <h1>Vos contacts</h1>
          <YourContactBox>
            {contacts &&
              contacts.map((contact, index) => {
                return (
                  <ContactBox
                    key={index}
                    onClick={() => {
                      setCurrentContact(contact);
                    }}
                  >
                    {contact}
                  </ContactBox>
                );
              })}
          </YourContactBox>
          {hiddenSearchFriend ? (
            <AddFriendButton
              onClick={() => {
                setHiddenSearchFriend(false);
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
                  setHiddenSearchFriend(true);
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
                  if (
                    (search === "" || searchTool(search, user.login)) &&
                    !contacts.includes(user.login) &&
                    user.login !== userId
                  ) {
                    return (
                      <UserSearch
                        key={index}
                        onClick={() => {
                          AddContact(user.login);
                        }}
                      >
                        <p>{user.login}</p>
                      </UserSearch>
                    );
                  }
                })}
            </SearchList>
          )}
        </ContactList>
        <ConversationArea>
          <ConversationBox>
            {messages &&
              Object.entries(messages).map((content, index) => {
                {
                  /* console.log(content); */
                }
                if (content[1].message && content[1].message.length > 0) {
                  if (content[1].from === userId) {
                    return (
                      <MessageUser key={index}>
                        <TextUserStyle>{content[1].message}</TextUserStyle>
                      </MessageUser>
                    );
                  } else {
                    return (
                      <MessageContact key={index}>
                        <TextContactStyle>
                          {content[1].message}
                        </TextContactStyle>
                      </MessageContact>
                    );
                  }
                }
              })}
          </ConversationBox>
          <WriteSendStyle>
            <input
              type="text"
              value={message}
              placeholder="Ecrire votre message ici"
              onChange={handleMessage}
            />
            <SendButton
              onClick={() => {
                PostMessage();
                setMessage("");
                {
                  /* GetMessages(); */
                }
              }}
            >
              envoyer
            </SendButton>
          </WriteSendStyle>
        </ConversationArea>
      </WrapperChat>
    </div>
  );
};

const searchTool = (search, user) => {
  let tableUserName = user.toLowerCase().split("");
  return tableUserName.join("").includes(search.toLowerCase());
};

const ContactBox = styled.div`
  border: 1px solid grey;
  padding: 10px;
  border-radius: 9px;
  text-align: center;
  background-color: #ff4b2b;
  cursor: pointer;
`;

const WrapperChat = styled.div`
  width: 1200px;
  height: 600px;
  border: solid 1px grey;
  border-radius: 9px;
  padding: 15px;
  display: flex;
  flex-direction: row;
`;

const ContactList = styled.div`
  text-align: center;
  border-right: solid 2px grey;
  padding: 15px;
  width: 35%;
`;

const TextUserStyle = styled.p`
  background-color: orangered;
  padding: 9px;
  border-radius: 9px;
`;

const TextContactStyle = styled.p`
  background-color: coral;
  padding: 9px;
  border-radius: 9px;
`;

const MessageUser = styled.div`
  margin-left: 60%;
  width: 200px;
`;

const MessageContact = styled.div`
  margin-left: 10%;
  width: 200px;
`;

const ConversationBox = styled.div`
  overflow: scroll;
  border: solid 1px grey;
  border-radius: 9px;
  height: 92%;
`;

const ConversationArea = styled.div`
  padding: 15px;
  width: 65%;
`;

const WriteSendStyle = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;

const YourContactBox = styled.div`
  border: solid 1px grey;
  overflow: scroll;
  border-radius: 9px;
  height: 82%;
  margin-top: 15px;
`;

const AddFriendButton = styled.button`
  margin-top: 15px;
  cursor: pointer;
`;

const SearchAddFriend = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const BackButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  margin: 5px;
  cursor: pointer;
`;

const SettingsButton = styled.button`
  margin: 5px;
  cursor: pointer;
`;

const WrapperCommand = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const SearchList = styled.div`
  border: 1px solid grey;
  overflow: scroll;
  max-height: 200px;
  margin-top: 14px;
`;

const UserSearch = styled.div`
  border: 1px solid grey;
  text-align: center;
  cursor: pointer;
`;
