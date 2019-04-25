import { BaseEntity } from './base-entity';
import { EoiBusiness } from './eoi-business';

export interface UniversityTodo extends BaseEntity {
    title: string;
    eoiBusiness: EoiBusiness;
}
