import { Stack } from 'expo-router';

export default function Layout() {
  return (
    // O Stack gerencia as telas como uma pilha de cartas.
    // headerShown: false tira aquela barra superior padrão do celular para manter o design escuro do cinema.
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="detalhes/[id]" />
    </Stack>
  );
}