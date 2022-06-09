import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Todo.css';

import { Auth, Hub } from 'aws-amplify';

//import ExploreContainer from '../components/ExploreContainer';
import AuthenticatorGateWay from '../components/AuthenticatorGateway';
import Header from '../components/Header';
import Todo from '../components/Todo';

const TodoPage: React.FC = () => {

  let [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    let updateUser = async () => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setIsAdmin(user.signInUserSession.accessToken.payload['cognito:groups'].includes('admins'));
      } catch {
        setIsAdmin(false);
      }
    };
    Hub.listen('auth', updateUser);
    updateUser();
    return () => Hub.remove('auth', updateUser);
  }, []);

  return (
    <IonPage>
      <Header title="Todo"></Header>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Todo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AuthenticatorGateWay path="/auth" center={false}>
          <IonGrid>
            <IonRow>
              <IonCol size="2"></IonCol>
              <IonCol>
                <Todo isAdmin={isAdmin} />
              </IonCol>
              <IonCol size="2"></IonCol>
            </IonRow>
          </IonGrid>
        </AuthenticatorGateWay>
      </IonContent>
    </IonPage>
  );
};

export default TodoPage;
