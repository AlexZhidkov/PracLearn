import { BaseEntity } from './base-entity';

export interface EoiStudent extends BaseEntity {
    student: {
        id: string;
        name: string;
        email: string;
    };
    projectId: string;
    businessId: string;
    isNew: boolean;
    studyArea: string;
    why: string;
    commitment: string;
    resumeUrl: string;
    transcriptUrl: string;
    submittedOn?: Date;
}
