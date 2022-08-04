import { Employee } from "../../employee/model/employee";

export interface Activity {
  id: number;
  description: string;
  status: string;
  employee: Employee;
  employeeId: number;
  executionDate: Date;
  completedDate: Date;
  days: number;
}
