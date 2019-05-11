import { BaseEntity } from './base-entity';

export interface SelfSourcedArrangement extends BaseEntity {
    userId: string;
    universityName: string;
    universityAddress: string;
    universityAbn: string;
    placementOfficer: string;
    placementOfficerPhone: string;
    placementOfficerEmail: string;
    hostName: string;
    hostAddress: string;
    hostAbn: string;
    supervisorName: string;
    supervisorTitle: string;
    supervisorPhone: string;
    studentName: string;
    studentTitle: string;
    studentId: string;
    studentPhone: string;
    studentEmail: string;
    courseName: string;
    majorDisciplineArea: string;
    startDate: string;
    endDate: string;
    location: string;
    projectName: string;
    projectBackground: string;
    skillsAndExperience: string;
    studentLevel: string;
    placementDetails: string;
    deliverables: string;
    learningOutcomes: string;
}
