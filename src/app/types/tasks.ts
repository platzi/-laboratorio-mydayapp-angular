export interface Task {
    id: string;
    title: string;
    completed: boolean;
  }
  
  export enum tasksStatusEnum {
    COMPLETED = 'completed',
    PENDING = 'pending',
  }
  