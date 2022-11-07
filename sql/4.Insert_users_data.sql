INSERT INTO public.users(
	id, first_name, last_name, middle_name, description, phone, email, password, "createdAt", "updatedAt")
	VALUES 
        (1, 'Сычуля', 'Омега', null, null, '89036356251', 'SichulyAdmin@kek.ru', '$2a$05$lsR0wtQcT8kYzHk17riDIOGoWFxeCjaOozfAfvHp1uefN09V3GLxu', '2022-10-10 20:46:54.882+00', '2022-10-10 20:46:54.882+00'),
        (2, 'Виктория', 'Холост', null, null, '89038353215', 'viktoria1488@kek.ru', '$2a$05$tMA86Ys92v1OR7xYoIiYDeojxA1FCHJ7h4TwpwSUZ2dK4MlqcQXmK', '2022-10-10 20:45:49.613+00', '2022-10-10 20:45:49.613+00'),
        (3, 'Сергей', 'Попов', null, null, '89034375327', 'senya228@kek.ru', '$2a$05$v2ERVw6krPmIQpbQMFQl0eREZjSSXEDT0ZVzO3fDEQawdxXmQRNHu', '2022-10-10 20:45:07.093+00', '2022-10-10 20:45:07.093+00')
    ON CONFLICT (id) DO NOTHING;
