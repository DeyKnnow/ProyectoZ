export interface UsuarioI {
    nombre: string;
    apellido: string;
    password: string;
    email: string;
    raza: string;
    role: string;
    isEditing?: boolean;
}