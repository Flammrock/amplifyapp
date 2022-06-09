import React from "react";
import { Link } from 'react-router-dom';
import {
  IonButton,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

//import { API } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


import './AuthenticatorGateWay.css';


const AuthenticatorGateWay: React.FC<{ children: React.ReactElement, path?: string }> = ({ children, path }) => {

  if (typeof path === 'string') {
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



