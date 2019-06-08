import { BaseEntity } from './base-entity';
import { ProjectStudent } from './project-student';
import { ProjectOriginType } from './projectOriginType';

export interface EoiStudent extends BaseEntity {
    university: string;
    originType: ProjectOriginType;
    student: ProjectStudent;
    business: {
        userId: string;
        name: string;
    };
    supervisor: {
        name: string;
        email: string;
    };
    projectId: string;
    submittedOn?: Date;
}
