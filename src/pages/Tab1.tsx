import { useState } from 'react';

import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import {
  addOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  warningOutline,
  walletOutline
} from 'ionicons/icons';

import './Tab1.css';


/* Estructura de cada gasto */
interface Expense {
  concept: string;
  category: string;
  amount: number;
}


const Tab1: React.FC = () => {

  /* ========================================
     PRESUPUESTO
     ======================================== */

  const weeklyBudget = 3000;


  /* ========================================
     LISTA DE GASTOS
     ======================================== */

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      concept: 'Almuerzo',
      category: 'Comida',
      amount: 45
    },
    {
      concept: 'Autobús',
      category: 'Transporte',
      amount: 18
    },
    {
      concept: 'Café',
      category: 'Antojo',
      amount: 32
    }
  ]);


  /* ========================================
     VARIABLES DEL FORMULARIO
     ======================================== */

  const [showModal, setShowModal] = useState(false);

  const [concept, setConcept] = useState('');

  const [category, setCategory] = useState('Comida');

  const [amount, setAmount] = useState('');


  /* ========================================
     CÁLCULOS AUTOMÁTICOS
     ======================================== */

  /*
   * Suma todos los gastos registrados.
   */
  const totalSpent = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );


  /*
   * Calcula cuánto dinero queda disponible.
   */
  const availableBudget = weeklyBudget - totalSpent;


  /*
   * Calcula el porcentaje utilizado.
   */
  const percentageUsed =
    (totalSpent / weeklyBudget) * 100;


  /*
   * IonProgressBar utiliza valores entre 0 y 1.
   *
   * Ejemplo:
   * 50% = 0.50
   *
   * Math.min evita que la barra pase de 100%.
   */
  const progressValue = Math.min(
    totalSpent / weeklyBudget,
    1
  );


  /* ========================================
     ESTADO DEL PRESUPUESTO
     ======================================== */

  let budgetMessage = 'Tus gastos están bajo control';

  let budgetColor:
    'success' | 'warning' | 'danger' = 'success';

  let budgetIcon = checkmarkCircleOutline;


  if (percentageUsed >= 100) {

    budgetMessage = 'Has excedido tu presupuesto';

    budgetColor = 'danger';

    budgetIcon = alertCircleOutline;

  } else if (percentageUsed >= 90) {

    budgetMessage =
      'Cuidado, casi alcanzas tu presupuesto';

    budgetColor = 'danger';

    budgetIcon = warningOutline;

  } else if (percentageUsed >= 70) {

    budgetMessage =
      'Te estás acercando al límite';

    budgetColor = 'warning';

    budgetIcon = warningOutline;
  }


  /* ========================================
     FUNCIÓN PARA AGREGAR GASTO
     ======================================== */

  const addExpense = () => {

    const numericAmount = Number(amount);


    /*
     * Validación básica.
     */
    if (!concept.trim() || numericAmount <= 0) {
      return;
    }


    /*
     * Creamos el nuevo gasto.
     */
    const newExpense: Expense = {

      concept: concept.trim(),

      category: category,

      amount: numericAmount

    };


    /*
     * Lo agregamos al principio de la lista.
     */
    setExpenses([
      newExpense,
      ...expenses
    ]);


    /*
     * Limpiamos formulario.
     */
    setConcept('');

    setCategory('Comida');

    setAmount('');


    /*
     * Cerramos modal.
     */
    setShowModal(false);
  };


  return (

    <IonPage>


      {/* =====================================
          ENCABEZADO
          ===================================== */}

      <IonHeader>

        <IonToolbar>

          <IonTitle>
            Control de gastos
          </IonTitle>

        </IonToolbar>

      </IonHeader>



      {/* =====================================
          CONTENIDO
          ===================================== */}

      <IonContent fullscreen>


        <IonHeader collapse="condense">

          <IonToolbar>

            <IonTitle size="large">
              Control de gastos
            </IonTitle>

          </IonToolbar>

        </IonHeader>



        <div className="expenses-shell">


          {/* =================================
              RESUMEN DEL PRESUPUESTO
              ================================= */}

          <IonCard className="hero-card">

            <IonCardContent>


              <div className="hero-header">


                {/* ESTADO AUTOMÁTICO */}

                <IonChip
                  color={budgetColor}
                  className="status-chip"
                >

                  <IonIcon icon={budgetIcon} />

                  <IonLabel>
                    {budgetMessage}
                  </IonLabel>

                </IonChip>


                <IonBadge color="primary">
                  Semana actual
                </IonBadge>


              </div>



              <h1>
                Tu presupuesto semanal
              </h1>


              <p>
                Registra tus gastos y controla
                automáticamente cuánto dinero
                tienes disponible.
              </p>



              {/* =============================
                  DINERO DISPONIBLE
                  ============================= */}

              <div className="budget-box">


                <div>

                  <IonText color="medium">
                    Disponible
                  </IonText>


                  <strong>

                    ${availableBudget.toFixed(2)}

                  </strong>

                </div>


                <IonIcon icon={walletOutline} />


              </div>



              {/* =============================
                  TOTAL GASTADO
                  ============================= */}

              <div className="budget-meta">

                <span>
                  Total gastado
                </span>

                <strong>
                  ${totalSpent.toFixed(2)}
                </strong>

              </div>



              {/* =============================
                  PRESUPUESTO TOTAL
                  ============================= */}

              <div className="budget-meta">

                <span>
                  Presupuesto semanal
                </span>

                <strong>
                  ${weeklyBudget.toFixed(2)}
                </strong>

              </div>



              {/* =============================
                  BARRA DE PROGRESO
                  ============================= */}

              <IonProgressBar
                value={progressValue}
                color={budgetColor}
              />



              {/* =============================
                  PORCENTAJE UTILIZADO
                  ============================= */}

              <div
                style={{
                  marginTop: '10px',
                  textAlign: 'right'
                }}
              >

                <IonText color={budgetColor}>

                  <strong>

                    {percentageUsed.toFixed(1)}%
                    {' '}utilizado

                  </strong>

                </IonText>

              </div>


            </IonCardContent>

          </IonCard>



          {/* =================================
              GASTOS RECIENTES
              ================================= */}

          <div className="section-title">


            <h2>
              Gastos recientes
            </h2>


            <IonButton
              fill="clear"
              size="small"
              onClick={() => setShowModal(true)}
            >

              <IonIcon
                slot="start"
                icon={addOutline}
              />

              Agregar

            </IonButton>


          </div>



          {/* =================================
              LISTA
              ================================= */}

          <IonCard className="list-card">

            <IonCardContent>


              {expenses.map(
                (expense, index) => (

                  <IonItem
                    key={`${expense.concept}-${index}`}
                    lines="none"
                    className="expense-item"
                  >


                    <IonLabel>

                      <h3>
                        {expense.concept}
                      </h3>

                      <p>
                        {expense.category}
                      </p>

                    </IonLabel>


                    <strong>

                      ${expense.amount.toFixed(2)}

                    </strong>


                  </IonItem>

                )
              )}


            </IonCardContent>

          </IonCard>



          {/* =================================
              INFORMACIÓN
              ================================= */}

          <IonCard className="pending-card">

            <IonCardContent>

              <h2>
                Resumen
              </h2>


              <p>
                El presupuesto se actualiza
                automáticamente cada vez que
                registras un nuevo gasto.
              </p>


              <IonChip outline>

                <IonLabel>

                  {expenses.length}
                  {' '}
                  gastos registrados

                </IonLabel>

              </IonChip>


            </IonCardContent>

          </IonCard>


        </div>



        {/* =====================================
            MODAL NUEVO GASTO
            ===================================== */}

        <IonModal
          isOpen={showModal}
          onDidDismiss={() =>
            setShowModal(false)
          }
        >


          <IonHeader>

            <IonToolbar>

              <IonTitle>
                Nuevo gasto
              </IonTitle>

            </IonToolbar>

          </IonHeader>



          <IonContent className="ion-padding">


            {/* CONCEPTO */}

            <IonItem>

              <IonInput
                label="Concepto"
                labelPlacement="stacked"
                placeholder="Ej. Supermercado"
                value={concept}
                onIonInput={(event) =>
                  setConcept(
                    event.detail.value ?? ''
                  )
                }
              />

            </IonItem>



            {/* MONTO */}

            <IonItem>

              <IonInput
                label="Monto"
                labelPlacement="stacked"
                type="number"
                placeholder="0.00"
                value={amount}
                onIonInput={(event) =>
                  setAmount(
                    event.detail.value ?? ''
                  )
                }
              />

            </IonItem>



            {/* CATEGORÍA */}

            <IonItem>

              <IonSelect
                label="Categoría"
                labelPlacement="stacked"
                value={category}
                onIonChange={(event) =>
                  setCategory(
                    event.detail.value
                  )
                }
              >


                <IonSelectOption value="Comida">
                  Comida
                </IonSelectOption>


                <IonSelectOption value="Transporte">
                  Transporte
                </IonSelectOption>


                <IonSelectOption value="Entretenimiento">
                  Entretenimiento
                </IonSelectOption>


                <IonSelectOption value="Compras">
                  Compras
                </IonSelectOption>


                <IonSelectOption value="Estudios">
                  Estudios
                </IonSelectOption>


                <IonSelectOption value="Otros">
                  Otros
                </IonSelectOption>


              </IonSelect>

            </IonItem>



            {/* =================================
                BOTONES
                ================================= */}

            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '25px'
              }}
            >


              <IonButton
                expand="block"
                fill="outline"
                onClick={() =>
                  setShowModal(false)
                }
              >

                Cancelar

              </IonButton>



              <IonButton
                expand="block"
                onClick={addExpense}
              >

                Guardar gasto

              </IonButton>


            </div>


          </IonContent>


        </IonModal>


      </IonContent>


    </IonPage>

  );

};


export default Tab1;