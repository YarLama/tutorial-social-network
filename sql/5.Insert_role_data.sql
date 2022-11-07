INSERT INTO public.roles(
	id, value, description, "createdAt", "updatedAt")
	VALUES 
        (1, 'ADMIN', 'default admin', '2022-08-25 19:42:47.016+00', '2022-08-25 19:42:47.016+00'),
        (2, 'USER', 'default user', '2022-08-25 19:43:08.941+00', '2022-08-25 19:43:08.941+00'),
        (3, 'TESTER', 'default tester', '2022-08-25 19:43:08.941+00', '2022-08-25 19:43:08.941+00')
    ON CONFLICT (id) DO NOTHING;