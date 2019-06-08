import { Person } from './person';

export interface Supervisor extends Person {
    role: string;
    experience: string;
}
