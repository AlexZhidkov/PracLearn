import { BaseEntity } from './base-entity';

export interface EoiBusiness extends BaseEntity {
    businessId: string;
    projectGroupId: string;
    isNew: boolean;
    title: string;
    description: string;
    skills: string;
    clearance: string;
    name: string;
    website: string;
    primaryContact: string;
    address: string;
    about: string;
    dates: string;
    supervisor: string;
    supervisorRole: string;
    supervisorExperience: string;
    supervisorPhone: string;
    supervisorEmail: string;
}
