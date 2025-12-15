## Database structure
-- we don't know how to generate root <with-no-name> (class Root) :(

grant select on performance_schema.* to 'mysql.session'@localhost;

grant trigger on sys.* to 'mysql.sys'@localhost;

grant audit_abort_exempt, firewall_exempt, select, system_user on *.* to 'mysql.infoschema'@localhost;

grant audit_abort_exempt, authentication_policy_admin, backup_admin, clone_admin, connection_admin, firewall_exempt, persist_ro_variables_admin, session_variables_admin, shutdown, super, system_user, system_variables_admin on *.* to 'mysql.session'@localhost;

grant audit_abort_exempt, firewall_exempt, system_user on *.* to 'mysql.sys'@localhost;

grant alter, alter routine, application_password_admin, audit_abort_exempt, audit_admin, authentication_policy_admin, backup_admin, binlog_admin, binlog_encryption_admin, clone_admin, connection_admin, create, create role, create routine, create tablespace, create temporary tables, create user, create view, delete, drop, drop role, encryption_key_admin, event, execute, file, firewall_exempt, flush_optimizer_costs, flush_status, flush_tables, flush_user_resources, group_replication_admin, group_replication_stream, index, innodb_redo_log_archive, innodb_redo_log_enable, insert, lock tables, passwordless_user_admin, persist_ro_variables_admin, process, references, reload, replication client, replication slave, replication_applier, replication_slave_admin, resource_group_admin, resource_group_user, role_admin, select, sensitive_variables_observer, service_connection_admin, session_variables_admin, set_user_id, show databases, show view, show_routine, shutdown, super, system_user, system_variables_admin, table_encryption_admin, telemetry_log_admin, trigger, update, xa_recover_admin, grant option on *.* to root;

grant alter, alter routine, application_password_admin, audit_abort_exempt, audit_admin, authentication_policy_admin, backup_admin, binlog_admin, binlog_encryption_admin, clone_admin, connection_admin, create, create role, create routine, create tablespace, create temporary tables, create user, create view, delete, drop, drop role, encryption_key_admin, event, execute, file, firewall_exempt, flush_optimizer_costs, flush_status, flush_tables, flush_user_resources, group_replication_admin, group_replication_stream, index, innodb_redo_log_archive, innodb_redo_log_enable, insert, lock tables, passwordless_user_admin, persist_ro_variables_admin, process, references, reload, replication client, replication slave, replication_applier, replication_slave_admin, resource_group_admin, resource_group_user, role_admin, select, sensitive_variables_observer, service_connection_admin, session_variables_admin, set_user_id, show databases, show view, show_routine, shutdown, super, system_user, system_variables_admin, table_encryption_admin, telemetry_log_admin, trigger, update, xa_recover_admin, grant option on *.* to root@localhost;

create table tbl_administrative_unit
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    code               varchar(255) null,
    description        text         null,
    name               varchar(255) null,
    short_description  varchar(255) null,
    level              int          null,
    short_name         varchar(255) null,
    parent_id          bigint       null,
    constraint UK_gwbcl9ljlsnxodug3c1asvfau
        unique (code),
    constraint FKg4nta5chg1i7r2876cdignf4o
        foreign key (parent_id) references tbl_administrative_unit (id)
);

create table tbl_attribute
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    code               varchar(255) null,
    description        text         null,
    name               varchar(255) null,
    short_description  varchar(255) null,
    constraint UK_9cgll0kqpbuyge53o2vomulfc
        unique (code)
);

create table tbl_category
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    code               varchar(255) null,
    description        text         null,
    name               varchar(255) null,
    short_description  varchar(255) null,
    level              int          null,
    parent_id          bigint       null,
    constraint UK_hu6dr82q22o21c6lj636mupu2
        unique (code)
);

create table tbl_class
(
    id                 bigint auto_increment
        primary key,
    class_name         varchar(255) not null,
    class_code         varchar(20)  not null,
    teacher_id         bigint       not null,
    academic_year      int          not null,
    description        tinytext     null,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    constraint UK_tbl_class_code
        unique (class_code)
)
    collate = utf8mb4_unicode_ci;

create table tbl_country
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    code               varchar(255) null,
    description        varchar(255) null,
    name               varchar(255) null
);

create table tbl_file
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    description        varchar(255) null,
    name               varchar(255) null,
    path               varchar(255) null,
    size               bigint       null
);

create table tbl_homework_assignment
(
    id                 bigint auto_increment
        primary key,
    title              varchar(255) not null,
    description        tinytext     null,
    class_id           bigint       not null,
    assigned_date      datetime(6)  null,
    due_date           datetime(6)  not null,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    constraint FK_tbl_homework_assignment_class
        foreign key (class_id) references tbl_class (id)
)
    collate = utf8mb4_unicode_ci;

create index idx_tbl_homework_assignment_class
    on tbl_homework_assignment (class_id);

create table tbl_permission
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255)                                               null,
    created_date       datetime(6)                                                null,
    last_modified_by   varchar(255)                                               null,
    last_modified_date datetime(6)                                                null,
    voided             bit                                                        null,
    action             enum ('READ', 'WRITE', 'DELETE', 'UPDATE')                 not null,
    module             enum ('USER_MANAGEMENT', 'ADMINISTRATIVE_UNIT_MANAGEMENT') not null
);

create table tbl_person
(
    id                   bigint auto_increment
        primary key,
    created_by           varchar(255)                       null,
    created_date         datetime(6)                        null,
    last_modified_by     varchar(255)                       null,
    last_modified_date   datetime(6)                        null,
    voided               bit                                null,
    type                 int                                null comment '0 - admin, 1 - teacher, 2 - student, 3 - client',
    birth_date           datetime(6)                        null,
    display_name         varchar(255)                       null,
    email                varchar(255)                       null,
    first_name           varchar(255)                       null,
    gender               enum ('MALE', 'FEMALE', 'UNKNOWN') null,
    id_number            varchar(255)                       null,
    id_number_issue_by   varchar(255)                       null,
    id_number_issue_date datetime(6)                        null,
    last_name            varchar(255)                       null,
    phone_number         varchar(255)                       null,
    enrollment_date      date                               null,
    hire_date            datetime(6)                        null,
    class_id             bigint                             null,
    photo_url            varchar(255)                       null,
    photo_id             bigint                             null,
    constraint FK_tbl_student_class
        foreign key (class_id) references tbl_class (id),
    constraint FKnk7osa17264beobdefxio1prt
        foreign key (photo_id) references tbl_file (id)
);

alter table tbl_class
    add constraint FK_tbl_class_teacher
        foreign key (teacher_id) references tbl_person (id);

create index idx_tbl_student_class
    on tbl_person (class_id);

create table tbl_product
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    code               varchar(255) null,
    description        text         null,
    name               varchar(255) null,
    short_description  varchar(255) null,
    constraint UK_g8vb8cyvyrng09xat351ny276
        unique (code)
);

create table product_attributes
(
    product_id    bigint       not null,
    value         varchar(255) null,
    attribute_key varchar(255) not null,
    primary key (product_id, attribute_key),
    constraint FKl5alhjo2u1knroieouhhbn6t
        foreign key (product_id) references tbl_product (id)
);

create table tbl_product_category
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    category_id        bigint       null,
    product_id         bigint       null,
    constraint FKjkbn47tecomukeudhg92tlc15
        foreign key (category_id) references tbl_category (id),
    constraint FKlwd56rummt6sunb6fl3t6002r
        foreign key (product_id) references tbl_product (id)
);

create table tbl_product_file
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    order_number       int          null,
    file_id            bigint       null,
    product_id         bigint       null,
    constraint FKh6l43pf5ny52e8nanljycj8ga
        foreign key (product_id) references tbl_product (id),
    constraint FKkllu40c9krqx79memqiv1diri
        foreign key (file_id) references tbl_file (id)
);

create table tbl_product_show
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    price              double       null,
    status             int          null,
    product_id         bigint       null,
    constraint UK_243lv564bihni1t3xabkhfhy1
        unique (product_id),
    constraint FKojh4sx54fcu3tivmqtdqfyuxf
        foreign key (product_id) references tbl_product (id)
);

create table tbl_question
(
    id                 bigint auto_increment
        primary key,
    question_type      bit                        not null comment '0: bài luận, 1: chọn 1, 2: chọn nhiều, 4: đọc hieeruf',
    question_text      text                       not null,
    reading_passage    text                       null,
    difficulty_level   int           default 1    null,
    question_year      int                        null,
    points             decimal(5, 2) default 1.00 null,
    photo_url          varchar(255)               null,
    photo_id           bigint                     null,
    created_by         varchar(255)               null,
    created_date       datetime(6)                null,
    last_modified_by   varchar(255)               null,
    last_modified_date datetime(6)                null,
    voided             bit                        null,
    constraint FK_tbl_question_photo_id
        foreign key (photo_id) references tbl_file (id)
)
    collate = utf8mb4_unicode_ci;

create table tbl_answer
(
    id                 bigint auto_increment
        primary key,
    question_id        bigint           not null,
    answer_text        text             not null,
    is_correct         bit default b'0' null,
    order_index        int default 0    null,
    created_by         varchar(255)     null,
    created_date       datetime(6)      null,
    last_modified_by   varchar(255)     null,
    last_modified_date datetime(6)      null,
    voided             bit              null,
    constraint FK_tbl_answer_question
        foreign key (question_id) references tbl_question (id)
            on delete cascade
)
    collate = utf8mb4_unicode_ci;

create table tbl_homework_question
(
    id                 bigint auto_increment
        primary key,
    homework_id        bigint                     not null,
    question_id        bigint                     not null,
    order_index        int           default 0    null,
    question_points    decimal(5, 2) default 1.00 null,
    created_by         varchar(255)               null,
    created_date       datetime(6)                null,
    last_modified_by   varchar(255)               null,
    last_modified_date datetime(6)                null,
    voided             bit                        null,
    constraint FK_tbl_homework_question_homework
        foreign key (homework_id) references tbl_homework_assignment (id)
            on delete cascade,
    constraint FK_tbl_homework_question_question
        foreign key (question_id) references tbl_question (id)
)
    collate = utf8mb4_unicode_ci;

create table tbl_question_category
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    category_id        bigint       null,
    question_id        bigint       null,
    constraint FK_tbl_question_category_category_id
        foreign key (category_id) references tbl_category (id),
    constraint FK_tbl_question_category_question_id
        foreign key (question_id) references tbl_product (id)
);

create table tbl_refresh_token
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    expired            datetime(6)  null,
    revoked            bit          null,
    token              varchar(255) null,
    username           varchar(255) null
);

create table tbl_role
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    role_description   varchar(512) null,
    role_name          varchar(150) not null
);

create table tbl_role_permission
(
    role_id       bigint not null,
    permission_id bigint not null,
    primary key (role_id, permission_id),
    constraint FKederj3igpg2d7b1llsoibhb2x
        foreign key (permission_id) references tbl_permission (id),
    constraint FKey6ucxnb0cg80jar6tje0k82e
        foreign key (role_id) references tbl_role (id)
);

create table tbl_sale_invoice
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255)                                                    null,
    created_date       datetime(6)                                                     null,
    last_modified_by   varchar(255)                                                    null,
    last_modified_date datetime(6)                                                     null,
    voided             bit                                                             null,
    address            varchar(255)                                                    null,
    code               varchar(255)                                                    null,
    display_name       varchar(255)                                                    null,
    note               varchar(255)                                                    null,
    is_paid            bit                                                             null,
    payment_type       enum ('CASH', 'CARD', 'COD', 'TRANSFER_MONEY')                  null,
    phone_number       varchar(255)                                                    null,
    sale_date          datetime(6)                                                     null,
    status             enum ('NEW', 'PREPARING', 'APPROVED', 'TRANSPORT', 'DELIVERED') null,
    total              double                                                          null,
    type               enum ('STANDARD', 'ONLINE')                                     null,
    commune_id         bigint                                                          null,
    district_id        bigint                                                          null,
    province_id        bigint                                                          null,
    constraint FKdrwpktfcwivvw6xylmjicmtht
        foreign key (commune_id) references tbl_administrative_unit (id),
    constraint FKjeyxi7v09f42edwf591ygki9w
        foreign key (district_id) references tbl_administrative_unit (id),
    constraint FKpy70yofn2m53k74p6r4gu0reo
        foreign key (province_id) references tbl_administrative_unit (id)
);

create table tbl_sale_item
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    price              double       null,
    quantity           int          null,
    product_id         bigint       null,
    sale_invoice_id    bigint       null,
    constraint FK32o4ev0hb5dlwk1655901i72y
        foreign key (product_id) references tbl_product (id),
    constraint FKdr8xjguga8xrwwt3jptqjaty1
        foreign key (sale_invoice_id) references tbl_sale_invoice (id)
);

create table tbl_supplier
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    code               varchar(255) null,
    description        text         null,
    name               varchar(255) null,
    short_description  varchar(255) null,
    email              varchar(255) null,
    phone_number       varchar(255) null,
    constraint UK_5as70tfslw3buvp29r09oxpky
        unique (code)
);

create table tbl_supplier_product
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    product_id         bigint       null,
    supplier_id        bigint       null,
    constraint FK4qtlmwl5rcqkjisx5fr6634nw
        foreign key (product_id) references tbl_product (id),
    constraint FKlxhvqeyd1wbvy5u11m7hn4861
        foreign key (supplier_id) references tbl_supplier (id)
);

create table tbl_test_assignment
(
    id                 bigint auto_increment
        primary key,
    title              varchar(255) not null,
    description        tinytext     null,
    class_id           bigint       not null,
    test_type          bit          not null comment '0 - bài kiểm tra, 1 - giữa kỳ, 2 - cuối kỳ, 3 - đặc biệt',
    test_date          datetime(6)  not null,
    duration_minutes   int          not null,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    constraint FK_tbl_test_assignment_class
        foreign key (class_id) references tbl_class (id)
)
    collate = utf8mb4_unicode_ci;

create index idx_tbl_test_assignment_class
    on tbl_test_assignment (class_id);

create table tbl_test_question
(
    id                 bigint auto_increment
        primary key,
    test_id            bigint                     not null,
    question_id        bigint                     not null,
    order_index        int           default 0    null,
    question_points    decimal(5, 2) default 1.00 null,
    created_by         varchar(255)               null,
    created_date       datetime(6)                null,
    last_modified_by   varchar(255)               null,
    last_modified_date datetime(6)                null,
    voided             bit                        null,
    constraint FK_tbl_test_question_question
        foreign key (question_id) references tbl_question (id),
    constraint FK_tbl_test_question_test
        foreign key (test_id) references tbl_test_assignment (id)
            on delete cascade
)
    collate = utf8mb4_unicode_ci;

create table tbl_token
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255)                                         null,
    created_date       datetime(6)                                          null,
    last_modified_by   varchar(255)                                         null,
    last_modified_date datetime(6)                                          null,
    voided             bit                                                  null,
    expired            bit                                                  null,
    revoked            bit                                                  null,
    token              varchar(255)                                         null,
    type               enum ('BEARER', 'ACTIVE_ACCOUNT', 'FORGOT_PASSWORD') null,
    username           varchar(255)                                         null,
    constraint UK_c5dy8rus7r6nkaicmi5cglfbt
        unique (token)
);

create table tbl_user
(
    id                      bigint auto_increment
        primary key,
    created_by              varchar(255) null,
    created_date            datetime(6)  null,
    last_modified_by        varchar(255) null,
    last_modified_date      datetime(6)  null,
    voided                  bit          null,
    account_non_expired     bit          null,
    account_non_locked      bit          null,
    credentials_non_expired bit          null,
    email                   varchar(255) null,
    enabled                 bit          null,
    last_login              datetime(6)  null,
    password                varchar(255) not null,
    username                varchar(100) not null,
    person_id               bigint       null,
    constraint UK_hsjkjgci03s3382gspmdhhwhg
        unique (person_id),
    constraint UK_k0bty7tbcye41jpxam88q5kj2
        unique (username),
    constraint UK_npn1wf1yu1g5rjohbek375pp1
        unique (email),
    constraint FKbi8yrqu0dd3dfce2ej9uadqoc
        foreign key (person_id) references tbl_person (id)
);

create table tbl_email_notification
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255)                          null,
    created_date       datetime(6)                           null,
    last_modified_by   varchar(255)                          null,
    last_modified_date datetime(6)                           null,
    voided             bit                                   null,
    content            text                                  null,
    email              varchar(255)                          null,
    link               varchar(255)                          null,
    subject            varchar(500)                          null,
    type               enum ('REGISTER', 'NOTICE', 'FORGOT') null,
    user_id            bigint                                null,
    constraint FKqs7bf0qx4d1d6b8t3cg8ewl6v
        foreign key (user_id) references tbl_user (id)
);

create table tbl_homework_submission
(
    id                    bigint auto_increment
        primary key,
    homework_id           bigint                     not null,
    student_id            bigint                     not null,
    submitted_at          datetime(6)                null,
    graded_at             datetime(6)                null,
    graded_by             bigint                     null,
    total_score           decimal(5, 2) default 0.00 null,
    max_score             decimal(5, 2) default 0.00 null,
    status                bit           default b'0' null comment '0 - chưa bắt đầu, 1 - đang tiến hành, 2 - đã nộp, 3 - đã chấm điểm, 4 - trễ',
    teacher_feedback      text                       null,
    overall_comment       text                       null,
    strengths             text                       null,
    weaknesses            text                       null,
    suggestions           text                       null,
    encouragement_message text                       null,
    created_by            varchar(255)               null,
    created_date          datetime(6)                null,
    last_modified_by      varchar(255)               null,
    last_modified_date    datetime(6)                null,
    voided                bit                        null,
    constraint UK_tbl_homework_submission
        unique (homework_id, student_id),
    constraint FK_tbl_homework_submission_graded_by
        foreign key (graded_by) references tbl_user (id),
    constraint FK_tbl_homework_submission_homework
        foreign key (homework_id) references tbl_homework_assignment (id),
    constraint FK_tbl_homework_submission_student
        foreign key (student_id) references tbl_person (id)
)
    collate = utf8mb4_unicode_ci;

create table tbl_homework_answer
(
    id                   bigint auto_increment
        primary key,
    submission_id        bigint                     not null,
    homework_question_id bigint                     not null,
    student_answer       text                       not null,
    score_obtained       decimal(5, 2) default 0.00 null,
    teacher_comment      text                       null,
    correction           text                       null,
    is_correct           bit                        null,
    is_flagged           bit           default b'0' null,
    flag_reason          varchar(200)               null,
    created_by           varchar(255)               null,
    created_date         datetime(6)                null,
    last_modified_by     varchar(255)               null,
    last_modified_date   datetime(6)                null,
    voided               bit                        null,
    constraint FK_tbl_homework_answer_homework_question
        foreign key (homework_question_id) references tbl_homework_question (id),
    constraint FK_tbl_homework_answer_submission
        foreign key (submission_id) references tbl_homework_submission (id)
            on delete cascade
)
    collate = utf8mb4_unicode_ci;

create index idx_tbl_homework_submission_homework
    on tbl_homework_submission (homework_id);

create index idx_tbl_homework_submission_student
    on tbl_homework_submission (student_id);

create table tbl_test_submission
(
    id                    bigint auto_increment
        primary key,
    voided                bit                        null,
    test_id               bigint                     not null,
    student_id            bigint                     not null,
    started_at            datetime(6)                null,
    submitted_at          datetime(6)                null,
    graded_at             datetime(6)                null,
    graded_by             bigint                     null,
    total_score           decimal(5, 2) default 0.00 null,
    max_score             decimal(5, 2) default 0.00 null,
    correct_count         int           default 0    null,
    incorrect_count       int           default 0    null,
    unanswered_count      int           default 0    null,
    time_spent_seconds    int                        null,
    status                bit           default b'0' null comment '0 - chưa_bắt_đầu, 1 - đang_tiến_hành,2 - đã_nộp, đã_chấm_điểm, 3 - trễ, 4 - vắng mặt, 5 - đã_phát_hiện_gian_lận',
    teacher_feedback      text                       null,
    overall_comment       text                       null,
    strengths             text                       null,
    weaknesses            text                       null,
    suggestions           text                       null,
    encouragement_message text                       null,
    warning_notes         text                       null,
    auto_graded           bit           default b'0' null,
    grading_method        bit                        null comment '0 - tự động, 1 - thủ công, 2 - hỗn hợp',
    created_by            varchar(255)               null,
    created_date          datetime(6)                null,
    last_modified_by      varchar(255)               null,
    last_modified_date    datetime(6)                null,
    constraint UK_tbl_test_submission
        unique (test_id, student_id),
    constraint FK_tbl_test_submission_graded_by
        foreign key (graded_by) references tbl_user (id),
    constraint FK_tbl_test_submission_student
        foreign key (student_id) references tbl_person (id),
    constraint FK_tbl_test_submission_test
        foreign key (test_id) references tbl_test_assignment (id)
)
    collate = utf8mb4_unicode_ci;

create table tbl_test_answer
(
    id                 bigint auto_increment
        primary key,
    test_submission_id bigint                     not null,
    test_question_id   bigint                     not null,
    student_answer     text                       null,
    answer_type        bit           default b'0' null comment '0 - chưa trả lời, 1 -đã chọn, 2 - văn bản',
    score_obtained     decimal(5, 2) default 0.00 null,
    max_possible_score decimal(5, 2) default 0.00 null,
    is_correct         bit                        null,
    teacher_comment    text                       null,
    correction         text                       null,
    is_flagged         bit           default b'0' null,
    flag_reason        varchar(200)               null,
    grammar_score      decimal(3, 2)              null,
    vocabulary_score   decimal(3, 2)              null,
    content_score      decimal(3, 2)              null,
    created_by         varchar(255)               null,
    created_date       datetime(6)                null,
    last_modified_by   varchar(255)               null,
    last_modified_date datetime(6)                null,
    voided             bit                        null,
    constraint UK_tbl_test_answer_submission_question
        unique (test_submission_id, test_question_id),
    constraint FK_tbl_test_answer_submission
        foreign key (test_submission_id) references tbl_test_submission (id)
            on delete cascade,
    constraint FK_tbl_test_answer_test_question
        foreign key (test_question_id) references tbl_test_question (id)
)
    collate = utf8mb4_unicode_ci;

create index idx_tbl_test_answer_correct
    on tbl_test_answer (is_correct);

create index idx_tbl_test_answer_question
    on tbl_test_answer (test_question_id);

create index idx_tbl_test_answer_submission
    on tbl_test_answer (test_submission_id);

create index idx_tbl_test_submission_graded
    on tbl_test_submission (graded_at);

create index idx_tbl_test_submission_status
    on tbl_test_submission (status);

create index idx_tbl_test_submission_student
    on tbl_test_submission (student_id);

create index idx_tbl_test_submission_test
    on tbl_test_submission (test_id);

create index idx_tbl_user_email
    on tbl_user (email);

create index idx_tbl_user_username
    on tbl_user (username);

create table tbl_user_role
(
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id),
    constraint FK6phlytlf1w3h9vutsu019xor5
        foreign key (role_id) references tbl_role (id),
    constraint FKggc6wjqokl2vlw89y22a1j2oh
        foreign key (user_id) references tbl_user (id)
);

create table tbl_verification_token
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255)                                         null,
    created_date       datetime(6)                                          null,
    last_modified_by   varchar(255)                                         null,
    last_modified_date datetime(6)                                          null,
    voided             bit                                                  null,
    expiry_time        datetime(6)                                          null,
    password           varchar(255)                                         null,
    token              varchar(255)                                         null,
    type               enum ('BEARER', 'ACTIVE_ACCOUNT', 'FORGOT_PASSWORD') null,
    user_id            bigint                                               null,
    constraint FKs26petdechw2a4yyr15npg6nk
        foreign key (user_id) references tbl_user (id)
);

create table tbl_warehouse
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    code               varchar(255) null,
    description        text         null,
    name               varchar(255) null,
    short_description  varchar(255) null,
    address            varchar(255) null,
    commune_id         bigint       null,
    district_id        bigint       null,
    province_id        bigint       null,
    constraint UK_lf19628q0wivfjvmfxenq5tpv
        unique (code),
    constraint FK4ewjuuy2ab23cjcni9e2bf4k7
        foreign key (district_id) references tbl_administrative_unit (id),
    constraint FK91996k1qfo75a1tdxqojv7k0b
        foreign key (province_id) references tbl_administrative_unit (id),
    constraint FKixuk0a8d55sbk3jsi5hcmyc8g
        foreign key (commune_id) references tbl_administrative_unit (id)
);

create table tbl_invoice_import
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255)                                                                             null,
    created_date       datetime(6)                                                                              null,
    last_modified_by   varchar(255)                                                                             null,
    last_modified_date datetime(6)                                                                              null,
    voided             bit                                                                                      null,
    code               varchar(255)                                                                             null,
    import_date        datetime(6)                                                                              null,
    note               varchar(255)                                                                             null,
    status             enum ('ORDER', 'NEW', 'PENDING_APPROVAL', 'APPROVED', 'PAID', 'TRANSPORT', 'WAREHOUSED') null,
    total              double                                                                                   null,
    supplier_id        bigint                                                                                   null,
    warehouse_id       bigint                                                                                   null,
    constraint FK3sncsv585xhq8hpkoijm7yhsc
        foreign key (warehouse_id) references tbl_warehouse (id),
    constraint FKgsfun8kp2u7hi5yqw6e6uwe32
        foreign key (supplier_id) references tbl_supplier (id)
);

create table tbl_inventory
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    quantity           int          null,
    status             int          null,
    invoice_import_id  bigint       null,
    product_id         bigint       null,
    sales_invoice_id   bigint       null,
    warehouse_id       bigint       null,
    constraint FK93i5u2bthxg0cd2nx9sxtae1q
        foreign key (invoice_import_id) references tbl_invoice_import (id),
    constraint FKb1jeifn0bw25wn3ywgu6ax4yc
        foreign key (sales_invoice_id) references tbl_sale_invoice (id),
    constraint FKfpd25s4egqyiomq35op20wxcp
        foreign key (warehouse_id) references tbl_warehouse (id),
    constraint FKrx0ob1tn2wn1j3s0y2f3v84w
        foreign key (product_id) references tbl_product (id),
    check (`status` in (1, -(1)))
);

create table tbl_invoice_import_item
(
    id                 bigint auto_increment
        primary key,
    created_by         varchar(255) null,
    created_date       datetime(6)  null,
    last_modified_by   varchar(255) null,
    last_modified_date datetime(6)  null,
    voided             bit          null,
    price              double       null,
    quantity           int          null,
    invoice_import_id  bigint       null,
    product_id         bigint       null,
    constraint FK3owr632ft1w3ph1aaqgtwcual
        foreign key (product_id) references tbl_product (id),
    constraint FKkthn9r8qhm4tt4drgnk0v2bx0
        foreign key (invoice_import_id) references tbl_invoice_import (id)
);




## Initial data
-- First, insert the parent category to group all classes
INSERT INTO store.tbl_category (created_by, created_date, last_modified_by, last_modified_date, 
                                voided, code, description, name, short_description, level, parent_id)
VALUES ('system', NOW(), 'system', NOW(), 
        0, 'CLASSES', 'Parent category grouping all academic classes', 
        'Academic Classes', 'All Classes', 1, NULL);

-- Get the parent_id for the newly inserted parent category
SET @parent_id = LAST_INSERT_ID();

-- Now insert the 12 class categories
INSERT INTO store.tbl_category (created_by, created_date, last_modified_by, last_modified_date, 
                                voided, code, description, name, short_description, level, parent_id)
VALUES 
-- Class 1
('system', NOW(), 'system', NOW(), 0, 'CLASS_1', 
 'First grade curriculum and educational materials', 
 'Class 1', 'First Grade', 2, @parent_id),

-- Class 2
('system', NOW(), 'system', NOW(), 0, 'CLASS_2', 
 'Second grade curriculum and educational materials', 
 'Class 2', 'Second Grade', 2, @parent_id),

-- Class 3
('system', NOW(), 'system', NOW(), 0, 'CLASS_3', 
 'Third grade curriculum and educational materials', 
 'Class 3', 'Third Grade', 2, @parent_id),

-- Class 4
('system', NOW(), 'system', NOW(), 0, 'CLASS_4', 
 'Fourth grade curriculum and educational materials', 
 'Class 4', 'Fourth Grade', 2, @parent_id),

-- Class 5
('system', NOW(), 'system', NOW(), 0, 'CLASS_5', 
 'Fifth grade curriculum and educational materials', 
 'Class 5', 'Fifth Grade', 2, @parent_id),

-- Class 6
('system', NOW(), 'system', NOW(), 0, 'CLASS_6', 
 'Sixth grade curriculum and educational materials', 
 'Class 6', 'Sixth Grade', 2, @parent_id),

-- Class 7
('system', NOW(), 'system', NOW(), 0, 'CLASS_7', 
 'Seventh grade curriculum and educational materials', 
 'Class 7', 'Seventh Grade', 2, @parent_id),

-- Class 8
('system', NOW(), 'system', NOW(), 0, 'CLASS_8', 
 'Eighth grade curriculum and educational materials', 
 'Class 8', 'Eighth Grade', 2, @parent_id),

-- Class 9
('system', NOW(), 'system', NOW(), 0, 'CLASS_9', 
 'Ninth grade curriculum and educational materials', 
 'Class 9', 'Ninth Grade', 2, @parent_id),

-- Class 10
('system', NOW(), 'system', NOW(), 0, 'CLASS_10', 
 'Tenth grade curriculum and educational materials', 
 'Class 10', 'Tenth Grade', 2, @parent_id),

-- Class 11
('system', NOW(), 'system', NOW(), 0, 'CLASS_11', 
 'Eleventh grade curriculum and educational materials', 
 'Class 11', 'Eleventh Grade', 2, @parent_id),

-- Class 12
('system', NOW(), 'system', NOW(), 0, 'CLASS_12', 
 'Twelfth grade curriculum and educational materials', 
 'Class 12', 'Twelfth Grade', 2, @parent_id);





# Dashboard View for Admin
-- View thống kê học sinh làm bài tập
CREATE VIEW Student_Homework_Stats AS
SELECT 
    s.student_id,
    s.student_code,
    u.full_name,
    c.class_name,
    COUNT(hs.submission_id) as homework_count,
    AVG(hs.total_score) as avg_score,
    SUM(CASE WHEN hs.status = 'late' THEN 1 ELSE 0 END) as late_count
FROM Students s
JOIN Users u ON s.user_id = u.user_id
LEFT JOIN Classes c ON s.class_id = c.class_id
LEFT JOIN Homework_Submissions hs ON s.student_id = hs.student_id
GROUP BY s.student_id, s.student_code, u.full_name, c.class_name;

-- View xếp hạng điểm bài tập theo tháng
CREATE VIEW Monthly_Homework_Ranking AS
SELECT 
    s.student_id,
    u.full_name,
    c.class_name,
    MONTH(hs.submitted_at) as month,
    YEAR(hs.submitted_at) as year,
    AVG(hs.total_score) as monthly_avg_score,
    RANK() OVER (PARTITION BY MONTH(hs.submitted_at), YEAR(hs.submitted_at) ORDER BY AVG(hs.total_score) DESC) as rank
FROM Students s
JOIN Users u ON s.user_id = u.user_id
JOIN Classes c ON s.class_id = c.class_id
JOIN Homework_Submissions hs ON s.student_id = hs.student_id
WHERE hs.status = 'graded'
GROUP BY s.student_id, u.full_name, c.class_name, MONTH(hs.submitted_at), YEAR(hs.submitted_at);





## docker-compose.yml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: english_ms_huong_db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: english_ms_db
      MYSQL_USER: english_ms_huong
      MYSQL_PASSWORD: Mitmit0108@#
    ports:
      - "3308:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

volumes:
  mysql_data:
