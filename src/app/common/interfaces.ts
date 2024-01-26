export interface Interfaces {
}
export interface Section{
  section: string;
  icon: string;
}
export interface Componentes{
  nombre: string;
  ruta: string;
  icono: string;
}

export interface ApiResult{
  results: Noticia[];
}

export interface Noticia {
  section: Section;
  _id: string;
  images: string[];
  title: string;
  subtitle: string;
  author: string;
  date: string;
  content: string;
}


