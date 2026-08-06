export interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  price: number;
  occupancyRate: number;
  revenue: number;
  reservations: number;
}

export interface Reservation {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  totalDays: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface MonthlyData {
  month: string;
  revenue: number;
  occupancy: number;
  reservations: number;
}

export const properties: Property[] = [
  {
    id: '1',
    name: 'Apartamento Vista Mar',
    location: 'Florianópolis - SC',
    type: 'Apartamento',
    price: 250,
    occupancyRate: 78,
    revenue: 18500,
    reservations: 12,
  },
  {
    id: '2',
    name: 'Casa com Piscina',
    location: 'Bombinhas - SC',
    type: 'Casa',
    price: 350,
    occupancyRate: 85,
    revenue: 22400,
    reservations: 15,
  },
  {
    id: '3',
    name: 'Chalé na Montanha',
    location: 'Gramado - RS',
    type: 'Chalé',
    price: 280,
    occupancyRate: 72,
    revenue: 15680,
    reservations: 10,
  },
  {
    id: '4',
    name: 'Studio Aconchegante',
    location: 'Blumenau - SC',
    type: 'Studio',
    price: 150,
    occupancyRate: 92,
    revenue: 12420,
    reservations: 18,
  },
  {
    id: '5',
    name: 'Vila de Luxo',
    location: 'Porto de Galinhas - PE',
    type: 'Villa',
    price: 450,
    occupancyRate: 68,
    revenue: 19200,
    reservations: 8,
  },
];

export const reservations: Reservation[] = [
  {
    id: '101',
    propertyId: '1',
    guestName: 'João Silva',
    checkIn: '2024-01-15',
    checkOut: '2024-01-20',
    totalDays: 5,
    amount: 1250,
    status: 'completed',
  },
  {
    id: '102',
    propertyId: '2',
    guestName: 'Maria Santos',
    checkIn: '2024-01-18',
    checkOut: '2024-01-25',
    totalDays: 7,
    amount: 2450,
    status: 'confirmed',
  },
  {
    id: '103',
    propertyId: '1',
    guestName: 'Pedro Costa',
    checkIn: '2024-01-22',
    checkOut: '2024-01-29',
    totalDays: 7,
    amount: 1750,
    status: 'confirmed',
  },
  {
    id: '104',
    propertyId: '3',
    guestName: 'Ana Oliveira',
    checkIn: '2024-01-20',
    checkOut: '2024-01-23',
    totalDays: 3,
    amount: 840,
    status: 'pending',
  },
  {
    id: '105',
    propertyId: '4',
    guestName: 'Carlos Mendes',
    checkIn: '2024-01-16',
    checkOut: '2024-01-18',
    totalDays: 2,
    amount: 300,
    status: 'completed',
  },
];

export const monthlyData: MonthlyData[] = [
  { month: 'Jan', revenue: 68000, occupancy: 75, reservations: 42 },
  { month: 'Fev', revenue: 72500, occupancy: 78, reservations: 45 },
  { month: 'Mar', revenue: 81200, occupancy: 82, reservations: 51 },
  { month: 'Abr', revenue: 76800, occupancy: 79, reservations: 48 },
  { month: 'Mai', revenue: 88900, occupancy: 85, reservations: 55 },
  { month: 'Jun', revenue: 95200, occupancy: 88, reservations: 62 },
  { month: 'Jul', revenue: 102300, occupancy: 92, reservations: 68 },
  { month: 'Ago', revenue: 98700, occupancy: 89, reservations: 65 },
  { month: 'Set', revenue: 85400, occupancy: 81, reservations: 52 },
  { month: 'Out', revenue: 92100, occupancy: 86, reservations: 58 },
  { month: 'Nov', revenue: 87600, occupancy: 83, reservations: 54 },
  { month: 'Dez', revenue: 105800, occupancy: 95, reservations: 72 },
];

export const getPropertyStats = () => {
  const totalRevenue = properties.reduce((sum, p) => sum + p.revenue, 0);
  const avgOccupancy = Math.round(
    properties.reduce((sum, p) => sum + p.occupancyRate, 0) / properties.length
  );
  const totalReservations = properties.reduce((sum, p) => sum + p.reservations, 0);

  return {
    totalProperties: properties.length,
    totalRevenue,
    avgOccupancy,
    totalReservations,
  };
};