import React from 'react';
import { Reservation, properties } from '@/data/mockData';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ReservationsTableProps {
  reservations: Reservation[];
}

const getPropertyName = (propertyId: string) => {
  return properties.find((p) => p.id === propertyId)?.name || 'Desconhecido';
};

const getStatusBadge = (status: string) => {
  const badges = {
    completed: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      icon: CheckCircle,
    },
    confirmed: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: Clock,
    },
    pending: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
      icon: AlertCircle,
    },
  };

  const badge = badges[status as keyof typeof badges] || badges.pending;
  const Icon = badge.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${badge.bg} border ${badge.border}`}>
      <Icon size={16} className={badge.text} />
      <span className={`text-sm font-medium ${badge.text}`}>
        {status === 'completed' && 'Finalizada'}
        {status === 'confirmed' && 'Confirmada'}
        {status === 'pending' && 'Pendente'}
      </span>
    </div>
  );
};

export const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Reservas Recentes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Hóspede
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Imóvel
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Check-in
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Check-out
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Dias
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {reservation.guestName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {getPropertyName(reservation.propertyId)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(reservation.checkIn).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(reservation.checkOut).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {reservation.totalDays}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  R$ {reservation.amount.toLocaleString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-sm">
                  {getStatusBadge(reservation.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};