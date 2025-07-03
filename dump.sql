--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TYPE public."UserRole" AS ENUM (
    'STUDENT',
    'TEACHER',
    'ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO "Barrette-Purging-Scrabble";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Group; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."Group" (
    id text NOT NULL,
    "curatorId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endYear" integer,
    "specialityId" text,
    "startYear" integer,
    "updatedAt" timestamp(3) without time zone,
    course integer NOT NULL,
    number text NOT NULL
);


ALTER TABLE public."Group" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: Lesson; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."Lesson" (
    id text NOT NULL,
    label text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."Lesson" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: LessonOrder; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."LessonOrder" (
    id text NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "order" integer NOT NULL,
    "startTime" text NOT NULL,
    "endTime" text NOT NULL
);


ALTER TABLE public."LessonOrder" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: Location; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."Location" (
    id text NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title text NOT NULL,
    address text NOT NULL,
    code text NOT NULL,
    description text
);


ALTER TABLE public."Location" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: Schedule; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."Schedule" (
    id text NOT NULL,
    "groupId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."Schedule" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: ScheduleDay; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."ScheduleDay" (
    id text NOT NULL,
    "scheduleId" text NOT NULL,
    day text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."ScheduleDay" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: ScheduleLesson; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."ScheduleLesson" (
    id text NOT NULL,
    "scheduleDayId" text,
    "lessonId" text NOT NULL,
    audiences text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "orderId" text NOT NULL,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."ScheduleLesson" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: Speciality; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."Speciality" (
    id text NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title text NOT NULL,
    number text NOT NULL,
    code text NOT NULL,
    description text,
    "locationId" text
);


ALTER TABLE public."Speciality" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: User; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    "studentGroupId" text,
    role public."UserRole" DEFAULT 'STUDENT'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "passwordHash" text NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    email text DEFAULT ''::text NOT NULL,
    login text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."User" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: _LessonTeachers; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public."_LessonTeachers" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_LessonTeachers" OWNER TO "Barrette-Purging-Scrabble";

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "Barrette-Purging-Scrabble";

--
-- Data for Name: Group; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."Group" (id, "curatorId", "createdAt", "endYear", "specialityId", "startYear", "updatedAt", course, number) FROM stdin;
9774cca5-4065-44f2-bd4c-e1e453bddee0	\N	2025-06-15 20:46:53.149	2029	\N	2025	2025-06-15 20:46:53.149	1	17
5d949406-a6df-4ca9-bea1-986c927e2127	\N	2025-06-15 20:46:53.149	2029	\N	2025	2025-06-15 20:46:53.149	1	14
9c175ec2-f259-45e5-8e4d-4b38a9aa37bc	\N	2025-06-15 20:46:53.15	2029	\N	2025	2025-06-15 20:46:53.15	1	15
e85e68d2-a268-4bd0-a336-2bf8c456bd43	\N	2025-06-15 20:46:53.15	2029	\N	2025	2025-06-15 20:46:53.15	1	29
d6f9a1e6-25cb-4cc8-ad58-11e6e2a1c9e2	\N	2025-06-15 20:46:53.15	2029	\N	2025	2025-06-15 20:46:53.15	1	26
7d9f8dbd-405b-4d0d-b81d-44cd9f1379ac	\N	2025-06-15 20:46:53.149	2029	\N	2025	2025-06-15 20:46:53.149	1	16
c1a8c80f-7aeb-4a88-80fe-2c8107d26333	\N	2025-06-15 20:46:53.149	2029	\N	2025	2025-06-15 20:46:53.149	1	11
773fc8d2-2817-43e3-bf5f-deb655a7183f	\N	2025-06-15 20:46:53.148	2029	\N	2025	2025-06-15 20:46:53.148	1	13а
55309f27-8004-42b2-ae52-ec4073fd38bd	\N	2025-06-15 20:46:53.148	2029	\N	2025	2025-06-15 20:46:53.148	1	18
093ce562-2378-4fe0-bf9f-2c53b16cf049	\N	2025-06-15 20:46:53.15	2029	\N	2025	2025-06-15 20:46:53.15	1	28
2fbcfd6d-94f0-4ecd-b493-e9294b708876	\N	2025-06-15 20:46:53.149	2029	\N	2025	2025-06-15 20:46:53.149	1	12
93050183-9787-419f-a678-c540cdec7e7e	\N	2025-06-15 20:46:53.15	2029	\N	2025	2025-06-15 20:46:53.15	1	13б
0acb3123-b7fd-4243-ba35-6ce080aafd49	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36	2025-06-16 19:05:28.165	2025	966871b6-7693-4803-817e-87c1f0f074da	2021	2025-06-16 19:05:28.165	4	49
e1d1e1f2-c51a-4fe5-8891-d55b73c6ec4b	\N	2025-06-15 20:46:53.148	2029	\N	2025	2025-06-15 20:46:53.148	1	19
\.


--
-- Data for Name: Lesson; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."Lesson" (id, label, description, "createdAt", "updatedAt") FROM stdin;
5ba219c2-5cee-4e25-be12-ae69e6f0f450	ОБиЗР		2025-06-15 20:46:53.019	2025-06-15 20:46:53.019
6624b816-d3ff-48f9-aa4d-3caa51374f96	Основы строительного материаловедения		2025-06-15 20:46:53.021	2025-06-15 20:46:53.021
9ddac61b-5f8b-413f-9b67-89cdc9c773ad	МДК 03.01 Освоение видов работ по профессмии рабочего Плотник		2025-06-15 20:46:53.021	2025-06-15 20:46:53.021
aacc6809-727c-4146-9b82-962d525b4b7d	МДК 02.01 Технология электродуговой сварки		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
895417bd-f4e1-453b-9a2e-68a3048c0c23	МДК 02.01 Технологии арматурных работ		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
531b60d4-981e-4f19-8a1b-c09b9dee2b3f	МДК 01.01 Технология\n выполнения штукатурных и декоративных работ		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
5d2909d6-721f-4239-86bd-32c0684a019e	Информацион ные\n технологии в проф.\n деятельности		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
b352b75b-c117-4fdc-bdc2-ea8d87a7ae9a	МДК 01.02 Проект производства работ		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
9958d5c7-0c01-470c-a511-6ec81075c69c	МДК 02.01 Технология малярных и декоративно-художественных работ		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	Информатика		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
d6850f71-25cb-475d-ac80-3ff82d1752af	МДК 02.01. Организация технологических процессов на объекте капитального\n строительства		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
2738db17-3252-48fc-af2f-8d51be1d1602	МДК 03.01 Моделирование и анализ программного\n обеспечения		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
0dc119f4-abe9-4189-b259-b8da2dd06e0b	Иностранный язык		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
d4719e1f-ee46-4c32-a338-c24adb055a81	МДК 05.01 Проектирование и дизайн информационных систем		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
c8923cbf-0c8d-416f-a7ce-8d07e5c2fe71	МДК 02.02 Инструментальные средства разработки программного обеспечения		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
070c4a89-9da3-4602-b1e9-48fec89adcde	МДК 02.03 Математическое моделирование		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
4262452e-68b8-4d47-a5cd-816c0a9104f0	МДК 04.02 Обеспечение качества функционирования компьютерных систем		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
478d37e8-f431-4382-b820-85aad6721e15	МДК 04.02 Обеспечение\n качества функционирования компьютерных систем		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
571dfc13-c753-49c3-9422-86b9689aea36	Общие сведения об инженерных сетях территорий и зданий		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
91132c52-1b55-4b96-af3d-ff08ccea6d0e	МДК 03.02 Управление проектами		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
5b6e2b9d-68ae-4dde-a4d0-320b7201f561	МДК 03.01 Технологии\n облицовочных, мозаичных и декоративных работ		2025-06-15 20:46:53.021	2025-06-15 20:46:53.021
8875cd1b-dc32-43b3-b442-8e44742be37c	МДК 01.01 Технологии работ по возведению и отделке каркасно- обшивочных конструкций		2025-06-15 20:46:53.019	2025-06-15 20:46:53.019
170c00e9-7072-4cff-8f71-e7d40d49ec3a	МДК 01.01 Проектирование зданий и сооружений		2025-06-15 20:46:53.021	2025-06-15 20:46:53.021
547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	МДК 01.01 Разработка программных модулей		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
8b00821d-4bb1-4a61-8063-bcc50a03f596	Техническое черчение		2025-06-15 20:46:53.019	2025-06-15 20:46:53.019
422eebb8-d04a-450b-92b0-2a819b9320c9	МДК 01.01 Технология каменных работ		2025-06-15 20:46:53.02	2025-06-15 20:46:53.02
eef6fd33-ae6f-46c8-9ad9-d2e67c252b1f	МДК 02.01 Технология малярных и декоративно-художественных\n работ		2025-06-15 20:46:53.02	2025-06-15 20:46:53.02
e040b26b-6637-4b9f-b4c8-83dfc429dd36	МДК.11.01 Технология разработки и защиты баз данных		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
49318b60-a141-49fc-bb3d-56c295b44987	Русский язык		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
e35c4d13-cae5-4ada-b4b3-cc226f681275	Физическая культура		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
a97bd17c-fe42-4e92-9830-f4580c682750	МДК.11.01 Технология разработки и защиты баз\n данных		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
9cb2df3f-072a-489e-a306-a82413ebfe54	Экономика отрасли		2025-06-15 20:46:53.02	2025-06-15 20:46:53.02
d1362862-6e46-4b5b-bf11-d05a2dc099ac	Физика		2025-06-15 20:46:53.019	2025-06-15 20:46:53.019
d1c81396-d532-4b52-836d-8746c8c0e7ee	МДК 01.01 Монтаж, ремонт и\n обслуживание систем\n водоснабжения, водоотведения и отопления		2025-06-15 20:46:53.021	2025-06-15 20:46:53.021
7ee8bf89-6d3e-4b58-a731-b2f2788e2332	МДК 01.01 Монтаж, ремонт и обслуживание систем\n водоснабжения, водоотведения и\n отопления		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
e6adaf14-ef89-43c2-ba93-3b0d1540d5aa	Иностранный		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
466e126f-0361-4d0e-9606-ff354fdc30a6	Химия		2025-06-15 20:46:53.02	2025-06-15 20:46:53.02
10f6a822-9b45-48c3-a4fb-12b06608c09e	Индивидуальный проект		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
85716c27-e9ca-488c-876d-045b9202c65c	МДК 02.01. Организация технологических процессов на\n объекте капитального строительства		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
39cfb4cf-ad2c-42c3-ad91-41782cc381db	Литература		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
3d2c83b0-7d82-432a-a551-6c3e4239b998	Техническая механика		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
fc64e09a-0555-49df-83df-38d89b3f7ad0	Иностранный\n язык		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
b9e37858-0147-4b65-9367-6759a2f9d1a1	МДК 04.02 Обеспечение качества функционирования компьютерных\n систем		2025-06-15 20:46:53.022	2025-06-15 20:46:53.022
3faec2d1-782d-453a-9df8-f921c79f87d2	МДК 03.01 Освоение видов работ по профессии Бетонщик		2025-06-15 20:46:53.02	2025-06-15 20:46:53.02
57d87ce0-7b9c-4872-a177-a6ad0379c4d0	Биология		2025-06-15 20:46:53.02	2025-06-15 20:46:53.02
d4037ec5-8c2f-4706-9ca0-fdce8652f578	История		2025-06-15 20:46:53.019	2025-06-15 20:46:53.019
f8b5ec84-573e-42f5-815a-d5628c015d90	География		2025-06-15 20:46:53.019	2025-06-15 20:46:53.019
ba1e57ca-372e-4336-8be3-840a6f42b96e	Математика		2025-06-15 20:46:53.019	2025-06-15 20:46:53.019
93e2e768-4f8d-4de0-8666-b4e2747bd74e	Обществознание		2025-06-15 20:46:53.021	2025-06-15 20:46:53.021
\.


--
-- Data for Name: LessonOrder; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."LessonOrder" (id, "updatedAt", "createdAt", "order", "startTime", "endTime") FROM stdin;
36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 20:46:53.001	2025-06-15 20:46:53.001	1	08:00	08:45
e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 20:46:53.001	2025-06-15 20:46:53.001	2	08:45	09:30
8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 20:46:53.001	2025-06-15 20:46:53.001	3	09:00	09:45
83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 20:46:53.001	2025-06-15 20:46:53.001	4	09:45	10:30
09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 20:46:53.001	2025-06-15 20:46:53.001	5	10:00	10:45
bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 20:46:53.001	2025-06-15 20:46:53.001	6	10:45	11:30
f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 20:46:53.001	2025-06-15 20:46:53.001	7	11:00	11:45
4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 20:46:53.001	2025-06-15 20:46:53.001	8	11:45	12:30
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."Location" (id, "updatedAt", "createdAt", title, address, code, description) FROM stdin;
c9086432-23f5-453b-b754-5fbbe70d7458	2025-06-16 18:57:08.899	2025-06-16 18:57:08.899	Колледж Метростроя	Ул. Демьяна Бедного д.29	MC123	Демьяна Бедного 29
af77bafc-492d-46b7-9084-22811b1ed57e	2025-06-16 18:59:04.569	2025-06-16 18:59:04.569	Колледж Метростроя	Придорожная аллея, д. 7, л. А	dorog	Придорожная аллея, д. 7, л. А
41115b92-9994-4bfb-9bc0-b25a477b494a	2025-06-16 19:00:23.951	2025-06-16 19:00:23.951	МТО	Ириновский пр. д. 29, л. А	mto	Ириновский пр. д. 29, л. А
27e06230-d663-4832-bfcf-ba1d7e6411c7	2025-06-16 19:00:52.296	2025-06-16 19:00:52.296	Метрострой на учительской	Ул. учительская, д. 3, л. А	uchit	Ул. учительская, д. 3, л. А
\.


--
-- Data for Name: Schedule; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."Schedule" (id, "groupId", "createdAt", "updatedAt") FROM stdin;
e90285f3-29a9-44ac-be18-adb54c773fa8	c1a8c80f-7aeb-4a88-80fe-2c8107d26333	2025-06-15 20:46:53.149	2025-06-15 20:46:53.149
6e721ae7-8cea-40e8-b3da-c5dc1271e0bf	d6f9a1e6-25cb-4cc8-ad58-11e6e2a1c9e2	2025-06-15 20:46:53.15	2025-06-15 20:46:53.15
1602a175-b181-4bca-abe7-cddd32f36e87	9c175ec2-f259-45e5-8e4d-4b38a9aa37bc	2025-06-15 20:46:53.15	2025-06-15 20:46:53.15
ac64b373-889c-4ec4-a4a4-78d073d9c543	9774cca5-4065-44f2-bd4c-e1e453bddee0	2025-06-15 20:46:53.149	2025-06-15 20:46:53.149
978f6c1b-ee4c-4a30-81af-ab42146c53c0	7d9f8dbd-405b-4d0d-b81d-44cd9f1379ac	2025-06-15 20:46:53.149	2025-06-15 20:46:53.149
3282e602-5a11-484c-a898-531f7a213800	e85e68d2-a268-4bd0-a336-2bf8c456bd43	2025-06-15 20:46:53.15	2025-06-15 20:46:53.15
7da7b732-940e-4cbf-a8e3-8bd162afa953	5d949406-a6df-4ca9-bea1-986c927e2127	2025-06-15 20:46:53.149	2025-06-15 20:46:53.149
fd339e9c-abc7-4e16-b8da-656e7acaa113	2fbcfd6d-94f0-4ecd-b493-e9294b708876	2025-06-15 20:46:53.149	2025-06-15 20:46:53.149
91048a72-f65e-44fb-bbbe-81dbae197b88	093ce562-2378-4fe0-bf9f-2c53b16cf049	2025-06-15 20:46:53.15	2025-06-15 20:46:53.15
027ed3b6-0964-423f-b368-5efd5c606e5c	55309f27-8004-42b2-ae52-ec4073fd38bd	2025-06-15 20:46:53.148	2025-06-15 20:46:53.148
7728924a-057c-4733-b3a7-e2dd76320a8e	773fc8d2-2817-43e3-bf5f-deb655a7183f	2025-06-15 20:46:53.148	2025-06-15 20:46:53.148
fcc48c6f-41fb-4412-9e7c-b168554c432b	e1d1e1f2-c51a-4fe5-8891-d55b73c6ec4b	2025-06-15 20:46:53.148	2025-06-15 20:46:53.148
4400e4fc-56e5-4834-8328-a08954fcdfb3	93050183-9787-419f-a678-c540cdec7e7e	2025-06-15 20:46:53.15	2025-06-15 20:46:53.15
c1d3d4f7-e62a-4ae8-84e2-4c50258e6300	0acb3123-b7fd-4243-ba35-6ce080aafd49	2025-06-16 19:05:28.165	2025-06-16 19:05:28.165
\.


--
-- Data for Name: ScheduleDay; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."ScheduleDay" (id, "scheduleId", day, "createdAt", "updatedAt") FROM stdin;
9bc20b40-a838-485d-bd5a-2f6bf6057a0c	e90285f3-29a9-44ac-be18-adb54c773fa8	monday	2025-06-15 21:05:38.686	2025-06-15 21:05:38.686
0eea19c3-c2fb-47c1-84cd-91acdb7a0914	e90285f3-29a9-44ac-be18-adb54c773fa8	tuesday	2025-06-15 21:05:38.736	2025-06-15 21:05:38.736
6b8d83dd-96a4-4d3d-a00c-bdd38bc377f8	e90285f3-29a9-44ac-be18-adb54c773fa8	wednesday	2025-06-15 21:05:38.752	2025-06-15 21:05:38.752
7adf050b-4e28-4e6c-859b-1f2ef88cb511	e90285f3-29a9-44ac-be18-adb54c773fa8	thursday	2025-06-15 21:05:38.763	2025-06-15 21:05:38.763
c8c08e85-48aa-4024-8303-de995b2373d5	e90285f3-29a9-44ac-be18-adb54c773fa8	friday	2025-06-15 21:05:38.778	2025-06-15 21:05:38.778
cc8d6506-321a-41a8-9342-897af5a16008	fd339e9c-abc7-4e16-b8da-656e7acaa113	monday	2025-06-15 21:05:38.791	2025-06-15 21:05:38.791
5f9f3c50-ec04-4cf5-812c-5fb6435d0aca	fd339e9c-abc7-4e16-b8da-656e7acaa113	tuesday	2025-06-15 21:05:38.811	2025-06-15 21:05:38.811
b95181d5-55fa-4389-8afe-f5120373cdb2	fd339e9c-abc7-4e16-b8da-656e7acaa113	wednesday	2025-06-15 21:05:38.825	2025-06-15 21:05:38.825
aa745e93-6d83-4496-bcb7-b6e9c03f91c1	fd339e9c-abc7-4e16-b8da-656e7acaa113	thursday	2025-06-15 21:05:38.837	2025-06-15 21:05:38.837
c64cc0ea-0259-40d8-8714-6e507eb8384e	fd339e9c-abc7-4e16-b8da-656e7acaa113	friday	2025-06-15 21:05:38.848	2025-06-15 21:05:38.848
1dadc86c-5b57-40fd-a243-b3ccdbe71f3d	7728924a-057c-4733-b3a7-e2dd76320a8e	monday	2025-06-15 21:05:38.86	2025-06-15 21:05:38.86
6bb8cf7a-b324-4d81-886e-74d8c88b31ca	7728924a-057c-4733-b3a7-e2dd76320a8e	tuesday	2025-06-15 21:05:38.874	2025-06-15 21:05:38.874
9f34d1c6-a14d-4fe3-8755-0510d134fdf3	7728924a-057c-4733-b3a7-e2dd76320a8e	wednesday	2025-06-15 21:05:38.889	2025-06-15 21:05:38.889
503f0a9a-c33d-4c31-8ddd-22614d6be2e3	7728924a-057c-4733-b3a7-e2dd76320a8e	thursday	2025-06-15 21:05:38.903	2025-06-15 21:05:38.903
b91b0d3a-eddd-4481-8d3e-0269824fb107	7728924a-057c-4733-b3a7-e2dd76320a8e	friday	2025-06-15 21:05:38.917	2025-06-15 21:05:38.917
83aeebfc-a81c-4bb3-86c2-dcc44c2dc25f	4400e4fc-56e5-4834-8328-a08954fcdfb3	monday	2025-06-15 21:05:38.929	2025-06-15 21:05:38.929
232cc4c7-ee77-47c6-96de-9e2eb95d9059	4400e4fc-56e5-4834-8328-a08954fcdfb3	tuesday	2025-06-15 21:05:38.942	2025-06-15 21:05:38.942
71f2c5dd-91e6-4b24-a794-26ea52ebb2bc	4400e4fc-56e5-4834-8328-a08954fcdfb3	wednesday	2025-06-15 21:05:38.954	2025-06-15 21:05:38.954
771c3bf0-a20d-48e6-b541-7c83dbb2eecb	4400e4fc-56e5-4834-8328-a08954fcdfb3	thursday	2025-06-15 21:05:38.968	2025-06-15 21:05:38.968
29cbbbe3-db04-447f-8acd-a7983a602d20	4400e4fc-56e5-4834-8328-a08954fcdfb3	friday	2025-06-15 21:05:38.98	2025-06-15 21:05:38.98
2e4aeb54-ff4e-44f8-b3ac-2524bd9930a2	7da7b732-940e-4cbf-a8e3-8bd162afa953	monday	2025-06-15 21:05:38.992	2025-06-15 21:05:38.992
c2cb36f1-b3da-49ee-afba-b9ef975c8537	7da7b732-940e-4cbf-a8e3-8bd162afa953	tuesday	2025-06-15 21:05:39.004	2025-06-15 21:05:39.004
0dedc45b-2559-4d35-a1bc-ce44730d6c10	7da7b732-940e-4cbf-a8e3-8bd162afa953	wednesday	2025-06-15 21:05:39.02	2025-06-15 21:05:39.02
441455bf-4285-45f5-a4a9-be08a718322f	7da7b732-940e-4cbf-a8e3-8bd162afa953	thursday	2025-06-15 21:05:39.033	2025-06-15 21:05:39.033
18a1f747-d0fd-4549-b54e-4d9416cfdb46	7da7b732-940e-4cbf-a8e3-8bd162afa953	friday	2025-06-15 21:05:39.045	2025-06-15 21:05:39.045
16d70829-2b79-4761-9cbe-8a871e7ef4cc	1602a175-b181-4bca-abe7-cddd32f36e87	monday	2025-06-15 21:05:39.061	2025-06-15 21:05:39.061
5dd4cdd0-141e-4f81-8940-dff4d97cfc67	1602a175-b181-4bca-abe7-cddd32f36e87	tuesday	2025-06-15 21:05:39.076	2025-06-15 21:05:39.076
f27c221e-97cf-4c48-a76a-824226173df3	1602a175-b181-4bca-abe7-cddd32f36e87	wednesday	2025-06-15 21:05:39.09	2025-06-15 21:05:39.09
2d9e7070-1ccb-4845-adbd-b43e751b5597	1602a175-b181-4bca-abe7-cddd32f36e87	thursday	2025-06-15 21:05:39.105	2025-06-15 21:05:39.105
0954fb70-099f-4807-8756-026a4f5a377c	1602a175-b181-4bca-abe7-cddd32f36e87	friday	2025-06-15 21:05:39.118	2025-06-15 21:05:39.118
b3a1924e-75c0-42d4-a856-0583c9708571	978f6c1b-ee4c-4a30-81af-ab42146c53c0	monday	2025-06-15 21:05:39.126	2025-06-15 21:05:39.126
298ebeeb-6eee-4935-811e-a2d71e8c5393	978f6c1b-ee4c-4a30-81af-ab42146c53c0	tuesday	2025-06-15 21:05:39.138	2025-06-15 21:05:39.138
b87f9240-caca-4300-9097-a4d584373ae6	978f6c1b-ee4c-4a30-81af-ab42146c53c0	wednesday	2025-06-15 21:05:39.151	2025-06-15 21:05:39.151
905e2821-f574-4490-bc08-e9bd4c75d817	978f6c1b-ee4c-4a30-81af-ab42146c53c0	thursday	2025-06-15 21:05:39.162	2025-06-15 21:05:39.162
d809e147-8cbc-4166-b917-3eadbfb2d94d	978f6c1b-ee4c-4a30-81af-ab42146c53c0	friday	2025-06-15 21:05:39.171	2025-06-15 21:05:39.171
25c90fbf-d9a1-40ea-b84b-511bee069999	ac64b373-889c-4ec4-a4a4-78d073d9c543	monday	2025-06-15 21:05:39.18	2025-06-15 21:05:39.18
9c4d789a-9977-4ef7-a4fa-173d2ed70a4d	ac64b373-889c-4ec4-a4a4-78d073d9c543	tuesday	2025-06-15 21:05:39.193	2025-06-15 21:05:39.193
10314fdf-efc8-4850-90f6-ff4a04e844c7	ac64b373-889c-4ec4-a4a4-78d073d9c543	wednesday	2025-06-15 21:05:39.205	2025-06-15 21:05:39.205
1dc367fb-b779-487e-b144-120f6ff68b3a	ac64b373-889c-4ec4-a4a4-78d073d9c543	thursday	2025-06-15 21:05:39.219	2025-06-15 21:05:39.219
fd46451a-c833-4dfe-a292-46c9b7669f09	ac64b373-889c-4ec4-a4a4-78d073d9c543	friday	2025-06-15 21:05:39.23	2025-06-15 21:05:39.23
983eabc9-08ae-4604-a7fd-d363cc4c8413	027ed3b6-0964-423f-b368-5efd5c606e5c	monday	2025-06-15 21:05:39.238	2025-06-15 21:05:39.238
69f1e8f8-89f9-4a34-9503-896f8e850f51	027ed3b6-0964-423f-b368-5efd5c606e5c	tuesday	2025-06-15 21:05:39.253	2025-06-15 21:05:39.253
a68ea0d6-6968-4e1c-953d-3d0052204505	027ed3b6-0964-423f-b368-5efd5c606e5c	wednesday	2025-06-15 21:05:39.267	2025-06-15 21:05:39.267
d90910f1-033f-4f81-a586-a2efb2fcc37b	027ed3b6-0964-423f-b368-5efd5c606e5c	thursday	2025-06-15 21:05:39.276	2025-06-15 21:05:39.276
f500c1dd-0713-4877-8ec0-a8decdc4b1dc	027ed3b6-0964-423f-b368-5efd5c606e5c	friday	2025-06-15 21:05:39.286	2025-06-15 21:05:39.286
a9911de7-dd66-4df9-b57f-05d8e72aaee6	fcc48c6f-41fb-4412-9e7c-b168554c432b	monday	2025-06-15 21:05:39.296	2025-06-15 21:05:39.296
4b2e6eb7-76d8-4d0c-90a4-611af13acb74	fcc48c6f-41fb-4412-9e7c-b168554c432b	tuesday	2025-06-15 21:05:39.305	2025-06-15 21:05:39.305
c2da349a-721b-4060-81f9-2e3a4c2dd6c8	fcc48c6f-41fb-4412-9e7c-b168554c432b	wednesday	2025-06-15 21:05:39.316	2025-06-15 21:05:39.316
d6af60ef-43da-496a-af0c-09c29a8d2a08	fcc48c6f-41fb-4412-9e7c-b168554c432b	thursday	2025-06-15 21:05:39.328	2025-06-15 21:05:39.328
3a6b1fff-66db-4628-b4ac-8a50a3a0482b	fcc48c6f-41fb-4412-9e7c-b168554c432b	friday	2025-06-15 21:05:39.338	2025-06-15 21:05:39.338
54afd6b1-a885-4e80-99e3-0b135f1546fe	6e721ae7-8cea-40e8-b3da-c5dc1271e0bf	monday	2025-06-15 21:05:39.348	2025-06-15 21:05:39.348
13d30b50-0d5a-4e86-9860-fe4bdddbbe38	6e721ae7-8cea-40e8-b3da-c5dc1271e0bf	tuesday	2025-06-15 21:05:39.358	2025-06-15 21:05:39.358
af4533e1-5c09-4fe2-b4fb-d63e9afd4708	6e721ae7-8cea-40e8-b3da-c5dc1271e0bf	wednesday	2025-06-15 21:05:39.37	2025-06-15 21:05:39.37
ac89c171-f855-412c-a621-d7827b4a01bd	6e721ae7-8cea-40e8-b3da-c5dc1271e0bf	thursday	2025-06-15 21:05:39.381	2025-06-15 21:05:39.381
6d189db8-e1a1-435c-88c7-ccd7b961f6e4	6e721ae7-8cea-40e8-b3da-c5dc1271e0bf	friday	2025-06-15 21:05:39.389	2025-06-15 21:05:39.389
69811a65-7632-40e6-b0cb-70892b23d3de	91048a72-f65e-44fb-bbbe-81dbae197b88	monday	2025-06-15 21:05:39.397	2025-06-15 21:05:39.397
ffad7dfc-14e0-477a-9d53-0415d26fd5eb	91048a72-f65e-44fb-bbbe-81dbae197b88	tuesday	2025-06-15 21:05:39.404	2025-06-15 21:05:39.404
dcd2b8fb-11d6-4ddd-bff0-53487cfd6fa4	91048a72-f65e-44fb-bbbe-81dbae197b88	wednesday	2025-06-15 21:05:39.413	2025-06-15 21:05:39.413
ee34ba45-ac95-4917-bf19-f94b27ef81ed	91048a72-f65e-44fb-bbbe-81dbae197b88	thursday	2025-06-15 21:05:39.42	2025-06-15 21:05:39.42
53a547a0-9d36-4edd-85a3-35d29be69aa8	91048a72-f65e-44fb-bbbe-81dbae197b88	friday	2025-06-15 21:05:39.428	2025-06-15 21:05:39.428
1156806b-d0e6-464b-99b9-2fe1c6ab4dbc	3282e602-5a11-484c-a898-531f7a213800	monday	2025-06-15 21:05:39.438	2025-06-15 21:05:39.438
fd590229-3007-4c3b-b252-1e382f6047d8	3282e602-5a11-484c-a898-531f7a213800	tuesday	2025-06-15 21:05:39.446	2025-06-15 21:05:39.446
22ead9ef-d575-4680-9b13-788ff36808ec	3282e602-5a11-484c-a898-531f7a213800	wednesday	2025-06-15 21:05:39.46	2025-06-15 21:05:39.46
8a1aa9c1-90e2-403b-87c1-e8f036b2c929	3282e602-5a11-484c-a898-531f7a213800	thursday	2025-06-15 21:05:39.471	2025-06-15 21:05:39.471
25676112-e713-45f5-817d-aa1326e1cffc	3282e602-5a11-484c-a898-531f7a213800	friday	2025-06-15 21:05:39.483	2025-06-15 21:05:39.483
\.


--
-- Data for Name: ScheduleLesson; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."ScheduleLesson" (id, "scheduleDayId", "lessonId", audiences, "createdAt", "orderId", "updatedAt") FROM stdin;
3dd2cbf8-53f1-4f00-bf95-2ff57421764b	9bc20b40-a838-485d-bd5a-2f6bf6057a0c	5b6e2b9d-68ae-4dde-a4d0-320b7201f561	{}	2025-06-15 21:05:38.705	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.705
34ae05f4-9725-444b-b4a9-cdf9165e16a9	9bc20b40-a838-485d-bd5a-2f6bf6057a0c	531b60d4-981e-4f19-8a1b-c09b9dee2b3f	{}	2025-06-15 21:05:38.725	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.725
d6b9f82d-9a5e-491a-9968-2ca0c10d2705	9bc20b40-a838-485d-bd5a-2f6bf6057a0c	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.727	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.727
5b1a6447-cde3-4f39-847b-688a9cdcc0e9	9bc20b40-a838-485d-bd5a-2f6bf6057a0c	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.729	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.729
ce522dd4-229f-40bb-a003-405bd65dd83e	9bc20b40-a838-485d-bd5a-2f6bf6057a0c	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.731	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.731
1c347b22-bc1a-4197-b1b9-ac177eee399d	9bc20b40-a838-485d-bd5a-2f6bf6057a0c	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.733	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.733
35b3030b-9b21-4314-825a-2a46496fae1a	0eea19c3-c2fb-47c1-84cd-91acdb7a0914	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:38.737	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.737
9ca06132-2ec2-49b9-aef4-f7cdaf30c124	0eea19c3-c2fb-47c1-84cd-91acdb7a0914	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:38.739	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.739
97763a84-18c1-48d8-9b50-2274083171b5	0eea19c3-c2fb-47c1-84cd-91acdb7a0914	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.741	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.741
0c2e32ee-6f6e-4d02-b665-b6ef9a7c5be3	0eea19c3-c2fb-47c1-84cd-91acdb7a0914	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.743	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.743
0a32bd81-6041-4142-b0df-f212e798c12b	0eea19c3-c2fb-47c1-84cd-91acdb7a0914	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{26}	2025-06-15 21:05:38.745	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.745
9f1c0528-3cb9-47f4-b056-5bd743307986	0eea19c3-c2fb-47c1-84cd-91acdb7a0914	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{26}	2025-06-15 21:05:38.747	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.747
8b1c601c-25c7-4769-8e53-569d4c0ef3e6	0eea19c3-c2fb-47c1-84cd-91acdb7a0914	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:38.748	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.748
41b07fc9-32e1-46cb-b363-6a92bbb5fe71	0eea19c3-c2fb-47c1-84cd-91acdb7a0914	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:38.75	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.75
81e44777-bfa3-4386-8e1a-696032e34bfd	6b8d83dd-96a4-4d3d-a00c-bdd38bc377f8	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:38.753	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.753
7c4a304c-a467-4ccd-9f69-a2d0e06f2222	6b8d83dd-96a4-4d3d-a00c-bdd38bc377f8	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.755	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.755
7022ad7c-b3e8-4ad6-9b68-cd2dde00dac9	6b8d83dd-96a4-4d3d-a00c-bdd38bc377f8	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.756	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.756
1a5b029e-3e0e-432f-b4dc-be9a763fe05c	6b8d83dd-96a4-4d3d-a00c-bdd38bc377f8	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:38.758	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.758
e31745cc-3859-4465-9a3e-24f94467fa93	6b8d83dd-96a4-4d3d-a00c-bdd38bc377f8	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:38.76	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.76
594dc37c-1c2a-4f12-880c-44734044fa50	6b8d83dd-96a4-4d3d-a00c-bdd38bc377f8	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:38.761	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.761
8cd1244b-8a2f-4ed7-b49f-d6738a7a9ba0	7adf050b-4e28-4e6c-859b-1f2ef88cb511	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:38.765	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.765
909b3144-09ed-4a20-9aa4-7d4151d7741e	7adf050b-4e28-4e6c-859b-1f2ef88cb511	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:38.767	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.767
cf4535a3-8ee6-4c3c-bdcf-42724fc5bf11	7adf050b-4e28-4e6c-859b-1f2ef88cb511	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.768	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.768
f8e14b1b-798d-4d11-9e35-2e89f1ce858b	7adf050b-4e28-4e6c-859b-1f2ef88cb511	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.769	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.769
df312623-9c4b-49da-848b-5ab4181cf016	7adf050b-4e28-4e6c-859b-1f2ef88cb511	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:38.771	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.771
bd3a4a97-7468-44fc-af27-0da9754867ec	7adf050b-4e28-4e6c-859b-1f2ef88cb511	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.772	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.772
04012c78-0b3a-4a9a-bc6c-33f8b5b5386d	7adf050b-4e28-4e6c-859b-1f2ef88cb511	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:38.774	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.774
431f9185-f91b-45a9-8ed2-92b53f6efd81	7adf050b-4e28-4e6c-859b-1f2ef88cb511	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.776	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.776
0ac35852-4bea-4a88-bf7e-bf5d86889387	c8c08e85-48aa-4024-8303-de995b2373d5	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.779	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.779
c2e59882-2aba-41f7-a28d-912ad68a5e21	c8c08e85-48aa-4024-8303-de995b2373d5	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.781	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.781
23a513a2-cc66-439a-bb64-b6e8611da06f	c8c08e85-48aa-4024-8303-de995b2373d5	6624b816-d3ff-48f9-aa4d-3caa51374f96	{}	2025-06-15 21:05:38.783	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.783
6451e540-add3-42dd-86af-2f44c0010fdb	c8c08e85-48aa-4024-8303-de995b2373d5	9958d5c7-0c01-470c-a511-6ec81075c69c	{}	2025-06-15 21:05:38.784	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.784
ab07e757-ad3f-45b8-9e7f-4eee1054cb89	c8c08e85-48aa-4024-8303-de995b2373d5	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:38.786	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.786
fb3feb73-a965-4039-bc84-1dc8b25b7f40	c8c08e85-48aa-4024-8303-de995b2373d5	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:38.788	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.788
2cb60709-d518-478d-b89f-db75197a5a91	c8c08e85-48aa-4024-8303-de995b2373d5	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:38.789	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.789
5e963052-3b34-4df2-95db-c6bd26246100	cc8d6506-321a-41a8-9342-897af5a16008	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.792	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.792
15f81d47-92eb-403c-a3a5-b04cfec0e580	cc8d6506-321a-41a8-9342-897af5a16008	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.794	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.794
86a2fb19-e6eb-4d5d-93bb-0bf0fe487a25	cc8d6506-321a-41a8-9342-897af5a16008	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.798	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.798
2179830b-3b8d-4550-9288-51c653a0e940	cc8d6506-321a-41a8-9342-897af5a16008	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.8	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.8
9a625203-84f5-4174-bec2-6ed99dffe90c	cc8d6506-321a-41a8-9342-897af5a16008	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.802	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.802
af7bf682-f817-4519-9eb0-e0a2cc1c5304	cc8d6506-321a-41a8-9342-897af5a16008	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.805	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.805
a6ee52e1-d3bd-4270-b5fc-a52be69e6d99	cc8d6506-321a-41a8-9342-897af5a16008	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.807	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.807
ac683ab9-3353-4d61-b707-5a71ae8191cb	cc8d6506-321a-41a8-9342-897af5a16008	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:38.809	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.809
bc66e55f-892b-4372-8a4e-a4a584a0219c	5f9f3c50-ec04-4cf5-812c-5fb6435d0aca	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:38.812	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.812
26ed1247-1fc4-4600-b952-407cf9386294	5f9f3c50-ec04-4cf5-812c-5fb6435d0aca	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:38.813	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.813
7fb18ee9-08e8-4ce7-9696-71b257c1443d	5f9f3c50-ec04-4cf5-812c-5fb6435d0aca	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:38.815	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.815
b0fef7eb-cf0b-4089-970f-f3fd19c09510	5f9f3c50-ec04-4cf5-812c-5fb6435d0aca	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:38.817	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.817
4845b39d-4306-45f3-8790-e7427536f6d2	5f9f3c50-ec04-4cf5-812c-5fb6435d0aca	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:38.819	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.819
b7bd4295-df83-428d-a04f-5ba6e0c50ebc	5f9f3c50-ec04-4cf5-812c-5fb6435d0aca	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:38.82	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.82
5269463e-9dbb-420a-be94-2993549fcf15	5f9f3c50-ec04-4cf5-812c-5fb6435d0aca	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.821	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.821
0d2dce28-e938-4e52-bf21-4ff8cf801b25	5f9f3c50-ec04-4cf5-812c-5fb6435d0aca	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:38.823	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.823
dc307c4b-3a37-4b5b-bc7f-6de972b3437e	b95181d5-55fa-4389-8afe-f5120373cdb2	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.826	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.826
c70e8792-182f-4450-ad07-cf092c44da31	b95181d5-55fa-4389-8afe-f5120373cdb2	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.828	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.828
8ddd0e79-052f-448a-b0f0-3df89102bd18	b95181d5-55fa-4389-8afe-f5120373cdb2	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.829	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.829
324a51b2-cf0e-4d83-99f6-46be7874524d	b95181d5-55fa-4389-8afe-f5120373cdb2	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.831	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.831
9149e11c-0dcd-47a2-bdf1-7c7a9b28cf6f	b95181d5-55fa-4389-8afe-f5120373cdb2	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{26}	2025-06-15 21:05:38.832	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.832
bd477a7e-1788-423e-992b-afe15708f62a	b95181d5-55fa-4389-8afe-f5120373cdb2	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{26}	2025-06-15 21:05:38.833	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.833
42bcc296-741a-4b53-888c-46b160637255	b95181d5-55fa-4389-8afe-f5120373cdb2	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:38.834	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.834
7a2b2d2a-bdef-49d2-88c1-7e87924b92d7	b95181d5-55fa-4389-8afe-f5120373cdb2	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:38.836	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.836
3531de61-7911-4ddf-a58c-74e4ada84008	aa745e93-6d83-4496-bcb7-b6e9c03f91c1	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.839	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.839
65ffb9e8-5c40-415c-b0e7-2db4bbbb3811	aa745e93-6d83-4496-bcb7-b6e9c03f91c1	8875cd1b-dc32-43b3-b442-8e44742be37c	{}	2025-06-15 21:05:38.841	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.841
d94bf0a8-d19f-4ffa-b1e9-33b2943c1f90	aa745e93-6d83-4496-bcb7-b6e9c03f91c1	eef6fd33-ae6f-46c8-9ad9-d2e67c252b1f	{}	2025-06-15 21:05:38.843	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.843
006e9f09-71db-41a1-a9f3-0babab0b17af	aa745e93-6d83-4496-bcb7-b6e9c03f91c1	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:38.844	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.844
7e0d4c32-f42f-4751-b947-85de1c31b07d	aa745e93-6d83-4496-bcb7-b6e9c03f91c1	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:38.845	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.845
a1c4f107-4d67-41b0-b025-7ca6d429a1c2	c64cc0ea-0259-40d8-8714-6e507eb8384e	5b6e2b9d-68ae-4dde-a4d0-320b7201f561	{}	2025-06-15 21:05:38.849	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.849
43a0fb91-8a6a-4df8-b5f5-b06bb5eeb612	c64cc0ea-0259-40d8-8714-6e507eb8384e	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:38.851	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.851
0d255c09-e894-4f22-8890-3b72aa32dbe2	c64cc0ea-0259-40d8-8714-6e507eb8384e	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:38.853	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.853
3f693664-36c6-4ee1-856f-569ea9d45f98	c64cc0ea-0259-40d8-8714-6e507eb8384e	6624b816-d3ff-48f9-aa4d-3caa51374f96	{}	2025-06-15 21:05:38.855	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.855
e938b0b3-64d2-410c-ad4a-f08576cbefbc	c64cc0ea-0259-40d8-8714-6e507eb8384e	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:38.856	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.856
cedf226e-e6e5-4c9b-9c94-b2fbb595d4a3	c64cc0ea-0259-40d8-8714-6e507eb8384e	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.858	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.858
2035384a-3af2-469e-b8c2-ba3c3d8fbc5b	1dadc86c-5b57-40fd-a243-b3ccdbe71f3d	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:38.862	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.862
0c0eca64-524b-45b3-8f38-7fc2930eacf1	1dadc86c-5b57-40fd-a243-b3ccdbe71f3d	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:38.864	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.864
8e36c761-e283-422f-b431-6f6a40d9bc10	1dadc86c-5b57-40fd-a243-b3ccdbe71f3d	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:38.866	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.866
be8750f7-71f8-4d50-a0fc-7181ece33c55	1dadc86c-5b57-40fd-a243-b3ccdbe71f3d	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:38.868	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.868
49f80973-fc85-47f1-b240-f7bf675c903b	1dadc86c-5b57-40fd-a243-b3ccdbe71f3d	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.87	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.87
ba55f47f-8fbe-4d77-bce8-8b24e55254db	1dadc86c-5b57-40fd-a243-b3ccdbe71f3d	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.872	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.872
ab5ee363-4fd7-4d78-825f-b8132ce82f41	6bb8cf7a-b324-4d81-886e-74d8c88b31ca	d1c81396-d532-4b52-836d-8746c8c0e7ee	{}	2025-06-15 21:05:38.875	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.875
67d02b16-b9bb-4585-bd10-a44bfdef8606	6bb8cf7a-b324-4d81-886e-74d8c88b31ca	7ee8bf89-6d3e-4b58-a731-b2f2788e2332	{}	2025-06-15 21:05:38.876	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.876
4109174a-2506-48f5-b5fd-15d1ec45b1f3	6bb8cf7a-b324-4d81-886e-74d8c88b31ca	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.878	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.878
2c4cc694-8bfc-40c0-b378-c60265e5d1f2	6bb8cf7a-b324-4d81-886e-74d8c88b31ca	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.88	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.88
5fabb263-be01-4e6e-a534-a44d2ca3a38d	6bb8cf7a-b324-4d81-886e-74d8c88b31ca	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.882	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.882
b6842d79-5cab-4e88-adac-fa747b84a6a3	6bb8cf7a-b324-4d81-886e-74d8c88b31ca	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.884	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.884
18e52a8a-9837-4f2b-9d6d-228c56e2912e	6bb8cf7a-b324-4d81-886e-74d8c88b31ca	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:38.886	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.886
f92d3351-f951-4557-bbc1-da2e86fc6825	6bb8cf7a-b324-4d81-886e-74d8c88b31ca	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:38.887	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.887
01c6959a-b86f-447e-81a3-4f36b1e3825d	9f34d1c6-a14d-4fe3-8755-0510d134fdf3	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:38.89	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.89
bb049d83-fe6d-47a7-ae62-8d2f84984240	9f34d1c6-a14d-4fe3-8755-0510d134fdf3	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.891	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.891
3efd391a-6c3f-4a6c-bb3d-ca14dadc7fa4	9f34d1c6-a14d-4fe3-8755-0510d134fdf3	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.894	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.894
5b48b80f-1864-40ae-8a8a-6e12a482c048	9f34d1c6-a14d-4fe3-8755-0510d134fdf3	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.895	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.895
26a506fd-0e74-4210-84d7-ba6319619f7a	9f34d1c6-a14d-4fe3-8755-0510d134fdf3	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:38.896	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.896
b4b07be2-9020-484e-aa6e-ded18a994424	9f34d1c6-a14d-4fe3-8755-0510d134fdf3	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:38.899	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.899
09f50f4c-e87b-4f29-a3c2-2d5c7d3bae7e	9f34d1c6-a14d-4fe3-8755-0510d134fdf3	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.9	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.9
271dda25-c203-4ac6-8d3c-77a3c489ef44	9f34d1c6-a14d-4fe3-8755-0510d134fdf3	aacc6809-727c-4146-9b82-962d525b4b7d	{}	2025-06-15 21:05:38.902	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.902
e43d93fa-5e61-4a9f-8b3f-b2703fcd81ad	503f0a9a-c33d-4c31-8ddd-22614d6be2e3	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.904	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.904
bd3a71bb-fbca-4a86-8d6f-6326e2d7a0dc	503f0a9a-c33d-4c31-8ddd-22614d6be2e3	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:38.906	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.906
10d9a237-441e-4f3f-8ac9-628c4ca79027	503f0a9a-c33d-4c31-8ddd-22614d6be2e3	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:38.908	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.908
a06d5c1f-4b5b-497f-85ed-61167f25cc83	503f0a9a-c33d-4c31-8ddd-22614d6be2e3	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:38.909	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.909
2b4b92b7-e815-4d26-b48c-44819179bcb0	503f0a9a-c33d-4c31-8ddd-22614d6be2e3	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.911	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.911
6a41a95a-2e43-4a58-b291-ffbbf9181c5d	503f0a9a-c33d-4c31-8ddd-22614d6be2e3	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.913	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.913
d6acd9f4-525f-4c58-8230-a4e1a763fc0c	503f0a9a-c33d-4c31-8ddd-22614d6be2e3	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:38.914	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.914
c0dc7859-2ceb-4ff5-84b5-6b3e86a1af61	503f0a9a-c33d-4c31-8ddd-22614d6be2e3	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.916	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.916
321cc4ce-0986-449a-af34-3796e7df6fce	b91b0d3a-eddd-4481-8d3e-0269824fb107	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:38.919	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.919
e212d7ae-bca8-4ece-9da7-03d62d39671c	b91b0d3a-eddd-4481-8d3e-0269824fb107	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:38.921	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.921
a0bcd76f-c131-41c3-a054-5861a51c2a92	b91b0d3a-eddd-4481-8d3e-0269824fb107	8b00821d-4bb1-4a61-8063-bcc50a03f596	{}	2025-06-15 21:05:38.922	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.922
8355c5f9-e57c-4c27-a108-8629532c224b	b91b0d3a-eddd-4481-8d3e-0269824fb107	9ddac61b-5f8b-413f-9b67-89cdc9c773ad	{}	2025-06-15 21:05:38.924	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.924
d4156eb6-349d-49d1-a22a-14ad3c01bbb2	b91b0d3a-eddd-4481-8d3e-0269824fb107	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:38.925	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.925
695af35b-492a-483e-ba50-d31a1888661f	b91b0d3a-eddd-4481-8d3e-0269824fb107	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:38.927	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.927
2e004e99-ac46-4ab8-9e93-fd415aef5278	83aeebfc-a81c-4bb3-86c2-dcc44c2dc25f	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.931	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.931
a020eef7-faca-4a99-ba36-bc58bc60a13e	83aeebfc-a81c-4bb3-86c2-dcc44c2dc25f	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.932	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.932
82546cbc-4609-48dc-916f-8ab0b613d01d	83aeebfc-a81c-4bb3-86c2-dcc44c2dc25f	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.934	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.934
69d479f9-41f4-4bde-b4e6-36078190a5fb	83aeebfc-a81c-4bb3-86c2-dcc44c2dc25f	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.936	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.936
23b84d8e-1011-411d-9de8-cc265f1c4c86	83aeebfc-a81c-4bb3-86c2-dcc44c2dc25f	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:38.938	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.938
d727ea52-19ae-481d-94a1-dcbaa017140c	83aeebfc-a81c-4bb3-86c2-dcc44c2dc25f	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:38.939	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.939
fcd2ff2c-2064-477e-aa36-bbac6d76cf5b	83aeebfc-a81c-4bb3-86c2-dcc44c2dc25f	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:38.941	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.941
e829ae8c-fb71-46c8-954e-2bef223b1c40	232cc4c7-ee77-47c6-96de-9e2eb95d9059	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.943	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.943
312ceda8-f2cc-4e5c-8881-0621df7e6317	232cc4c7-ee77-47c6-96de-9e2eb95d9059	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.945	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.945
1f8d104e-0bf7-4888-80a9-680049fcb1ec	232cc4c7-ee77-47c6-96de-9e2eb95d9059	8b00821d-4bb1-4a61-8063-bcc50a03f596	{}	2025-06-15 21:05:38.947	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.947
2f4c7b6a-17d9-45a8-b233-ebb01c863e0d	232cc4c7-ee77-47c6-96de-9e2eb95d9059	9ddac61b-5f8b-413f-9b67-89cdc9c773ad	{}	2025-06-15 21:05:38.948	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.948
58ff6a6c-54ff-438d-ab59-16731070563d	232cc4c7-ee77-47c6-96de-9e2eb95d9059	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.95	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.95
57c203f0-8dbb-438c-bdb6-0b4ad4562e9a	232cc4c7-ee77-47c6-96de-9e2eb95d9059	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.951	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.951
570787e9-9a92-4448-b667-75cb2cf7c847	232cc4c7-ee77-47c6-96de-9e2eb95d9059	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:38.953	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.953
d26db0cf-8dcc-486c-a31c-c3bd5eb41064	71f2c5dd-91e6-4b24-a794-26ea52ebb2bc	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.955	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.955
1f584b95-875b-448a-991a-0fed465f6822	71f2c5dd-91e6-4b24-a794-26ea52ebb2bc	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.956	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.956
b0513059-5acf-423a-975d-1e66e62c29fe	71f2c5dd-91e6-4b24-a794-26ea52ebb2bc	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:38.958	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.958
1ae002c8-c70b-4018-b3c2-5303693b8198	71f2c5dd-91e6-4b24-a794-26ea52ebb2bc	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:38.959	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.959
2ee8126c-00b3-4ff9-9c7f-95c9a5c8fded	71f2c5dd-91e6-4b24-a794-26ea52ebb2bc	aacc6809-727c-4146-9b82-962d525b4b7d	{}	2025-06-15 21:05:38.961	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.961
14f1c0e5-8fa1-4bc1-8909-dcd46606c049	71f2c5dd-91e6-4b24-a794-26ea52ebb2bc	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:38.963	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.963
64017c64-4c78-4d76-a60f-9463a690ff6f	71f2c5dd-91e6-4b24-a794-26ea52ebb2bc	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.964	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.964
8da2a79b-609b-4e5f-88ff-74f2cb6e5d28	71f2c5dd-91e6-4b24-a794-26ea52ebb2bc	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:38.966	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.966
f46b2937-e4e4-4f06-9806-c4d7cedccb7c	771c3bf0-a20d-48e6-b541-7c83dbb2eecb	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:38.969	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.969
17b2b29e-9f13-4964-aa3e-bc23b55f9e5d	771c3bf0-a20d-48e6-b541-7c83dbb2eecb	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:38.97	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.97
05f18df4-9e7c-41fb-9b9d-56ff7922336e	771c3bf0-a20d-48e6-b541-7c83dbb2eecb	d1c81396-d532-4b52-836d-8746c8c0e7ee	{}	2025-06-15 21:05:38.972	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.972
88033bde-9335-4c27-b435-059d267a2023	771c3bf0-a20d-48e6-b541-7c83dbb2eecb	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:38.973	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.973
14f760b4-fc2a-4402-9e4c-5544b4a0cd01	771c3bf0-a20d-48e6-b541-7c83dbb2eecb	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:38.975	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.975
a505e7be-6754-46a2-8340-81920a5dae79	771c3bf0-a20d-48e6-b541-7c83dbb2eecb	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:38.976	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.976
1ff882ff-2723-4235-b15d-01821e03e1ee	771c3bf0-a20d-48e6-b541-7c83dbb2eecb	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.978	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:38.978
f8ce742f-ac5a-4e36-a1f2-d601adea0301	771c3bf0-a20d-48e6-b541-7c83dbb2eecb	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:38.979	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:38.979
3df1f924-77ee-4192-94ef-ea530bbd48b8	29cbbbe3-db04-447f-8acd-a7983a602d20	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:38.982	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.982
8a349f61-7d8e-4ba7-a51f-2d53492d0ab0	29cbbbe3-db04-447f-8acd-a7983a602d20	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:38.983	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.983
7d18bb47-0ea9-4f82-9b5e-4ac26baa95ec	29cbbbe3-db04-447f-8acd-a7983a602d20	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:38.984	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.984
e0bc890f-f485-40ed-8ebf-de4eaafbb4f4	29cbbbe3-db04-447f-8acd-a7983a602d20	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:38.986	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.986
b91536f0-c0a6-4621-a42b-c209746c724f	29cbbbe3-db04-447f-8acd-a7983a602d20	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.987	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.987
a0c311a2-f77c-4480-9830-3df27b0dc8b6	29cbbbe3-db04-447f-8acd-a7983a602d20	7ee8bf89-6d3e-4b58-a731-b2f2788e2332	{}	2025-06-15 21:05:38.989	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:38.989
cc86cbf8-d489-441f-ac7a-218a360432b9	2e4aeb54-ff4e-44f8-b3ac-2524bd9930a2	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.993	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:38.993
b3ac3e5a-00b4-44d3-be34-dc24d1e24b67	2e4aeb54-ff4e-44f8-b3ac-2524bd9930a2	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:38.994	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:38.994
2ef7a529-0e8e-416a-b351-a9c4c04bfdb6	2e4aeb54-ff4e-44f8-b3ac-2524bd9930a2	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.995	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:38.995
68ae2b47-237d-4abc-b03e-f41b11516e8b	2e4aeb54-ff4e-44f8-b3ac-2524bd9930a2	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:38.997	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:38.997
dc5f37a1-670b-4639-8dbf-70c78e5e5191	2e4aeb54-ff4e-44f8-b3ac-2524bd9930a2	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:38.999	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:38.999
6a3256d2-c308-4540-8a7a-1810421ce3ba	2e4aeb54-ff4e-44f8-b3ac-2524bd9930a2	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39
f9682f2f-8e1c-4d1f-bbf8-220cca039566	2e4aeb54-ff4e-44f8-b3ac-2524bd9930a2	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.002	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.002
d8c7e7ec-2072-43ba-a796-ff6955990e79	c2cb36f1-b3da-49ee-afba-b9ef975c8537	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.005	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.005
e21439ea-f806-44b9-8d8b-bc05e724aabf	c2cb36f1-b3da-49ee-afba-b9ef975c8537	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.007	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.007
ea42315f-4468-4621-a7f1-13851bcdb74c	c2cb36f1-b3da-49ee-afba-b9ef975c8537	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.009	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.009
200f9af4-0341-4ff0-9e8f-00f4a4e69753	c2cb36f1-b3da-49ee-afba-b9ef975c8537	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.011	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.011
1ff55efb-6e4d-4e72-a9e1-6da5bd432ddc	c2cb36f1-b3da-49ee-afba-b9ef975c8537	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.013	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.013
edb4d7e5-26f1-4b0d-ba9a-86155d391fff	c2cb36f1-b3da-49ee-afba-b9ef975c8537	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:39.015	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.015
d49fedf3-476b-4006-8def-6e694af8447e	c2cb36f1-b3da-49ee-afba-b9ef975c8537	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{26}	2025-06-15 21:05:39.017	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.017
5b548e52-3722-487c-a966-75c6a676c262	c2cb36f1-b3da-49ee-afba-b9ef975c8537	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{26}	2025-06-15 21:05:39.018	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.018
eb476fcb-826b-4224-9581-ee367111ca5e	0dedc45b-2559-4d35-a1bc-ce44730d6c10	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:39.021	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.021
a75050af-b320-4f40-8aab-62d81240bb90	0dedc45b-2559-4d35-a1bc-ce44730d6c10	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:39.023	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.023
89f2ca2a-60ca-4460-abf3-16b4d0e44149	0dedc45b-2559-4d35-a1bc-ce44730d6c10	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.025	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.025
4986c8ce-6d90-45da-82b6-209259456c7b	0dedc45b-2559-4d35-a1bc-ce44730d6c10	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.027	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.027
1970b59a-dcb2-4f33-ab5b-23532e5f68c7	0dedc45b-2559-4d35-a1bc-ce44730d6c10	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.028	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.028
18111f4a-7a5f-4b56-87db-5b24f65cbc71	0dedc45b-2559-4d35-a1bc-ce44730d6c10	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.031	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.031
ecb9787e-89aa-4de5-a8b9-04b29353b6a5	441455bf-4285-45f5-a4a9-be08a718322f	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.034	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.034
b40309f2-a1ce-4ebd-8c75-7ee5c6882913	441455bf-4285-45f5-a4a9-be08a718322f	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.035	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.035
55c65ddd-d4d0-409e-9987-62d2fc9d18b0	441455bf-4285-45f5-a4a9-be08a718322f	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:39.036	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.036
fadf814f-3f6f-4a7e-a74c-e52d0135e400	441455bf-4285-45f5-a4a9-be08a718322f	422eebb8-d04a-450b-92b0-2a819b9320c9	{}	2025-06-15 21:05:39.038	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.038
1f744311-0405-4db8-a226-d6f085d8f3dc	441455bf-4285-45f5-a4a9-be08a718322f	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.04	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.04
611af30d-9d6f-4bbb-a9cb-2a4738188055	441455bf-4285-45f5-a4a9-be08a718322f	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.041	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.041
04a629f6-b60f-4748-8e64-51938b437344	441455bf-4285-45f5-a4a9-be08a718322f	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.043	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.043
1635a4ce-25ec-4e2e-aa8b-7b83860b4b16	441455bf-4285-45f5-a4a9-be08a718322f	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.044	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.044
7e19f29f-36ed-46bc-9742-6b7814134080	18a1f747-d0fd-4549-b54e-4d9416cfdb46	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.048	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.048
7d57760d-73f8-4b10-bb5a-bfe0145a3cac	18a1f747-d0fd-4549-b54e-4d9416cfdb46	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.05	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.05
6db742de-c721-4d7d-8a08-943244c6c1db	18a1f747-d0fd-4549-b54e-4d9416cfdb46	895417bd-f4e1-453b-9a2e-68a3048c0c23	{}	2025-06-15 21:05:39.051	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.051
931d22d4-2515-4f07-b83f-e86334936b89	18a1f747-d0fd-4549-b54e-4d9416cfdb46	3faec2d1-782d-453a-9df8-f921c79f87d2	{}	2025-06-15 21:05:39.053	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.053
cba9427c-e605-48c2-b9e7-a2f25a77d5eb	18a1f747-d0fd-4549-b54e-4d9416cfdb46	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.055	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.055
de85ae22-83bf-46cf-8660-b04c8af3b7f4	18a1f747-d0fd-4549-b54e-4d9416cfdb46	6624b816-d3ff-48f9-aa4d-3caa51374f96	{}	2025-06-15 21:05:39.059	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.059
6e4f1569-b14f-434b-a7a0-c18587f9b6da	16d70829-2b79-4761-9cbe-8a871e7ef4cc	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.062	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.062
2ba36084-4b63-4754-a9c3-2c94f6a7f0b4	16d70829-2b79-4761-9cbe-8a871e7ef4cc	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.064	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.064
6b69afc7-54a3-4adf-8c27-70a39ca18eea	16d70829-2b79-4761-9cbe-8a871e7ef4cc	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.066	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.066
f87103a8-bec5-4fc8-aa8d-b2ee6051dba5	16d70829-2b79-4761-9cbe-8a871e7ef4cc	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.068	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.068
e27a6908-b645-4020-a295-6648c4e885fd	16d70829-2b79-4761-9cbe-8a871e7ef4cc	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.071	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.071
11fec662-0653-4c78-bf8d-1de81f50825d	16d70829-2b79-4761-9cbe-8a871e7ef4cc	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.072	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.072
dd9071c6-f6e2-4be6-a3f9-bccf035130c1	16d70829-2b79-4761-9cbe-8a871e7ef4cc	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.073	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.073
c99bbd8c-ffc7-4661-9462-baea5d90d5bf	16d70829-2b79-4761-9cbe-8a871e7ef4cc	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.075	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.075
38d80cdf-b881-491c-bd29-b715d4e5112b	5dd4cdd0-141e-4f81-8940-dff4d97cfc67	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.078	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.078
de9b4df6-690d-4a6d-8e2d-c114e2e503e5	5dd4cdd0-141e-4f81-8940-dff4d97cfc67	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.08	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.08
e0edaa9a-3ad4-4a52-b44d-24cd2bc8a034	5dd4cdd0-141e-4f81-8940-dff4d97cfc67	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.082	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.082
ceb1b2ce-ddf1-4c14-9a1f-80740a5150d2	5dd4cdd0-141e-4f81-8940-dff4d97cfc67	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.083	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.083
5eb3eeb9-9336-42db-9603-9e6f67e13b53	5dd4cdd0-141e-4f81-8940-dff4d97cfc67	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.084	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.084
2a25c852-2be2-4e81-bc15-0bcf5dc88f4d	5dd4cdd0-141e-4f81-8940-dff4d97cfc67	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.085	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.085
3c12edb5-2487-4e1f-8550-9ac484e9deca	5dd4cdd0-141e-4f81-8940-dff4d97cfc67	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.087	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.087
25d1ef56-eb61-4b68-86e2-ce4f76da627f	5dd4cdd0-141e-4f81-8940-dff4d97cfc67	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.089	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.089
2172b94a-b754-42ae-9451-bc560cbf7ecc	f27c221e-97cf-4c48-a76a-824226173df3	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.091	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.091
bbc8037e-5e52-4101-9093-991ddc8842d6	f27c221e-97cf-4c48-a76a-824226173df3	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.093	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.093
45d53a98-3c22-4a96-bf74-2d474a71b99f	f27c221e-97cf-4c48-a76a-824226173df3	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.094	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.094
3819db08-d64a-42e5-981a-4327e1a4e0db	f27c221e-97cf-4c48-a76a-824226173df3	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.096	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.096
e529c446-f431-4e8c-a35d-0d4b53604414	f27c221e-97cf-4c48-a76a-824226173df3	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.097	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.097
212f7ddc-ec20-417a-b67e-369f9316892b	f27c221e-97cf-4c48-a76a-824226173df3	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.098	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.098
5723b6e7-8968-4df9-ac6e-ddafe7bcbc0e	f27c221e-97cf-4c48-a76a-824226173df3	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.101	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.101
e518948b-6631-4b26-b3a8-4072bea74d63	f27c221e-97cf-4c48-a76a-824226173df3	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.102	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.102
f80665db-a127-47b6-8701-dd95750b6987	2d9e7070-1ccb-4845-adbd-b43e751b5597	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:39.106	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.106
b61f5966-8c05-4270-948d-f320ac455a67	2d9e7070-1ccb-4845-adbd-b43e751b5597	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.107	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.107
5ce3a1f9-0acc-4216-a504-f6bb08601d6d	2d9e7070-1ccb-4845-adbd-b43e751b5597	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.109	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.109
0d966a84-63fd-4f1f-865c-8a64ddcd4000	2d9e7070-1ccb-4845-adbd-b43e751b5597	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.11	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.11
1d41f4ab-e52c-40a5-8060-28dde18a6a15	2d9e7070-1ccb-4845-adbd-b43e751b5597	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.111	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.111
4860da72-8a7c-4029-bdf9-fec1a664f7c3	2d9e7070-1ccb-4845-adbd-b43e751b5597	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.114	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.114
982c2685-54e3-460e-a80a-4234c8005854	2d9e7070-1ccb-4845-adbd-b43e751b5597	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.116	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.116
fc6dd5b1-0c66-4e77-a667-5fac17f84b41	2d9e7070-1ccb-4845-adbd-b43e751b5597	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.117	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.117
3cb6ac68-f93d-4be8-babb-89d8261ab246	0954fb70-099f-4807-8756-026a4f5a377c	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.119	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.119
8af4437c-4737-44b0-8023-69229f6ae90d	0954fb70-099f-4807-8756-026a4f5a377c	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.121	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.121
b0589126-81fc-4e84-87ca-5daf118429e5	0954fb70-099f-4807-8756-026a4f5a377c	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.123	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.123
6f2daa84-c038-4370-8502-d4a8acf79bb4	0954fb70-099f-4807-8756-026a4f5a377c	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.124	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.124
8005b004-d2d4-4e76-8600-9d9587f11a8e	b3a1924e-75c0-42d4-a856-0583c9708571	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.127	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.127
7680b98e-3915-471f-b66c-6553c0e0002d	b3a1924e-75c0-42d4-a856-0583c9708571	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.129	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.129
d39cf6e7-7ffb-4ef6-829f-1be67c1de946	b3a1924e-75c0-42d4-a856-0583c9708571	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.131	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.131
fa4a79d0-7220-4850-a859-ffddaa72e0fb	b3a1924e-75c0-42d4-a856-0583c9708571	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.132	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.132
4dda40a7-94a0-40ca-b3cd-66f4ef454275	b3a1924e-75c0-42d4-a856-0583c9708571	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.134	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.134
f1d70ac5-46e4-432e-8712-42f1cffb1bae	b3a1924e-75c0-42d4-a856-0583c9708571	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.135	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.135
1b8b7c67-b762-4079-bda6-e1eca2fa776d	b3a1924e-75c0-42d4-a856-0583c9708571	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.136	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.136
cdc16eec-ab88-4818-8b74-51c4a19ce64b	b3a1924e-75c0-42d4-a856-0583c9708571	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.137	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.137
dae1f26a-8be2-46dd-bab7-e74cada19d6a	298ebeeb-6eee-4935-811e-a2d71e8c5393	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.139	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.139
7029fd45-3ad8-46f3-b45f-8dbb7d71caa8	298ebeeb-6eee-4935-811e-a2d71e8c5393	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.141	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.141
cd524a73-553b-4654-b511-a41cb433bc4a	298ebeeb-6eee-4935-811e-a2d71e8c5393	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.142	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.142
e0c90e7d-6d4d-4170-bcd8-fb02aa584013	298ebeeb-6eee-4935-811e-a2d71e8c5393	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.144	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.144
10dff525-bf1f-4262-95df-21864f7e109c	298ebeeb-6eee-4935-811e-a2d71e8c5393	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.145	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.145
38680013-f20b-451e-966e-0e73b1a994b4	298ebeeb-6eee-4935-811e-a2d71e8c5393	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.147	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.147
6de66d82-cbc1-4a0e-a2f9-e3b5c76e5f6b	298ebeeb-6eee-4935-811e-a2d71e8c5393	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.148	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.148
796bcd28-a3e4-4cb3-9a5f-9bc63024508a	298ebeeb-6eee-4935-811e-a2d71e8c5393	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.15	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.15
588e005e-67c7-47d1-b662-cf34697260ea	b87f9240-caca-4300-9097-a4d584373ae6	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.152	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.152
975bfa2b-15fe-42dc-ba46-177f9250b73c	b87f9240-caca-4300-9097-a4d584373ae6	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.153	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.153
ad056aa5-9868-4d7e-9f32-3f6194467145	b87f9240-caca-4300-9097-a4d584373ae6	e6adaf14-ef89-43c2-ba93-3b0d1540d5aa	{26}	2025-06-15 21:05:39.154	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.154
2b231eda-d2e4-493c-9062-624932926127	b87f9240-caca-4300-9097-a4d584373ae6	e6adaf14-ef89-43c2-ba93-3b0d1540d5aa	{26}	2025-06-15 21:05:39.156	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.156
baf2bd4b-a19a-42ff-bb74-0d35383a8780	b87f9240-caca-4300-9097-a4d584373ae6	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.157	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.157
a50b7016-ed9b-4fc5-b25a-8602d473dd50	b87f9240-caca-4300-9097-a4d584373ae6	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.159	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.159
82b49f2f-948d-4731-a135-c0f05d2dd4ed	b87f9240-caca-4300-9097-a4d584373ae6	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.16	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.16
aba5177e-aae4-4159-b19e-c7758f8b86bb	b87f9240-caca-4300-9097-a4d584373ae6	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.161	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.161
6d9203c4-3ead-478e-a5bc-84739d0700bc	905e2821-f574-4490-bc08-e9bd4c75d817	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.163	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.163
28cbe1bc-bc3c-4e93-8712-fa0db129cf3e	905e2821-f574-4490-bc08-e9bd4c75d817	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.165	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.165
5f5f71f5-ac05-4dc4-8196-f4a653e2d513	905e2821-f574-4490-bc08-e9bd4c75d817	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.166	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.166
a96332d8-efc0-4cc5-835d-9f1141421c3c	905e2821-f574-4490-bc08-e9bd4c75d817	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.167	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.167
83b3e4ef-c4df-4ed2-a411-2f46809f6a5d	905e2821-f574-4490-bc08-e9bd4c75d817	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.169	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.169
9d1e7f88-2def-4a4e-b2f1-656838f6f90a	905e2821-f574-4490-bc08-e9bd4c75d817	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.17	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.17
d7baa6b9-768c-44bd-99c0-1883c617abbc	d809e147-8cbc-4166-b917-3eadbfb2d94d	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.172	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.172
e5d5a331-0e25-46b5-be3a-493be50bbf24	d809e147-8cbc-4166-b917-3eadbfb2d94d	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.173	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.173
594d2760-c293-47e0-a662-f23e0cbd4862	d809e147-8cbc-4166-b917-3eadbfb2d94d	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.175	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.175
83489fbe-2588-4f5d-92a8-6da1ac919dea	d809e147-8cbc-4166-b917-3eadbfb2d94d	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.176	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.176
31cc5e47-9677-4890-bf57-4fd30e00ad0a	d809e147-8cbc-4166-b917-3eadbfb2d94d	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.177	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.177
b35c110a-1077-41ab-9b0b-6ba6941b4f9b	d809e147-8cbc-4166-b917-3eadbfb2d94d	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:39.178	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.178
a30c3ad1-a56a-47b1-b9fd-bd78c4b05949	25c90fbf-d9a1-40ea-b84b-511bee069999	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.181	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.181
156eed8f-869e-4112-91ff-9a9f7f57c567	25c90fbf-d9a1-40ea-b84b-511bee069999	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.182	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.182
db9e1a71-7601-4ef8-abe3-c6ea6e51983d	25c90fbf-d9a1-40ea-b84b-511bee069999	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.184	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.184
bb950ec4-fea3-4f52-84c2-3829ed8de875	25c90fbf-d9a1-40ea-b84b-511bee069999	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.185	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.185
11e8ae07-743d-411c-9e64-cd42e2d393d8	25c90fbf-d9a1-40ea-b84b-511bee069999	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.187	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.187
f72b3842-ecf7-4e96-afec-688d39738b29	25c90fbf-d9a1-40ea-b84b-511bee069999	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.188	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.188
4f1f3533-5a85-4396-8ec0-a66655c69ac9	25c90fbf-d9a1-40ea-b84b-511bee069999	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.191	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.191
2ab6589a-43b1-4df9-927e-4892379d3e01	25c90fbf-d9a1-40ea-b84b-511bee069999	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.192	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.192
bf4b9cc2-d3d6-42e7-9024-58d2a260f504	9c4d789a-9977-4ef7-a4fa-173d2ed70a4d	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.194	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.194
9b8d308f-e720-4a50-996e-c31a9f52a2f9	9c4d789a-9977-4ef7-a4fa-173d2ed70a4d	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.196	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.196
929a3e00-465e-40d6-9a5a-839accc1404d	9c4d789a-9977-4ef7-a4fa-173d2ed70a4d	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.197	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.197
5ec013e3-cf38-45ec-b9c0-bff86e7db7bc	9c4d789a-9977-4ef7-a4fa-173d2ed70a4d	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.199	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.199
5d4a7c2d-eb07-4f85-bb83-f1ff43f218ff	9c4d789a-9977-4ef7-a4fa-173d2ed70a4d	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.2	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.2
a7b78f43-cfc1-4ad7-8cb7-c55cf3c511e5	9c4d789a-9977-4ef7-a4fa-173d2ed70a4d	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.202	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.202
172294b1-bda2-4a58-b645-5a986b5f26a6	9c4d789a-9977-4ef7-a4fa-173d2ed70a4d	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.204	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.204
9aece960-fc4e-4c60-997b-1de66ebc130d	10314fdf-efc8-4850-90f6-ff4a04e844c7	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.208	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.208
df7142ad-b536-4230-a7e9-2f4f32ff815e	10314fdf-efc8-4850-90f6-ff4a04e844c7	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.209	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.209
03e63ed1-f4bc-4ea3-adac-a108a7eea365	10314fdf-efc8-4850-90f6-ff4a04e844c7	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.21	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.21
0f318ae4-93f6-4a30-9731-9730027c9773	10314fdf-efc8-4850-90f6-ff4a04e844c7	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.212	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.212
0fd1fde9-7734-4bb2-b3df-ec5757f29e77	10314fdf-efc8-4850-90f6-ff4a04e844c7	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.213	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.213
f601aed0-c36f-4d92-827f-a15ed509bd3e	10314fdf-efc8-4850-90f6-ff4a04e844c7	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.215	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.215
3133a52c-a668-4567-bee2-d3005e661c7f	10314fdf-efc8-4850-90f6-ff4a04e844c7	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.216	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.216
5602d064-a70e-4457-b0f0-22dcfe3a829d	10314fdf-efc8-4850-90f6-ff4a04e844c7	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.218	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.218
05a69a27-2a86-40e4-9b94-3aa457b078f7	1dc367fb-b779-487e-b144-120f6ff68b3a	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.22	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.22
e1a24d16-f1c2-4525-8634-d48441caea8b	1dc367fb-b779-487e-b144-120f6ff68b3a	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.221	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.221
364a28a1-1836-4443-87bc-5e7f15f3d4a3	1dc367fb-b779-487e-b144-120f6ff68b3a	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.222	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.222
86f5d0bc-120a-40f9-85d6-7f797e48db34	1dc367fb-b779-487e-b144-120f6ff68b3a	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.224	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.224
f4d0d6c3-a6de-4d7a-b983-87072439cd7a	1dc367fb-b779-487e-b144-120f6ff68b3a	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.225	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.225
1a29326e-7e55-4e5f-b954-8b65e997f33b	1dc367fb-b779-487e-b144-120f6ff68b3a	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.226	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.226
8fe3a741-1686-43ac-b8d9-8409441b8b72	1dc367fb-b779-487e-b144-120f6ff68b3a	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.227	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.227
928f768f-b1c2-46c6-9cd3-cca018d9f310	1dc367fb-b779-487e-b144-120f6ff68b3a	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.228	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.228
2b877a27-5c51-4b18-b402-378486ce70f7	fd46451a-c833-4dfe-a292-46c9b7669f09	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.231	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.231
cd9372a1-be6f-4b6b-a233-de180e12f120	fd46451a-c833-4dfe-a292-46c9b7669f09	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.232	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.232
eee9636a-df36-428a-bdd4-ded50aecfa66	fd46451a-c833-4dfe-a292-46c9b7669f09	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.233	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.233
40a197c9-26fa-4bb1-9234-e52aafd0fb55	fd46451a-c833-4dfe-a292-46c9b7669f09	fc64e09a-0555-49df-83df-38d89b3f7ad0	{44}	2025-06-15 21:05:39.234	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.234
fb7acc8d-dcaf-4af8-8f2e-c5afbfbc7687	fd46451a-c833-4dfe-a292-46c9b7669f09	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:39.236	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.236
697ec240-2f40-48ab-b38d-246dd59e406a	983eabc9-08ae-4604-a7fd-d363cc4c8413	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.239	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.239
a6e6c00e-557c-4d7b-83de-168b7245d8a0	983eabc9-08ae-4604-a7fd-d363cc4c8413	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.24	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.24
f2fe7691-bcdb-4152-b115-4f6d3c18ba29	983eabc9-08ae-4604-a7fd-d363cc4c8413	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.243	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.243
e98c0d9c-a777-4ad7-8943-190e2d947c7e	983eabc9-08ae-4604-a7fd-d363cc4c8413	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.245	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.245
b1e03ea7-6ebd-45b4-bf83-08c1b3db833f	983eabc9-08ae-4604-a7fd-d363cc4c8413	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.247	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.247
bd512d7f-4d2b-4cb8-8718-4fa312f4644b	983eabc9-08ae-4604-a7fd-d363cc4c8413	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.249	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.249
80c51276-6ce3-4c82-8f15-988d10e427e5	983eabc9-08ae-4604-a7fd-d363cc4c8413	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.251	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.251
bf4a33e7-7230-4e7f-8a74-bd30cae279f3	983eabc9-08ae-4604-a7fd-d363cc4c8413	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.252	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.252
d441c510-45f5-4600-a166-6e53e28ed94c	69f1e8f8-89f9-4a34-9503-896f8e850f51	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:39.254	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.254
bdb0f890-dfee-4e28-ac8a-f6ebace2ec53	69f1e8f8-89f9-4a34-9503-896f8e850f51	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:39.256	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.256
e9c336c3-c69f-4e93-97e3-65792862f33f	69f1e8f8-89f9-4a34-9503-896f8e850f51	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.257	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.257
ab1555b5-2b5c-4ce0-8006-202d80f16064	69f1e8f8-89f9-4a34-9503-896f8e850f51	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.258	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.258
c356ffad-c569-40ef-967e-7998ea047ef3	69f1e8f8-89f9-4a34-9503-896f8e850f51	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.261	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.261
5168d423-eace-40d0-8a71-0e9b5e52b28f	69f1e8f8-89f9-4a34-9503-896f8e850f51	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.262	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.262
37064348-3d0f-4d2b-b952-65092917cd95	69f1e8f8-89f9-4a34-9503-896f8e850f51	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.264	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.264
11d01692-31aa-4b9a-bccb-004fe27ac3d0	69f1e8f8-89f9-4a34-9503-896f8e850f51	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.265	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.265
bde8d023-c7a3-47b7-97ae-8556bf7d9eef	a68ea0d6-6968-4e1c-953d-3d0052204505	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.268	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.268
6bd923f7-ec98-4bd2-a336-e3a81579bcf5	a68ea0d6-6968-4e1c-953d-3d0052204505	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.269	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.269
dfc548b2-6872-4ab7-b7ed-e8121758d760	a68ea0d6-6968-4e1c-953d-3d0052204505	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.27	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.27
b060502e-478f-433e-9095-56e4dd88b599	a68ea0d6-6968-4e1c-953d-3d0052204505	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.273	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.273
a10ed2d6-6ddb-4b12-87db-2d9669f0ab22	a68ea0d6-6968-4e1c-953d-3d0052204505	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.274	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.274
0690e8c7-e489-42ae-accd-a55233692873	a68ea0d6-6968-4e1c-953d-3d0052204505	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.275	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.275
f2b00111-1dc7-4cc4-b8b3-a85074d32123	d90910f1-033f-4f81-a586-a2efb2fcc37b	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.277	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.277
a008da32-7bf2-48af-8c63-4ebcd304beec	d90910f1-033f-4f81-a586-a2efb2fcc37b	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.278	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.278
4dc08f3c-fd2a-4098-8f8d-3c0e6bfe4cf7	d90910f1-033f-4f81-a586-a2efb2fcc37b	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.279	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.279
20706969-93eb-4b78-81b9-23ec6f95e02e	d90910f1-033f-4f81-a586-a2efb2fcc37b	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.28	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.28
bcef73b1-61ae-48f2-b5cf-4c66909db5c0	d90910f1-033f-4f81-a586-a2efb2fcc37b	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.282	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.282
2bafa3a7-7a3d-43c1-9a7a-03ed48b86df1	d90910f1-033f-4f81-a586-a2efb2fcc37b	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.283	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.283
00ec396f-23d8-4ee3-a63c-14890818231e	d90910f1-033f-4f81-a586-a2efb2fcc37b	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.284	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.284
f8f43a31-3533-4632-91af-a35e621509df	d90910f1-033f-4f81-a586-a2efb2fcc37b	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:39.285	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.285
99020e3b-ee54-47e1-9493-233694ca173d	f500c1dd-0713-4877-8ec0-a8decdc4b1dc	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.287	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.287
696e4b3f-aee3-4de4-8696-55807406c4e0	f500c1dd-0713-4877-8ec0-a8decdc4b1dc	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.288	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.288
2add2eab-6aa0-4214-862e-ebc577e116a0	f500c1dd-0713-4877-8ec0-a8decdc4b1dc	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.29	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.29
eecdab62-21a1-4dc7-9c0b-eb9d361189b2	f500c1dd-0713-4877-8ec0-a8decdc4b1dc	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.291	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.291
cb6de191-ac24-4b67-b30b-a9778d32ec7a	f500c1dd-0713-4877-8ec0-a8decdc4b1dc	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:39.292	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.292
f0faafb3-3331-408e-b5fa-504f83e1c61f	f500c1dd-0713-4877-8ec0-a8decdc4b1dc	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{24}	2025-06-15 21:05:39.294	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.294
fbf77d05-05b2-495b-9871-7ed658d7b6d3	a9911de7-dd66-4df9-b57f-05d8e72aaee6	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.297	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.297
b928d212-8c8b-4982-9753-670624de57ac	a9911de7-dd66-4df9-b57f-05d8e72aaee6	93e2e768-4f8d-4de0-8666-b4e2747bd74e	{}	2025-06-15 21:05:39.298	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.298
60633003-efdd-4d69-b83d-647563a86a4f	a9911de7-dd66-4df9-b57f-05d8e72aaee6	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.299	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.299
427db8d7-d3e5-4d78-bdec-883093b5f5ae	a9911de7-dd66-4df9-b57f-05d8e72aaee6	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.301	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.301
f4417749-1aca-4567-91f5-6d68ec5e23a2	a9911de7-dd66-4df9-b57f-05d8e72aaee6	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.302	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.302
f45a70ba-eb1e-4c80-a49a-215a77957e7c	a9911de7-dd66-4df9-b57f-05d8e72aaee6	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.303	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.303
92008369-d046-4313-8ba9-1ecaa1b49ffd	a9911de7-dd66-4df9-b57f-05d8e72aaee6	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.304	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.304
1cd8e1c5-5c9c-4bc4-8c0a-dba535b88539	4b2e6eb7-76d8-4d0c-90a4-611af13acb74	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.306	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.306
cdd56b64-77d4-4391-b421-7e3a77973ff8	4b2e6eb7-76d8-4d0c-90a4-611af13acb74	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.308	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.308
133c7779-5f5c-4a7f-bd52-7510154b715a	4b2e6eb7-76d8-4d0c-90a4-611af13acb74	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.309	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.309
a5c02de7-9fc1-4415-adeb-09e4d6eed071	4b2e6eb7-76d8-4d0c-90a4-611af13acb74	5ba219c2-5cee-4e25-be12-ae69e6f0f450	{}	2025-06-15 21:05:39.31	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.31
d1e49ab9-5a04-4598-8180-9da81797344c	4b2e6eb7-76d8-4d0c-90a4-611af13acb74	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.312	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.312
f1318f94-fe39-4250-b5b5-43539a3df486	4b2e6eb7-76d8-4d0c-90a4-611af13acb74	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.313	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.313
f8a578bc-579a-4b0d-9820-ac75188380e7	4b2e6eb7-76d8-4d0c-90a4-611af13acb74	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.314	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.314
7a376b2e-b974-4e3d-a0e8-eea1c1ec815f	4b2e6eb7-76d8-4d0c-90a4-611af13acb74	d4037ec5-8c2f-4706-9ca0-fdce8652f578	{}	2025-06-15 21:05:39.315	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.315
09b0c2e7-a085-4659-b86b-742251c7d455	c2da349a-721b-4060-81f9-2e3a4c2dd6c8	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.317	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.317
d2dc90f6-ffe7-4330-b8d4-615b9b4eb229	c2da349a-721b-4060-81f9-2e3a4c2dd6c8	d1362862-6e46-4b5b-bf11-d05a2dc099ac	{}	2025-06-15 21:05:39.319	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.319
c460595a-3359-4266-89de-0cb7a0ecb328	c2da349a-721b-4060-81f9-2e3a4c2dd6c8	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.32	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.32
c2b71ba3-9323-4750-a971-ce0440ae8664	c2da349a-721b-4060-81f9-2e3a4c2dd6c8	57d87ce0-7b9c-4872-a177-a6ad0379c4d0	{}	2025-06-15 21:05:39.321	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.321
85acf93b-d8b0-48af-982a-4883e0453bb5	c2da349a-721b-4060-81f9-2e3a4c2dd6c8	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.322	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.322
f9e9247c-95e0-4229-bd06-2fa2afa22eed	c2da349a-721b-4060-81f9-2e3a4c2dd6c8	49318b60-a141-49fc-bb3d-56c295b44987	{}	2025-06-15 21:05:39.323	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.323
868a865b-f4ca-4017-8c08-d70213ee1489	c2da349a-721b-4060-81f9-2e3a4c2dd6c8	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.324	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.324
034be83a-a9de-446e-95dd-a0a1321543b3	c2da349a-721b-4060-81f9-2e3a4c2dd6c8	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.325	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.325
a9fd3f08-7f03-4392-8bb8-9f684af20d27	d6af60ef-43da-496a-af0c-09c29a8d2a08	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.328	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.328
01e7d748-3a45-44fb-96a8-052ccd043fb6	d6af60ef-43da-496a-af0c-09c29a8d2a08	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.331	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.331
13e9c7a1-34cf-409b-a55b-e54c8ca246ca	d6af60ef-43da-496a-af0c-09c29a8d2a08	10f6a822-9b45-48c3-a4fb-12b06608c09e	{}	2025-06-15 21:05:39.332	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.332
d57c806d-73c2-49ed-9050-cd0f00d86a92	d6af60ef-43da-496a-af0c-09c29a8d2a08	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.334	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.334
10055ac2-ef9e-4ddc-a21a-3b78d32a21d5	d6af60ef-43da-496a-af0c-09c29a8d2a08	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.335	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.335
78c98930-a0ae-4a61-9500-e74e611e8a80	d6af60ef-43da-496a-af0c-09c29a8d2a08	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.336	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.336
7c04d7fe-5010-4637-a711-9f6253ad94d5	d6af60ef-43da-496a-af0c-09c29a8d2a08	38dfa1d8-fb00-40d5-97d9-d1403ce97ef2	{33}	2025-06-15 21:05:39.337	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.337
a4ceac1c-e102-4f01-9585-b4b62f33418c	3a6b1fff-66db-4628-b4ac-8a50a3a0482b	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.339	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.339
ff053719-d6fe-4a21-86e2-b4524f6ed15e	3a6b1fff-66db-4628-b4ac-8a50a3a0482b	466e126f-0361-4d0e-9606-ff354fdc30a6	{}	2025-06-15 21:05:39.34	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.34
c6ef1d05-6f60-4738-a51c-fe847683d2df	3a6b1fff-66db-4628-b4ac-8a50a3a0482b	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.341	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.341
70de51c9-8643-4ff6-a9fa-ca6a9ec982b7	3a6b1fff-66db-4628-b4ac-8a50a3a0482b	39cfb4cf-ad2c-42c3-ad91-41782cc381db	{}	2025-06-15 21:05:39.342	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.342
e9b654b6-177b-4981-8996-4b0bf65a4363	3a6b1fff-66db-4628-b4ac-8a50a3a0482b	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.344	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.344
dd0b87bc-70b2-4d7c-bef8-e2436248fa1d	3a6b1fff-66db-4628-b4ac-8a50a3a0482b	f8b5ec84-573e-42f5-815a-d5628c015d90	{}	2025-06-15 21:05:39.345	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.345
5677d9cd-698c-431c-b9cc-58ef641de32c	54afd6b1-a885-4e80-99e3-0b135f1546fe	9cb2df3f-072a-489e-a306-a82413ebfe54	{}	2025-06-15 21:05:39.349	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.349
907f130c-3fc5-463e-a149-317bc4bd6ce8	54afd6b1-a885-4e80-99e3-0b135f1546fe	9cb2df3f-072a-489e-a306-a82413ebfe54	{}	2025-06-15 21:05:39.35	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.35
9fa9a209-cb04-433b-a5f4-5c34d1514f63	54afd6b1-a885-4e80-99e3-0b135f1546fe	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.351	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.351
5304a667-a217-4e40-b75e-87a6be25bd9b	54afd6b1-a885-4e80-99e3-0b135f1546fe	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.352	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.352
60505371-ee3e-4096-920a-93a962e026f1	54afd6b1-a885-4e80-99e3-0b135f1546fe	5d2909d6-721f-4239-86bd-32c0684a019e	{49}	2025-06-15 21:05:39.355	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.355
2a9bf446-874f-480b-8a55-a0c112dc18fe	54afd6b1-a885-4e80-99e3-0b135f1546fe	5d2909d6-721f-4239-86bd-32c0684a019e	{49}	2025-06-15 21:05:39.356	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.356
347b1c75-d7fa-450b-a600-6acee387711a	13d30b50-0d5a-4e86-9860-fe4bdddbbe38	d6850f71-25cb-475d-ac80-3ff82d1752af	{}	2025-06-15 21:05:39.359	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.359
e905cc80-6b67-469c-a607-47f5d705f27b	13d30b50-0d5a-4e86-9860-fe4bdddbbe38	d6850f71-25cb-475d-ac80-3ff82d1752af	{}	2025-06-15 21:05:39.361	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.361
350d43c5-7fdb-4a3a-8488-b4e8b221f29d	13d30b50-0d5a-4e86-9860-fe4bdddbbe38	170c00e9-7072-4cff-8f71-e7d40d49ec3a	{}	2025-06-15 21:05:39.362	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.362
ae6e49f3-5e7d-4268-9ba0-0c2b5042aa5b	13d30b50-0d5a-4e86-9860-fe4bdddbbe38	170c00e9-7072-4cff-8f71-e7d40d49ec3a	{}	2025-06-15 21:05:39.363	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.363
6879357c-5f9d-4007-934d-216debdeea05	13d30b50-0d5a-4e86-9860-fe4bdddbbe38	170c00e9-7072-4cff-8f71-e7d40d49ec3a	{}	2025-06-15 21:05:39.364	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.364
8b776d87-cf7e-45d5-adc8-183b9eefce04	13d30b50-0d5a-4e86-9860-fe4bdddbbe38	b352b75b-c117-4fdc-bdc2-ea8d87a7ae9a	{}	2025-06-15 21:05:39.365	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.365
d8cc6540-07ad-4562-b643-c3628e7c0561	13d30b50-0d5a-4e86-9860-fe4bdddbbe38	3d2c83b0-7d82-432a-a551-6c3e4239b998	{}	2025-06-15 21:05:39.366	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.366
1a4864e6-276d-4644-85a3-2cc0939b3808	13d30b50-0d5a-4e86-9860-fe4bdddbbe38	3d2c83b0-7d82-432a-a551-6c3e4239b998	{}	2025-06-15 21:05:39.368	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.368
a3f134dd-e267-4dce-bc62-51a99bac1383	af4533e1-5c09-4fe2-b4fb-d63e9afd4708	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{26}	2025-06-15 21:05:39.37	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.37
4e60f91e-a8ae-4de8-9f40-6f87e10c26a4	af4533e1-5c09-4fe2-b4fb-d63e9afd4708	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{26}	2025-06-15 21:05:39.372	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.372
5e739ce3-8837-4e2e-b6e8-ef5ea55317fb	af4533e1-5c09-4fe2-b4fb-d63e9afd4708	170c00e9-7072-4cff-8f71-e7d40d49ec3a	{}	2025-06-15 21:05:39.373	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.373
04788b66-6213-4ff2-be08-7d13102b2b59	af4533e1-5c09-4fe2-b4fb-d63e9afd4708	170c00e9-7072-4cff-8f71-e7d40d49ec3a	{}	2025-06-15 21:05:39.374	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.374
060a36cd-4c09-4096-a42c-13348e009ac1	af4533e1-5c09-4fe2-b4fb-d63e9afd4708	b352b75b-c117-4fdc-bdc2-ea8d87a7ae9a	{}	2025-06-15 21:05:39.375	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.375
331e9a8e-2343-4320-af4e-b54341c429df	af4533e1-5c09-4fe2-b4fb-d63e9afd4708	b352b75b-c117-4fdc-bdc2-ea8d87a7ae9a	{}	2025-06-15 21:05:39.378	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.378
f2618a54-a5c7-4411-aa7d-3ab675596366	af4533e1-5c09-4fe2-b4fb-d63e9afd4708	170c00e9-7072-4cff-8f71-e7d40d49ec3a	{}	2025-06-15 21:05:39.379	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.379
75e33c01-3cd4-4c4e-9780-4ac176d23185	af4533e1-5c09-4fe2-b4fb-d63e9afd4708	d6850f71-25cb-475d-ac80-3ff82d1752af	{}	2025-06-15 21:05:39.38	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.38
ebae775c-5ecd-4c52-b0a1-747ac469a9e9	ac89c171-f855-412c-a621-d7827b4a01bd	571dfc13-c753-49c3-9422-86b9689aea36	{}	2025-06-15 21:05:39.382	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.382
7b10a048-8392-47bb-81e8-9d438c002405	ac89c171-f855-412c-a621-d7827b4a01bd	571dfc13-c753-49c3-9422-86b9689aea36	{}	2025-06-15 21:05:39.383	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.383
83695177-6f8c-40e8-8203-c80cbe8a70e3	ac89c171-f855-412c-a621-d7827b4a01bd	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.384	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.384
463c1c11-57b0-4a14-a99e-bd3d512d1c6f	ac89c171-f855-412c-a621-d7827b4a01bd	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.385	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.385
6476c33f-0e2a-47ee-bf95-a5f5f60abbee	ac89c171-f855-412c-a621-d7827b4a01bd	3d2c83b0-7d82-432a-a551-6c3e4239b998	{}	2025-06-15 21:05:39.387	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.387
9786eea0-dd88-4b39-96d4-fe8abcb3fb2e	ac89c171-f855-412c-a621-d7827b4a01bd	3d2c83b0-7d82-432a-a551-6c3e4239b998	{}	2025-06-15 21:05:39.388	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.388
8f9f8f4a-48ee-4208-a2c0-5057902ee02f	6d189db8-e1a1-435c-88c7-ccd7b961f6e4	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.39	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.39
b64b86ee-f273-493f-a348-f7dfacabd390	6d189db8-e1a1-435c-88c7-ccd7b961f6e4	ba1e57ca-372e-4336-8be3-840a6f42b96e	{}	2025-06-15 21:05:39.391	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.391
750cb705-2f60-411f-9201-606eb3babbce	6d189db8-e1a1-435c-88c7-ccd7b961f6e4	9cb2df3f-072a-489e-a306-a82413ebfe54	{}	2025-06-15 21:05:39.392	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.392
ad267090-2fe7-4170-a82f-233e65330de1	6d189db8-e1a1-435c-88c7-ccd7b961f6e4	9cb2df3f-072a-489e-a306-a82413ebfe54	{}	2025-06-15 21:05:39.393	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.393
7e9db65f-aee7-4e0c-b442-e4d260482265	6d189db8-e1a1-435c-88c7-ccd7b961f6e4	85716c27-e9ca-488c-876d-045b9202c65c	{}	2025-06-15 21:05:39.394	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.394
17b35771-6c14-4beb-8e69-18cf02b1999e	6d189db8-e1a1-435c-88c7-ccd7b961f6e4	85716c27-e9ca-488c-876d-045b9202c65c	{}	2025-06-15 21:05:39.395	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.395
35e6aa7c-0eb8-4a41-9c5f-9d98d561e553	69811a65-7632-40e6-b0cb-70892b23d3de	2738db17-3252-48fc-af2f-8d51be1d1602	{}	2025-06-15 21:05:39.398	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.398
4b222c75-ed1a-49c1-a616-cd7b46c60fff	69811a65-7632-40e6-b0cb-70892b23d3de	2738db17-3252-48fc-af2f-8d51be1d1602	{}	2025-06-15 21:05:39.399	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.399
15d8b1b5-6750-42a8-b846-e4a37f25bdc5	69811a65-7632-40e6-b0cb-70892b23d3de	2738db17-3252-48fc-af2f-8d51be1d1602	{}	2025-06-15 21:05:39.4	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.4
2fb10f21-09c5-411c-aa99-44b1a23fd6cf	69811a65-7632-40e6-b0cb-70892b23d3de	2738db17-3252-48fc-af2f-8d51be1d1602	{}	2025-06-15 21:05:39.401	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.401
09d5ffea-dfef-42d6-bb69-63280a78c352	69811a65-7632-40e6-b0cb-70892b23d3de	2738db17-3252-48fc-af2f-8d51be1d1602	{}	2025-06-15 21:05:39.402	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.402
4229c92e-1d11-4c60-85f2-aa6aeff2556a	69811a65-7632-40e6-b0cb-70892b23d3de	2738db17-3252-48fc-af2f-8d51be1d1602	{}	2025-06-15 21:05:39.403	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.403
b26db364-4875-4528-b516-bcc695fe718d	ffad7dfc-14e0-477a-9d53-0415d26fd5eb	91132c52-1b55-4b96-af3d-ff08ccea6d0e	{}	2025-06-15 21:05:39.405	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.405
66aabf19-6e91-421b-8689-093ee1966229	ffad7dfc-14e0-477a-9d53-0415d26fd5eb	91132c52-1b55-4b96-af3d-ff08ccea6d0e	{}	2025-06-15 21:05:39.406	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.406
cba9b8e3-0412-4721-b1af-37fc44d95fde	ffad7dfc-14e0-477a-9d53-0415d26fd5eb	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.407	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.407
8aa52687-0ed6-4973-a33a-2adf718f9b90	ffad7dfc-14e0-477a-9d53-0415d26fd5eb	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.408	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.408
bf09c9d2-ebf2-4a5d-9d9c-4f8f2231bc60	ffad7dfc-14e0-477a-9d53-0415d26fd5eb	91132c52-1b55-4b96-af3d-ff08ccea6d0e	{}	2025-06-15 21:05:39.409	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.409
59542506-8907-42e4-a961-23a1f1df7ace	ffad7dfc-14e0-477a-9d53-0415d26fd5eb	91132c52-1b55-4b96-af3d-ff08ccea6d0e	{}	2025-06-15 21:05:39.41	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.41
9dd99022-e8fa-4e7f-a236-c640d152cb98	ffad7dfc-14e0-477a-9d53-0415d26fd5eb	91132c52-1b55-4b96-af3d-ff08ccea6d0e	{}	2025-06-15 21:05:39.411	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.411
3f347410-8daf-43be-a139-76012141f060	ffad7dfc-14e0-477a-9d53-0415d26fd5eb	91132c52-1b55-4b96-af3d-ff08ccea6d0e	{}	2025-06-15 21:05:39.412	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.412
402f3097-ee7d-4e52-a506-b550bfa4815a	dcd2b8fb-11d6-4ddd-bff0-53487cfd6fa4	070c4a89-9da3-4602-b1e9-48fec89adcde	{}	2025-06-15 21:05:39.413	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.413
111efaf9-3bfa-4d2c-964d-8e1b2911e4ea	dcd2b8fb-11d6-4ddd-bff0-53487cfd6fa4	070c4a89-9da3-4602-b1e9-48fec89adcde	{}	2025-06-15 21:05:39.415	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.415
bd7116ee-9c5c-4b25-ba53-150e9e8c6eed	dcd2b8fb-11d6-4ddd-bff0-53487cfd6fa4	d4719e1f-ee46-4c32-a338-c24adb055a81	{}	2025-06-15 21:05:39.416	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.416
034b506f-1b11-4969-865e-5906964962cf	dcd2b8fb-11d6-4ddd-bff0-53487cfd6fa4	d4719e1f-ee46-4c32-a338-c24adb055a81	{}	2025-06-15 21:05:39.417	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.417
c75b934b-717c-46fb-8d2e-5e469ad2e246	dcd2b8fb-11d6-4ddd-bff0-53487cfd6fa4	d4719e1f-ee46-4c32-a338-c24adb055a81	{}	2025-06-15 21:05:39.418	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.418
d797307c-0a61-4afe-80fc-75e5893c8260	dcd2b8fb-11d6-4ddd-bff0-53487cfd6fa4	d4719e1f-ee46-4c32-a338-c24adb055a81	{}	2025-06-15 21:05:39.419	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.419
6a4f4916-c523-486c-a17c-b1ee98721b84	ee34ba45-ac95-4917-bf19-f94b27ef81ed	c8923cbf-0c8d-416f-a7ce-8d07e5c2fe71	{}	2025-06-15 21:05:39.42	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.42
095ed5f0-7112-4aa0-9520-3ae6144774a9	ee34ba45-ac95-4917-bf19-f94b27ef81ed	c8923cbf-0c8d-416f-a7ce-8d07e5c2fe71	{}	2025-06-15 21:05:39.422	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.422
06b56d1a-e43c-4806-baf3-5fdd7dc7407a	ee34ba45-ac95-4917-bf19-f94b27ef81ed	d4719e1f-ee46-4c32-a338-c24adb055a81	{}	2025-06-15 21:05:39.424	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.424
0d63ca06-352c-4964-9820-39780e6d8d85	ee34ba45-ac95-4917-bf19-f94b27ef81ed	d4719e1f-ee46-4c32-a338-c24adb055a81	{}	2025-06-15 21:05:39.425	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.425
601dc8ce-a533-4dda-a8fd-64699ae50507	ee34ba45-ac95-4917-bf19-f94b27ef81ed	c8923cbf-0c8d-416f-a7ce-8d07e5c2fe71	{}	2025-06-15 21:05:39.426	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.426
ebb1a8e5-1c21-44e1-a4d6-579e6ce3f7f9	ee34ba45-ac95-4917-bf19-f94b27ef81ed	c8923cbf-0c8d-416f-a7ce-8d07e5c2fe71	{}	2025-06-15 21:05:39.427	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.427
499c4d84-9607-47c7-bed8-dc6dc655891e	53a547a0-9d36-4edd-85a3-35d29be69aa8	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.429	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.429
1013cbf2-0a6d-41ae-b45d-e8d3dd259d38	53a547a0-9d36-4edd-85a3-35d29be69aa8	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.429	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.429
b2bd6c67-166d-4d7e-aa45-e5316bc150ce	53a547a0-9d36-4edd-85a3-35d29be69aa8	070c4a89-9da3-4602-b1e9-48fec89adcde	{}	2025-06-15 21:05:39.431	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.431
99932a02-4ef2-437c-b2b4-0a7f2b7493b4	53a547a0-9d36-4edd-85a3-35d29be69aa8	070c4a89-9da3-4602-b1e9-48fec89adcde	{}	2025-06-15 21:05:39.432	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.432
af1342dd-a639-458f-8b81-bb4eac9a059b	53a547a0-9d36-4edd-85a3-35d29be69aa8	070c4a89-9da3-4602-b1e9-48fec89adcde	{}	2025-06-15 21:05:39.434	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.434
01da2a43-7e17-4540-ac81-47e50b8ea9e8	53a547a0-9d36-4edd-85a3-35d29be69aa8	070c4a89-9da3-4602-b1e9-48fec89adcde	{}	2025-06-15 21:05:39.436	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.436
9ffc377c-d6f4-4757-a4b8-4e36f9023fd3	1156806b-d0e6-464b-99b9-2fe1c6ab4dbc	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.439	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.439
503cffb9-c2dd-4560-96cf-c6323385269c	1156806b-d0e6-464b-99b9-2fe1c6ab4dbc	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.44	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.44
f36f710c-37f9-47af-ab9c-d95291f3a3cb	1156806b-d0e6-464b-99b9-2fe1c6ab4dbc	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.442	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.442
6090f232-a656-4949-be16-bad01eb1d8d9	1156806b-d0e6-464b-99b9-2fe1c6ab4dbc	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.443	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.443
c8885e78-7284-48c2-ba1b-969dab6e66e3	1156806b-d0e6-464b-99b9-2fe1c6ab4dbc	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.445	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.445
42100995-14c2-4836-8d9b-f566222853ed	fd590229-3007-4c3b-b252-1e382f6047d8	4262452e-68b8-4d47-a5cd-816c0a9104f0	{}	2025-06-15 21:05:39.45	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.45
5ce4544b-3fa4-4709-8ddc-fe17da71ecc9	fd590229-3007-4c3b-b252-1e382f6047d8	4262452e-68b8-4d47-a5cd-816c0a9104f0	{}	2025-06-15 21:05:39.451	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.451
20762527-a511-406e-9d38-5b684793d488	fd590229-3007-4c3b-b252-1e382f6047d8	4262452e-68b8-4d47-a5cd-816c0a9104f0	{}	2025-06-15 21:05:39.453	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.453
8e96ce35-7462-4cd9-8dea-ef3b465f58c9	fd590229-3007-4c3b-b252-1e382f6047d8	4262452e-68b8-4d47-a5cd-816c0a9104f0	{}	2025-06-15 21:05:39.454	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.454
42b1898c-f836-4ce2-b775-f659d56e2292	fd590229-3007-4c3b-b252-1e382f6047d8	b9e37858-0147-4b65-9367-6759a2f9d1a1	{}	2025-06-15 21:05:39.456	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.456
7559d061-0269-4074-b7f3-0d6e34dbb031	fd590229-3007-4c3b-b252-1e382f6047d8	b9e37858-0147-4b65-9367-6759a2f9d1a1	{}	2025-06-15 21:05:39.458	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.458
884398fb-9af7-4584-abc3-c9e113c6aaa4	22ead9ef-d575-4680-9b13-788ff36808ec	478d37e8-f431-4382-b820-85aad6721e15	{}	2025-06-15 21:05:39.461	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.461
17b965c1-b480-455c-829b-f7d91b52d363	22ead9ef-d575-4680-9b13-788ff36808ec	478d37e8-f431-4382-b820-85aad6721e15	{}	2025-06-15 21:05:39.462	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.462
0eb176c6-6718-48c3-86f6-4c049b9d516f	22ead9ef-d575-4680-9b13-788ff36808ec	478d37e8-f431-4382-b820-85aad6721e15	{}	2025-06-15 21:05:39.463	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.463
07dad1c2-64b3-4477-9654-bfdc3cc03b6d	22ead9ef-d575-4680-9b13-788ff36808ec	478d37e8-f431-4382-b820-85aad6721e15	{}	2025-06-15 21:05:39.464	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.464
327d81e1-5dec-4d95-8e22-6c23bb710b26	22ead9ef-d575-4680-9b13-788ff36808ec	a97bd17c-fe42-4e92-9830-f4580c682750	{}	2025-06-15 21:05:39.465	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.465
33313557-ae09-4cab-ac17-1cccfeb44171	22ead9ef-d575-4680-9b13-788ff36808ec	a97bd17c-fe42-4e92-9830-f4580c682750	{}	2025-06-15 21:05:39.468	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.468
9db3215b-1c89-43e5-815f-029012f5cf70	22ead9ef-d575-4680-9b13-788ff36808ec	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.469	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.469
2f73372a-fe9b-46cb-bb9a-21855be6af80	22ead9ef-d575-4680-9b13-788ff36808ec	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.47	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.47
a6552e99-873f-4db6-afce-e6720a8110f8	8a1aa9c1-90e2-403b-87c1-e8f036b2c929	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.473	36c6bd23-fa69-474e-b6e6-bd82367ca603	2025-06-15 21:05:39.473
8336bf33-aa8e-41d7-985f-ccd9f71e99da	8a1aa9c1-90e2-403b-87c1-e8f036b2c929	e35c4d13-cae5-4ada-b4b3-cc226f681275	{}	2025-06-15 21:05:39.474	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.474
6c56a8a5-6784-4c27-8d69-332fe200a404	8a1aa9c1-90e2-403b-87c1-e8f036b2c929	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.475	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.475
f35ea2d6-ff81-4d3a-9cd1-2d04b5328ace	8a1aa9c1-90e2-403b-87c1-e8f036b2c929	0dc119f4-abe9-4189-b259-b8da2dd06e0b	{44}	2025-06-15 21:05:39.476	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.476
7a3a0676-b4cf-4b97-a829-18ac0f8335dd	8a1aa9c1-90e2-403b-87c1-e8f036b2c929	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.477	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.477
0f47a140-5cf3-492e-994b-46b4bd0ef2e5	8a1aa9c1-90e2-403b-87c1-e8f036b2c929	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.479	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.479
b59019fc-eee8-44a6-b809-47966f168e25	8a1aa9c1-90e2-403b-87c1-e8f036b2c929	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.48	f5ce08c1-e1a7-4b43-91f7-da7d3e78d139	2025-06-15 21:05:39.48
4d1ca9f6-b8cd-436f-b664-7e3d67c076f9	8a1aa9c1-90e2-403b-87c1-e8f036b2c929	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.482	4f5a2452-0f97-486c-9147-60cf55fbf356	2025-06-15 21:05:39.482
f78d3686-4028-4e2d-aa30-06f55c15bfe7	25676112-e713-45f5-817d-aa1326e1cffc	e040b26b-6637-4b9f-b4c8-83dfc429dd36	{}	2025-06-15 21:05:39.484	e5cc198e-3b8f-48ee-b83b-430a4d861755	2025-06-15 21:05:39.484
e00db858-72d3-41ea-aa6d-ed842e270d6e	25676112-e713-45f5-817d-aa1326e1cffc	e040b26b-6637-4b9f-b4c8-83dfc429dd36	{}	2025-06-15 21:05:39.485	8bb515b6-aa12-4165-b691-d62bb7ff7c03	2025-06-15 21:05:39.485
066192fc-673b-4838-89e9-12bb39083d8b	25676112-e713-45f5-817d-aa1326e1cffc	e040b26b-6637-4b9f-b4c8-83dfc429dd36	{}	2025-06-15 21:05:39.486	83dc527a-3d3e-43bd-a651-7679031e80be	2025-06-15 21:05:39.486
9679c976-a5d1-4b1e-a480-3acc7c85bc62	25676112-e713-45f5-817d-aa1326e1cffc	e040b26b-6637-4b9f-b4c8-83dfc429dd36	{}	2025-06-15 21:05:39.488	09c09418-b17c-4c91-86bf-0537230a2a8d	2025-06-15 21:05:39.488
aaf2e92d-9082-49f7-965f-13e61d14d64f	25676112-e713-45f5-817d-aa1326e1cffc	547dbfe6-2e6c-4747-a0e3-70fd9172b3fd	{}	2025-06-15 21:05:39.489	bffdb777-9a4b-4977-8970-494a5beae096	2025-06-15 21:05:39.489
\.


--
-- Data for Name: Speciality; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."Speciality" (id, "updatedAt", "createdAt", title, number, code, description, "locationId") FROM stdin;
966871b6-7693-4803-817e-87c1f0f074da	2025-06-16 19:01:18.051	2025-06-16 19:01:18.051	Программист	УП09.02.07	09.02.07	Информационные системы и программирование	c9086432-23f5-453b-b754-5fbbe70d7458
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."User" (id, name, surname, "studentGroupId", role, "createdAt", "passwordHash", "updatedAt", email, login) FROM stdin;
515982ec-d1d5-4a85-a430-e96578eaee69	admin	admin	\N	ADMIN	2025-06-15 20:43:07.756	$argon2id$v=19$m=65536,t=3,p=4$gdAA/b8spFGHVpLDz5z7qA$p2JbZHyv3YMtw2IMU/K2vhrVwPIwfL5p7vUp5x3B3To	2025-06-15 20:43:07.756	admin@km-spb.com	admin
036af2dd-bad1-45c0-b316-000863ad808d	Л.А.	Сергиец	\N	TEACHER	2025-06-15 20:46:52.895	12345678	2025-06-15 20:46:52.895	sergiets_l.a.@example.com	sergiets_l.a.
68a21e1a-9bd0-49d7-9893-5ba1773ee6dd	С.А.	Волкова	\N	TEACHER	2025-06-15 20:46:52.904	12345678	2025-06-15 20:46:52.904	volkova_s.a.@example.com	volkova_s.a.
99edb065-2bbe-4ba2-beb5-2c86f76e77a3	О.В.	Камынина	\N	TEACHER	2025-06-15 20:46:52.906	12345678	2025-06-15 20:46:52.906	kamynina_o.v.@example.com	kamynina_o.v.
6ea81880-d90d-470b-b665-c49ea2469432	Д.О.	Филиппова	\N	TEACHER	2025-06-15 20:46:52.909	12345678	2025-06-15 20:46:52.909	filippova_d.o.@example.com	filippova_d.o.
742ec953-b8bd-4565-8f1c-e0da9dc36b31	Г.В.	Аксаментова	\N	TEACHER	2025-06-15 20:46:52.912	12345678	2025-06-15 20:46:52.912	aksamentova_g.v.@example.com	aksamentova_g.v.
f2212213-2d8a-4d33-b93e-34c75afd381e	А.А.	Екимова	\N	TEACHER	2025-06-15 20:46:52.913	12345678	2025-06-15 20:46:52.913	ekimova_a.a.@example.com	ekimova_a.a.
1a4b9493-d2fb-4697-8b01-7d4987804094	Л.Э.	Соломина	\N	TEACHER	2025-06-15 20:46:52.915	12345678	2025-06-15 20:46:52.915	solomina_l.e.@example.com	solomina_l.e.
50e64319-6001-4643-ac6f-9fb1c69d046c	М.М.	Ковалева	\N	TEACHER	2025-06-15 20:46:52.917	12345678	2025-06-15 20:46:52.917	kovaleva_m.m.@example.com	kovaleva_m.m.
6c3f6708-e194-4e52-96ab-1cdcd78739c9	Е.А.	Чупрова	\N	TEACHER	2025-06-15 20:46:52.92	12345678	2025-06-15 20:46:52.92	chuprova_e.a.@example.com	chuprova_e.a.
038dc246-9665-4d48-a70d-17fd7f3468b2	Т.Н.	Шабанова	\N	TEACHER	2025-06-15 20:46:52.924	12345678	2025-06-15 20:46:52.924	shabanova_t.n.@example.com	shabanova_t.n.
02408f6a-26f1-4fa4-bd4a-61a064e61016	Н.В.	Крученкова	\N	TEACHER	2025-06-15 20:46:52.927	12345678	2025-06-15 20:46:52.927	kruchenkova_n.v.@example.com	kruchenkova_n.v.
719fb3f1-66bc-466f-985a-a3f6b42a3b65	А.А.	Севальников	\N	TEACHER	2025-06-15 20:46:52.93	12345678	2025-06-15 20:46:52.93	sevalьnikov_a.a.@example.com	sevalьnikov_a.a.
a3c14b9e-20e2-43af-9930-ec672730277c	О.А.	Плетнева	\N	TEACHER	2025-06-15 20:46:52.932	12345678	2025-06-15 20:46:52.932	pletneva_o.a.@example.com	pletneva_o.a.
30686406-f25a-4825-8932-e0936a1e6d97	Т.Е.	Смирнова	\N	TEACHER	2025-06-15 20:46:52.935	12345678	2025-06-15 20:46:52.935	smirnova_t.e.@example.com	smirnova_t.e.
d838aba9-2b1b-49f9-878d-08eea33a6670	И.Ю.	Сидорова	\N	TEACHER	2025-06-15 20:46:52.938	12345678	2025-06-15 20:46:52.938	sidorova_i.yu.@example.com	sidorova_i.yu.
9c450638-4aac-4f05-82af-cadbf7cd9a5c	Н.С.	Сотникова	\N	TEACHER	2025-06-15 20:46:52.94	12345678	2025-06-15 20:46:52.94	sotnikova_n.s.@example.com	sotnikova_n.s.
83fca2b3-6bfd-4f66-ba26-c14cb781f840	Т.В.	Кириченко	\N	TEACHER	2025-06-15 20:46:52.949	12345678	2025-06-15 20:46:52.949	kirichenko_t.v.@example.com	kirichenko_t.v.
44ca7603-7c96-4706-928c-8198da7ddaf3	А.П.	Забелло	\N	TEACHER	2025-06-15 20:46:52.953	12345678	2025-06-15 20:46:52.953	zabello_a.p.@example.com	zabello_a.p.
6d59938f-7de8-4188-9d30-54c323e665cb	О.И.	Голубенко	\N	TEACHER	2025-06-15 20:46:52.955	12345678	2025-06-15 20:46:52.955	golubenko_o.i.@example.com	golubenko_o.i.
60b17940-8b66-459c-bda0-21da06d1d3d5	В.П.	Ищенко	\N	TEACHER	2025-06-15 20:46:52.956	12345678	2025-06-15 20:46:52.956	ischenko_v.p.@example.com	ischenko_v.p.
54de1843-4ea7-453d-b285-050c84aa39ef	Н.Е.	Буркина	\N	TEACHER	2025-06-15 20:46:52.957	12345678	2025-06-15 20:46:52.957	burkina_n.e.@example.com	burkina_n.e.
49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36	Г.К.	Сармина	\N	TEACHER	2025-06-15 20:46:52.959	12345678	2025-06-15 20:46:52.959	sarmina_g.k.@example.com	sarmina_g.k.
e917d513-13d4-4c47-9f83-d46fbffce60b	А.А.	Рудаков	\N	TEACHER	2025-06-15 20:46:52.961	12345678	2025-06-15 20:46:52.961	rudakov_a.a.@example.com	rudakov_a.a.
9bf54097-be77-48d9-9917-042c36f46772	Е.А.	Абрамова	\N	TEACHER	2025-06-15 20:46:52.963	12345678	2025-06-15 20:46:52.963	abramova_e.a.@example.com	abramova_e.a.
8df78858-783e-485a-91d8-70d4e1befcd1	А.И.	Суханов	\N	TEACHER	2025-06-15 20:46:52.965	12345678	2025-06-15 20:46:52.965	suhanov_a.i.@example.com	suhanov_a.i.
b8d0ee4f-4079-48d7-b72d-81580d92b005	И.К.	Виссарионова	\N	TEACHER	2025-06-15 20:46:52.967	12345678	2025-06-15 20:46:52.967	vissarionova_i.k.@example.com	vissarionova_i.k.
8c7490f9-6155-4773-8633-ba7e1985511b	Ю.В.	Чуркина	\N	TEACHER	2025-06-15 20:46:52.97	12345678	2025-06-15 20:46:52.97	churkina_yu.v.@example.com	churkina_yu.v.
e370e502-bda2-4139-96fe-73047803c665	Н.Б.	Волыгина	\N	TEACHER	2025-06-15 20:46:52.971	12345678	2025-06-15 20:46:52.971	volygina_n.b.@example.com	volygina_n.b.
cd6b808f-83a1-4537-92fa-24b7131c6465	А.А.	Крылова	\N	TEACHER	2025-06-15 20:46:52.973	12345678	2025-06-15 20:46:52.973	krylova_a.a.@example.com	krylova_a.a.
82e55451-38c5-4660-bd24-1dcb286190af	Т.Н.	Желнова	\N	TEACHER	2025-06-15 20:46:52.98	12345678	2025-06-15 20:46:52.98	zhelnova_t.n.@example.com	zhelnova_t.n.
0229a40a-b0d7-479c-884d-fe2de7a6aa6c	А.В.	Потанина	\N	TEACHER	2025-06-15 20:46:52.981	12345678	2025-06-15 20:46:52.981	potanina_a.v.@example.com	potanina_a.v.
c139fca2-9ee4-42ff-8654-817876f3db74	В.А.	Бердашов	\N	TEACHER	2025-06-15 20:46:52.983	12345678	2025-06-15 20:46:52.983	berdashov_v.a.@example.com	berdashov_v.a.
46674edf-ef43-471f-af72-2cf7b9f059d8	В.А.	Рудаков	\N	TEACHER	2025-06-15 20:46:52.985	12345678	2025-06-15 20:46:52.985	rudakov_v.a.@example.com	rudakov_v.a.
3b4fa477-1035-41d1-ace7-25fcd5c4134f	Е.М.	Чичев	\N	TEACHER	2025-06-15 20:46:52.986	12345678	2025-06-15 20:46:52.986	chichev_e.m.@example.com	chichev_e.m.
64ed9fe7-dc9a-4f19-b182-5e4c74db3487	И.Ю.	Гатчин	\N	TEACHER	2025-06-15 20:46:52.989	12345678	2025-06-15 20:46:52.989	gatchin_i.yu.@example.com	gatchin_i.yu.
5be89e3e-0c70-4c47-9fab-c7246de986e8	А.В.	Параничев	\N	TEACHER	2025-06-15 20:46:52.99	12345678	2025-06-15 20:46:52.99	paranichev_a.v.@example.com	paranichev_a.v.
527118e7-2e8f-4560-b121-22ff2edebf0d	И.Б.	Бондаренко	\N	TEACHER	2025-06-15 20:46:52.992	12345678	2025-06-15 20:46:52.992	bondarenko_i.b.@example.com	bondarenko_i.b.
f60b2462-8c49-425f-b29a-6bc269998d48	Д.В.	Соловьев	\N	TEACHER	2025-06-15 20:46:52.996	12345678	2025-06-15 20:46:52.996	solovьev_d.v.@example.com	solovьev_d.v.
d9e0831c-5018-45b9-99c1-17cb8e8316ed	Мазурова 	Мария	0acb3123-b7fd-4243-ba35-6ce080aafd49	STUDENT	2025-06-16 19:20:06.6	$argon2id$v=19$m=65536,t=3,p=4$8J8FyA7/9lnvY5b/El1QXA$JmojG7HjLRVfjedyNVmFNNmWnvDUuJTeu4m/GShYzBc	2025-06-16 19:38:40.195	mazurova.m@km-spb.com	mazurova.m
abfa664d-a1a0-4a4a-bbff-117d3e645f2e	Вячеслав	Васильев	0acb3123-b7fd-4243-ba35-6ce080aafd49	STUDENT	2025-06-16 19:13:19.134	$argon2id$v=19$m=65536,t=3,p=4$pczG7CQmzqSZRXZCxgZlYg$Q6Zij23mIHt838gD3rZ4HYsA0A+6AUtsqHrEAibrS9U	2025-06-16 19:38:40.195	vasiljev.v@km-spb.com	vasiljev.v
5c046387-19aa-4c44-a236-ae06db86c25b	Егор	Устинов	0acb3123-b7fd-4243-ba35-6ce080aafd49	STUDENT	2025-06-16 19:24:39.309	$argon2id$v=19$m=65536,t=3,p=4$KNXjAB1y0yr1xemSJqBoHA$LzRQ/bBajCIYaW5pZQbkKvx+SopR/tLbxwrfSVp7Hzg	2025-06-16 19:38:40.195	ustinov.e@km-spb.com	ustinov.e
1159dc3b-b4d6-41b3-a973-4ce771836524	Ярослав	Романов	0acb3123-b7fd-4243-ba35-6ce080aafd49	STUDENT	2025-06-16 19:07:48.348	$argon2id$v=19$m=65536,t=3,p=4$NbYHjCl5p5HSVmwJZ8GbLg$+RoyTqcFfN4B6AI8Q3EcZxp7wMpkMjPNSToOhj6PViA	2025-06-16 19:38:40.195	romanov.y@km-spb.com	romanov.y
483379e1-b0ab-4742-bde6-36fbe5096b00	Кирилл	Аревков	0acb3123-b7fd-4243-ba35-6ce080aafd49	STUDENT	2025-06-16 19:11:45.223	$argon2id$v=19$m=65536,t=3,p=4$SGY8pwqJTrkiMgGN61MgDg$tr2Me0Y2yOBIvnr5HBmpHDrJQY3QZpMU5lrka2St870	2025-06-16 19:38:40.195	arevkov.k@km-spb.com	arevkov.k
7fbc360d-972e-4b24-86e4-728265ee8d29	Дмитрий	Дорогов	0acb3123-b7fd-4243-ba35-6ce080aafd49	STUDENT	2025-06-16 19:12:32.6	$argon2id$v=19$m=65536,t=3,p=4$70tKj0Rx9sx0oz3yhU0wyA$S3GrZyFDFJUQZt6A+ieM4ivFOrnrXUGZvF70fSxlFO8	2025-06-16 19:38:40.195	dorogov.d@km-spb.ru	dorogov.d
2ad378cf-9f3b-4f60-9e42-fd2948a81ddf	Ниджат	Махмудов	0acb3123-b7fd-4243-ba35-6ce080aafd49	STUDENT	2025-06-16 19:19:07.768	$argon2id$v=19$m=65536,t=3,p=4$wy6KhxBCjgjImJIT7MA0Zg$GQKp8RKr0cyPDQycydRV+KSFj17KzMSs/6dqwzsCM+s	2025-06-16 19:38:44.461	mahmudov.n@km-spb.com	mavmudov.n
\.


--
-- Data for Name: _LessonTeachers; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public."_LessonTeachers" ("A", "B") FROM stdin;
3dd2cbf8-53f1-4f00-bf95-2ff57421764b	742ec953-b8bd-4565-8f1c-e0da9dc36b31
34ae05f4-9725-444b-b4a9-cdf9165e16a9	6c3f6708-e194-4e52-96ab-1cdcd78739c9
d6b9f82d-9a5e-491a-9968-2ca0c10d2705	038dc246-9665-4d48-a70d-17fd7f3468b2
5b1a6447-cde3-4f39-847b-688a9cdcc0e9	038dc246-9665-4d48-a70d-17fd7f3468b2
ce522dd4-229f-40bb-a003-405bd65dd83e	1a4b9493-d2fb-4697-8b01-7d4987804094
1c347b22-bc1a-4197-b1b9-ac177eee399d	1a4b9493-d2fb-4697-8b01-7d4987804094
35b3030b-9b21-4314-825a-2a46496fae1a	036af2dd-bad1-45c0-b316-000863ad808d
9ca06132-2ec2-49b9-aef4-f7cdaf30c124	6ea81880-d90d-470b-b665-c49ea2469432
97763a84-18c1-48d8-9b50-2274083171b5	f2212213-2d8a-4d33-b93e-34c75afd381e
0c2e32ee-6f6e-4d02-b665-b6ef9a7c5be3	f2212213-2d8a-4d33-b93e-34c75afd381e
0a32bd81-6041-4142-b0df-f212e798c12b	02408f6a-26f1-4fa4-bd4a-61a064e61016
9f1c0528-3cb9-47f4-b056-5bd743307986	02408f6a-26f1-4fa4-bd4a-61a064e61016
8b1c601c-25c7-4769-8e53-569d4c0ef3e6	30686406-f25a-4825-8932-e0936a1e6d97
41b07fc9-32e1-46cb-b363-6a92bbb5fe71	30686406-f25a-4825-8932-e0936a1e6d97
81e44777-bfa3-4386-8e1a-696032e34bfd	6ea81880-d90d-470b-b665-c49ea2469432
7c4a304c-a467-4ccd-9f69-a2d0e06f2222	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
7022ad7c-b3e8-4ad6-9b68-cd2dde00dac9	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
1a5b029e-3e0e-432f-b4dc-be9a763fe05c	036af2dd-bad1-45c0-b316-000863ad808d
e31745cc-3859-4465-9a3e-24f94467fa93	30686406-f25a-4825-8932-e0936a1e6d97
594dc37c-1c2a-4f12-880c-44734044fa50	719fb3f1-66bc-466f-985a-a3f6b42a3b65
8cd1244b-8a2f-4ed7-b49f-d6738a7a9ba0	68a21e1a-9bd0-49d7-9893-5ba1773ee6dd
909b3144-09ed-4a20-9aa4-7d4151d7741e	68a21e1a-9bd0-49d7-9893-5ba1773ee6dd
cf4535a3-8ee6-4c3c-bdcf-42724fc5bf11	1a4b9493-d2fb-4697-8b01-7d4987804094
f8e14b1b-798d-4d11-9e35-2e89f1ce858b	1a4b9493-d2fb-4697-8b01-7d4987804094
df312623-9c4b-49da-848b-5ab4181cf016	719fb3f1-66bc-466f-985a-a3f6b42a3b65
bd3a4a97-7468-44fc-af27-0da9754867ec	038dc246-9665-4d48-a70d-17fd7f3468b2
04012c78-0b3a-4a9a-bc6c-33f8b5b5386d	719fb3f1-66bc-466f-985a-a3f6b42a3b65
431f9185-f91b-45a9-8ed2-92b53f6efd81	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
0ac35852-4bea-4a88-bf7e-bf5d86889387	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
c2e59882-2aba-41f7-a28d-912ad68a5e21	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
23a513a2-cc66-439a-bb64-b6e8611da06f	50e64319-6001-4643-ac6f-9fb1c69d046c
6451e540-add3-42dd-86af-2f44c0010fdb	50e64319-6001-4643-ac6f-9fb1c69d046c
ab07e757-ad3f-45b8-9e7f-4eee1054cb89	a3c14b9e-20e2-43af-9930-ec672730277c
fb3feb73-a965-4039-bc84-1dc8b25b7f40	a3c14b9e-20e2-43af-9930-ec672730277c
2cb60709-d518-478d-b89f-db75197a5a91	d838aba9-2b1b-49f9-878d-08eea33a6670
5e963052-3b34-4df2-95db-c6bd26246100	038dc246-9665-4d48-a70d-17fd7f3468b2
15f81d47-92eb-403c-a3a5-b04cfec0e580	038dc246-9665-4d48-a70d-17fd7f3468b2
86a2fb19-e6eb-4d5d-93bb-0bf0fe487a25	f2212213-2d8a-4d33-b93e-34c75afd381e
2179830b-3b8d-4550-9288-51c653a0e940	f2212213-2d8a-4d33-b93e-34c75afd381e
9a625203-84f5-4174-bec2-6ed99dffe90c	9c450638-4aac-4f05-82af-cadbf7cd9a5c
af7bf682-f817-4519-9eb0-e0a2cc1c5304	9c450638-4aac-4f05-82af-cadbf7cd9a5c
a6ee52e1-d3bd-4270-b5fc-a52be69e6d99	83fca2b3-6bfd-4f66-ba26-c14cb781f840
ac683ab9-3353-4d61-b707-5a71ae8191cb	6ea81880-d90d-470b-b665-c49ea2469432
bc66e55f-892b-4372-8a4e-a4a584a0219c	6ea81880-d90d-470b-b665-c49ea2469432
26ed1247-1fc4-4600-b952-407cf9386294	036af2dd-bad1-45c0-b316-000863ad808d
7fb18ee9-08e8-4ce7-9696-71b257c1443d	30686406-f25a-4825-8932-e0936a1e6d97
b0fef7eb-cf0b-4089-970f-f3fd19c09510	30686406-f25a-4825-8932-e0936a1e6d97
4845b39d-4306-45f3-8790-e7427536f6d2	a3c14b9e-20e2-43af-9930-ec672730277c
b7bd4295-df83-428d-a04f-5ba6e0c50ebc	a3c14b9e-20e2-43af-9930-ec672730277c
5269463e-9dbb-420a-be94-2993549fcf15	83fca2b3-6bfd-4f66-ba26-c14cb781f840
0d2dce28-e938-4e52-bf21-4ff8cf801b25	719fb3f1-66bc-466f-985a-a3f6b42a3b65
dc307c4b-3a37-4b5b-bc7f-6de972b3437e	9c450638-4aac-4f05-82af-cadbf7cd9a5c
c70e8792-182f-4450-ad07-cf092c44da31	9c450638-4aac-4f05-82af-cadbf7cd9a5c
8ddd0e79-052f-448a-b0f0-3df89102bd18	83fca2b3-6bfd-4f66-ba26-c14cb781f840
324a51b2-cf0e-4d83-99f6-46be7874524d	83fca2b3-6bfd-4f66-ba26-c14cb781f840
9149e11c-0dcd-47a2-bdf1-7c7a9b28cf6f	02408f6a-26f1-4fa4-bd4a-61a064e61016
bd477a7e-1788-423e-992b-afe15708f62a	02408f6a-26f1-4fa4-bd4a-61a064e61016
42bcc296-741a-4b53-888c-46b160637255	30686406-f25a-4825-8932-e0936a1e6d97
7a2b2d2a-bdef-49d2-88c1-7e87924b92d7	036af2dd-bad1-45c0-b316-000863ad808d
3531de61-7911-4ddf-a58c-74e4ada84008	038dc246-9665-4d48-a70d-17fd7f3468b2
65ffb9e8-5c40-415c-b0e7-2db4bbbb3811	50e64319-6001-4643-ac6f-9fb1c69d046c
d94bf0a8-d19f-4ffa-b1e9-33b2943c1f90	50e64319-6001-4643-ac6f-9fb1c69d046c
006e9f09-71db-41a1-a9f3-0babab0b17af	68a21e1a-9bd0-49d7-9893-5ba1773ee6dd
7e0d4c32-f42f-4751-b947-85de1c31b07d	68a21e1a-9bd0-49d7-9893-5ba1773ee6dd
a1c4f107-4d67-41b0-b025-7ca6d429a1c2	50e64319-6001-4643-ac6f-9fb1c69d046c
43a0fb91-8a6a-4df8-b5f5-b06bb5eeb612	719fb3f1-66bc-466f-985a-a3f6b42a3b65
0d255c09-e894-4f22-8890-3b72aa32dbe2	719fb3f1-66bc-466f-985a-a3f6b42a3b65
3f693664-36c6-4ee1-856f-569ea9d45f98	50e64319-6001-4643-ac6f-9fb1c69d046c
e938b0b3-64d2-410c-ad4a-f08576cbefbc	d838aba9-2b1b-49f9-878d-08eea33a6670
cedf226e-e6e5-4c9b-9c94-b2fbb595d4a3	9c450638-4aac-4f05-82af-cadbf7cd9a5c
2035384a-3af2-469e-b8c2-ba3c3d8fbc5b	44ca7603-7c96-4706-928c-8198da7ddaf3
0c0eca64-524b-45b3-8f38-7fc2930eacf1	44ca7603-7c96-4706-928c-8198da7ddaf3
8e36c761-e283-422f-b431-6f6a40d9bc10	54de1843-4ea7-453d-b285-050c84aa39ef
be8750f7-71f8-4d50-a0fc-7181ece33c55	54de1843-4ea7-453d-b285-050c84aa39ef
49f80973-fc85-47f1-b240-f7bf675c903b	f2212213-2d8a-4d33-b93e-34c75afd381e
ba55f47f-8fbe-4d77-bce8-8b24e55254db	f2212213-2d8a-4d33-b93e-34c75afd381e
ab5ee363-4fd7-4d78-825f-b8132ce82f41	6d59938f-7de8-4188-9d30-54c323e665cb
67d02b16-b9bb-4585-bd10-a44bfdef8606	6d59938f-7de8-4188-9d30-54c323e665cb
4109174a-2506-48f5-b5fd-15d1ec45b1f3	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
2c4cc694-8bfc-40c0-b378-c60265e5d1f2	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
5fabb263-be01-4e6e-a534-a44d2ca3a38d	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
b6842d79-5cab-4e88-adac-fa747b84a6a3	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
18e52a8a-9837-4f2b-9d6d-228c56e2912e	719fb3f1-66bc-466f-985a-a3f6b42a3b65
f92d3351-f951-4557-bbc1-da2e86fc6825	6ea81880-d90d-470b-b665-c49ea2469432
01c6959a-b86f-447e-81a3-4f36b1e3825d	6ea81880-d90d-470b-b665-c49ea2469432
bb049d83-fe6d-47a7-ae62-8d2f84984240	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
3efd391a-6c3f-4a6c-bb3d-ca14dadc7fa4	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
5b48b80f-1864-40ae-8a8a-6e12a482c048	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
26a506fd-0e74-4210-84d7-ba6319619f7a	719fb3f1-66bc-466f-985a-a3f6b42a3b65
b4b07be2-9020-484e-aa6e-ded18a994424	719fb3f1-66bc-466f-985a-a3f6b42a3b65
09f50f4c-e87b-4f29-a3c2-2d5c7d3bae7e	038dc246-9665-4d48-a70d-17fd7f3468b2
271dda25-c203-4ac6-8d3c-77a3c489ef44	6d59938f-7de8-4188-9d30-54c323e665cb
e43d93fa-5e61-4a9f-8b3f-b2703fcd81ad	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
bd3a71bb-fbca-4a86-8d6f-6326e2d7a0dc	d838aba9-2b1b-49f9-878d-08eea33a6670
10d9a237-441e-4f3f-8ac9-628c4ca79027	60b17940-8b66-459c-bda0-21da06d1d3d5
a06d5c1f-4b5b-497f-85ed-61167f25cc83	60b17940-8b66-459c-bda0-21da06d1d3d5
2b4b92b7-e815-4d26-b48c-44819179bcb0	038dc246-9665-4d48-a70d-17fd7f3468b2
6a41a95a-2e43-4a58-b291-ffbbf9181c5d	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
d6acd9f4-525f-4c58-8230-a4e1a763fc0c	60b17940-8b66-459c-bda0-21da06d1d3d5
c0dc7859-2ceb-4ff5-84b5-6b3e86a1af61	038dc246-9665-4d48-a70d-17fd7f3468b2
321cc4ce-0986-449a-af34-3796e7df6fce	60b17940-8b66-459c-bda0-21da06d1d3d5
e212d7ae-bca8-4ece-9da7-03d62d39671c	60b17940-8b66-459c-bda0-21da06d1d3d5
a0bcd76f-c131-41c3-a054-5861a51c2a92	e917d513-13d4-4c47-9f83-d46fbffce60b
8355c5f9-e57c-4c27-a108-8629532c224b	e917d513-13d4-4c47-9f83-d46fbffce60b
d4156eb6-349d-49d1-a22a-14ad3c01bbb2	9bf54097-be77-48d9-9917-042c36f46772
695af35b-492a-483e-ba50-d31a1888661f	9bf54097-be77-48d9-9917-042c36f46772
2e004e99-ac46-4ab8-9e93-fd415aef5278	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
a020eef7-faca-4a99-ba36-bc58bc60a13e	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
82546cbc-4609-48dc-916f-8ab0b613d01d	038dc246-9665-4d48-a70d-17fd7f3468b2
69d479f9-41f4-4bde-b4e6-36078190a5fb	038dc246-9665-4d48-a70d-17fd7f3468b2
23b84d8e-1011-411d-9de8-cc265f1c4c86	44ca7603-7c96-4706-928c-8198da7ddaf3
d727ea52-19ae-481d-94a1-dcbaa017140c	44ca7603-7c96-4706-928c-8198da7ddaf3
fcd2ff2c-2064-477e-aa36-bbac6d76cf5b	6ea81880-d90d-470b-b665-c49ea2469432
e829ae8c-fb71-46c8-954e-2bef223b1c40	f2212213-2d8a-4d33-b93e-34c75afd381e
312ceda8-f2cc-4e5c-8881-0621df7e6317	f2212213-2d8a-4d33-b93e-34c75afd381e
1f8d104e-0bf7-4888-80a9-680049fcb1ec	e917d513-13d4-4c47-9f83-d46fbffce60b
2f4c7b6a-17d9-45a8-b233-ebb01c863e0d	e917d513-13d4-4c47-9f83-d46fbffce60b
58ff6a6c-54ff-438d-ab59-16731070563d	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
57c203f0-8dbb-438c-bdb6-0b4ad4562e9a	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
570787e9-9a92-4448-b667-75cb2cf7c847	6ea81880-d90d-470b-b665-c49ea2469432
d26db0cf-8dcc-486c-a31c-c3bd5eb41064	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
1f584b95-875b-448a-991a-0fed465f6822	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
b0513059-5acf-423a-975d-1e66e62c29fe	54de1843-4ea7-453d-b285-050c84aa39ef
1ae002c8-c70b-4018-b3c2-5303693b8198	54de1843-4ea7-453d-b285-050c84aa39ef
2ee8126c-00b3-4ff9-9c7f-95c9a5c8fded	6d59938f-7de8-4188-9d30-54c323e665cb
14f1c0e5-8fa1-4bc1-8909-dcd46606c049	038dc246-9665-4d48-a70d-17fd7f3468b2
64017c64-4c78-4d76-a60f-9463a690ff6f	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
8da2a79b-609b-4e5f-88ff-74f2cb6e5d28	719fb3f1-66bc-466f-985a-a3f6b42a3b65
f46b2937-e4e4-4f06-9806-c4d7cedccb7c	d838aba9-2b1b-49f9-878d-08eea33a6670
17b2b29e-9f13-4964-aa3e-bc23b55f9e5d	719fb3f1-66bc-466f-985a-a3f6b42a3b65
05f18df4-9e7c-41fb-9b9d-56ff7922336e	e917d513-13d4-4c47-9f83-d46fbffce60b
88033bde-9335-4c27-b435-059d267a2023	719fb3f1-66bc-466f-985a-a3f6b42a3b65
14f760b4-fc2a-4402-9e4c-5544b4a0cd01	60b17940-8b66-459c-bda0-21da06d1d3d5
a505e7be-6754-46a2-8340-81920a5dae79	60b17940-8b66-459c-bda0-21da06d1d3d5
1ff882ff-2723-4235-b15d-01821e03e1ee	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
f8ce742f-ac5a-4e36-a1f2-d601adea0301	60b17940-8b66-459c-bda0-21da06d1d3d5
3df1f924-77ee-4192-94ef-ea530bbd48b8	9bf54097-be77-48d9-9917-042c36f46772
8a349f61-7d8e-4ba7-a51f-2d53492d0ab0	9bf54097-be77-48d9-9917-042c36f46772
7d18bb47-0ea9-4f82-9b5e-4ac26baa95ec	60b17940-8b66-459c-bda0-21da06d1d3d5
e0bc890f-f485-40ed-8ebf-de4eaafbb4f4	60b17940-8b66-459c-bda0-21da06d1d3d5
b91536f0-c0a6-4621-a42b-c209746c724f	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
a0c311a2-f77c-4480-9830-3df27b0dc8b6	e917d513-13d4-4c47-9f83-d46fbffce60b
cc86cbf8-d489-441f-ac7a-218a360432b9	f2212213-2d8a-4d33-b93e-34c75afd381e
b3ac3e5a-00b4-44d3-be34-dc24d1e24b67	f2212213-2d8a-4d33-b93e-34c75afd381e
2ef7a529-0e8e-416a-b351-a9c4c04bfdb6	8df78858-783e-485a-91d8-70d4e1befcd1
68ae2b47-237d-4abc-b03e-f41b11516e8b	8df78858-783e-485a-91d8-70d4e1befcd1
dc5f37a1-670b-4639-8dbf-70c78e5e5191	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
6a3256d2-c308-4540-8a7a-1810421ce3ba	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
f9682f2f-8e1c-4d1f-bbf8-220cca039566	8df78858-783e-485a-91d8-70d4e1befcd1
d8c7e7ec-2072-43ba-a796-ff6955990e79	30686406-f25a-4825-8932-e0936a1e6d97
e21439ea-f806-44b9-8d8b-bc05e724aabf	30686406-f25a-4825-8932-e0936a1e6d97
ea42315f-4468-4621-a7f1-13851bcdb74c	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
200f9af4-0341-4ff0-9e8f-00f4a4e69753	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
1ff55efb-6e4d-4e72-a9e1-6da5bd432ddc	30686406-f25a-4825-8932-e0936a1e6d97
edb4d7e5-26f1-4b0d-ba9a-86155d391fff	719fb3f1-66bc-466f-985a-a3f6b42a3b65
d49fedf3-476b-4006-8def-6e694af8447e	02408f6a-26f1-4fa4-bd4a-61a064e61016
5b548e52-3722-487c-a966-75c6a676c262	02408f6a-26f1-4fa4-bd4a-61a064e61016
eb476fcb-826b-4224-9581-ee367111ca5e	038dc246-9665-4d48-a70d-17fd7f3468b2
a75050af-b320-4f40-8aab-62d81240bb90	038dc246-9665-4d48-a70d-17fd7f3468b2
89f2ca2a-60ca-4460-abf3-16b4d0e44149	6ea81880-d90d-470b-b665-c49ea2469432
4986c8ce-6d90-45da-82b6-209259456c7b	6ea81880-d90d-470b-b665-c49ea2469432
1970b59a-dcb2-4f33-ab5b-23532e5f68c7	54de1843-4ea7-453d-b285-050c84aa39ef
18111f4a-7a5f-4b56-87db-5b24f65cbc71	54de1843-4ea7-453d-b285-050c84aa39ef
ecb9787e-89aa-4de5-a8b9-04b29353b6a5	60b17940-8b66-459c-bda0-21da06d1d3d5
b40309f2-a1ce-4ebd-8c75-7ee5c6882913	60b17940-8b66-459c-bda0-21da06d1d3d5
55c65ddd-d4d0-409e-9987-62d2fc9d18b0	038dc246-9665-4d48-a70d-17fd7f3468b2
fadf814f-3f6f-4a7e-a74c-e52d0135e400	b8d0ee4f-4079-48d7-b72d-81580d92b005
1f744311-0405-4db8-a226-d6f085d8f3dc	a3c14b9e-20e2-43af-9930-ec672730277c
611af30d-9d6f-4bbb-a9cb-2a4738188055	a3c14b9e-20e2-43af-9930-ec672730277c
04a629f6-b60f-4748-8e64-51938b437344	8df78858-783e-485a-91d8-70d4e1befcd1
1635a4ce-25ec-4e2e-aa8b-7b83860b4b16	8df78858-783e-485a-91d8-70d4e1befcd1
7e19f29f-36ed-46bc-9742-6b7814134080	719fb3f1-66bc-466f-985a-a3f6b42a3b65
7d57760d-73f8-4b10-bb5a-bfe0145a3cac	719fb3f1-66bc-466f-985a-a3f6b42a3b65
6db742de-c721-4d7d-8a08-943244c6c1db	b8d0ee4f-4079-48d7-b72d-81580d92b005
931d22d4-2515-4f07-b83f-e86334936b89	b8d0ee4f-4079-48d7-b72d-81580d92b005
cba9427c-e605-48c2-b9e7-a2f25a77d5eb	d838aba9-2b1b-49f9-878d-08eea33a6670
de85ae22-83bf-46cf-8660-b04c8af3b7f4	50e64319-6001-4643-ac6f-9fb1c69d046c
6e4f1569-b14f-434b-a7a0-c18587f9b6da	8c7490f9-6155-4773-8633-ba7e1985511b
2ba36084-4b63-4754-a9c3-2c94f6a7f0b4	8c7490f9-6155-4773-8633-ba7e1985511b
6b69afc7-54a3-4adf-8c27-70a39ca18eea	6ea81880-d90d-470b-b665-c49ea2469432
f87103a8-bec5-4fc8-aa8d-b2ee6051dba5	6ea81880-d90d-470b-b665-c49ea2469432
e27a6908-b645-4020-a295-6648c4e885fd	83fca2b3-6bfd-4f66-ba26-c14cb781f840
11fec662-0653-4c78-bf8d-1de81f50825d	83fca2b3-6bfd-4f66-ba26-c14cb781f840
dd9071c6-f6e2-4be6-a3f9-bccf035130c1	54de1843-4ea7-453d-b285-050c84aa39ef
c99bbd8c-ffc7-4661-9462-baea5d90d5bf	54de1843-4ea7-453d-b285-050c84aa39ef
38d80cdf-b881-491c-bd29-b715d4e5112b	a3c14b9e-20e2-43af-9930-ec672730277c
de9b4df6-690d-4a6d-8e2d-c114e2e503e5	a3c14b9e-20e2-43af-9930-ec672730277c
e0edaa9a-3ad4-4a52-b44d-24cd2bc8a034	83fca2b3-6bfd-4f66-ba26-c14cb781f840
ceb1b2ce-ddf1-4c14-9a1f-80740a5150d2	83fca2b3-6bfd-4f66-ba26-c14cb781f840
5eb3eeb9-9336-42db-9603-9e6f67e13b53	cd6b808f-83a1-4537-92fa-24b7131c6465
2a25c852-2be2-4e81-bc15-0bcf5dc88f4d	cd6b808f-83a1-4537-92fa-24b7131c6465
3c12edb5-2487-4e1f-8550-9ac484e9deca	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
25d1ef56-eb61-4b68-86e2-ce4f76da627f	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
2172b94a-b754-42ae-9451-bc560cbf7ecc	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
bbc8037e-5e52-4101-9093-991ddc8842d6	54de1843-4ea7-453d-b285-050c84aa39ef
45d53a98-3c22-4a96-bf74-2d474a71b99f	e370e502-bda2-4139-96fe-73047803c665
3819db08-d64a-42e5-981a-4327e1a4e0db	e370e502-bda2-4139-96fe-73047803c665
e529c446-f431-4e8c-a35d-0d4b53604414	cd6b808f-83a1-4537-92fa-24b7131c6465
212f7ddc-ec20-417a-b67e-369f9316892b	036af2dd-bad1-45c0-b316-000863ad808d
5723b6e7-8968-4df9-ac6e-ddafe7bcbc0e	036af2dd-bad1-45c0-b316-000863ad808d
e518948b-6631-4b26-b3a8-4072bea74d63	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
f80665db-a127-47b6-8701-dd95750b6987	719fb3f1-66bc-466f-985a-a3f6b42a3b65
b61f5966-8c05-4270-948d-f320ac455a67	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
5ce3a1f9-0acc-4216-a504-f6bb08601d6d	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
0d966a84-63fd-4f1f-865c-8a64ddcd4000	e370e502-bda2-4139-96fe-73047803c665
1d41f4ab-e52c-40a5-8060-28dde18a6a15	d838aba9-2b1b-49f9-878d-08eea33a6670
4860da72-8a7c-4029-bdf9-fec1a664f7c3	9bf54097-be77-48d9-9917-042c36f46772
982c2685-54e3-460e-a80a-4234c8005854	9bf54097-be77-48d9-9917-042c36f46772
fc6dd5b1-0c66-4e77-a667-5fac17f84b41	d838aba9-2b1b-49f9-878d-08eea33a6670
3cb6ac68-f93d-4be8-babb-89d8261ab246	e370e502-bda2-4139-96fe-73047803c665
8af4437c-4737-44b0-8023-69229f6ae90d	e370e502-bda2-4139-96fe-73047803c665
b0589126-81fc-4e84-87ca-5daf118429e5	f2212213-2d8a-4d33-b93e-34c75afd381e
6f2daa84-c038-4370-8502-d4a8acf79bb4	f2212213-2d8a-4d33-b93e-34c75afd381e
8005b004-d2d4-4e76-8600-9d9587f11a8e	83fca2b3-6bfd-4f66-ba26-c14cb781f840
7680b98e-3915-471f-b66c-6553c0e0002d	83fca2b3-6bfd-4f66-ba26-c14cb781f840
d39cf6e7-7ffb-4ef6-829f-1be67c1de946	44ca7603-7c96-4706-928c-8198da7ddaf3
fa4a79d0-7220-4850-a859-ffddaa72e0fb	44ca7603-7c96-4706-928c-8198da7ddaf3
4dda40a7-94a0-40ca-b3cd-66f4ef454275	6ea81880-d90d-470b-b665-c49ea2469432
f1d70ac5-46e4-432e-8712-42f1cffb1bae	6ea81880-d90d-470b-b665-c49ea2469432
1b8b7c67-b762-4079-bda6-e1eca2fa776d	8c7490f9-6155-4773-8633-ba7e1985511b
cdc16eec-ab88-4818-8b74-51c4a19ce64b	8c7490f9-6155-4773-8633-ba7e1985511b
dae1f26a-8be2-46dd-bab7-e74cada19d6a	83fca2b3-6bfd-4f66-ba26-c14cb781f840
7029fd45-3ad8-46f3-b45f-8dbb7d71caa8	83fca2b3-6bfd-4f66-ba26-c14cb781f840
cd524a73-553b-4654-b511-a41cb433bc4a	cd6b808f-83a1-4537-92fa-24b7131c6465
e0c90e7d-6d4d-4170-bcd8-fb02aa584013	cd6b808f-83a1-4537-92fa-24b7131c6465
10dff525-bf1f-4262-95df-21864f7e109c	54de1843-4ea7-453d-b285-050c84aa39ef
38680013-f20b-451e-966e-0e73b1a994b4	54de1843-4ea7-453d-b285-050c84aa39ef
6de66d82-cbc1-4a0e-a2f9-e3b5c76e5f6b	036af2dd-bad1-45c0-b316-000863ad808d
796bcd28-a3e4-4cb3-9a5f-9bc63024508a	036af2dd-bad1-45c0-b316-000863ad808d
588e005e-67c7-47d1-b662-cf34697260ea	e370e502-bda2-4139-96fe-73047803c665
975bfa2b-15fe-42dc-ba46-177f9250b73c	e370e502-bda2-4139-96fe-73047803c665
ad056aa5-9868-4d7e-9f32-3f6194467145	02408f6a-26f1-4fa4-bd4a-61a064e61016
2b231eda-d2e4-493c-9062-624932926127	02408f6a-26f1-4fa4-bd4a-61a064e61016
baf2bd4b-a19a-42ff-bb74-0d35383a8780	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
a50b7016-ed9b-4fc5-b25a-8602d473dd50	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
82b49f2f-948d-4731-a135-c0f05d2dd4ed	54de1843-4ea7-453d-b285-050c84aa39ef
aba5177e-aae4-4159-b19e-c7758f8b86bb	cd6b808f-83a1-4537-92fa-24b7131c6465
6d9203c4-3ead-478e-a5bc-84739d0700bc	e370e502-bda2-4139-96fe-73047803c665
28cbe1bc-bc3c-4e93-8712-fa0db129cf3e	e370e502-bda2-4139-96fe-73047803c665
5f5f71f5-ac05-4dc4-8196-f4a653e2d513	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
a96332d8-efc0-4cc5-835d-9f1141421c3c	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
83b3e4ef-c4df-4ed2-a411-2f46809f6a5d	d838aba9-2b1b-49f9-878d-08eea33a6670
9d1e7f88-2def-4a4e-b2f1-656838f6f90a	d838aba9-2b1b-49f9-878d-08eea33a6670
d7baa6b9-768c-44bd-99c0-1883c617abbc	f2212213-2d8a-4d33-b93e-34c75afd381e
e5d5a331-0e25-46b5-be3a-493be50bbf24	f2212213-2d8a-4d33-b93e-34c75afd381e
594d2760-c293-47e0-a662-f23e0cbd4862	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
83489fbe-2588-4f5d-92a8-6da1ac919dea	99edb065-2bbe-4ba2-beb5-2c86f76e77a3
31cc5e47-9677-4890-bf57-4fd30e00ad0a	e370e502-bda2-4139-96fe-73047803c665
b35c110a-1077-41ab-9b0b-6ba6941b4f9b	719fb3f1-66bc-466f-985a-a3f6b42a3b65
a30c3ad1-a56a-47b1-b9fd-bd78c4b05949	8df78858-783e-485a-91d8-70d4e1befcd1
156eed8f-869e-4112-91ff-9a9f7f57c567	8df78858-783e-485a-91d8-70d4e1befcd1
db9e1a71-7601-4ef8-abe3-c6ea6e51983d	83fca2b3-6bfd-4f66-ba26-c14cb781f840
bb950ec4-fea3-4f52-84c2-3829ed8de875	83fca2b3-6bfd-4f66-ba26-c14cb781f840
11e8ae07-743d-411c-9e64-cd42e2d393d8	8df78858-783e-485a-91d8-70d4e1befcd1
f72b3842-ecf7-4e96-afec-688d39738b29	8df78858-783e-485a-91d8-70d4e1befcd1
4f1f3533-5a85-4396-8ec0-a66655c69ac9	e370e502-bda2-4139-96fe-73047803c665
2ab6589a-43b1-4df9-927e-4892379d3e01	e370e502-bda2-4139-96fe-73047803c665
bf4b9cc2-d3d6-42e7-9024-58d2a260f504	54de1843-4ea7-453d-b285-050c84aa39ef
9b8d308f-e720-4a50-996e-c31a9f52a2f9	54de1843-4ea7-453d-b285-050c84aa39ef
929a3e00-465e-40d6-9a5a-839accc1404d	6ea81880-d90d-470b-b665-c49ea2469432
5ec013e3-cf38-45ec-b9c0-bff86e7db7bc	6ea81880-d90d-470b-b665-c49ea2469432
5d4a7c2d-eb07-4f85-bb83-f1ff43f218ff	f2212213-2d8a-4d33-b93e-34c75afd381e
a7b78f43-cfc1-4ad7-8cb7-c55cf3c511e5	f2212213-2d8a-4d33-b93e-34c75afd381e
172294b1-bda2-4a58-b645-5a986b5f26a6	cd6b808f-83a1-4537-92fa-24b7131c6465
9aece960-fc4e-4c60-997b-1de66ebc130d	036af2dd-bad1-45c0-b316-000863ad808d
df7142ad-b536-4230-a7e9-2f4f32ff815e	036af2dd-bad1-45c0-b316-000863ad808d
03e63ed1-f4bc-4ea3-adac-a108a7eea365	cd6b808f-83a1-4537-92fa-24b7131c6465
0f318ae4-93f6-4a30-9731-9730027c9773	cd6b808f-83a1-4537-92fa-24b7131c6465
0fd1fde9-7734-4bb2-b3df-ec5757f29e77	83fca2b3-6bfd-4f66-ba26-c14cb781f840
f601aed0-c36f-4d92-827f-a15ed509bd3e	83fca2b3-6bfd-4f66-ba26-c14cb781f840
3133a52c-a668-4567-bee2-d3005e661c7f	e370e502-bda2-4139-96fe-73047803c665
5602d064-a70e-4457-b0f0-22dcfe3a829d	54de1843-4ea7-453d-b285-050c84aa39ef
05a69a27-2a86-40e4-9b94-3aa457b078f7	8c7490f9-6155-4773-8633-ba7e1985511b
e1a24d16-f1c2-4525-8634-d48441caea8b	8c7490f9-6155-4773-8633-ba7e1985511b
364a28a1-1836-4443-87bc-5e7f15f3d4a3	d838aba9-2b1b-49f9-878d-08eea33a6670
86f5d0bc-120a-40f9-85d6-7f797e48db34	d838aba9-2b1b-49f9-878d-08eea33a6670
f4d0d6c3-a6de-4d7a-b983-87072439cd7a	8df78858-783e-485a-91d8-70d4e1befcd1
1a29326e-7e55-4e5f-b954-8b65e997f33b	8df78858-783e-485a-91d8-70d4e1befcd1
8fe3a741-1686-43ac-b8d9-8409441b8b72	e370e502-bda2-4139-96fe-73047803c665
928f768f-b1c2-46c6-9cd3-cca018d9f310	e370e502-bda2-4139-96fe-73047803c665
2b877a27-5c51-4b18-b402-378486ce70f7	a3c14b9e-20e2-43af-9930-ec672730277c
cd9372a1-be6f-4b6b-a233-de180e12f120	a3c14b9e-20e2-43af-9930-ec672730277c
eee9636a-df36-428a-bdd4-ded50aecfa66	9bf54097-be77-48d9-9917-042c36f46772
40a197c9-26fa-4bb1-9234-e52aafd0fb55	9bf54097-be77-48d9-9917-042c36f46772
fb7acc8d-dcaf-4af8-8f2e-c5afbfbc7687	719fb3f1-66bc-466f-985a-a3f6b42a3b65
697ec240-2f40-48ab-b38d-246dd59e406a	9bf54097-be77-48d9-9917-042c36f46772
a6e6c00e-557c-4d7b-83de-168b7245d8a0	9bf54097-be77-48d9-9917-042c36f46772
f2fe7691-bcdb-4152-b115-4f6d3c18ba29	e370e502-bda2-4139-96fe-73047803c665
e98c0d9c-a777-4ad7-8943-190e2d947c7e	e370e502-bda2-4139-96fe-73047803c665
b1e03ea7-6ebd-45b4-bf83-08c1b3db833f	54de1843-4ea7-453d-b285-050c84aa39ef
bd512d7f-4d2b-4cb8-8718-4fa312f4644b	e370e502-bda2-4139-96fe-73047803c665
80c51276-6ce3-4c82-8f15-988d10e427e5	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
bf4a33e7-7230-4e7f-8a74-bd30cae279f3	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
d441c510-45f5-4600-a166-6e53e28ed94c	038dc246-9665-4d48-a70d-17fd7f3468b2
bdb0f890-dfee-4e28-ac8a-f6ebace2ec53	038dc246-9665-4d48-a70d-17fd7f3468b2
e9c336c3-c69f-4e93-97e3-65792862f33f	54de1843-4ea7-453d-b285-050c84aa39ef
ab1555b5-2b5c-4ce0-8006-202d80f16064	54de1843-4ea7-453d-b285-050c84aa39ef
c356ffad-c569-40ef-967e-7998ea047ef3	6ea81880-d90d-470b-b665-c49ea2469432
5168d423-eace-40d0-8a71-0e9b5e52b28f	6ea81880-d90d-470b-b665-c49ea2469432
37064348-3d0f-4d2b-b952-65092917cd95	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
11d01692-31aa-4b9a-bccb-004fe27ac3d0	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
bde8d023-c7a3-47b7-97ae-8556bf7d9eef	44ca7603-7c96-4706-928c-8198da7ddaf3
6bd923f7-ec98-4bd2-a336-e3a81579bcf5	44ca7603-7c96-4706-928c-8198da7ddaf3
dfc548b2-6872-4ab7-b7ed-e8121758d760	036af2dd-bad1-45c0-b316-000863ad808d
b060502e-478f-433e-9095-56e4dd88b599	036af2dd-bad1-45c0-b316-000863ad808d
a10ed2d6-6ddb-4b12-87db-2d9669f0ab22	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
0690e8c7-e489-42ae-accd-a55233692873	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
f2b00111-1dc7-4cc4-b8b3-a85074d32123	f2212213-2d8a-4d33-b93e-34c75afd381e
a008da32-7bf2-48af-8c63-4ebcd304beec	f2212213-2d8a-4d33-b93e-34c75afd381e
4dc08f3c-fd2a-4098-8f8d-3c0e6bfe4cf7	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
20706969-93eb-4b78-81b9-23ec6f95e02e	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
bcef73b1-61ae-48f2-b5cf-4c66909db5c0	e370e502-bda2-4139-96fe-73047803c665
2bafa3a7-7a3d-43c1-9a7a-03ed48b86df1	e370e502-bda2-4139-96fe-73047803c665
00ec396f-23d8-4ee3-a63c-14890818231e	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
f8f43a31-3533-4632-91af-a35e621509df	719fb3f1-66bc-466f-985a-a3f6b42a3b65
99020e3b-ee54-47e1-9493-233694ca173d	8c7490f9-6155-4773-8633-ba7e1985511b
696e4b3f-aee3-4de4-8696-55807406c4e0	8c7490f9-6155-4773-8633-ba7e1985511b
2add2eab-6aa0-4214-862e-ebc577e116a0	d838aba9-2b1b-49f9-878d-08eea33a6670
eecdab62-21a1-4dc7-9c0b-eb9d361189b2	d838aba9-2b1b-49f9-878d-08eea33a6670
cb6de191-ac24-4b67-b30b-a9778d32ec7a	038dc246-9665-4d48-a70d-17fd7f3468b2
f0faafb3-3331-408e-b5fa-504f83e1c61f	038dc246-9665-4d48-a70d-17fd7f3468b2
fbf77d05-05b2-495b-9871-7ed658d7b6d3	6ea81880-d90d-470b-b665-c49ea2469432
b928d212-8c8b-4982-9753-670624de57ac	6ea81880-d90d-470b-b665-c49ea2469432
60633003-efdd-4d69-b83d-647563a86a4f	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
427db8d7-d3e5-4d78-bdec-883093b5f5ae	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
f4417749-1aca-4567-91f5-6d68ec5e23a2	e370e502-bda2-4139-96fe-73047803c665
f45a70ba-eb1e-4c80-a49a-215a77957e7c	54de1843-4ea7-453d-b285-050c84aa39ef
92008369-d046-4313-8ba9-1ecaa1b49ffd	cd6b808f-83a1-4537-92fa-24b7131c6465
1cd8e1c5-5c9c-4bc4-8c0a-dba535b88539	9bf54097-be77-48d9-9917-042c36f46772
cdd56b64-77d4-4391-b421-7e3a77973ff8	9bf54097-be77-48d9-9917-042c36f46772
133c7779-5f5c-4a7f-bd52-7510154b715a	036af2dd-bad1-45c0-b316-000863ad808d
a5c02de7-9fc1-4415-adeb-09e4d6eed071	036af2dd-bad1-45c0-b316-000863ad808d
d1e49ab9-5a04-4598-8180-9da81797344c	83fca2b3-6bfd-4f66-ba26-c14cb781f840
f1318f94-fe39-4250-b5b5-43539a3df486	83fca2b3-6bfd-4f66-ba26-c14cb781f840
f8a578bc-579a-4b0d-9820-ac75188380e7	54de1843-4ea7-453d-b285-050c84aa39ef
7a376b2e-b974-4e3d-a0e8-eea1c1ec815f	54de1843-4ea7-453d-b285-050c84aa39ef
09b0c2e7-a085-4659-b86b-742251c7d455	83fca2b3-6bfd-4f66-ba26-c14cb781f840
d2dc90f6-ffe7-4330-b8d4-615b9b4eb229	83fca2b3-6bfd-4f66-ba26-c14cb781f840
c460595a-3359-4266-89de-0cb7a0ecb328	719fb3f1-66bc-466f-985a-a3f6b42a3b65
c2b71ba3-9323-4750-a971-ce0440ae8664	719fb3f1-66bc-466f-985a-a3f6b42a3b65
85acf93b-d8b0-48af-982a-4883e0453bb5	e370e502-bda2-4139-96fe-73047803c665
f9e9247c-95e0-4229-bd06-2fa2afa22eed	e370e502-bda2-4139-96fe-73047803c665
868a865b-f4ca-4017-8c08-d70213ee1489	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
034be83a-a9de-446e-95dd-a0a1321543b3	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
a9fd3f08-7f03-4392-8bb8-9f684af20d27	a3c14b9e-20e2-43af-9930-ec672730277c
01e7d748-3a45-44fb-96a8-052ccd043fb6	a3c14b9e-20e2-43af-9930-ec672730277c
13e9c7a1-34cf-409b-a55b-e54c8ca246ca	719fb3f1-66bc-466f-985a-a3f6b42a3b65
d57c806d-73c2-49ed-9050-cd0f00d86a92	cd6b808f-83a1-4537-92fa-24b7131c6465
10055ac2-ef9e-4ddc-a21a-3b78d32a21d5	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
78c98930-a0ae-4a61-9500-e74e611e8a80	49ee1f3c-12a9-4b4d-9f20-cbb3d4ffef36
7c04d7fe-5010-4637-a711-9f6253ad94d5	cd6b808f-83a1-4537-92fa-24b7131c6465
a4ceac1c-e102-4f01-9585-b4b62f33418c	d838aba9-2b1b-49f9-878d-08eea33a6670
ff053719-d6fe-4a21-86e2-b4524f6ed15e	d838aba9-2b1b-49f9-878d-08eea33a6670
c6ef1d05-6f60-4738-a51c-fe847683d2df	e370e502-bda2-4139-96fe-73047803c665
70de51c9-8643-4ff6-a9fa-ca6a9ec982b7	e370e502-bda2-4139-96fe-73047803c665
e9b654b6-177b-4981-8996-4b0bf65a4363	f2212213-2d8a-4d33-b93e-34c75afd381e
dd0b87bc-70b2-4d7c-bef8-e2436248fa1d	f2212213-2d8a-4d33-b93e-34c75afd381e
5677d9cd-698c-431c-b9cc-58ef641de32c	82e55451-38c5-4660-bd24-1dcb286190af
907f130c-3fc5-463e-a149-317bc4bd6ce8	82e55451-38c5-4660-bd24-1dcb286190af
9fa9a209-cb04-433b-a5f4-5c34d1514f63	9c450638-4aac-4f05-82af-cadbf7cd9a5c
5304a667-a217-4e40-b75e-87a6be25bd9b	9c450638-4aac-4f05-82af-cadbf7cd9a5c
60505371-ee3e-4096-920a-93a962e026f1	46674edf-ef43-471f-af72-2cf7b9f059d8
2a9bf446-874f-480b-8a55-a0c112dc18fe	46674edf-ef43-471f-af72-2cf7b9f059d8
347b1c75-d7fa-450b-a600-6acee387711a	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
e905cc80-6b67-469c-a607-47f5d705f27b	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
350d43c5-7fdb-4a3a-8488-b4e8b221f29d	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
ae6e49f3-5e7d-4268-9ba0-0c2b5042aa5b	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
6879357c-5f9d-4007-934d-216debdeea05	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
8b776d87-cf7e-45d5-adc8-183b9eefce04	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
d8cc6540-07ad-4562-b643-c3628e7c0561	3b4fa477-1035-41d1-ace7-25fcd5c4134f
1a4864e6-276d-4644-85a3-2cc0939b3808	3b4fa477-1035-41d1-ace7-25fcd5c4134f
a3f134dd-e267-4dce-bc62-51a99bac1383	02408f6a-26f1-4fa4-bd4a-61a064e61016
4e60f91e-a8ae-4de8-9f40-6f87e10c26a4	02408f6a-26f1-4fa4-bd4a-61a064e61016
5e739ce3-8837-4e2e-b6e8-ef5ea55317fb	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
04788b66-6213-4ff2-be08-7d13102b2b59	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
060a36cd-4c09-4096-a42c-13348e009ac1	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
331e9a8e-2343-4320-af4e-b54341c429df	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
f2618a54-a5c7-4411-aa7d-3ab675596366	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
75e33c01-3cd4-4c4e-9780-4ac176d23185	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
ebae775c-5ecd-4c52-b0a1-747ac469a9e9	c139fca2-9ee4-42ff-8654-817876f3db74
7b10a048-8392-47bb-81e8-9d438c002405	c139fca2-9ee4-42ff-8654-817876f3db74
83695177-6f8c-40e8-8203-c80cbe8a70e3	a3c14b9e-20e2-43af-9930-ec672730277c
463c1c11-57b0-4a14-a99e-bd3d512d1c6f	a3c14b9e-20e2-43af-9930-ec672730277c
6476c33f-0e2a-47ee-bf95-a5f5f60abbee	3b4fa477-1035-41d1-ace7-25fcd5c4134f
9786eea0-dd88-4b39-96d4-fe8abcb3fb2e	3b4fa477-1035-41d1-ace7-25fcd5c4134f
8f9f8f4a-48ee-4208-a2c0-5057902ee02f	9c450638-4aac-4f05-82af-cadbf7cd9a5c
b64b86ee-f273-493f-a348-f7dfacabd390	9c450638-4aac-4f05-82af-cadbf7cd9a5c
750cb705-2f60-411f-9201-606eb3babbce	82e55451-38c5-4660-bd24-1dcb286190af
ad267090-2fe7-4170-a82f-233e65330de1	82e55451-38c5-4660-bd24-1dcb286190af
7e9db65f-aee7-4e0c-b442-e4d260482265	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
17b35771-6c14-4beb-8e69-18cf02b1999e	0229a40a-b0d7-479c-884d-fe2de7a6aa6c
35e6aa7c-0eb8-4a41-9c5f-9d98d561e553	64ed9fe7-dc9a-4f19-b182-5e4c74db3487
4b222c75-ed1a-49c1-a616-cd7b46c60fff	64ed9fe7-dc9a-4f19-b182-5e4c74db3487
15d8b1b5-6750-42a8-b846-e4a37f25bdc5	64ed9fe7-dc9a-4f19-b182-5e4c74db3487
2fb10f21-09c5-411c-aa99-44b1a23fd6cf	64ed9fe7-dc9a-4f19-b182-5e4c74db3487
09d5ffea-dfef-42d6-bb69-63280a78c352	64ed9fe7-dc9a-4f19-b182-5e4c74db3487
4229c92e-1d11-4c60-85f2-aa6aeff2556a	64ed9fe7-dc9a-4f19-b182-5e4c74db3487
b26db364-4875-4528-b516-bcc695fe718d	5be89e3e-0c70-4c47-9fab-c7246de986e8
66aabf19-6e91-421b-8689-093ee1966229	5be89e3e-0c70-4c47-9fab-c7246de986e8
cba9b8e3-0412-4721-b1af-37fc44d95fde	9bf54097-be77-48d9-9917-042c36f46772
8aa52687-0ed6-4973-a33a-2adf718f9b90	9bf54097-be77-48d9-9917-042c36f46772
bf09c9d2-ebf2-4a5d-9d9c-4f8f2231bc60	5be89e3e-0c70-4c47-9fab-c7246de986e8
59542506-8907-42e4-a961-23a1f1df7ace	5be89e3e-0c70-4c47-9fab-c7246de986e8
9dd99022-e8fa-4e7f-a236-c640d152cb98	5be89e3e-0c70-4c47-9fab-c7246de986e8
3f347410-8daf-43be-a139-76012141f060	5be89e3e-0c70-4c47-9fab-c7246de986e8
402f3097-ee7d-4e52-a506-b550bfa4815a	9c450638-4aac-4f05-82af-cadbf7cd9a5c
111efaf9-3bfa-4d2c-964d-8e1b2911e4ea	9c450638-4aac-4f05-82af-cadbf7cd9a5c
bd7116ee-9c5c-4b25-ba53-150e9e8c6eed	527118e7-2e8f-4560-b121-22ff2edebf0d
034b506f-1b11-4969-865e-5906964962cf	527118e7-2e8f-4560-b121-22ff2edebf0d
c75b934b-717c-46fb-8d2e-5e469ad2e246	527118e7-2e8f-4560-b121-22ff2edebf0d
d797307c-0a61-4afe-80fc-75e5893c8260	527118e7-2e8f-4560-b121-22ff2edebf0d
6a4f4916-c523-486c-a17c-b1ee98721b84	527118e7-2e8f-4560-b121-22ff2edebf0d
095ed5f0-7112-4aa0-9520-3ae6144774a9	527118e7-2e8f-4560-b121-22ff2edebf0d
06b56d1a-e43c-4806-baf3-5fdd7dc7407a	527118e7-2e8f-4560-b121-22ff2edebf0d
0d63ca06-352c-4964-9820-39780e6d8d85	527118e7-2e8f-4560-b121-22ff2edebf0d
601dc8ce-a533-4dda-a8fd-64699ae50507	527118e7-2e8f-4560-b121-22ff2edebf0d
ebb1a8e5-1c21-44e1-a4d6-579e6ce3f7f9	527118e7-2e8f-4560-b121-22ff2edebf0d
499c4d84-9607-47c7-bed8-dc6dc655891e	44ca7603-7c96-4706-928c-8198da7ddaf3
1013cbf2-0a6d-41ae-b45d-e8d3dd259d38	44ca7603-7c96-4706-928c-8198da7ddaf3
b2bd6c67-166d-4d7e-aa45-e5316bc150ce	9c450638-4aac-4f05-82af-cadbf7cd9a5c
99932a02-4ef2-437c-b2b4-0a7f2b7493b4	9c450638-4aac-4f05-82af-cadbf7cd9a5c
af1342dd-a639-458f-8b81-bb4eac9a059b	9c450638-4aac-4f05-82af-cadbf7cd9a5c
01da2a43-7e17-4540-ac81-47e50b8ea9e8	9c450638-4aac-4f05-82af-cadbf7cd9a5c
9ffc377c-d6f4-4757-a4b8-4e36f9023fd3	f60b2462-8c49-425f-b29a-6bc269998d48
503cffb9-c2dd-4560-96cf-c6323385269c	f60b2462-8c49-425f-b29a-6bc269998d48
f36f710c-37f9-47af-ab9c-d95291f3a3cb	f60b2462-8c49-425f-b29a-6bc269998d48
6090f232-a656-4949-be16-bad01eb1d8d9	f60b2462-8c49-425f-b29a-6bc269998d48
c8885e78-7284-48c2-ba1b-969dab6e66e3	f60b2462-8c49-425f-b29a-6bc269998d48
42100995-14c2-4836-8d9b-f566222853ed	527118e7-2e8f-4560-b121-22ff2edebf0d
5ce4544b-3fa4-4709-8ddc-fe17da71ecc9	527118e7-2e8f-4560-b121-22ff2edebf0d
20762527-a511-406e-9d38-5b684793d488	527118e7-2e8f-4560-b121-22ff2edebf0d
8e96ce35-7462-4cd9-8dea-ef3b465f58c9	527118e7-2e8f-4560-b121-22ff2edebf0d
42b1898c-f836-4ce2-b775-f659d56e2292	527118e7-2e8f-4560-b121-22ff2edebf0d
7559d061-0269-4074-b7f3-0d6e34dbb031	527118e7-2e8f-4560-b121-22ff2edebf0d
884398fb-9af7-4584-abc3-c9e113c6aaa4	527118e7-2e8f-4560-b121-22ff2edebf0d
17b965c1-b480-455c-829b-f7d91b52d363	527118e7-2e8f-4560-b121-22ff2edebf0d
0eb176c6-6718-48c3-86f6-4c049b9d516f	527118e7-2e8f-4560-b121-22ff2edebf0d
07dad1c2-64b3-4477-9654-bfdc3cc03b6d	527118e7-2e8f-4560-b121-22ff2edebf0d
327d81e1-5dec-4d95-8e22-6c23bb710b26	f60b2462-8c49-425f-b29a-6bc269998d48
33313557-ae09-4cab-ac17-1cccfeb44171	f60b2462-8c49-425f-b29a-6bc269998d48
9db3215b-1c89-43e5-815f-029012f5cf70	f60b2462-8c49-425f-b29a-6bc269998d48
2f73372a-fe9b-46cb-bb9a-21855be6af80	f60b2462-8c49-425f-b29a-6bc269998d48
a6552e99-873f-4db6-afce-e6720a8110f8	44ca7603-7c96-4706-928c-8198da7ddaf3
8336bf33-aa8e-41d7-985f-ccd9f71e99da	44ca7603-7c96-4706-928c-8198da7ddaf3
6c56a8a5-6784-4c27-8d69-332fe200a404	9bf54097-be77-48d9-9917-042c36f46772
f35ea2d6-ff81-4d3a-9cd1-2d04b5328ace	9bf54097-be77-48d9-9917-042c36f46772
7a3a0676-b4cf-4b97-a829-18ac0f8335dd	f60b2462-8c49-425f-b29a-6bc269998d48
0f47a140-5cf3-492e-994b-46b4bd0ef2e5	f60b2462-8c49-425f-b29a-6bc269998d48
b59019fc-eee8-44a6-b809-47966f168e25	f60b2462-8c49-425f-b29a-6bc269998d48
4d1ca9f6-b8cd-436f-b664-7e3d67c076f9	f60b2462-8c49-425f-b29a-6bc269998d48
f78d3686-4028-4e2d-aa30-06f55c15bfe7	f60b2462-8c49-425f-b29a-6bc269998d48
e00db858-72d3-41ea-aa6d-ed842e270d6e	f60b2462-8c49-425f-b29a-6bc269998d48
066192fc-673b-4838-89e9-12bb39083d8b	f60b2462-8c49-425f-b29a-6bc269998d48
9679c976-a5d1-4b1e-a480-3acc7c85bc62	f60b2462-8c49-425f-b29a-6bc269998d48
aaf2e92d-9082-49f7-965f-13e61d14d64f	f60b2462-8c49-425f-b29a-6bc269998d48
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: Barrette-Purging-Scrabble
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2b03fed2-d859-44ff-bcdf-91172cad5043	230f1c4633f2a0fe6e47e3179d08a60c3b90c174dd12e5d5d23c616aec05209b	2025-06-15 18:05:48.059165+00	20240920181901_init	\N	\N	2025-06-15 18:05:48.051747+00	1
f659519f-f621-44df-aa86-7b6ef4152c04	2c8ec92584b6632968e3ebb04c708573502ae0ff685cf148388831decb0e735c	2025-06-15 18:05:48.141371+00	20250424190439_update_lessons	\N	\N	2025-06-15 18:05:48.127582+00	1
8320483c-3638-4d85-b6ec-15709d0c5c7b	30538bf6331ce0da15b9d6474f96404521b8087526b58782d63e544b46f88304	2025-06-15 18:05:48.083447+00	20240921071126_updated_lesson_user_added_shedule_group	\N	\N	2025-06-15 18:05:48.061449+00	1
4451892d-3eff-493f-9212-5ec06813002e	d98eeb9bbe74df8079442de6c79afd298d387a181286a873d08bb137ba56ac52	2025-06-15 18:05:48.094169+00	20240921075600_updated_all	\N	\N	2025-06-15 18:05:48.084149+00	1
09f5545d-f096-4f10-9f2b-ef5fbed4ecaa	35609dcd1e773692844ddd9d8bd936161ef0a0567198e2dfe5084bb18b96c64f	2025-06-15 18:05:48.174864+00	20250524123728_group_update	\N	\N	2025-06-15 18:05:48.173194+00	1
e50242a5-9356-43c5-bf86-cc758099a60c	5fa2bd0e6cb6d90b25ee99000a165c2f29e001d0047f55d2911160a82639c1f4	2025-06-15 18:05:48.099721+00	20240921154409_updated_lesson_and_scheduleday	\N	\N	2025-06-15 18:05:48.094757+00	1
a02910aa-bb0c-4c9f-a6a1-fd9a2bbbfd53	83fc7d6d2981d7645bc971fb744b95cade00bd653511f66da3ef3b8ff6701752	2025-06-15 18:05:48.146182+00	20250424193624_user	\N	\N	2025-06-15 18:05:48.141936+00	1
1bcd0f3b-cd03-4060-8c89-460e4626ac47	71831b140a9629aecf2b73648f1cecf2956ebcbca46de9c35ff1003a70a3cd33	2025-06-15 18:05:48.106305+00	20240921155408_update_schedule_lessons	\N	\N	2025-06-15 18:05:48.100228+00	1
10d45fbb-f83c-4677-bfe3-dacd935d94b2	3123ed177ece10e78943aeccd1e377ea4b9be8b6503563d30bc367dfe4aadc64	2025-06-15 18:05:48.111296+00	20240921165004_updated_schedule_lesson	\N	\N	2025-06-15 18:05:48.107227+00	1
488504dd-c6ad-41c2-96ea-5ee768a97c4c	dbdf2178c2a970ef70f9604c372e47dfacbc4157a96ff4ce1fbf0bb69467c3e8	2025-06-15 18:05:48.113237+00	20240922125422_updated_schedule_day	\N	\N	2025-06-15 18:05:48.111851+00	1
c427dbdd-1fb5-4b49-a329-b91a108a2153	422a963400e99271c81b7f81da6683644324b055672c11017b5737673d89cbc2	2025-06-15 18:05:48.15022+00	20250430091636_no_new_migration	\N	\N	2025-06-15 18:05:48.146878+00	1
80753a5c-c91e-470f-96ae-15e3c143b0a2	df91df37b9648ca7d74d3f8d8dd1551368f312508bcc4e905a734af2943beb3b	2025-06-15 18:05:48.115188+00	20240922142140_updated_schedule_day	\N	\N	2025-06-15 18:05:48.113909+00	1
b192ed20-9ced-4f6b-89f8-54ff089398b9	1c3befaab57597f6a8b58d100e8faf64d53c635771e1c447aac2c23cb9f22cd5	2025-06-15 18:05:48.116814+00	20240922143509_updated_schedule_lesson	\N	\N	2025-06-15 18:05:48.115683+00	1
5a2d0c35-c4c0-4e39-9327-73bb58adfeba	72f4e8a963829c03755267d8b3d5f7baed0eca157dea97a7d7573c7939fcf483	2025-06-15 18:05:48.120447+00	20240929080036_update_schedule_structure	\N	\N	2025-06-15 18:05:48.117198+00	1
cfcf0638-3ffc-4612-b9b5-9e49934a67ee	352081ba6bc7f45de02ed57ba8add68cb842ce56c7bb9fcd324e4532896fd587	2025-06-15 18:05:48.160632+00	20250502160957_create_location	\N	\N	2025-06-15 18:05:48.150915+00	1
45d24560-d394-4601-9232-b5eaf044dcf0	a8bcb63fc3c02f21d5a40f40e82af259cb2c81f158366aad77c0d01e18dab7cc	2025-06-15 18:05:48.122997+00	20240929081710_returned_audiences_to_schedule_lesson	\N	\N	2025-06-15 18:05:48.121153+00	1
5a6547d5-eb5b-479c-b4fc-3b7de831e0c2	26712750374ff77cf0ffa5a8fef45e032d283f6eabacc3aae9fe82219e91f24e	2025-06-15 18:05:48.125018+00	20240929085742_make_scheduleday_optional	\N	\N	2025-06-15 18:05:48.12342+00	1
3572a4f8-2c3e-4137-8c8b-0dbd9ed02c5e	a894c11775d051d056cbee8495c930b74a0490f988ec747700e3ab52a059c0c8	2025-06-15 18:05:48.126963+00	20241012173410_add_user_role	\N	\N	2025-06-15 18:05:48.125598+00	1
2d0d10c7-399c-49cb-9bcf-132b1cb74319	ec01cab20ae550ffc0c61d19aadc05ad65546a1bde469e0a83c49291eb8c56db	2025-06-15 18:05:48.163105+00	20250502163024_update_location_and_speciality	\N	\N	2025-06-15 18:05:48.161149+00	1
97f32733-bde8-496a-8c47-dfc042d1d308	2451615a84a22dee7e841ae14350f8164e5773280d650b6ba94ac4b21430674f	2025-06-15 18:05:48.165522+00	20250502164123_location	\N	\N	2025-06-15 18:05:48.163785+00	1
76c41154-d61d-4011-ae17-948930e08919	3a606a00bdb908fc93f605c2bb130b6ef897297eee38d4d1faf606c8275043d7	2025-06-15 18:05:48.167476+00	20250502164326_location	\N	\N	2025-06-15 18:05:48.166004+00	1
c9269076-65b1-4cc5-8dab-7dcf9e349839	31a8cfe0bb2a979078996fcfdce5227f00fb38c2f9d0e6b6cdeabbe94399b093	2025-06-15 18:05:48.169839+00	20250502164754_group	\N	\N	2025-06-15 18:05:48.16828+00	1
8a9f9174-66cc-40a4-b270-880a7c18ba16	adbae829565c081c96078f031fa3a50f59838b89f80aac3f17549ed8645740f2	2025-06-15 18:05:48.172546+00	20250524123318_update_group	\N	\N	2025-06-15 18:05:48.170275+00	1
\.


--
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY (id);


--
-- Name: LessonOrder LessonOrder_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."LessonOrder"
    ADD CONSTRAINT "LessonOrder_pkey" PRIMARY KEY (id);


--
-- Name: Lesson Lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."Lesson"
    ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY (id);


--
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- Name: ScheduleDay ScheduleDay_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."ScheduleDay"
    ADD CONSTRAINT "ScheduleDay_pkey" PRIMARY KEY (id);


--
-- Name: ScheduleLesson ScheduleLesson_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."ScheduleLesson"
    ADD CONSTRAINT "ScheduleLesson_pkey" PRIMARY KEY (id);


--
-- Name: Schedule Schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."Schedule"
    ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY (id);


--
-- Name: Speciality Speciality_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."Speciality"
    ADD CONSTRAINT "Speciality_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _LessonTeachers _LessonTeachers_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."_LessonTeachers"
    ADD CONSTRAINT "_LessonTeachers_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Group_id_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "Group_id_key" ON public."Group" USING btree (id);


--
-- Name: LessonOrder_id_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "LessonOrder_id_key" ON public."LessonOrder" USING btree (id);


--
-- Name: Lesson_id_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "Lesson_id_key" ON public."Lesson" USING btree (id);


--
-- Name: Location_id_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "Location_id_key" ON public."Location" USING btree (id);


--
-- Name: ScheduleDay_id_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "ScheduleDay_id_key" ON public."ScheduleDay" USING btree (id);


--
-- Name: ScheduleLesson_id_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "ScheduleLesson_id_key" ON public."ScheduleLesson" USING btree (id);


--
-- Name: Schedule_groupId_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "Schedule_groupId_key" ON public."Schedule" USING btree ("groupId");


--
-- Name: Schedule_id_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "Schedule_id_key" ON public."Schedule" USING btree (id);


--
-- Name: Speciality_id_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "Speciality_id_key" ON public."Speciality" USING btree (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_id_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "User_id_key" ON public."User" USING btree (id);


--
-- Name: User_login_key; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE UNIQUE INDEX "User_login_key" ON public."User" USING btree (login);


--
-- Name: _LessonTeachers_B_index; Type: INDEX; Schema: public; Owner: Barrette-Purging-Scrabble
--

CREATE INDEX "_LessonTeachers_B_index" ON public."_LessonTeachers" USING btree ("B");


--
-- Name: Group Group_curatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_curatorId_fkey" FOREIGN KEY ("curatorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Group Group_specialityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES public."Speciality"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ScheduleDay ScheduleDay_scheduleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."ScheduleDay"
    ADD CONSTRAINT "ScheduleDay_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES public."Schedule"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ScheduleLesson ScheduleLesson_lessonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."ScheduleLesson"
    ADD CONSTRAINT "ScheduleLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES public."Lesson"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ScheduleLesson ScheduleLesson_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."ScheduleLesson"
    ADD CONSTRAINT "ScheduleLesson_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."LessonOrder"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ScheduleLesson ScheduleLesson_scheduleDayId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."ScheduleLesson"
    ADD CONSTRAINT "ScheduleLesson_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES public."ScheduleDay"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Schedule Schedule_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."Schedule"
    ADD CONSTRAINT "Schedule_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Speciality Speciality_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."Speciality"
    ADD CONSTRAINT "Speciality_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: User User_studentGroupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_studentGroupId_fkey" FOREIGN KEY ("studentGroupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _LessonTeachers _LessonTeachers_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."_LessonTeachers"
    ADD CONSTRAINT "_LessonTeachers_A_fkey" FOREIGN KEY ("A") REFERENCES public."ScheduleLesson"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _LessonTeachers _LessonTeachers_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Barrette-Purging-Scrabble
--

ALTER TABLE ONLY public."_LessonTeachers"
    ADD CONSTRAINT "_LessonTeachers_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

