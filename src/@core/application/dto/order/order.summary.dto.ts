interface PaymentDTO {
  id: string;
  value: number;
  payment_date: Date;
  payment_status: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  account_id: string;
  subtotal: number;
  total: number;
  total_open: number;
  balance: number;
}

interface PaymentSummary {
  payments: PaymentDTO[];
  total_pay: number;
  total_open: number;
  bank_account_balance: number;
}

export { PaymentSummary, PaymentDTO }