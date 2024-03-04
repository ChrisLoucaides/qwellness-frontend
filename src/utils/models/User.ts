export interface User {
    id: number;
    username: string;
    role: 'STUDENT' | 'ADVISOR' | 'MENTAL_HEALTH_FIRST_AIDER' | 'ADMIN';


    // Specific to Student
    advisor?: number;
    last_login_time?: Date;
    advisor_meeting_ids?: number[];
    task_ids?: number[];


    // Specific to Advisor
    advisee_meeting_ids?: number[];
    advisee_students?: number[];


    // Specific to Mental Health First Aider
    student_ids?: number[];
}
