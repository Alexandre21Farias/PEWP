-- Seed de Seleções da Copa do Mundo 2026
INSERT INTO public.selecoes (nome, sigla, tecnico, ranking_fifa, media_gols_marcados, media_gols_sofridos) VALUES
-- Grupo A
('México', 'MEX', 'Javier Aguirre', 15, 1.40, 1.10),
('África do Sul', 'RSA', 'Hugo Broos', 59, 1.10, 1.20),
('Coreia do Sul', 'KOR', 'Hong Myung-bo', 22, 1.60, 1.00),
('Chéquia', 'CZE', 'Ivan Hašek', 36, 1.30, 1.15),
-- Grupo B
('Canadá', 'CAN', 'Jesse Marsch', 49, 1.35, 1.25),
('Suíça', 'SUI', 'Murat Yakin', 19, 1.50, 0.95),
('Catar', 'QAT', 'Tintín Márquez', 35, 1.20, 1.40),
('Bósnia e Herzegovina', 'BIH', 'Sergej Barbarez', 74, 1.05, 1.50),
-- Grupo C
('Brasil', 'BRA', 'Carlo Ancelotti', 5, 2.10, 0.80),
('Marrocos', 'MAR', 'Walid Regragui', 12, 1.80, 0.90),
('Haiti', 'HAI', 'Sébastien Migné', 86, 0.95, 1.70),
('Escócia', 'SCO', 'Steve Clarke', 39, 1.15, 1.35),
-- Grupo D
('Estados Unidos', 'USA', 'Mauricio Pochettino', 11, 1.75, 1.05),
('Paraguai', 'PAR', 'Daniel Garnero', 56, 0.90, 1.20),
('Austrália', 'AUS', 'Graham Arnold', 24, 1.45, 1.10),
('Turquia', 'TUR', 'Vincenzo Montella', 40, 1.30, 1.30),
-- Grupo E
('Alemanha', 'GER', 'Julian Nagelsmann', 16, 1.95, 1.10),
('Curaçau', 'CUW', 'Dick Advocaat', 90, 0.80, 2.20),
('Costa do Marfim', 'CIV', 'Emerse Faé', 38, 1.40, 1.15),
('Equador', 'ECU', 'Félix Sánchez', 31, 1.25, 1.00),
-- Grupo F
('Países Baixos', 'NED', 'Ronald Koeman', 7, 2.05, 0.90),
('Japão', 'JPN', 'Hajime Moriyasu', 18, 1.70, 0.95),
('Tunísia', 'TUN', 'Montasser Louhichi', 41, 1.00, 1.10),
('Suécia', 'SWE', 'Jon Dahl Tomasson', 28, 1.55, 1.20),
-- Grupo G
('Bélgica', 'BEL', 'Domenico Tedesco', 3, 2.20, 0.85),
('Egito', 'EGY', 'Hossam Hassan', 36, 1.40, 1.10),
('Irã', 'IRN', 'Amir Ghalenoei', 20, 1.50, 1.00),
('Nova Zelândia', 'NZL', 'Darren Bazeley', 104, 0.85, 1.90),
-- Grupo H
('Espanha', 'ESP', 'Luis de la Fuente', 8, 2.30, 0.70),
('Cabo Verde', 'CPV', 'Bubista', 65, 1.10, 1.30),
('Arábia Saudita', 'KSA', 'Roberto Mancini', 53, 1.20, 1.25),
('Uruguai', 'URU', 'Marcelo Bielsa', 14, 1.85, 0.95),
-- Grupo I
('França', 'FRA', 'Didier Deschamps', 2, 2.40, 0.65),
('Senegal', 'SEN', 'Aliou Cissé', 17, 1.65, 0.95),
('Noruega', 'NOR', 'Ståle Solbakken', 47, 1.30, 1.30),
('Iraque', 'IRQ', 'Jesús Casas', 58, 1.10, 1.40),
-- Grupo J
('Argentina', 'ARG', 'Lionel Scaloni', 1, 2.50, 0.50),
('Argélia', 'ALG', 'Vladimir Petković', 43, 1.35, 1.15),
('Áustria', 'AUT', 'Ralf Rangnick', 25, 1.40, 1.10),
('Jordânia', 'JOR', 'Jamal Sellami', 68, 0.95, 1.45),
-- Grupo K
('Portugal', 'POR', 'Roberto Martínez', 6, 2.15, 0.75),
('Uzbequistão', 'UZB', 'Srečko Katanec', 64, 1.15, 1.20),
('Colômbia', 'COL', 'Néstor Lorenzo', 12, 1.70, 0.90),
('RD Congo', 'COD', 'Sébastien Desabre', 62, 1.20, 1.25),
-- Grupo L
('Inglaterra', 'ENG', 'Thomas Tuchel', 4, 2.20, 0.75),
('Croácia', 'CRO', 'Zlatko Dalić', 10, 1.60, 1.05),
('Gana', 'GHA', 'Otto Addo', 68, 1.25, 1.35),
('Panamá', 'PAN', 'Thomas Christiansen', 43, 1.10, 1.25);

-- Seed de Partidas Iniciais da Copa 2026 (16 jogos realizados + 2 do dia 16/06)
INSERT INTO public.partidas (id_selecao_casa, id_selecao_fora, data_partida, hora_partida, estadio, placar_casa, placar_fora, futura, em_andamento, finalizada) VALUES
-- Junho 11
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'MEX'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'RSA'), '2026-06-11', '17:00:00', 'Estádio Azteca, Cidade do México', 2, 0, false, false, true),
-- Junho 12
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'KOR'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'CZE'), '2026-06-12', '14:00:00', 'BMO Field, Toronto', 2, 1, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'CAN'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'BIH'), '2026-06-12', '18:00:00', 'BC Place, Vancouver', 1, 1, false, false, true),
-- Junho 13
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'USA'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'PAR'), '2026-06-13', '15:00:00', 'SoFi Stadium, Los Angeles', 4, 1, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'QAT'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'SUI'), '2026-06-13', '18:00:00', 'Levi''s Stadium, São Francisco', 1, 1, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'BRA'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'MAR'), '2026-06-13', '21:00:00', 'MetLife Stadium, Nova York', 1, 1, false, false, true),
-- Junho 14
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'HAI'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'SCO'), '2026-06-14', '13:00:00', 'Gillette Stadium, Boston', 0, 1, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'AUS'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'TUR'), '2026-06-14', '16:00:00', 'NRG Stadium, Houston', 2, 0, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'GER'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'CUW'), '2026-06-14', '19:00:00', 'AT&T Stadium, Dallas', 7, 1, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'NED'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'JPN'), '2026-06-14', '22:00:00', 'Lumen Field, Seattle', 2, 2, false, false, true),
-- Junho 15
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'CIV'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'ECU'), '2026-06-15', '14:00:00', 'Mercedes-Benz Stadium, Atlanta', 1, 0, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'SWE'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'TUN'), '2026-06-15', '17:00:00', 'Arrowhead Stadium, Kansas City', 5, 1, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'ESP'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'CPV'), '2026-06-15', '20:00:00', 'Hard Rock Stadium, Miami', 0, 0, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'EGY'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'BEL'), '2026-06-15', '21:00:00', 'Lincoln Financial Field, Filadélfia', 1, 1, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'KSA'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'URU'), '2026-06-15', '23:00:00', 'Levi''s Stadium, São Francisco', 1, 1, false, false, true),
-- Junho 16
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'IRN'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'NZL'), '2026-06-16', '12:00:00', 'BC Place, Vancouver', 2, 2, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'FRA'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'SEN'), '2026-06-16', '15:00:00', 'MetLife Stadium, Nova York', 2, 1, false, false, true),
((SELECT id_selecao FROM public.selecoes WHERE sigla = 'ARG'), (SELECT id_selecao FROM public.selecoes WHERE sigla = 'ALG'), '2026-06-16', '21:00:00', 'Arrowhead Stadium, Kansas City', 0, 0, true, false, false);
