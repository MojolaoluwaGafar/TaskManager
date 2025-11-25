// export interface Task  {
//   id: string;
//   title: string;
//   completed: boolean;
//   created_at?: string;
// }


export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  priority?: "low" | "normal" | "high";
  due_date?: string;
  created_at?: string;
}
