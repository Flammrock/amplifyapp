import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import './Auth.css';

//import ExploreContainer from '../components/ExploreContainer';
import AuthenticatorGateWay from '../components/AuthenticatorGateway';
import Header from '../components/Header';

const Auth: React.FC = () => {
  return (
    <IonPage>
      <Header title="Auth"></Header>
      <IonContent class="page-relative-container" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Auth</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="auth-content">
          <AuthenticatorGateWay>
            <div>You are connected!</div>
          </AuthenticatorGateWay>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Auth;
