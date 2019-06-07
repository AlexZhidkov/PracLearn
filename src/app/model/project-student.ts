import { BaseEntity } from './base-entity';

export interface ProjectStudent extends BaseEntity {
    userId: string;
    studentId: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    courseName: string;
    majorDisciplineArea: string;
    why: string;
    commitment: string;
    resumeUrl: string;
    transcriptUrl: string;
}
