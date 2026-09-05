import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Filme {
  id: number;
  titulo: string;
  nacional: boolean;
  avaliacao: number;
}

export default function HomeScreen() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [nacional, setNacional] = useState(false);
  
  // Usaremos o roteador clássico sem o Link
  const router = useRouter();

  const handleChange = () => {
    setNacional(!nacional);
    setCarregando(true);
  }

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/api/filmes?nacional=' + nacional);
        const dados = await resposta.json();
        setFilmes(dados); 
      } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
      } finally {
        setCarregando(false); 
      }
    };
    buscarFilmes();
  }, [nacional]);

  const renderItem = ({ item }: { item: Filme }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => {
        console.log('Botão clicado! Indo para o filme ID:', item.id);
        router.push(`/detalhes/${item.id}` as any);
      }}
    >
      <Text style={styles.titulo}>{item.titulo}</Text>
      <View style={styles.tagsContainer}>
        {item.nacional && <Text style={styles.tagNacional}>Nacional</Text>}
        {/* A trava garante que, se não houver avaliação, exibe 0.0 */}
        <Text style={styles.tagAvaliacao}>
          ⭐ {item.avaliacao ? Number(item.avaliacao).toFixed(1) : '0.0'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Em Cartaz
        </Text>

        <TouchableOpacity
          style={[
            styles.filtroNacional,
            nacional && styles.filtroNacionalAtivo
          ]}
          activeOpacity={0.7}
          onPress={handleChange}
        >
          <Text style={styles.filtroNacionalTexto}>
            Nacional
          </Text>
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#E50914" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filmes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
   headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  filtroNacional: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: '#333333',
  },
  filtroNacionalAtivo: {
    backgroundColor: '#008000',
  },
  filtroNacionalTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagNacional: {
    backgroundColor: '#008000',
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 12,
  },
  tagAvaliacao: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});