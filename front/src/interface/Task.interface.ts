export interface Task{
    id: number;
    nome: string;
    concluida: boolean;
    elementoPai: number;
    createdAt: Date;
    descriptionId?: number;
    updatedAt?: Date;
}