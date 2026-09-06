export type OrderType = {
  name: string;
  last_name: string;
  phone: string;
  country: string;
  zip: string;
  product: string;
  address: string;
  comment: string;
};

export type OrderResponseType = {
  success: number;
  message?: string;
};
