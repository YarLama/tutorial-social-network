CREATE SEQUENCE IF NOT EXISTS public.roles_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.roles_id_seq
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.roles
(
    id integer NOT NULL,
    value character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT roles_pkey PRIMARY KEY (id),
    CONSTRAINT roles_value_key UNIQUE (value)
);

ALTER TABLE IF EXISTS public.roles
    OWNER to postgres;

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq'::regclass);