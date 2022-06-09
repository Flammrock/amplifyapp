import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  IonButton
} from '@ionic/react';


import { Auth, Hub } from 'aws-amplify';

interface IUser {
  name: string;
  email: string;
}

const User: React.FC<{}> = () => {

  let history = useHistory();

  let [user, setUser] = useState<IUser | boolean | null>(null);
  useEffect(() => {
    let updateUser = async () => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setUser(user.attributes);
      } catch {
        setUser(false);
      }
    };
    Hub.listen('auth', updateUser);
    updateUser();
    return () => Hub.remove('auth', updateUser);
  }, []);

  if (user == null || typeof user === 'boolean') return <div></div>;

  const signOut = async () => {
    try {
      await Auth.signOut();
      history.push("/home");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <strong>Hi, {user.name}</strong><br />
      <IonButton onClick={signOut} color="danger">
        Sign Out
      </IonButton>
    </div>
  );
};

export default User;



