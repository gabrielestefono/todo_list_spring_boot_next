import { Task } from "./Task.interface";

export interface TaskChild{
    taskAtual: Task;
    tasksFilhas: Task[];
}