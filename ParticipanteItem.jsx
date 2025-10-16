import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Participante } from "../types";

interface Props {
  participante: Participante;
  onRemover: () => void;
}

export default function ParticipanteItem({ participante, onRemover }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{participante.nome}</Text>
      <Button title="Remover" color="red" onPress={onRemover} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eaeaea",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nome: { fontSize: 16 },
});
