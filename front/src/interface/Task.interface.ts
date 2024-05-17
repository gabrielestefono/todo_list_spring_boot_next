import { Description } from "./Description";

export interface Task{
    id: number;
    nome: string;
    concluida: boolean;
    elementoPai: number;
    temFilhos: boolean;
    filhosFeitos: boolean;
    description: Description
    createdAt: Date;
    updatedAt?: Date;
}