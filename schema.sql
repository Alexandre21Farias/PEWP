-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela: SELEÇÕES (selecoes)
CREATE TABLE IF NOT EXISTS public.selecoes (
    id_selecao SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(3) NOT NULL UNIQUE,
    tecnico VARCHAR(100),
    ranking_fifa INT,
    media_gols_marcados DECIMAL(4,2) DEFAULT 0.00,
    media_gols_sofridos DECIMAL(4,2) DEFAULT 0.00
);

-- Tabela: PLAYERS (players)
CREATE TABLE IF NOT EXISTS public.players (
    id_player SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50),
    numero_camisa INT,
    id_selecao INT REFERENCES public.selecoes(id_selecao) ON DELETE CASCADE
);

-- Tabela: PARTIDAS (partidas)
CREATE TABLE IF NOT EXISTS public.partidas (
    id_partida SERIAL PRIMARY KEY,
    id_selecao_casa INT REFERENCES public.selecoes(id_selecao) ON DELETE CASCADE,
    id_selecao_fora INT REFERENCES public.selecoes(id_selecao) ON DELETE CASCADE,
    data_partida DATE,
    hora_partida TIME,
    estadio VARCHAR(100),
    placar_casa INT DEFAULT 0,
    placar_fora INT DEFAULT 0,
    futura BOOLEAN DEFAULT true,
    em_andamento BOOLEAN DEFAULT false,
    finalizada BOOLEAN DEFAULT false
);

-- Tabela: ESTATÍSTICAS DA PARTIDA (estatisticas_partida)
CREATE TABLE IF NOT EXISTS public.estatisticas_partida (
    id_stats SERIAL PRIMARY KEY,
    id_partida INT REFERENCES public.partidas(id_partida) ON DELETE CASCADE,
    id_selecao INT REFERENCES public.selecoes(id_selecao) ON DELETE CASCADE,
    posse_bola INT DEFAULT 50, -- porcentagem
    chutes INT DEFAULT 0,
    chutes_no_gol INT DEFAULT 0,
    faltas INT DEFAULT 0,
    escanteios INT DEFAULT 0,
    cart_amarelo INT DEFAULT 0,
    cart_vermelho INT DEFAULT 0
);

-- Tabela: EVENTOS DA PARTIDA (eventos_partida)
CREATE TABLE IF NOT EXISTS public.eventos_partida (
    id_event SERIAL PRIMARY KEY,
    id_partida INT REFERENCES public.partidas(id_partida) ON DELETE CASCADE,
    id_selecao INT REFERENCES public.selecoes(id_selecao) ON DELETE CASCADE,
    event_type VARCHAR(50), -- Gols, Cartões, etc.
    minute INT,
    description TEXT,
    player VARCHAR(100)
);

-- Tabela: PROBABILIDADES DA PARTIDA (probabilidades_partida)
CREATE TABLE IF NOT EXISTS public.probabilidades_partida (
    id_prob SERIAL PRIMARY KEY,
    id_partida INT REFERENCES public.partidas(id_partida) ON DELETE CASCADE,
    id_selecao INT REFERENCES public.selecoes(id_selecao) ON DELETE CASCADE,
    prob_vitoria_casa DECIMAL(5,2),
    prob_vitoria_fora DECIMAL(5,2),
    prob_empate DECIMAL(5,2),
    criterio_calculo TEXT,
    data_calculo TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: HISTÓRICO DA SELEÇÃO (historico_selecao)
CREATE TABLE IF NOT EXISTS public.historico_selecao (
    id_historico SERIAL PRIMARY KEY,
    id_partida INT REFERENCES public.partidas(id_partida) ON DELETE SET NULL,
    id_selecao INT REFERENCES public.selecoes(id_selecao) ON DELETE CASCADE,
    data_partida DATE,
    adversario VARCHAR(100),
    gols_marcados INT DEFAULT 0,
    gols_sofridos INT DEFAULT 0,
    vitoria BOOLEAN DEFAULT false,
    empate BOOLEAN DEFAULT false,
    derrota BOOLEAN DEFAULT false
);
