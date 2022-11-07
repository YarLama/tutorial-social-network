CREATE SEQUENCE IF NOT EXISTS public.user_roles_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.user_roles_id_seq
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.user_roles
(
    id integer NOT NULL DEFAULT nextval('user_roles_id_seq'::regclass),
    "roleId" integer,
    "userId" integer,
    CONSTRAINT user_roles_pkey PRIMARY KEY (id),
    CONSTRAINT "user_roles_roleId_userId_key" UNIQUE ("roleId", "userId"),
    CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId")
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

ALTER TABLE IF EXISTS public.user_roles
    OWNER to postgres;

ALTER SEQUENCE public.user_roles_id_seq OWNED BY public.user_roles.id;

ALTER TABLE ONLY public.user_roles ALTER COLUMN id SET DEFAULT nextval('user_roles_id_seq'::regclass);