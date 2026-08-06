'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Auth } from '@/components/Auth';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { RevenueChart } from '@/components/RevenueChart';
import { OccupancyChart } from '@/components/OccupancyChart';
import { PropertiesTable } from '@/components/PropertiesTable';
import { ReservationsTable } from '@/components/ReservationsTable';
import { AddPropertyForm } from '@/components/AddPropertyForm';
import {
  properties as mockProperties,
  reservations as mockReservations,
  monthlyData,
  getPropertyStats,
  Property,
  Reservation,
} from '@/data/mockData';
import {
  Home,
  TrendingUp,
  Users,
  DollarSign,
  Plus,
} from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        await loadProperties(user.id);
      }
      
      setLoading(false);
    };

    checkUser();
  }, []);

  const loadProperties = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedProperties: Property[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          location: p.location,
          type: p.type,
          price: p.price,
          occupancyRate: p.occupancy_rate || 0,
          revenue: 0,
          reservations: 0,
        }));
        setProperties(formattedProperties);
      }
    } catch (err) {
      console.error('Erro ao carregar imóveis:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onSuccess={() => window.location.reload()} />;
  }

  const stats = getPropertyStats();
  const displayProperties = properties.length > 0 ? properties : mockProperties;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showLogout={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seção de boas-vindas */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard de Proprietários
            </h2>
            <p className="text-gray-600">
              Bem-vindo, {user.email}! Acompanhe o desempenho dos seus imóveis
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Adicionar Imóvel
          </button>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Imóveis"
            value={displayProperties.length}
            icon={Home}
            change={`${displayProperties.length} propriedade(s)`}
            changeType="positive"
          />
          <StatCard
            title="Receita Total"
            value={`R$ ${displayProperties.reduce((sum, p) => sum + p.revenue, 0).toLocaleString('pt-BR')}`}
            icon={DollarSign}
            change="Este mês"
            changeType="positive"
          />
          <StatCard
            title="Taxa de Ocupação Média"
            value={`${Math.round(displayProperties.reduce((sum, p) => sum + p.occupancyRate, 0) / (displayProperties.length || 1))}%`}
            icon={TrendingUp}
            change="Em média"
            changeType="positive"
          />
          <StatCard
            title="Total de Reservas"
            value={displayProperties.reduce((sum, p) => sum + p.reservations, 0)}
            icon={Users}
            change="Reservações ativas"
            changeType="positive"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart data={monthlyData} />
          <OccupancyChart data={monthlyData} />
        </div>

        {/* Tabelas */}
        <div className="space-y-8">
          <PropertiesTable properties={displayProperties} />
          <ReservationsTable reservations={reservations} />
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © 2024 Marcus Michelin. Todos os direitos reservados.
          </p>
        </div>
      </main>

      {/* Modal de Adicionar Imóvel */}
      {showAddForm && (
        <AddPropertyForm
          onSuccess={() => {
            if (user) loadProperties(user.id);
          }}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}