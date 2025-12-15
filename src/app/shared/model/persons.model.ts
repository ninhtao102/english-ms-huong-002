export interface PersonsDto {
    id?: number;
    type?: number;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    birthDate?: string;
    gender?: string;
    phoneNumber?: string;
    email?: string;
    enrollmentDate?: string;
    hireDate?: string;
    classId?: number;
    className?: string;
    createdDate?: string;
}

export interface PersonsSearch {
    type?: number;
    keyword?: string;
    classId?: number;
    pageIndex?: number;
    pageSize?: number;
}

export const LIST_PERSON_TYPES = [
    { value: 0, label: 'persons.type.admin' },
    { value: 1, label: 'persons.type.teacher' },
    { value: 2, label: 'persons.type.student' },
    { value: 3, label: 'persons.type.client' },
];

export const LIST_PERSON_GENDER = [
    { value: 'MALE', label: 'persons.type.male' },
    { value: 'FEMALE', label: 'persons.type.female' },
    { value: 'UNKNOWN', label: 'persons.type.unknown' },
];
