--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-06-28 15:54:09

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

DROP DATABASE wallet;
--
-- TOC entry 3358 (class 1262 OID 16509)
-- Name: wallet; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE wallet WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';


ALTER DATABASE wallet OWNER TO postgres;

\connect wallet

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3359 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16560)
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    id integer NOT NULL,
    amount money NOT NULL,
    notes text,
    type_transaction_id integer NOT NULL
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16559)
-- Name: notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.notification ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 16516)
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    full_name character varying,
    phone_number character varying,
    balance money,
    picture character varying,
    user_id integer NOT NULL
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16523)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 16513)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    amount money NOT NULL,
    date_time timestamp without time zone NOT NULL,
    notes text,
    recipient_id integer NOT NULL,
    sender_id integer NOT NULL,
    type_transaction_id integer NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16527)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16566)
-- Name: transaction_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.transaction_type OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16565)
-- Name: transaction_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction_type ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 16510)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    pin character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16519)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3350 (class 0 OID 16560)
-- Dependencies: 216
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (id, amount, notes, type_transaction_id) FROM stdin;
\.


--
-- TOC entry 3345 (class 0 OID 16516)
-- Dependencies: 211
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, full_name, phone_number, balance, picture, user_id) FROM stdin;
\.


--
-- TOC entry 3344 (class 0 OID 16513)
-- Dependencies: 210
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, amount, date_time, notes, recipient_id, sender_id, type_transaction_id) FROM stdin;
\.


--
-- TOC entry 3352 (class 0 OID 16566)
-- Dependencies: 218
-- Data for Name: transaction_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_type (id, name, description) FROM stdin;
\.


--
-- TOC entry 3343 (class 0 OID 16510)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, pin) FROM stdin;
5	ayu	ayu@gmail.com	ayu123	092834
1	bima	bima@gmail.com	bima123	123456
4	danu	danu@gmail.com	danu123	829372
\.


--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 215
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_id_seq', 1, false);


--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 213
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 1, false);


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 214
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 1, false);


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 217
-- Name: transaction_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_type_id_seq', 1, false);


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 212
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 3199 (class 2606 OID 16578)
-- Name: notification notification_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pk PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 16588)
-- Name: notification notification_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_un UNIQUE (type_transaction_id);


--
-- TOC entry 3195 (class 2606 OID 16540)
-- Name: profile profile_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pk PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 16572)
-- Name: profile profile_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_un UNIQUE (user_id);


--
-- TOC entry 3187 (class 2606 OID 16538)
-- Name: transaction transaction_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pk PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 16586)
-- Name: transaction_type transaction_type_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type
    ADD CONSTRAINT transaction_type_pk PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 16580)
-- Name: transaction transaction_un_recipient; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_un_recipient UNIQUE (recipient_id);


--
-- TOC entry 3191 (class 2606 OID 16582)
-- Name: transaction transaction_un_sender; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_un_sender UNIQUE (sender_id);


--
-- TOC entry 3193 (class 2606 OID 16584)
-- Name: transaction transaction_un_type; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_un_type UNIQUE (type_transaction_id);


--
-- TOC entry 3185 (class 2606 OID 16542)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


-- Completed on 2022-06-28 15:54:10

--
-- PostgreSQL database dump complete
--

