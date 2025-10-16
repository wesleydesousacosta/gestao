import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import ParticipanteItem from "../components/ParticipanteItem";
import { Turma, Participante } from "../types";
import { salvarDados, carregarDados } from "../storage/storage";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

type TurmaScreenRouteProp = RouteProp<RootStackParamList, "Participantes">;

interface Props {
  route: TurmaScreenRouteProp;
}

export default function TurmaScreen({ route }: Props) {
  const { turma, setTurmas } = route.params;
  const [participantes, setParticipantes] = useState<Participante[]>(turma.participantes || []);
  const [novoNome, setNovoNome] = useState("");

  useEffect(() => {
    carregarDados<Turma[]>("turmas").then((dados) => {
      if (dados) {
        const turmaAtual = dados.find((t) => t.id === turma.id);
        if (turmaAtual) setParticipantes(turmaAtual.participantes);
      }
    });
  }, []);

  useEffect(() => {
    salvarDados("turmas", (prev: Turma[]) =>
      prev.map((t) => (t.id === turma.id ? { ...t, participantes } : t))
    );
  }, [participantes]);

  function adicionarParticipante() {
    if (novoNome.trim() === "") return;
    setParticipantes([...participantes, { id: Date.now().toString(), nome: novoNome }]);
    setNovoNome("");
  }

  function removerParticipante(id: string) {
    setParticipantes(participantes.filter((p) => p.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turma: {turma.nome}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do participante"
        value={novoNome}
        onChangeText={setNovoNome}
      />
      <Button title="Adicionar Participante" onPress={adicionarParticipante} />

      <FlatList
        data={participantes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ParticipanteItem participante={item} onRemover={() => removerParticipante(item.id)} />
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
