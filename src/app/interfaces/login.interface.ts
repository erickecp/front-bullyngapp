export interface login {
  email: string;
  passwoword: string;
}

export interface encuesta {
  description?: string;
  id?: string;
  isActive?: boolean;
  preguntas?: pregunta[]
  title?: string;
  videos?: video[]
}

export interface pregunta {
  answers: any,
  id: number,
  tipo_pregunta: string,
  title_1: string,
  title_2: string,
}

export interface video {
description: string,
id: number,
ruta: string,
title: string,
}


export interface Qust {
  category?: string;
  id?: string;
  isActive?: boolean;
  answers?: string[] | any[]
  question?: string ;
  question_2?: string ;
  survey_id?: string;
  url?: string;
}
