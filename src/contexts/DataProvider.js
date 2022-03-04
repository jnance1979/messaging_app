import {
  collectionGroup,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";
import { firebaseApp } from "../firebase/config";


export const DataContext = createContext();

export const DataProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const db = getFirestore();

  const getPosts = useCallback(async () => {
    // const q = query ( collection( db, 'posts'), orderBy( 'dateCreated', 'desc' ) );
    const q = query(collectionGroup(db, "messages"));
    const querySnapshot = await getDocs(q);

    let newPosts = [];
    querySnapshot.forEach(async (doc) => {
      const userRef = await getDoc(doc.ref.parent.parent);
      console.log(doc.data() )

      newPosts.push({
        dateCreated: doc.dateCreated,
        ...doc.data(),
        user: { ...userRef.data() },
      });

      setPosts(newPosts);
      // console.log(newPosts)

      return querySnapshot;
    });
  }, [db]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    console.log(firebaseApp);
  }, []);

  const values = {
    posts,
    setPosts,
  };

  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
};
