import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import TurmaScreen from "./src/screens/TurmaScreen";
import { Turma } from "./src/types";

export type RootStackParamList = {
  Turmas: undefined;
  Participantes: { turma: Turma; setTurmas: React.Dispatch<React.SetStateAction<Turma[]>> };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Turmas" component={HomeScreen} />
        <Stack.Screen name="Participantes" component={TurmaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
