export type Expense = { concept: string; category: string; amount: number; date: string };

export const getExpenses = (): Expense[] => {
  const saved = localStorage.getItem('expenses');
  return saved ? JSON.parse(saved) : [
    { concept: 'Almuerzo', category: 'Comida', amount: 45, date: 'Hoy' },
    { concept: 'Autobús', category: 'Transporte', amount: 18, date: 'Hoy' },
    { concept: 'Café', category: 'Antojo', amount: 32, date: 'Ayer' }
  ];
};
