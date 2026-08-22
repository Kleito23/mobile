import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { trashOutline } from 'ionicons/icons';
import { Expense, getExpenses } from '../data/expenses';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(getExpenses);
  const [query, setQuery] = useState('');

  const visibleExpenses = expenses.filter((expense) => `${expense.concept} ${expense.category}`.toLowerCase().includes(query.toLowerCase()));

  const removeExpense = (index: number) => {
    const nextExpenses = expenses.filter((_, expenseIndex) => expenseIndex !== index);
    setExpenses(nextExpenses);
    localStorage.setItem('expenses', JSON.stringify(nextExpenses));
  };

  const clearExpenses = () => {
    localStorage.removeItem('expenses');
    setExpenses([]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Historial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Historial</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="history-shell">
          <div className="history-heading"><div><IonText color="medium">Todos tus movimientos</IonText><h1>Historial</h1></div><strong>{expenses.length}</strong></div>
          <IonInput className="history-search" placeholder="Buscar por concepto o categoría" value={query} onIonInput={(event) => setQuery(event.detail.value || '')} clearInput />
          <IonCard className="history-card">
            <IonCardContent>
              {visibleExpenses.length ? <IonList>
                {visibleExpenses.map((expense) => { const index = expenses.indexOf(expense); return <IonItem key={`${expense.concept}-${index}`} lines="full">
                  <IonLabel><h2>{expense.concept}</h2><p>{expense.category} · {expense.date}</p></IonLabel>
                  <strong>${expense.amount.toLocaleString('es-MX')}</strong>
                  <IonButton fill="clear" color="danger" aria-label={`Borrar ${expense.concept}`} onClick={() => removeExpense(index)}><IonIcon icon={trashOutline} /></IonButton>
                </IonItem>; })}
              </IonList> : <p className="empty-state">Todavía no hay gastos registrados.</p>}
            </IonCardContent>
          </IonCard>
          {expenses.length > 0 && <button className="clear-history" onClick={clearExpenses}>Borrar historial</button>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
