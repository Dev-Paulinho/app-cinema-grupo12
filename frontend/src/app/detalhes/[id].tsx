import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 

interface DetalhesFilme {
  id: string;
  titulo: string;
  sinopse: string;
  avaliacao?: string | number;
  nacional?: boolean;
}

export default function DetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); 
  const router = useRouter(); 
  
  const [filme, setFilme] = useState<DetalhesFilme | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvoOffline, setSalvoOffline] = useState(false);

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        const resposta = await fetch(`http://192.168.15.81:3000/api/filmes/${id}`);
        const dados = await resposta.json();
        setFilme(dados);
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
      } finally {
        setCarregando(false);
      }
    };

    const verificarSeEstaSalvo = async () => {
      try {
        const filmesSalvos = await AsyncStorage.getItem('@filmes_offline');
        if (filmesSalvos) {
          const lista = JSON.parse(filmesSalvos);
          const jaSalvo = lista.some((item: DetalhesFilme) => String(item.id) === String(id));
          setSalvoOffline(jaSalvo);
        }
      } catch (error) {
        console.error('Erro ao ler AsyncStorage:', error);
      }
    };

    if (id) {
      buscarDetalhes();
      verificarSeEstaSalvo();
    }
  }, [id]);

  const alternarSalvarOffline = async () => {
    if (!filme) return;
    try {
      const filmesSalvos = await AsyncStorage.getItem('@filmes_offline');
      let lista = filmesSalvos ? JSON.parse(filmesSalvos) : [];

      if (salvoOffline) {
        lista = lista.filter((item: DetalhesFilme) => String(item.id) !== String(filme.id));
        setSalvoOffline(false);
      } else {
        lista.push(filme);
        setSalvoOffline(true);
      }
      
      await AsyncStorage.setItem('@filmes_offline', JSON.stringify(lista));
    } catch (error) {
      console.error('Erro ao salvar no AsyncStorage:', error);
    }
  };

  if (carregando) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (!filme) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.textoPadrao}>Filme não encontrado.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={styles.botaoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const avaliacao = filme.avaliacao ? Number(filme.avaliacao) : 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoIcone}>
          <Ionicons name="arrow-back" size={24} color="#E50914" />
          <Text style={styles.botaoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>{filme.titulo}</Text>
      
      <View style={styles.metaContainer}>
        <View style={styles.avaliacaoContainer}>
          <Ionicons name="star" size={18} color="#FFD700" />
          <Text style={styles.textoAvaliacao}>{avaliacao.toFixed(1)}</Text>
        </View>
        {filme.nacional && <Text style={styles.textoMeta}>•  Filme Nacional</Text>}
      </View>

      {/* Botões de Ação */}
      <View style={styles.acoesContainer}>
        <TouchableOpacity 
          style={styles.botaoPrimario}
          onPress={() => router.push(`/sessoes/${id}` as any)}
        >
          <Ionicons name="ticket" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.textoBotaoPrimario}>Comprar Ingresso</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoSecundario} 
          onPress={alternarSalvarOffline}
        >
          <Ionicons 
            name={salvoOffline ? "cloud-done" : "cloud-download-outline"} 
            size={24} 
            color={salvoOffline ? "#008000" : "#FFF"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Sinopse</Text>
        <Text style={styles.cardTexto}>{filme.sinopse}</Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Estilos limpos, apenas com o que a nova interface usa
const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 20,
  },
  botaoIcone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoVoltar: {
    color: '#E50914',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avaliacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  textoAvaliacao: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  textoMeta: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  acoesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  botaoPrimario: {
    flex: 1,
    backgroundColor: '#E50914',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  textoBotaoPrimario: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E50914',
    marginBottom: 12,
  },
  cardTexto: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  textoPadrao: {
    color: '#CCC',
    fontSize: 16,
  }
});