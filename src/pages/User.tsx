import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import './Todo.css';

//import ExploreContainer from '../components/ExploreContainer';
import AuthenticatorGateWay from '../components/AuthenticatorGateway';
import Header from '../components/Header';
import User from '../components/User';

const UserPage: React.FC = () => {
  return (
    <IonPage>
      <Header title="User"></Header>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AuthenticatorGateWay path="/auth">
          <User />
        </AuthenticatorGateWay>
      </IonContent>
    </IonPage>
  );
};
export default UserPage;
