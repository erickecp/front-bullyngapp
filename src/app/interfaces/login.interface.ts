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
  title: string,
}

export interface video {
description: string,
id: number,
ruta: string,
title: string,
}
