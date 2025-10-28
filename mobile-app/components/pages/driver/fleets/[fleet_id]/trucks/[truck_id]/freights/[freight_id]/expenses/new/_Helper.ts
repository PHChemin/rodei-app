import { ExpenseTypes } from "@/services/enums/ExpenseTypesEnum";

import { SelectInputItem } from "@/components/ui/select-input/_SelectModal";

export const expenseTypesOptions: SelectInputItem[] = [
  { label: "Combustível", value: ExpenseTypes.gas },
  { label: "Manutenção", value: ExpenseTypes.maintenance },
  { label: "Pedágio", value: ExpenseTypes.toll },
  { label: "Alimentação", value: ExpenseTypes.food },
  { label: "Multa de Trânsito", value: ExpenseTypes.fine },
  { label: "Outro", value: ExpenseTypes.other },
];
