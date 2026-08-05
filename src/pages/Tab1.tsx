import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { addOutline, alertCircleOutline, walletOutline } from 'ionicons/icons';
import './Tab1.css';

const recentExpenses = [
  { concept: 'Almuerzo', category: 'Comida', amount: '$45' },
  { concept: 'Autobús', category: 'Transporte', amount: '$18' },
  { concept: 'Café', category: 'Antojo', amount: '$32' }
];

const pendingIdeas = ['Agregar ingresos', 'Guardar historial', 'Configurar alertas'];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Control de gastos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Control de gastos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="expenses-shell">
          <IonCard className="hero-card">
            <IonCardContent>
              <div className="hero-header">
                <IonChip color="warning" className="status-chip">
                  <IonIcon icon={alertCircleOutline} />
                  <IonLabel>Avance parcial</IonLabel>
                </IonChip>
                <IonBadge color="success">Semana 1</IonBadge>
              </div>
              <h1>Tu presupuesto diario, en un solo lugar</h1>
              <p>
                Este prototipo muestra un resumen rápido de gastos para una presentación,
                sin funciones completas todavía.
              </p>

              <div className="budget-box">
                <div>
                  <IonText color="medium">Disponible hoy</IonText>
                  <strong>$1,240</strong>
                </div>
                <IonIcon icon={walletOutline} />
              </div>

              <div className="budget-meta">
                <span>Meta semanal</span>
                <strong>$3,000</strong>
              </div>
              <IonProgressBar value={0.58} />
            </IonCardContent>
          </IonCard>

          <div className="section-title">
            <h2>Gastos recientes</h2>
            <IonButton fill="clear" size="small">
              <IonIcon slot="start" icon={addOutline} />
              Agregar
            </IonButton>
          </div>

          <IonCard className="list-card">
            <IonCardContent>
              {recentExpenses.map((expense) => (
                <IonItem key={expense.concept} lines="none" className="expense-item">
                  <IonLabel>
                    <h3>{expense.concept}</h3>
                    <p>{expense.category}</p>
                  </IonLabel>
                  <strong>{expense.amount}</strong>
                </IonItem>
              ))}
            </IonCardContent>
          </IonCard>

          <IonCard className="pending-card">
            <IonCardContent>
              <h2>Lo que falta por construir</h2>
              <div className="pending-list">
                {pendingIdeas.map((idea) => (
                  <IonChip key={idea} outline>
                    <IonLabel>{idea}</IonLabel>
                  </IonChip>
                ))}
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
