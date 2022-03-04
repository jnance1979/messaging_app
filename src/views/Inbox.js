import React, { useContext } from 'react'
import { DataContext, DataProvider} from "../contexts/DataProvider";
import moment from 'moment'
import { useAuth } from '../contexts/AuthProvider';


export const Inbox = () => {

  const { currentUser } = useAuth();

  const { posts } = useContext(DataContext);
 

      const messages = posts.map((message) => (
        <div>
          <li key={message.body}> {message.body}</li>
          <cite>&mdash;{message.user.name}</cite>
          <span className="float-right">
            {moment(message.dateCreated.seconds).fromNow()}
          </span>
        </div>
      ));

  
        return (
          <React.Fragment>
            <div>Inbox</div>
            <h3>{ currentUser.name} </h3>
            <hr />
            {
              currentUser.loggedIn
              ?
              <div className="row">
                <div className="col-12">
                  <ul className="list-group">{messages}</ul>
                </div>
              </div>
              :
              <h3>no messages available</h3>
            }
          </React.Fragment>
        );
}
