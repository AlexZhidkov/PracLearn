import { BaseEntity } from './base-entity';
import { EoiBusiness } from './eoi-business';
import { SelfSourcedArrangement } from './self-sourced-arrangement';

export interface UniversityTodo extends BaseEntity {
    title: string;
    created: number;
    eoiBusiness?: EoiBusiness;
    selfSourced?: SelfSourcedArrangement;
    survey?: any;
}
