import { BaseEntity } from './base-entity';
import { ProjectOriginType } from './projectOriginType';

export interface Project extends BaseEntity {
    title: string;
    subtitle: string;
    description: string;
    originType: ProjectOriginType;
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
    student: {
        userId: string;
        studentId: string;
        name: string;
        title: string;
        phone: string;
        email: string;
        courseName: string;
        majorDisciplineArea: string;
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
