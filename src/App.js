import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useAuth} from "./contexts/AuthProvider";
import { Inbox } from "./views/Inbox";
import { Sent } from "./views/Sent";
import { Trash } from "./views/Trash";
import { firebase } from "./firebase/config";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getFirestore} from "firebase/firestore";

export const App = () => {

const { logIn, currentUser, logOut } = useAuth();

  let auth = getAuth();
  const db = getFirestore();

  const [all, setAll] = useState([]);
 
        function newMessage() {

            const toMessage = document.getElementById("toMessage");
            const bodyMessage = document.getElementById("bodyMessage");
            const messageRef = addDoc(collection(db, "messages"), {
              to: toMessage.value,
              body: bodyMessage.value,
              from: currentUser.name,
            });
            alert("message sent!");
          };
      
          function updateMessages() {
           let update = []
            update.push('a')
            setAll(update);
          }

  return (
    <React.Fragment>
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home<span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sent" className="nav-link">
                  Sent
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link to="/trash" className="nav-link">
                  Trash
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              {!currentUser.loggedIn ? (
                <button
                  id="login"
                  onClick={(e) => logIn(e)}
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Login
                </button>
              ) : (
                <button
                  id="logout"
                  onClick={(e) => logOut(e)}
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Logout
                </button>
              )}
            </form>
          </div>
        </nav>
      </header>

      <main className="container">
        {currentUser.loggedIn ? (
          <section>
            <h4>Hello, {currentUser.name}</h4>
            <div className="messageForm col-8">
              <input
                id="toMessage"
                form="text"
                placeholder="to: (email address)"
              ></input>
              <input
                id="bodyMessage"
                form="text"
                placeholder="type message here"
              ></input>

              <button
                onClick={() => newMessage()}
                id="createMessage"
                className="btn btn-outline-success my-2 my-lg-0"
                type="submit"
              >
                Send Message
              </button>
            </div>
            <ul id="messageList"></ul>
            <button
              onClick={() => updateMessages()}
              id="createMessage"
              className="btn btn-outline-success my-2 my-lg-0"
              type="submit"
            >
              Show All Messages
            </button>
            <ul id="messageList"></ul>
          </section>
        ) : (
          <hr></hr>
        )}
        <Routes>
          <Route exact path="/" element={<Inbox />} />
          <Route exact path="/sent" element={<Sent />} />
          <Route exact path="/trash" element={<Trash />} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

