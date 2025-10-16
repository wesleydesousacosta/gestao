export interface Participante {
  id: string;
  nome: string;
}

export interface Turma {
  id: string;
  nome: string;
  participantes: Participante[];
}
