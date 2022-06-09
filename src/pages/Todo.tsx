import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import './Todo.css';

//import ExploreContainer from '../components/ExploreContainer';
import AuthenticatorGateWay from '../components/AuthenticatorGateway';
import Header from '../components/Header';

const Todo: React.FC = () => {
  return (
    <IonPage>
      <Header title="Todo"></Header>
      <IonContent class="page-relative-container" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Todo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AuthenticatorGateWay path="/auth">
          <div>Todo list:</div>
        </AuthenticatorGateWay>
      </IonContent>
    </IonPage>
  );
};

export default Todo;
