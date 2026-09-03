import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Sessao {
  id: string | number;
  cinema?: string;
  horario?: string;
  sala?: string;
}

export default function SessoesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarSessoes = async () => {
      try {
        const resposta = await fetch(`http://192.168.15.81:3000/api/sessoes?filmeId=${id}`);
        const dados = await resposta.json();
        setSessoes(dados);
      } catch (error) {
        console.error('Erro ao buscar sessões:', error);
      } finally {
        setCarregando(false);
      }
    };
    if (id) buscarSessoes();
  }, [id]);

  const renderItem = ({ item }: { item: Sessao }) => (
    <View style={styles.cardSessao}>
      <Text style={styles.nomeCinema}>{item.cinema || 'Cinema Padrão'}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.horario}>{item.horario || 'Horário a definir'}</Text>
        <Text style={styles.sala}>{item.sala || 'Sala Standard'}</Text>
      </View>
      <TouchableOpacity 
        style={styles.botaoComprar}
        onPress={() => alert('Fluxo de checkout finalizado para o MVP!')}
      >
        <Text style={styles.textoBotaoComprar}>Selecionar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoIcone}>
          <Ionicons name="arrow-back" size={24} color="#E50914" />
          <Text style={styles.botaoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Sessões Disponíveis</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#E50914" style={{ marginTop: 50 }} />
      ) : !Array.isArray(sessoes) || sessoes.length === 0 ? (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.textoPadrao}>Nenhuma sessão encontrada para este filme.</Text>
          <Text style={{ color: '#555', fontSize: 14, marginTop: 8 }}>
            (Verifique se a tabela de sessões já foi populada no banco de dados)
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessoes}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 20 },
  header: { flexDirection: 'row', marginTop: 50, marginBottom: 20 },
  botaoIcone: { flexDirection: 'row', alignItems: 'center' },
  botaoVoltar: { color: '#E50914', fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20 },
  cardSessao: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 8, marginBottom: 16 },
  nomeCinema: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  infoContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  horario: { fontSize: 16, color: '#FFD700', fontWeight: 'bold' },
  sala: { fontSize: 16, color: '#AAAAAA' },
  botaoComprar: { backgroundColor: '#E50914', paddingVertical: 12, borderRadius: 6, alignItems: 'center' },
  textoBotaoComprar: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  textoPadrao: { color: '#CCC', fontSize: 16, marginTop: 20 }
});