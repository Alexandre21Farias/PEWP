export interface Player {
  name: string;
  position: string;
  number: number;
}

export interface Team {
  id: string;
  name: string;
  sigla: string;
  coach: string;
  ranking: number;
  flag: string;
  avgGoalsScored: number;
  avgGoalsConceded: number;
  history: ('W' | 'D' | 'L')[];
  squad: Player[];
}

export interface TeamStats {
  possession: number; // percentage
  shots: number;
  shotsOnGoal: number;
  fouls: number;
  corners: number;
  yellowCards: number;
  redCards: number;
}

export interface MatchEvent {
  id: string;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION';
  minute: number;
  teamId: string;
  player: string;
  description: string;
}

export interface MatchProbability {
  homeWin: number;
  awayWin: number;
  draw: number;
  criterio: string;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  status: 'FUTURA' | 'EM_ANDAMENTO' | 'FINALIZADA';
  placarCasa: number;
  placarFora: number;
  minute: number;
  estadio: string;
  data: string;
  hora: string;
  stats: {
    home: TeamStats;
    away: TeamStats;
  };
  events: MatchEvent[];
  probability: MatchProbability;
}

export const TEAMS: Record<string, Team> = {
  'BRA': {
    id: 'BRA',
    name: 'Brasil',
    sigla: 'BRA',
    coach: 'Dorival Júnior',
    ranking: 5,
    flag: '🇧🇷',
    avgGoalsScored: 2.1,
    avgGoalsConceded: 0.8,
    history: ['W', 'W', 'D', 'W', 'L'],
    squad: [
      { name: 'Alisson Becker', position: 'Goleiro', number: 1 },
      { name: 'Marquinhos', position: 'Defensor', number: 4 },
      { name: 'Gabriel Magalhães', position: 'Defensor', number: 14 },
      { name: 'Danilo', position: 'Defensor', number: 2 },
      { name: 'Guilherme Arana', position: 'Defensor', number: 6 },
      { name: 'Bruno Guimarães', position: 'Meio-Campista', number: 5 },
      { name: 'João Gomes', position: 'Meio-Campista', number: 15 },
      { name: 'Lucas Paquetá', position: 'Meio-Campista', number: 8 },
      { name: 'Rodrygo Goes', position: 'Atacante', number: 10 },
      { name: 'Vinícius Júnior', position: 'Atacante', number: 7 },
      { name: 'Endrick', position: 'Atacante', number: 9 }
    ]
  },
  'GER': {
    id: 'GER',
    name: 'Alemanha',
    sigla: 'GER',
    coach: 'Julian Nagelsmann',
    ranking: 11,
    flag: '🇩🇪',
    avgGoalsScored: 1.9,
    avgGoalsConceded: 1.1,
    history: ['W', 'W', 'D', 'L', 'W'],
    squad: [
      { name: 'Marc-André ter Stegen', position: 'Goleiro', number: 1 },
      { name: 'Antonio Rüdiger', position: 'Defensor', number: 2 },
      { name: 'Jonathan Tah', position: 'Defensor', number: 4 },
      { name: 'Joshua Kimmich', position: 'Defensor', number: 6 },
      { name: 'Maximilian Mittelstädt', position: 'Defensor', number: 24 },
      { name: 'Robert Andrich', position: 'Meio-Campista', number: 23 },
      { name: 'Pascal Groß', position: 'Meio-Campista', number: 5 },
      { name: 'Florian Wirtz', position: 'Meio-Campista', number: 10 },
      { name: 'Jamal Musiala', position: 'Meio-Campista', number: 42 },
      { name: 'Kai Havertz', position: 'Atacante', number: 7 },
      { name: 'Niclas Füllkrug', position: 'Atacante', number: 9 }
    ]
  },
  'ARG': {
    id: 'ARG',
    name: 'Argentina',
    sigla: 'ARG',
    coach: 'Lionel Scaloni',
    ranking: 1,
    flag: '🇦🇷',
    avgGoalsScored: 2.3,
    avgGoalsConceded: 0.5,
    history: ['W', 'W', 'W', 'D', 'W'],
    squad: [
      { name: 'Emiliano Martínez', position: 'Goleiro', number: 23 },
      { name: 'Cristian Romero', position: 'Defensor', number: 13 },
      { name: 'Nicolás Otamendi', position: 'Defensor', number: 19 },
      { name: 'Nahuel Molina', position: 'Defensor', number: 26 },
      { name: 'Nicolás Tagliafico', position: 'Defensor', number: 3 },
      { name: 'Rodrigo De Paul', position: 'Meio-Campista', number: 7 },
      { name: 'Enzo Fernández', position: 'Meio-Campista', number: 24 },
      { name: 'Alexis Mac Allister', position: 'Meio-Campista', number: 20 },
      { name: 'Lionel Messi', position: 'Atacante', number: 10 },
      { name: 'Julián Álvarez', position: 'Atacante', number: 9 },
      { name: 'Lautaro Martínez', position: 'Atacante', number: 22 }
    ]
  },
  'FRA': {
    id: 'FRA',
    name: 'França',
    sigla: 'FRA',
    coach: 'Didier Deschamps',
    ranking: 2,
    flag: '🇫🇷',
    avgGoalsScored: 2.2,
    avgGoalsConceded: 0.7,
    history: ['W', 'D', 'W', 'W', 'L'],
    squad: [
      { name: 'Mike Maignan', position: 'Goleiro', number: 16 },
      { name: 'Dayot Upamecano', position: 'Defensor', number: 4 },
      { name: 'William Saliba', position: 'Defensor', number: 17 },
      { name: 'Jules Koundé', position: 'Defensor', number: 5 },
      { name: 'Theo Hernández', position: 'Defensor', number: 22 },
      { name: 'Aurélien Tchouaméni', position: 'Meio-Campista', number: 8 },
      { name: 'N\'Golo Kanté', position: 'Meio-Campista', number: 13 },
      { name: 'Antoine Griezmann', position: 'Meio-Campista', number: 7 },
      { name: 'Ousmane Dembélé', position: 'Atacante', number: 11 },
      { name: 'Kylian Mbappé', position: 'Atacante', number: 10 },
      { name: 'Marcus Thuram', position: 'Atacante', number: 15 }
    ]
  },
  'ESP': {
    id: 'ESP',
    name: 'Espanha',
    sigla: 'ESP',
    coach: 'Luis de la Fuente',
    ranking: 3,
    flag: '🇪🇸',
    avgGoalsScored: 2.4,
    avgGoalsConceded: 0.6,
    history: ['W', 'W', 'W', 'W', 'W'],
    squad: [
      { name: 'Unai Simón', position: 'Goleiro', number: 23 },
      { name: 'Robin Le Normand', position: 'Defensor', number: 3 },
      { name: 'Aymeric Laporte', position: 'Defensor', number: 14 },
      { name: 'Dani Carvajal', position: 'Defensor', number: 2 },
      { name: 'Marc Cucurella', position: 'Defensor', number: 24 },
      { name: 'Rodri Hernández', position: 'Meio-Campista', number: 16 },
      { name: 'Fabián Ruiz', position: 'Meio-Campista', number: 8 },
      { name: 'Dani Olmo', position: 'Meio-Campista', number: 10 },
      { name: 'Lamine Yamal', position: 'Atacante', number: 19 },
      { name: 'Nico Williams', position: 'Atacante', number: 17 },
      { name: 'Alvaro Morata', position: 'Atacante', number: 7 }
    ]
  },
  'POR': {
    id: 'POR',
    name: 'Portugal',
    sigla: 'POR',
    coach: 'Roberto Martínez',
    ranking: 7,
    flag: '🇵🇹',
    avgGoalsScored: 2.0,
    avgGoalsConceded: 0.9,
    history: ['W', 'W', 'L', 'W', 'D'],
    squad: [
      { name: 'Diogo Costa', position: 'Goleiro', number: 22 },
      { name: 'Rúben Dias', position: 'Defensor', number: 4 },
      { name: 'Pepe', position: 'Defensor', number: 3 },
      { name: 'João Cancelo', position: 'Defensor', number: 20 },
      { name: 'Nuno Mendes', position: 'Defensor', number: 19 },
      { name: 'João Palhinha', position: 'Meio-Campista', number: 6 },
      { name: 'Vitinha', position: 'Meio-Campista', number: 23 },
      { name: 'Bruno Fernandes', position: 'Meio-Campista', number: 8 },
      { name: 'Bernardo Silva', position: 'Atacante', number: 10 },
      { name: 'Rafael Leão', position: 'Atacante', number: 17 },
      { name: 'Cristiano Ronaldo', position: 'Atacante', number: 7 }
    ]
  },
  'URU': {
    id: 'URU',
    name: 'Uruguai',
    sigla: 'URU',
    coach: 'Marcelo Bielsa',
    ranking: 14,
    flag: '🇺🇾',
    avgGoalsScored: 1.7,
    avgGoalsConceded: 1.0,
    history: ['W', 'L', 'D', 'W', 'L'],
    squad: [
      { name: 'Sergio Rochet', position: 'Goleiro', number: 1 },
      { name: 'Ronald Araújo', position: 'Defensor', number: 4 },
      { name: 'Mathías Olivera', position: 'Defensor', number: 16 },
      { name: 'Nahitan Nández', position: 'Defensor', number: 8 },
      { name: 'Matías Viña', position: 'Defensor', number: 17 },
      { name: 'Manuel Ugarte', position: 'Meio-Campista', number: 5 },
      { name: 'Federico Valverde', position: 'Meio-Campista', number: 15 },
      { name: 'Nicolás de la Cruz', position: 'Meio-Campista', number: 7 },
      { name: 'Facundo Pellistri', position: 'Atacante', number: 11 },
      { name: 'Maximiliano Araújo', position: 'Atacante', number: 20 },
      { name: 'Darwin Núñez', position: 'Atacante', number: 19 }
    ]
  },
  'ENG': {
    id: 'ENG',
    name: 'Inglaterra',
    sigla: 'ENG',
    coach: 'Thomas Tuchel',
    ranking: 4,
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    avgGoalsScored: 1.8,
    avgGoalsConceded: 0.7,
    history: ['W', 'D', 'W', 'L', 'D'],
    squad: [
      { name: 'Jordan Pickford', position: 'Goleiro', number: 1 },
      { name: 'John Stones', position: 'Defensor', number: 5 },
      { name: 'Marc Guéhi', position: 'Defensor', number: 6 },
      { name: 'Kyle Walker', position: 'Defensor', number: 2 },
      { name: 'Kieran Trippier', position: 'Defensor', number: 12 },
      { name: 'Declan Rice', position: 'Meio-Campista', number: 4 },
      { name: 'Kobbie Mainoo', position: 'Meio-Campista', number: 26 },
      { name: 'Jude Bellingham', position: 'Meio-Campista', number: 10 },
      { name: 'Bukayo Saka', position: 'Atacante', number: 7 },
      { name: 'Phil Foden', position: 'Atacante', number: 11 },
      { name: 'Harry Kane', position: 'Atacante', number: 9 }
    ]
  }
};

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match_1',
    homeTeamId: 'BRA',
    awayTeamId: 'GER',
    status: 'EM_ANDAMENTO',
    placarCasa: 2,
    placarFora: 1,
    minute: 74,
    estadio: 'Maracanã, Rio de Janeiro',
    data: '2026-05-20',
    hora: '17:00',
    stats: {
      home: { possession: 55, shots: 12, shotsOnGoal: 6, fouls: 8, corners: 5, yellowCards: 1, redCards: 0 },
      away: { possession: 45, shots: 9, shotsOnGoal: 4, fouls: 11, corners: 3, yellowCards: 2, redCards: 0 }
    },
    events: [
      { id: 'ev_1_1', type: 'GOAL', minute: 14, teamId: 'GER', player: 'Kai Havertz', description: 'Chute cruzado de perna esquerda.' },
      { id: 'ev_1_2', type: 'YELLOW_CARD', minute: 28, teamId: 'GER', player: 'Antonio Rüdiger', description: 'Falta tática em Vinícius Júnior.' },
      { id: 'ev_1_3', type: 'GOAL', minute: 42, teamId: 'BRA', player: 'Vinícius Júnior', description: 'Drible curto na área e chute no ângulo.' },
      { id: 'ev_1_4', type: 'YELLOW_CARD', minute: 55, teamId: 'BRA', player: 'Bruno Guimarães', description: 'Reclamação com a arbitragem.' },
      { id: 'ev_1_5', type: 'GOAL', minute: 68, teamId: 'BRA', player: 'Endrick', description: 'Finalização de primeira após cruzamento rasteiro.' }
    ],
    probability: {
      homeWin: 78,
      awayWin: 8,
      draw: 14,
      criterio: 'Simulado com base no Ranking FIFA (Brasil #5, Alemanha #11), histórico do confronto e placar atual (2-1 aos 74\').'
    }
  },
  {
    id: 'match_2',
    homeTeamId: 'ARG',
    awayTeamId: 'FRA',
    status: 'EM_ANDAMENTO',
    placarCasa: 1,
    placarFora: 1,
    minute: 58,
    estadio: 'Monumental de Núñez, Buenos Aires',
    data: '2026-05-20',
    hora: '18:00',
    stats: {
      home: { possession: 52, shots: 7, shotsOnGoal: 3, fouls: 6, corners: 4, yellowCards: 1, redCards: 0 },
      away: { possession: 48, shots: 8, shotsOnGoal: 4, fouls: 9, corners: 5, yellowCards: 0, redCards: 0 }
    },
    events: [
      { id: 'ev_2_1', type: 'GOAL', minute: 22, teamId: 'ARG', player: 'Lionel Messi', description: 'Cobrança de pênalti com categoria.' },
      { id: 'ev_2_2', type: 'YELLOW_CARD', minute: 34, teamId: 'ARG', player: 'Rodrigo De Paul', description: 'Entrada dura em Aurélien Tchouaméni.' },
      { id: 'ev_2_3', type: 'GOAL', minute: 49, teamId: 'FRA', player: 'Kylian Mbappé', description: 'Arrancada espetacular do meio campo e finalização precisa.' }
    ],
    probability: {
      homeWin: 42,
      awayWin: 33,
      draw: 25,
      criterio: 'Simulado com base no Ranking FIFA (Argentina #1, França #2), histórico equilibrado e placar de empate em tempo real (1-1 aos 58\').'
    }
  },
  {
    id: 'match_3',
    homeTeamId: 'ESP',
    awayTeamId: 'URU',
    status: 'FINALIZADA',
    placarCasa: 3,
    placarFora: 0,
    minute: 90,
    estadio: 'Santiago Bernabéu, Madrid',
    data: '2026-05-19',
    hora: '15:30',
    stats: {
      home: { possession: 64, shots: 16, shotsOnGoal: 8, fouls: 7, corners: 8, yellowCards: 0, redCards: 0 },
      away: { possession: 36, shots: 5, shotsOnGoal: 1, fouls: 15, corners: 2, yellowCards: 4, redCards: 1 }
    },
    events: [
      { id: 'ev_3_1', type: 'GOAL', minute: 9, teamId: 'ESP', player: 'Lamine Yamal', description: 'Golaço de fora da área na gaveta.' },
      { id: 'ev_3_2', type: 'YELLOW_CARD', minute: 18, teamId: 'URU', player: 'Federico Valverde', description: 'Falta violenta em Rodri.' },
      { id: 'ev_3_3', type: 'GOAL', minute: 35, teamId: 'ESP', player: 'Alvaro Morata', description: 'Cabeceio firme no canto após escanteio.' },
      { id: 'ev_3_4', type: 'YELLOW_CARD', minute: 44, teamId: 'URU', player: 'Nahitan Nández', description: 'Entrada atrasada em Nico Williams.' },
      { id: 'ev_3_5', type: 'RED_CARD', minute: 61, teamId: 'URU', player: 'Nahitan Nández', description: 'Segundo amarelo após puxão de camisa.' },
      { id: 'ev_3_6', type: 'GOAL', minute: 82, teamId: 'ESP', player: 'Dani Olmo', description: 'Toque de cavadinha na saída do goleiro.' }
    ],
    probability: {
      homeWin: 100,
      awayWin: 0,
      draw: 0,
      criterio: 'Partida Finalizada. Vitória da Espanha por 3-0.'
    }
  },
  {
    id: 'match_4',
    homeTeamId: 'ENG',
    awayTeamId: 'POR',
    status: 'FUTURA',
    placarCasa: 0,
    placarFora: 0,
    minute: 0,
    estadio: 'Wembley Stadium, London',
    data: '2026-05-21',
    hora: '16:00',
    stats: {
      home: { possession: 50, shots: 0, shotsOnGoal: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0 },
      away: { possession: 50, shots: 0, shotsOnGoal: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0 }
    },
    events: [],
    probability: {
      homeWin: 38,
      awayWin: 34,
      draw: 28,
      criterio: 'Cálculo pré-jogo baseado nos elencos, rankings FIFA (Inglaterra #4, Portugal #7) e histórico de confrontos recentes.'
    }
  },
  {
    id: 'match_5',
    homeTeamId: 'BRA',
    awayTeamId: 'ARG',
    status: 'FUTURA',
    placarCasa: 0,
    placarFora: 0,
    minute: 0,
    estadio: 'Maracanã, Rio de Janeiro',
    data: '2026-05-23',
    hora: '20:00',
    stats: {
      home: { possession: 50, shots: 0, shotsOnGoal: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0 },
      away: { possession: 50, shots: 0, shotsOnGoal: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0 }
    },
    events: [],
    probability: {
      homeWin: 40,
      awayWin: 35,
      draw: 25,
      criterio: 'Clássico Sul-Americano. Fator casa dá ligeira vantagem ao Brasil (#5) contra a líder do ranking Argentina (#1).'
    }
  }
];
