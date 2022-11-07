INSERT INTO public.user_roles(
	id, "roleId", "userId")
	VALUES 
        (1, 1, 1),
        (2, 2, 1),
        (3, 2, 2),
        (4, 2, 3)
    ON CONFLICT (id) DO NOTHING;