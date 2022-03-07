import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthProvider';

export const Sent = () => {

  const db = getFirestore();
  const { currentUser } = useAuth();
  const [sentMessages, setSentMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
 
  const searchMessages = [];
    function searchWord() {
      const searchMessage = document.getElementById("searchMessage");
      console.log(sentMessages)
      
      for(const message of sentMessages){
        if(message.body.includes(searchMessage.value)){
          searchMessages.push(message);
          setFilteredMessages(searchMessages)
        }
      }
      console.log(searchMessages);
    };

   let newMessages = [];
  //  let newMessages = useMemo(() => [], []);
   const getMessages = useCallback(async () => {
     // const q = query(collection(db, "messages"));
     const q = query(
       collection(db, "messages"),
       where("from", "==", `${currentUser.name}`)
     );
     const querySnapshot = await getDocs(q);

     querySnapshot.forEach(async (doc) => {
       newMessages.push({
         body: doc.data().body,
         to: doc.data().to,
       });
      //  console.log(newMessages)
       setSentMessages(newMessages);
       //  console.log(newMessages);
       // }
       // doc.data() is never undefined for query doc snapshots
       console.log(doc.data());
        console.log(filteredMessages);

       return querySnapshot;
     });
   }, [db, currentUser.name]);

   useEffect(() => {
     console.log('useEffect ran')
    
     getMessages();
   }, [getMessages]);

  //  useEffect(() => {}, []);

   console.log(filteredMessages);


  return (
    <React.Fragment>
      <div>
        <h1>Sent Messages</h1>
      </div>
      {currentUser.loggedIn ? (
        <div>
          <ul id="messageList">
            {sentMessages.map((m) => (
              <li key={m.body}>
                <div>
                  {m.body} sent to: {m.to}
                </div>
              </li>
            ))}
          </ul>
          <section>
            <hr></hr>
            <div className="searchForm col-7">
              <small>find sent messages including a word or phrase</small>
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
                    {m.body} sent to: {m.to}
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
}
