import { BaseEntity } from './base-entity';

export interface Project extends BaseEntity {
    title: string;
    description: string;
}
