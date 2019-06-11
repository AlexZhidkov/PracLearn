import { BaseEntity } from './base-entity';
import { EoiBusiness } from './eoi-business';
import { UserShort } from './user-short';
import { EoiStudent } from './eoi-student';
import { Project } from './project';

export interface UniversityTodo extends BaseEntity {
    title: string;
    created: number;
    student?: UserShort;
    eoiBusiness?: EoiBusiness;
    eoiStudent?: EoiStudent;
    project?: Project;
    survey?: any;
}
