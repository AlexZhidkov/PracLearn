import { ProjectOriginType } from './projectOriginType';
import { BaseEntity } from './base-entity';
import { ProjectStudent } from './project-student';

export interface Project extends BaseEntity {
    title: string;
    subtitle: string;
    description: string;
    originType: ProjectOriginType;
    student: ProjectStudent;
    university: {
        name: string;
        address: string;
        abn: string;
    };
    placementOfficer: {
        name: string;
        phone: string;
        email: string;
    };
    business: {
        userId: string;
        name: string;
        address: string;
        abn: string;
    };
    supervisor: {
        name: string;
        title: string;
        phone: string;
        email: string;
    };

    startDate: Date;
    endDate: Date;
    location: string;
    skillsAndExperience: string;
    studentLevel: string;
    placementDetails: string;
    deliverables: string;
    learningOutcomes: string;
}
