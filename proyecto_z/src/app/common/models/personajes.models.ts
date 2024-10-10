export interface PersonajeI {
    id: string;
    nombre: string;
    ki: string; // Cambia a string ya que en el JSON aparece como texto
    maxKi: string; // Cambia a string ya que en el JSON aparece como texto
    raza: string;
    sexo: string;
    descripcion: string;
    imagen: string;
    faccion: string;
    isEditing?: boolean;
    deletedAt?: null; // Asegúrate de que el nombre esté correcto
    originPlanet?: {
      id: number;
      name: string;
      isDestroyed: boolean;
      description: string;
      image: string;
      deletedAt: null;
      
    };
    transformations?: {
      id: number;
      name: string;
      image: string;
      ki: string; // Cambia a string para las transformaciones
      deletedAt: null;
    }[];
  }