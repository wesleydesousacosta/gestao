import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import TurmaItem from "../components/TurmaItem";
import { Turma } from "../types";
import { salvarDados, carregarDados } from "../storage/storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Turmas">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [novaTurma, setNovaTurma] = useState("");

  useEffect(() => {
    carregarDados<Turma[]>("turmas").then((dados) => {
      if (dados) setTurmas(dados);
    });
  }, []);

  useEffect(() => {
    salvarDados("turmas", turmas);
  }, [turmas]);

  function adicionarTurma() {
    if (novaTurma.trim() === "") return;
    setTurmas([...turmas, { id: Date.now().toString(), nome: novaTurma, participantes: [] }]);
    setNovaTurma("");
  }

  function removerTurma(id: string) {
    setTurmas(turmas.filter((turma) => turma.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Turmas</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da nova turma"
        value={novaTurma}
        onChangeText={setNovaTurma}
      />
      <Button title="Adicionar Turma" onPress={adicionarTurma} />

      <FlatList
        data={turmas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TurmaItem
            turma={item}
            onPress={() => navigation.navigate("Participantes", { turma: item, setTurmas })}
            onRemover={() => removerTurma(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10, borderRadius: 6 },
});
