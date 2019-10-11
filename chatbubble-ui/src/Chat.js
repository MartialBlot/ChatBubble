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
  const [firstcontact, setFirstcontact] = useState(true);
  const [sound, setSound] = useState(true);
  const [soundoff, setSoundoff] = useState(false);
  const [key, setKey] = useState("");

  let nbMessages = -1;

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
        date: new Date().valueOf()
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
    try {
      let form = {
        to: contact,
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

  const GetAllUserMessages = async () => {
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
        if (firstcontact) {
          setCurrentContact(userContact[0]);
          setFirstcontact(false);
        }
        return setContacts(userContact);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Launch = async () => {
    try {
      await GetAllUsers();
      await GetNodeUsers();
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
        if (firstcontact) {
          // console.log("USERCONTACT = ", userContact);

          // console.log("FRISTCONTACT", userContact[0]);
          setCurrentContact(userContact[0]);
          // console.log(currentContact);
          if (userContact[0] !== "") setFirstcontact(false);
        }
        console.log(userContact);
        return setContacts(userContact);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Recursive function check si new message
  const GetResponseNewMessage = async () => {
    try {
      let messageKey = [userId && userId, currentContact].sort().join("-");
      // setKey(messageKey);
      const { data } = await API.getMessages(messageKey);
      if (data.success) {
        console.log("NBBBB ", Object.entries(data.messages).length);
        if (
          nbMessages !== Object.entries(data.messages).length &&
          typeof Object.entries(data.messages).length === "number"
        ) {
          nbMessages = Object.entries(data.messages).length;
          setMessages(data.messages);
          // console.log(Object.entries(data.messages)[nbMessages - 1][1].from);
          if (
            Object.entries(data.messages)[nbMessages - 1] &&
            Object.entries(data.messages)[nbMessages - 1][1].from !== userId
          ) {
            // console.log(data.messages[nbMessages]);
            setSound(true);
          }
          // audio.play();
        }
        GetResponseNewMessage();
      } else {
        GetResponseNewMessage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetAllResponseNewMessage = async () => {
    try {
      let actualconv = [userId && userId, currentContact].sort().join("-");
      console.log("messageKey : ", actualconv);

      // console.log(key);
      // console.log("CURRCONT ", currentContact);
      // console.log(actualconv);
      // setKey(actualconv);
      let messageKey = userId;
      // console.log("SALUT");
      // console.log("messageKey : ", messageKey);
      const { data } = await API.getallmessages(messageKey);
      if (data.success) {
        // console.log("NBBBB ", Object.entries(data.messages[actualconv]).length);
        if (
          nbMessages !== Object.entries(data.messages[actualconv]).length &&
          typeof Object.entries(data.messages[actualconv]).length === "number"
        ) {
          nbMessages = Object.entries(data.messages[actualconv]).length;
          setMessages(data.messages);
          // console.log(Object.entries(data.messages)[nbMessages - 1][1].from);
          if (
            Object.entries(data.messages)[nbMessages - 1] &&
            Object.entries(data.messages)[nbMessages - 1][1].from !== userId
          ) {
            // console.log(data.messages[nbMessages]);
            setSound(true);
          }
          // audio.play();
        }
        // GetAllResponseNewMessage();
      } else {
        // GetAllResponseNewMessage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const GetMessages = async () => {
  //   try {
  //     let messageKey = [userId && userId, currentContact].sort().join("-");
  //     const { data } = await API.getMessages(messageKey);
  //     if (data.success) {
  //       nbMessages = Object.entries(data.messages).length;
  //       setMessages(data.messages);
  //       return GetResponseNewMessage();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  function handleSearch(event) {
    let value = event.target.value;
    setSearch(value);
  }

  function handleMessage(event) {
    let value = event.target.value;
    setMessage(value);
  }

  function onSubmit(event) {
    event.preventDefault();
    PostMessage();
    setMessage("");
  }

  function scroll() {
    document.getElementById("conversation").scrollTop = document.getElementById(
      "conversation"
    ).scrollHeight;
  }

  function DOFUCKINGSOUND() {
    audio.play();
    setSound(false);
  }

  useEffect(() => {
    if (!API.isAuth()) {
      setAuth(false);
    }
    let answer = decode(localStorage.getItem("token-chatbubble"));
    setUserId(answer.username);
    userId === "" ? setLoading(true) : setLoading(false);
    Launch();
    // GetAllUsers();
    // GetNodeUsers();
    // // GetAllResponseNewMessage();
  }, [userId, hiddenSearchFriend]);

  useEffect(() => {
    let actualconv = [userId && userId, currentContact].sort().join("-");
    setKey(actualconv);
    // console.log(key);
    GetAllResponseNewMessage();
    // GetResponseNewMessage();
  }, [key, currentContact]);

  useEffect(() => {
    GetAllResponseNewMessage();

    // console.log(messages);
    scroll();
  }, [messages]);

  return (
    <div>
      {redirect ? <Redirect to="/" noThrow /> : null}
      {profile ? <Redirect to="/profile" noThrow /> : null}
      {sound && !soundoff ? DOFUCKINGSOUND() : null}

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
        {soundoff ? (
          <SettingsButton
            onClick={() => {
              setSound(false);
              setSoundoff(!sound);
            }}
          >
            Sound ON
          </SettingsButton>
        ) : (
          <SettingsButton
            onClick={() => {
              setSoundoff(!sound);
            }}
          >
            Sound OFF
          </SettingsButton>
        )}
      </WrapperCommand>
      <WrapperChat>
        {!auth ? <Redirect to="/signin" noThrow /> : null}
        <ContactList>
          <h1>Vos contacts</h1>
          <YourContactBox>
            {hiddenSearchFriend
              ? contacts &&
                contacts.map((contact, index) => {
                  if (contact === currentContact) {
                    return (
                      <ContactBoxCurr
                        key={index}
                        onClick={() => {
                          setCurrentContact(contact);
                        }}
                      >
                        {contact}
                      </ContactBoxCurr>
                    );
                  } else {
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
                  }
                })
              : users &&
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
                          setCurrentContact(user.login);
                          GetNodeUsers();
                          {
                            /* GetResponseNewMessage(); */
                          }
                        }}
                      >
                        <p>{user.login}</p>
                      </UserSearch>
                    );
                  }
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
        </ContactList>
        <ConversationArea>
          <ConversationBox id={"conversation"}>
            {messages[key] && Object.entries(messages[key]).length > 1 ? (
              Object.entries(messages[key]).map((content, index) => {
                if (content[1].message && content[1].message.length > 0) {
                  if (
                    content[1].from === userId &&
                    content[1].to === currentContact
                  ) {
                    return (
                      <MessageUser key={index}>
                        <TextUserStyle>{content[1].message}</TextUserStyle>
                      </MessageUser>
                    );
                  } else if (
                    content[1].to === userId &&
                    content[1].from === currentContact
                  ) {
                    return (
                      <MessageContact key={index}>
                        <TextContactStyle>
                          {content[1].message}
                        </TextContactStyle>
                      </MessageContact>
                    );
                  }
                }
              })
            ) : (
              <MessageNoMessage>
                Start typing a message to your new friend now :D
              </MessageNoMessage>
            )}
          </ConversationBox>
          <WriteSendStyle onSubmit={onSubmit}>
            <input
              type="text"
              value={message}
              placeholder="Ecrire votre message ici"
              onChange={handleMessage}
            />
            <SendButton type="submit">envoyer</SendButton>
          </WriteSendStyle>
        </ConversationArea>
      </WrapperChat>
    </div>
  );
};

let audio = new Audio(require("./assets/sounds/newMessange.mp3"));

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

const ContactBoxCurr = styled.div`
  border: 1px solid grey;
  padding: 10px;
  border-radius: 9px;
  text-align: center;
  background-color: #32cd32;
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
  overflow-wrap: break-word;
  background-color: orangered;
  padding: 9px;
  border-radius: 9px;
`;

const TextContactStyle = styled.p`
  overflow-wrap: break-word;
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

const MessageNoMessage = styled.div`
  margin-left: 10%;
  margin-top: 10%;
  color: green;
  font-size: 20px;
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

const WriteSendStyle = styled.form`
  display: flex;
  flex-direction: row;
  height: auto;
  background-color: #f6f5f7;
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

const UserSearch = styled.div`
  border: 1px solid grey;
  text-align: center;
  cursor: pointer;
`;
