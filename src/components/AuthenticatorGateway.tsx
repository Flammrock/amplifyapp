import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  IonButton,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

//import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


import './AuthenticatorGateWay.css';

interface IUser {
  name: string;
  email: string;
}

const AuthenticatorGateWay: React.FC<{ children: React.ReactElement, path?: string }> = ({ children, path }) => {

  let [user, setUser] = useState<IUser|boolean|null>(null);
  useEffect(() => {
    let updateUser = async () => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch {
        setUser(false);
      }
    };
    updateUser();
  }, []);

  if (user==null) return <div className="auth-content"></div>;

  if (typeof path === 'string') {
    if (typeof user === 'boolean' && !user) {
      return (
        <div className="auth-content">
          <IonList>
            <IonItem>
              <IonLabel>
                <strong>You do not have enough permissions to access this content.</strong>
              </IonLabel>
            </IonItem>
            <IonItem>
              <Link to="/auth"><IonButton>Click here to login</IonButton></Link>
            </IonItem>
          </IonList>
        </div>
      );
    } else {
    return (
      <div className="auth-content">
        {children}
      </div>
    );
    }
  } else {
    return (
      <div className="auth-content">
        <Authenticator>
          {({ signOut, user }) => {
            return children;
          }}
        </Authenticator>
      </div>
    );
  }
};

export default AuthenticatorGateWay;



