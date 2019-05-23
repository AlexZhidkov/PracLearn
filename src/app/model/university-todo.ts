import { BaseEntity } from './base-entity';
import { EoiBusiness } from './eoi-business';
import { SelfSourcedArrangement } from './self-sourced-arrangement';
import { UserShort } from './user-short';

export interface UniversityTodo extends BaseEntity {
    title: string;
    created: number;
    student?: UserShort;
    eoiBusiness?: EoiBusiness;
    selfSourced?: SelfSourcedArrangement;
    survey?: any;
}
