export interface preguntas {
  id: number;
  tipo_pregunta: string;
  title: string;
  answers: [{
            id: number;
            result :string;
            isCorrect: boolean;
          }]
}
