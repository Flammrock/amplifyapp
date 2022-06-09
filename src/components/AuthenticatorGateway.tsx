import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  IonButton,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

import { Auth, Hub } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


import './AuthenticatorGateWay.css';

interface IUser {
  name: string;
  email: string;
}

const AuthenticatorGateWay: React.FC<{ children: React.ReactElement, path?: string, center?: boolean }> = ({ children, path, center }) => {

  if (typeof center === 'undefined') center = true;

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

  const applyCenter = (data: React.ReactElement): React.ReactElement => {
    if (!center) return data;
    return (
      <div className="auth-content">
        {data}
      </div>
    );
  };

  if (user == null) return applyCenter(<></>);


  if (typeof path === 'string') {
    if (typeof user === 'boolean' && !user) {
      return applyCenter(
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
      );
    } else {
      return applyCenter(children);
    }
  } else {
    return applyCenter(
      <Authenticator>
        {({ signOut, user }) => {
          return children;
        }}
      </Authenticator>
    );
  }
};

export default AuthenticatorGateWay;



