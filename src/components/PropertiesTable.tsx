import React from 'react';
import { Property } from '@/data/mockData';

interface PropertiesTableProps {
  properties: Property[];
}

export const PropertiesTable: React.FC<PropertiesTableProps> = ({ properties }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Seus Imóveis</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Local
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Diária
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Ocupação
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Receita
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Reservas
              </th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr
                key={property.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {property.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {property.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {property.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  R$ {property.price}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${property.occupancyRate}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {property.occupancyRate}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  R$ {property.revenue.toLocaleString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {property.reservations}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};