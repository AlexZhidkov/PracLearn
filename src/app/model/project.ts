import { ProjectOriginType } from './projectOriginType';
import { BaseEntity } from './base-entity';
import { ProjectStudent } from './project-student';
import { Person } from './person';

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
    placementOfficer: Person;
    business: {
        userId: string;
        name: string;
        address: string;
        abn: string;
    };
    supervisor: Person;
    startDate: Date;
    endDate: Date;
    location: string;
    skillsAndExperience: string;
    studentLevel: string;
    placementDetails: string;
    deliverables: string;
    learningOutcomes: string;
}
