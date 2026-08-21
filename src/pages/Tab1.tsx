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
  walletOutline
} from 'ionicons/icons';

import './Tab1.css';

/*
 * Estructura que representa un gasto.
 * Cada gasto tiene concepto, categoría y monto.
 */
interface Expense {
  concept: string;
  category: string;
  amount: number;
}

const Tab1: React.FC = () => {

  /*
   * Lista de gastos.
   * useState permite modificar esta lista mientras
   * el usuario utiliza la aplicación.
   */
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

  /*
   * Controla si la ventana para agregar
   * un nuevo gasto está abierta.
   */
  const [showModal, setShowModal] = useState(false);

  /*
   * Variables del formulario.
   */
  const [concept, setConcept] = useState('');
  const [category, setCategory] = useState('Comida');
  const [amount, setAmount] = useState('');

  /*
   * Funcionalidades que todavía se desarrollarán.
   */
  const pendingIdeas = [
    'Agregar ingresos',
    'Guardar historial',
    'Configurar alertas'
  ];

  /*
   * Función encargada de registrar un gasto.
   */
  const addExpense = () => {

    // Convertimos el monto ingresado a número.
    const numericAmount = Number(amount);

    /*
     * Validación:
     * no permite guardar si el concepto está vacío
     * o si el monto es menor o igual a cero.
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
     * Agregamos el nuevo gasto al inicio
     * de la lista existente.
     */
    setExpenses([
      newExpense,
      ...expenses
    ]);

    /*
     * Limpiamos el formulario después
     * de guardar.
     */
    setConcept('');
    setCategory('Comida');
    setAmount('');

    /*
     * Cerramos la ventana.
     */
    setShowModal(false);
  };

  return (
    <IonPage>

      {/* ENCABEZADO */}

      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Control de gastos
          </IonTitle>
        </IonToolbar>
      </IonHeader>


      {/* CONTENIDO PRINCIPAL */}

      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Control de gastos
            </IonTitle>
          </IonToolbar>
        </IonHeader>


        <div className="expenses-shell">

          {/* TARJETA DEL PRESUPUESTO */}

          <IonCard className="hero-card">

            <IonCardContent>

              <div className="hero-header">

                <IonChip
                  color="warning"
                  className="status-chip"
                >
                  <IonIcon
                    icon={alertCircleOutline}
                  />

                  <IonLabel>
                    Avance parcial
                  </IonLabel>

                </IonChip>


                <IonBadge color="success">
                  Semana 1
                </IonBadge>

              </div>


              <h1>
                Tu presupuesto diario,
                en un solo lugar
              </h1>


              <p>
                Registra tus gastos y controla
                tu presupuesto desde una sola
                aplicación.
              </p>


              {/* DINERO DISPONIBLE */}

              <div className="budget-box">

                <div>

                  <IonText color="medium">
                    Disponible hoy
                  </IonText>

                  <strong>
                    $1,240
                  </strong>

                </div>


                <IonIcon
                  icon={walletOutline}
                />

              </div>


              {/* META SEMANAL */}

              <div className="budget-meta">

                <span>
                  Meta semanal
                </span>

                <strong>
                  $3,000
                </strong>

              </div>


              <IonProgressBar
                value={0.58}
              />

            </IonCardContent>

          </IonCard>


          {/* TÍTULO DE GASTOS */}

          <div className="section-title">

            <h2>
              Gastos recientes
            </h2>


            {/* BOTÓN PARA ABRIR EL FORMULARIO */}

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


          {/* LISTA DE GASTOS */}

          <IonCard className="list-card">

            <IonCardContent>

              {expenses.map((expense, index) => (

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

              ))}

            </IonCardContent>

          </IonCard>


          {/* PRÓXIMAS FUNCIONALIDADES */}

          <IonCard className="pending-card">

            <IonCardContent>

              <h2>
                Próximas funcionalidades
              </h2>


              <div className="pending-list">

                {pendingIdeas.map((idea) => (

                  <IonChip
                    key={idea}
                    outline
                  >

                    <IonLabel>
                      {idea}
                    </IonLabel>

                  </IonChip>

                ))}

              </div>

            </IonCardContent>

          </IonCard>

        </div>


        {/* ================================= */}
        {/* MODAL PARA REGISTRAR NUEVO GASTO */}
        {/* ================================= */}

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        >

          {/* ENCABEZADO DEL FORMULARIO */}

          <IonHeader>

            <IonToolbar>

              <IonTitle>
                Nuevo gasto
              </IonTitle>

            </IonToolbar>

          </IonHeader>


          {/* FORMULARIO */}

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

                <IonSelectOption
                  value="Comida"
                >
                  Comida
                </IonSelectOption>


                <IonSelectOption
                  value="Transporte"
                >
                  Transporte
                </IonSelectOption>


                <IonSelectOption
                  value="Entretenimiento"
                >
                  Entretenimiento
                </IonSelectOption>


                <IonSelectOption
                  value="Compras"
                >
                  Compras
                </IonSelectOption>


                <IonSelectOption
                  value="Estudios"
                >
                  Estudios
                </IonSelectOption>


                <IonSelectOption
                  value="Otros"
                >
                  Otros
                </IonSelectOption>

              </IonSelect>

            </IonItem>


            {/* BOTONES */}

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