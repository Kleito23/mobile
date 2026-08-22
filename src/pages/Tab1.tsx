import {
  IonAlert,
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
import { useState } from 'react';
import { addOutline, alertCircleOutline, walletOutline } from 'ionicons/icons';
import { Expense, getExpenses } from '../data/expenses';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(getExpenses);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const weeklyBudget = Number(localStorage.getItem('budget') || 3000);

  const addExpense = (concept: string, category: string, amount: string) => {
    const numericAmount = Number(amount);
    if (!concept.trim() || !category.trim() || !numericAmount) return;
    const nextExpenses = [{ concept: concept.trim(), category: category.trim(), amount: numericAmount, date: 'Hoy' }, ...expenses];
    setExpenses(nextExpenses);
    localStorage.setItem('expenses', JSON.stringify(nextExpenses));
  };

  const totalToday = expenses.filter((expense) => expense.date === 'Hoy').reduce((total, expense) => total + expense.amount, 0);
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
                Consulta tus movimientos y mantén tu meta semanal bajo control.
              </p>

              <div className="budget-box">
                <div>
                  <IonText color="medium">Disponible hoy</IonText>
                  <strong>${(weeklyBudget - totalToday).toLocaleString('es-MX')}</strong>
                </div>
                <IonIcon icon={walletOutline} />
              </div>

              <div className="budget-meta">
                <span>Meta semanal</span>
                <strong>${weeklyBudget.toLocaleString('es-MX')}</strong>
              </div>
              <IonProgressBar value={Math.min(totalToday / weeklyBudget, 1)} />
            </IonCardContent>
          </IonCard>

          <div className="section-title">
            <h2>Gastos recientes</h2>
              <IonButton fill="clear" size="small" onClick={() => setIsAlertOpen(true)}>
              <IonIcon slot="start" icon={addOutline} />
              Agregar
            </IonButton>
          </div>

          <IonCard className="list-card">
            <IonCardContent>
              {expenses.slice(0, 5).map((expense) => (
                <IonItem key={expense.concept} lines="none" className="expense-item">
                  <IonLabel>
                    <h3>{expense.concept}</h3>
                    <p>{expense.category}</p>
                  </IonLabel>
                  <strong>${expense.amount.toLocaleString('es-MX')}</strong>
                </IonItem>
              ))}
            </IonCardContent>
          </IonCard>

          <IonCard className="pending-card">
            <IonCardContent>
              <h2>Resumen de hoy</h2>
              <div className="today-summary"><span>{expenses.filter((expense) => expense.date === 'Hoy').length} movimientos</span><strong>${totalToday.toLocaleString('es-MX')}</strong></div>
              <div className="category-summary">
                {Object.entries(expenses.reduce<Record<string, number>>((totals, expense) => ({ ...totals, [expense.category]: (totals[expense.category] || 0) + expense.amount }), {})).map(([category, amount]) => (
                  <div className="category-row" key={category}><span>{category}</span><strong>${amount.toLocaleString('es-MX')}</strong></div>
                ))}
              </div>
            </IonCardContent>
          </IonCard>
        </div>
        <IonAlert
          isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header="Agregar gasto"
          inputs={[
            { name: 'concept', placeholder: 'Concepto' },
            { name: 'category', placeholder: 'Categoría' },
            { name: 'amount', type: 'number', placeholder: 'Monto' }
          ]}
          buttons={[{ text: 'Cancelar', role: 'cancel' }, { text: 'Guardar', handler: (data) => addExpense(data.concept, data.category, data.amount) }]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
