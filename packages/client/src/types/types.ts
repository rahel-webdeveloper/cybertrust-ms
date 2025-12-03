export type UserProfile = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatarUrl: string;
};

export interface UserData {
  _id: string;
  department: string;
  position: string;
  salary: number;
  hireDate: Date;
  name: string;
  email: string;
  role: string;
  status: string;
  country: string;
  avatarUrl: string;
}
