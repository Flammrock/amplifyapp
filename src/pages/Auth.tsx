import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Auth.css';

//import ExploreContainer from '../components/ExploreContainer';
import AuthenticatorGateWay from '../components/AuthenticatorGateway';
import Header from '../components/Header';

const Auth: React.FC = () => {
  return (
    <IonPage>
      <Header title="Auth"></Header>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Auth</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AuthenticatorGateWay>
          <div>You are connected!</div>
        </AuthenticatorGateWay>
      </IonContent>
    </IonPage>
  );
};

export default Auth;
