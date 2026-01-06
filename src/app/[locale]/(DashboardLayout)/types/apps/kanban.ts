
export interface TodoTask {
    id: number |any;
    task: string;
    taskImage: string | null | any; 
    taskText: string;
    date: string;
    taskProperty: string;
    category?: string | any;
  }
  
  export interface TodoCategory {
    id: string | any;
    name: string;
    child: TodoTask[];
  }
  
  
