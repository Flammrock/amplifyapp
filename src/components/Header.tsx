import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonToggle,
  IonTitle
} from '@ionic/react';

const toggleDarkModeHandler = () => document.body.classList.toggle('dark');

const Header: React.FC<{ children?: React.ReactElement, title: String }> = ({ children, title }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        {children}
        <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} />
      </IonToolbar>
    </IonHeader>);
};

export default Header;



