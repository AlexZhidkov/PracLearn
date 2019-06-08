import { BaseEntity } from './base-entity';
import { Supervisor } from './supervisor';

export interface EoiBusiness extends BaseEntity {
    businessId: string;
    projectGroupId: string;
    title: string;
    description: string;
    skills: string;
    clearance: string;
    name: string;
    abn: string;
    website: string;
    primaryContact: string;
    address: string;
    about: string;
    dates: string;
    supervisor: Supervisor;
    submittedOn?: Date;
}
