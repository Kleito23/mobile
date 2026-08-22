import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [budget, setBudget] = useState(localStorage.getItem('budget') || '3000');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'MXN');
  const saveSettings = () => {
    localStorage.setItem('budget', budget);
    localStorage.setItem('currency', currency);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ajustes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="settings-shell">
          <h1>Ajustes</h1>
          <p className="settings-intro">Personaliza tu forma de llevar las cuentas.</p>
          <IonCard className="settings-card"><IonCardContent>
            <IonItem><IonLabel>Meta semanal</IonLabel><IonInput type="number" value={budget} onIonInput={(event) => setBudget(event.detail.value || '')} /></IonItem>
            <IonItem><IonLabel>Moneda</IonLabel><IonSelect value={currency} onIonChange={(event) => setCurrency(event.detail.value)}><IonSelectOption value="MXN">MXN · Peso mexicano</IonSelectOption><IonSelectOption value="USD">USD · Dólar</IonSelectOption><IonSelectOption value="EUR">EUR · Euro</IonSelectOption></IonSelect></IonItem>
            <IonButton expand="block" onClick={saveSettings}>Guardar cambios</IonButton>
          </IonCardContent></IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
