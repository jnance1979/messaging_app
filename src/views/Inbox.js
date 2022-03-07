import React, { useCallback, useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from '../contexts/AuthProvider';

export const Inbox = () => {
  const db = getFirestore();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);

  const searchMessages = [];
  function searchWord() {
    const searchMessage = document.getElementById("searchMessage");
    console.log(messages);

    for (const message of messages) {
      if (message.body.includes(searchMessage.value)) {
        searchMessages.push(message);
        setFilteredMessages(searchMessages);
      }
    }
    console.log(filteredMessages);
  }

  //  let newMessages = useMemo(() => [], []);

  const getMessages = useCallback(async () => {
    console.log("getmessages ran");
    const q = query(
      collection(db, "messages"),
      where("to", "==", `${currentUser.email}`)
    );
    let newMessages = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      newMessages.push({
        body: doc.data().body,
        from: doc.data().from,
      });

      setMessages(newMessages);
      console.log(newMessages);

      // }
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());

      return querySnapshot;
    });
  }, [db, currentUser.name]);

  useEffect(() => {
    console.log("useeffect ran");
    getMessages();
  }, [getMessages]);

  //  useEffect(() => {}, []);

  console.log(filteredMessages);
  return (
    <React.Fragment>
      <div>
        <h1>Inbox</h1>
      </div>
      {currentUser.loggedIn ? (
        <div>
          <ul id="messageList">
            {messages.map((m) => (
              <li key={m.body}>
                <div>
                  {m.body} from: {m.from}
                </div>
              </li>
            ))}
          </ul>
          <section>
            <hr></hr>
            <div className="searchForm col-7">
              <small>
                find messages from Inbox including a word or phrase{" "}
              </small>
              <input
                // value={searchValue}
                // onChange={(e) => setsearchValue(e.target.value)}
                // classname="form-control"
                id="searchMessage"
                form="text"
                placeholder="Search term"
              ></input>
              <button
                onClick={() => searchWord()}
                id="searchMessage"
                className="btn btn-outline-success my-2 my-lg-0"
                type="submit"
              >
                Find Message
              </button>
            </div>
            <ul id="messageList">
              {filteredMessages.map((m) => (
                <li key={m.body}>
                  <div>
                    {m.body} from: {m.from}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <h3>Please log in to see your messages</h3>
      )}
    </React.Fragment>
  );
};
