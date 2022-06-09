import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IonHeader,
  IonToolbar,
  IonToggle,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';


import { Auth, Hub } from 'aws-amplify';

const toggleDarkModeHandler = () => document.body.classList.toggle('dark');

interface IUser {
  name: string;
  email: string;
}

const Header: React.FC<{ children?: React.ReactElement, title: String }> = ({ children, title }) => {

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

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        {(user != null && typeof user !== 'boolean') ? (
          <IonButtons slot="secondary">
            <Link to="/user">
              <IonButton>
                <IonIcon slot="start" icon={personCircle} />
                {user.name}
              </IonButton>
            </Link>
          </IonButtons>
        ) : <></>}
        {children}
        <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} />
      </IonToolbar>
    </IonHeader>);
};
export default Header;



