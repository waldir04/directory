export interface Contact {
  documentExpedition: string;
  documentNumber: string;
  documentType: 'cedula' | 'pasaporte';
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
