import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import './Page.css';
import './Home.css';


const Home: React.FC = () => {
  return (
    <IonPage>
      <Header title="Home"></Header>
      <IonContent class="page-relative-container" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Home page" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
