import { BaseEntity } from './base-entity';
import { ProjectStudent } from './project-student';

export interface EoiStudent extends BaseEntity {
    student: ProjectStudent;
    projectId: string;
    businessId: string;
    submittedOn?: Date;
}
