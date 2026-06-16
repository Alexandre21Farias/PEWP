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
  // Grupo A
  'MEX': {
    id: 'MEX', name: 'México', sigla: 'MEX', coach: 'Javier Aguirre', ranking: 15, flag: '🇲🇽', avgGoalsScored: 1.4, avgGoalsConceded: 1.1, history: ['W', 'L', 'W', 'D', 'W'],
    squad: [
      { name: 'Guillermo Ochoa', position: 'Goleiro', number: 1 },
      { name: 'César Montes', position: 'Defensor', number: 3 },
      { name: 'Johan Vásquez', position: 'Defensor', number: 5 },
      { name: 'Jorge Sánchez', position: 'Defensor', number: 2 },
      { name: 'Jesús Gallardo', position: 'Defensor', number: 23 },
      { name: 'Edson Álvarez', position: 'Meio-Campista', number: 4 },
      { name: 'Luis Chávez', position: 'Meio-Campista', number: 14 },
      { name: 'Erick Sánchez', position: 'Meio-Campista', number: 8 },
      { name: 'Uriel Antuna', position: 'Atacante', number: 15 },
      { name: 'Julián Quiñones', position: 'Atacante', number: 18 },
      { name: 'Raúl Jiménez', position: 'Atacante', number: 9 }
    ]
  },
  'RSA': {
    id: 'RSA', name: 'África do Sul', sigla: 'RSA', coach: 'Hugo Broos', ranking: 59, flag: '🇿🇦', avgGoalsScored: 1.1, avgGoalsConceded: 1.2, history: ['L', 'D', 'W', 'W', 'L'],
    squad: [
      { name: 'Ronwen Williams', position: 'Goleiro', number: 1 },
      { name: 'Mothobi Mvala', position: 'Defensor', number: 2 },
      { name: 'Khuliso Mudau', position: 'Defensor', number: 3 },
      { name: 'Aubrey Modiba', position: 'Defensor', number: 6 },
      { name: 'Grant Kekana', position: 'Defensor', number: 14 },
      { name: 'Teboho Mokoena', position: 'Meio-Campista', number: 4 },
      { name: 'Sphephelo Sithole', position: 'Meio-Campista', number: 15 },
      { name: 'Themba Zwane', position: 'Meio-Campista', number: 10 },
      { name: 'Percy Tau', position: 'Atacante', number: 7 },
      { name: 'Evidence Makgopa', position: 'Atacante', number: 9 },
      { name: 'Thapelo Maseko', position: 'Atacante', number: 11 }
    ]
  },
  'KOR': {
    id: 'KOR', name: 'Coreia do Sul', sigla: 'KOR', coach: 'Hong Myung-bo', ranking: 22, flag: '🇰🇷', avgGoalsScored: 1.6, avgGoalsConceded: 1.0, history: ['W', 'W', 'L', 'D', 'W'],
    squad: [
      { name: 'Jo Hyeon-woo', position: 'Goleiro', number: 21 },
      { name: 'Kim Min-jae', position: 'Defensor', number: 4 },
      { name: 'Kim Young-gwon', position: 'Defensor', number: 19 },
      { name: 'Seol Young-woo', position: 'Defensor', number: 22 },
      { name: 'Kim Jin-su', position: 'Defensor', number: 3 },
      { name: 'Hwang In-beom', position: 'Meio-Campista', number: 6 },
      { name: 'Lee Jae-sung', position: 'Meio-Campista', number: 7 },
      { name: 'Lee Kang-in', position: 'Meio-Campista', number: 18 },
      { name: 'Son Heung-min', position: 'Atacante', number: 7 },
      { name: 'Hwang Hee-chan', position: 'Atacante', number: 11 },
      { name: 'Cho Gue-sung', position: 'Atacante', number: 9 }
    ]
  },
  'CZE': {
    id: 'CZE', name: 'Chéquia', sigla: 'CZE', coach: 'Ivan Hašek', ranking: 36, flag: '🇨🇿', avgGoalsScored: 1.3, avgGoalsConceded: 1.15, history: ['L', 'W', 'W', 'L', 'D'],
    squad: [
      { name: 'Jindřich Staněk', position: 'Goleiro', number: 1 },
      { name: 'Tomáš Holeš', position: 'Defensor', number: 3 },
      { name: 'Ladislav Krejčí', position: 'Defensor', number: 4 },
      { name: 'David Douděra', position: 'Defensor', number: 5 },
      { name: 'Vladimír Coufal', position: 'Defensor', number: 2 },
      { name: 'Tomáš Souček', position: 'Meio-Campista', number: 22 },
      { name: 'Antonín Barák', position: 'Meio-Campista', number: 7 },
      { name: 'Lukáš Provod', position: 'Meio-Campista', number: 14 },
      { name: 'Patrik Schick', position: 'Atacante', number: 10 },
      { name: 'Jan Kuchta', position: 'Atacante', number: 9 },
      { name: 'Adam Hložek', position: 'Atacante', number: 11 }
    ]
  },

  // Grupo B
  'CAN': {
    id: 'CAN', name: 'Canadá', sigla: 'CAN', coach: 'Jesse Marsch', ranking: 49, flag: '🇨🇦', avgGoalsScored: 1.35, avgGoalsConceded: 1.25, history: ['D', 'L', 'W', 'L', 'W'],
    squad: [
      { name: 'Maxime Crépeau', position: 'Goleiro', number: 16 },
      { name: 'Alistair Johnston', position: 'Defensor', number: 2 },
      { name: 'Moïse Bombito', position: 'Defensor', number: 15 },
      { name: 'Kamal Miller', position: 'Defensor', number: 4 },
      { name: 'Alphonso Davies', position: 'Defensor', number: 19 },
      { name: 'Stephen Eustáquio', position: 'Meio-Campista', number: 7 },
      { name: 'Ismaël Koné', position: 'Meio-Campista', number: 8 },
      { name: 'Jonathan Osorio', position: 'Meio-Campista', number: 21 },
      { name: 'Tajon Buchanan', position: 'Atacante', number: 11 },
      { name: 'Jonathan David', position: 'Atacante', number: 10 },
      { name: 'Cyle Larin', position: 'Atacante', number: 9 }
    ]
  },
  'SUI': {
    id: 'SUI', name: 'Suíça', sigla: 'SUI', coach: 'Murat Yakin', ranking: 19, flag: '🇨🇭', avgGoalsScored: 1.5, avgGoalsConceded: 0.95, history: ['D', 'W', 'D', 'W', 'L'],
    squad: [
      { name: 'Yann Sommer', position: 'Goleiro', number: 1 },
      { name: 'Manuel Akanji', position: 'Defensor', number: 5 },
      { name: 'Nico Elvedi', position: 'Defensor', number: 4 },
      { name: 'Ricardo Rodriguez', position: 'Defensor', number: 13 },
      { name: 'Silvan Widmer', position: 'Defensor', number: 3 },
      { name: 'Granit Xhaka', position: 'Meio-Campista', number: 10 },
      { name: 'Remo Freuler', position: 'Meio-Campista', number: 8 },
      { name: 'Xherdan Shaqiri', position: 'Meio-Campista', number: 23 },
      { name: 'Ruben Vargas', position: 'Atacante', number: 17 },
      { name: 'Zeki Amdouni', position: 'Atacante', number: 9 },
      { name: 'Breel Embolo', position: 'Atacante', number: 7 }
    ]
  },
  'QAT': {
    id: 'QAT', name: 'Catar', sigla: 'QAT', coach: 'Tintín Márquez', ranking: 35, flag: '🇶🇦', avgGoalsScored: 1.2, avgGoalsConceded: 1.4, history: ['D', 'W', 'W', 'D', 'W'],
    squad: [
      { name: 'Meshaal Barsham', position: 'Goleiro', number: 22 },
      { name: 'Lucas Mendes', position: 'Defensor', number: 3 },
      { name: 'Al-Mahdi Ali Mukhtar', position: 'Defensor', number: 5 },
      { name: 'Pedro Miguel', position: 'Defensor', number: 2 },
      { name: 'Homam Ahmed', position: 'Defensor', number: 14 },
      { name: 'Jassem Gaber', position: 'Meio-Campista', number: 4 },
      { name: 'Hassan Al-Haydos', position: 'Meio-Campista', number: 10 },
      { name: 'Mostafa Meshaal', position: 'Meio-Campista', number: 6 },
      { name: 'Akram Afif', position: 'Atacante', number: 11 },
      { name: 'Almoez Ali', position: 'Atacante', number: 19 },
      { name: 'Yusuf Abdurisag', position: 'Atacante', number: 9 }
    ]
  },
  'BIH': {
    id: 'BIH', name: 'Bósnia e H.', sigla: 'BIH', coach: 'Sergej Barbarez', ranking: 74, flag: '🇧🇦', avgGoalsScored: 1.05, avgGoalsConceded: 1.5, history: ['D', 'L', 'L', 'D', 'L'],
    squad: [
      { name: 'Nikola Vasilj', position: 'Goleiro', number: 1 },
      { name: 'Anel Ahmedhodžić', position: 'Defensor', number: 16 },
      { name: 'Dennis Hadžikadunić', position: 'Defensor', number: 5 },
      { name: 'Sead Kolašinac', position: 'Defensor', number: 3 },
      { name: 'Jusuf Gazibegović', position: 'Defensor', number: 2 },
      { name: 'Rade Krunić', position: 'Meio-Campista', number: 8 },
      { name: 'Benjamin Tahirović', position: 'Meio-Campista', number: 6 },
      { name: 'Haris Hajradinović', position: 'Meio-Campista', number: 14 },
      { name: 'Edin Džeko', position: 'Atacante', number: 11 },
      { name: 'Ermedin Demirović', position: 'Atacante', number: 9 },
      { name: 'Haris Tabaković', position: 'Atacante', number: 19 }
    ]
  },

  // Grupo C
  'BRA': {
    id: 'BRA', name: 'Brasil', sigla: 'BRA', coach: 'Carlo Ancelotti', ranking: 5, flag: '🇧🇷', avgGoalsScored: 2.1, avgGoalsConceded: 0.8, history: ['D', 'W', 'W', 'D', 'W'],
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
  'MAR': {
    id: 'MAR', name: 'Marrocos', sigla: 'MAR', coach: 'Walid Regragui', ranking: 12, flag: '🇲🇦', avgGoalsScored: 1.8, avgGoalsConceded: 0.9, history: ['D', 'W', 'L', 'W', 'W'],
    squad: [
      { name: 'Yassine Bounou', position: 'Goleiro', number: 1 },
      { name: 'Nayef Aguerd', position: 'Defensor', number: 5 },
      { name: 'Romain Saïss', position: 'Defensor', number: 6 },
      { name: 'Achraf Hakimi', position: 'Defensor', number: 2 },
      { name: 'Yahia Attiyat Allah', position: 'Defensor', number: 25 },
      { name: 'Sofyan Amrabat', position: 'Meio-Campista', number: 4 },
      { name: 'Azzedine Ounahi', position: 'Meio-Campista', number: 8 },
      { name: 'Selim Amallah', position: 'Meio-Campista', number: 15 },
      { name: 'Hakim Ziyech', position: 'Atacante', number: 7 },
      { name: 'Youssef En-Nesyri', position: 'Atacante', number: 19 },
      { name: 'Amine Adli', position: 'Atacante', number: 21 }
    ]
  },
  'HAI': {
    id: 'HAI', name: 'Haiti', sigla: 'HAI', coach: 'Sébastien Migné', ranking: 86, flag: '🇭🇹', avgGoalsScored: 0.95, avgGoalsConceded: 1.7, history: ['L', 'L', 'D', 'W', 'L'],
    squad: [
      { name: 'Jhony Placide', position: 'Goleiro', number: 1 },
      { name: 'Ricardo Adé', position: 'Defensor', number: 4 },
      { name: 'Carlens Arcus', position: 'Defensor', number: 2 },
      { name: 'Garven Metusala', position: 'Defensor', number: 6 },
      { name: 'Alex Christian', position: 'Defensor', number: 22 },
      { name: 'Carl-Fred Sainte', position: 'Meio-Campista', number: 18 },
      { name: 'Bryan Alceus', position: 'Meio-Campista', number: 17 },
      { name: 'Leverton Pierre', position: 'Meio-Campista', number: 8 },
      { name: 'Duckens Nazon', position: 'Atacante', number: 9 },
      { name: 'Frantzdy Pierrot', position: 'Atacante', number: 20 },
      { name: 'Derrick Etienne Jr.', position: 'Atacante', number: 11 }
    ]
  },
  'SCO': {
    id: 'SCO', name: 'Escócia', sigla: 'SCO', coach: 'Steve Clarke', ranking: 39, flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', avgGoalsScored: 1.15, avgGoalsConceded: 1.35, history: ['W', 'D', 'L', 'L', 'W'],
    squad: [
      { name: 'Angus Gunn', position: 'Goleiro', number: 1 },
      { name: 'Ryan Porteous', position: 'Defensor', number: 15 },
      { name: 'Jack Hendry', position: 'Defensor', number: 13 },
      { name: 'Kieran Tierney', position: 'Defensor', number: 6 },
      { name: 'Andrew Robertson', position: 'Defensor', number: 3 },
      { name: 'Scott McTominay', position: 'Meio-Campista', number: 4 },
      { name: 'Billy Gilmour', position: 'Meio-Campista', number: 14 },
      { name: 'Callum McGregor', position: 'Meio-Campista', number: 8 },
      { name: 'John McGinn', position: 'Meio-Campista', number: 7 },
      { name: 'Ché Adams', position: 'Atacante', number: 10 },
      { name: 'Lawrence Shankland', position: 'Atacante', number: 9 }
    ]
  },

  // Grupo D
  'USA': {
    id: 'USA', name: 'Estados Unidos', sigla: 'USA', coach: 'Mauricio Pochettino', ranking: 11, flag: '🇺🇸', avgGoalsScored: 1.75, avgGoalsConceded: 1.05, history: ['W', 'W', 'D', 'L', 'W'],
    squad: [
      { name: 'Matt Turner', position: 'Goleiro', number: 1 },
      { name: 'Chris Richards', position: 'Defensor', number: 3 },
      { name: 'Tim Ream', position: 'Defensor', number: 13 },
      { name: 'Antonee Robinson', position: 'Defensor', number: 5 },
      { name: 'Sergiño Dest', position: 'Defensor', number: 2 },
      { name: 'Tyler Adams', position: 'Meio-Campista', number: 4 },
      { name: 'Weston McKennie', position: 'Meio-Campista', number: 8 },
      { name: 'Yunus Musah', position: 'Meio-Campista', number: 6 },
      { name: 'Christian Pulisic', position: 'Atacante', number: 10 },
      { name: 'Timothy Weah', position: 'Atacante', number: 21 },
      { name: 'Folarin Balogun', position: 'Atacante', number: 20 }
    ]
  },
  'PAR': {
    id: 'PAR', name: 'Paraguai', sigla: 'PAR', coach: 'Daniel Garnero', ranking: 56, flag: '🇵🇾', avgGoalsScored: 0.9, avgGoalsConceded: 1.2, history: ['L', 'L', 'W', 'D', 'L'],
    squad: [
      { name: 'Carlos Coronel', position: 'Goleiro', number: 1 },
      { name: 'Gustavo Gómez', position: 'Defensor', number: 15 },
      { name: 'Omar Alderete', position: 'Defensor', number: 3 },
      { name: 'Júnior Alonso', position: 'Defensor', number: 6 },
      { name: 'Robert Rojas', position: 'Defensor', number: 2 },
      { name: 'Andrés Cubas', position: 'Meio-Campista', number: 14 },
      { name: 'Mathías Villasanti', position: 'Meio-Campista', number: 23 },
      { name: 'Diego Gómez', position: 'Meio-Campista', number: 8 },
      { name: 'Miguel Almirón', position: 'Atacante', number: 10 },
      { name: 'Julio Enciso', position: 'Atacante', number: 19 },
      { name: 'Adam Bareiro', position: 'Atacante', number: 9 }
    ]
  },
  'AUS': {
    id: 'AUS', name: 'Austrália', sigla: 'AUS', coach: 'Graham Arnold', ranking: 24, flag: '🇦🇺', avgGoalsScored: 1.45, avgGoalsConceded: 1.1, history: ['W', 'W', 'W', 'L', 'W'],
    squad: [
      { name: 'Mathew Ryan', position: 'Goleiro', number: 1 },
      { name: 'Harry Souttar', position: 'Defensor', number: 19 },
      { name: 'Kye Rowles', position: 'Defensor', number: 4 },
      { name: 'Aziz Behich', position: 'Defensor', number: 16 },
      { name: 'Gethin Jones', position: 'Defensor', number: 2 },
      { name: 'Jackson Irvine', position: 'Meio-Campista', number: 22 },
      { name: 'Keanu Baccus', position: 'Meio-Campista', number: 8 },
      { name: 'Connor Metcalfe', position: 'Meio-Campista', number: 14 },
      { name: 'Craig Goodwin', position: 'Atacante', number: 23 },
      { name: 'Mitchell Duke', position: 'Atacante', number: 15 },
      { name: 'Martin Boyle', position: 'Atacante', number: 6 }
    ]
  },
  'TUR': {
    id: 'TUR', name: 'Turquia', sigla: 'TUR', coach: 'Vincenzo Montella', ranking: 40, flag: '🇹🇷', avgGoalsScored: 1.3, avgGoalsConceded: 1.3, history: ['L', 'L', 'W', 'D', 'W'],
    squad: [
      { name: 'Mert Günok', position: 'Goleiro', number: 1 },
      { name: 'Abdulkerim Bardakcı', position: 'Defensor', number: 14 },
      { name: 'Samet Akaydin', position: 'Defensor', number: 4 },
      { name: 'Ferdi Kadıoğlu', position: 'Defensor', number: 20 },
      { name: 'Zeki Çelik', position: 'Defensor', number: 2 },
      { name: 'Hakan Çalhanoğlu', position: 'Meio-Campista', number: 10 },
      { name: 'Kaan Ayhan', position: 'Meio-Campista', number: 22 },
      { name: 'Orkun Kökçü', position: 'Meio-Campista', number: 6 },
      { name: 'Arda Güler', position: 'Atacante', number: 8 },
      { name: 'Kenan Yıldız', position: 'Atacante', number: 19 },
      { name: 'Barış Alper Yılmaz', position: 'Atacante', number: 21 }
    ]
  },

  // Grupo E
  'GER': {
    id: 'GER', name: 'Alemanha', sigla: 'GER', coach: 'Julian Nagelsmann', ranking: 16, flag: '🇩🇪', avgGoalsScored: 1.95, avgGoalsConceded: 1.1, history: ['W', 'W', 'D', 'L', 'W'],
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
  'CUW': {
    id: 'CUW', name: 'Curaçau', sigla: 'CUW', coach: 'Dick Advocaat', ranking: 90, flag: '🇨🇼', avgGoalsScored: 0.8, avgGoalsConceded: 2.2, history: ['L', 'L', 'D', 'W', 'L'],
    squad: [
      { name: 'Eloy Room', position: 'Goleiro', number: 1 },
      { name: 'Cuco Martina', position: 'Defensor', number: 3 },
      { name: 'Juriën Gaari', position: 'Defensor', number: 2 },
      { name: 'Sherel Floranus', position: 'Defensor', number: 5 },
      { name: 'Roshon van Eijma', position: 'Defensor', number: 4 },
      { name: 'Vurnon Anita', position: 'Meio-Campista', number: 6 },
      { name: 'Juninho Bacuna', position: 'Meio-Campista', number: 7 },
      { name: 'Leandro Bacuna', position: 'Meio-Campista', number: 8 },
      { name: 'Brandley Kuwas', position: 'Atacante', number: 10 },
      { name: 'Jearl Margaritha', position: 'Atacante', number: 11 },
      { name: 'Rangelo Janga', position: 'Atacante', number: 9 }
    ]
  },
  'CIV': {
    id: 'CIV', name: 'Costa do Marfim', sigla: 'CIV', coach: 'Emerse Faé', ranking: 38, flag: '🇨🇮', avgGoalsScored: 1.4, avgGoalsConceded: 1.15, history: ['W', 'W', 'D', 'W', 'L'],
    squad: [
      { name: 'Yahia Fofana', position: 'Goleiro', number: 1 },
      { name: 'Evan Ndicka', position: 'Defensor', number: 21 },
      { name: 'Ousmane Diomande', position: 'Defensor', number: 2 },
      { name: 'Ghislain Konan', position: 'Defensor', number: 3 },
      { name: 'Wilfried Singo', position: 'Defensor', number: 5 },
      { name: 'Franck Kessié', position: 'Meio-Campista', number: 8 },
      { name: 'Seko Fofana', position: 'Meio-Campista', number: 6 },
      { name: 'Ibrahim Sangaré', position: 'Meio-Campista', number: 18 },
      { name: 'Simon Adingra', position: 'Atacante', number: 24 },
      { name: 'Sébastien Haller', position: 'Atacante', number: 22 },
      { name: 'Nicolas Pépé', position: 'Atacante', number: 19 }
    ]
  },
  'ECU': {
    id: 'ECU', name: 'Equador', sigla: 'ECU', coach: 'Félix Sánchez', ranking: 31, flag: '🇪🇨', avgGoalsScored: 1.25, avgGoalsConceded: 1.0, history: ['L', 'L', 'W', 'D', 'W'],
    squad: [
      { name: 'Alexander Domínguez', position: 'Goleiro', number: 22 },
      { name: 'Piero Hincapié', position: 'Defensor', number: 3 },
      { name: 'Félix Torres', position: 'Defensor', number: 2 },
      { name: 'William Pacho', position: 'Defensor', number: 6 },
      { name: 'Angelo Preciado', position: 'Defensor', number: 17 },
      { name: 'Moisés Caicedo', position: 'Meio-Campista', number: 23 },
      { name: 'João Ortiz', position: 'Meio-Campista', number: 5 },
      { name: 'Kendry Páez', position: 'Meio-Campista', number: 10 },
      { name: 'Jeremy Sarmiento', position: 'Atacante', number: 16 },
      { name: 'Enner Valencia', position: 'Atacante', number: 13 },
      { name: 'Kevin Rodríguez', position: 'Atacante', number: 11 }
    ]
  },

  // Grupo F
  'NED': {
    id: 'NED', name: 'Países Baixos', sigla: 'NED', coach: 'Ronald Koeman', ranking: 7, flag: '🇳🇱', avgGoalsScored: 2.05, avgGoalsConceded: 0.9, history: ['D', 'W', 'D', 'W', 'L'],
    squad: [
      { name: 'Bart Verbruggen', position: 'Goleiro', number: 1 },
      { name: 'Virgil van Dijk', position: 'Defensor', number: 4 },
      { name: 'Stefan de Vrij', position: 'Defensor', number: 6 },
      { name: 'Denzel Dumfries', position: 'Defensor', number: 22 },
      { name: 'Nathan Aké', position: 'Defensor', number: 5 },
      { name: 'Jerdy Schouten', position: 'Meio-Campista', number: 24 },
      { name: 'Tijjani Reijnders', position: 'Meio-Campista', number: 14 },
      { name: 'Xavi Simons', position: 'Meio-Campista', number: 7 },
      { name: 'Donyell Malen', position: 'Atacante', number: 18 },
      { name: 'Cody Gakpo', position: 'Atacante', number: 11 },
      { name: 'Memphis Depay', position: 'Atacante', number: 10 }
    ]
  },
  'JPN': {
    id: 'JPN', name: 'Japão', sigla: 'JPN', coach: 'Hajime Moriyasu', ranking: 18, flag: '🇯🇵', avgGoalsScored: 1.7, avgGoalsConceded: 0.95, history: ['D', 'W', 'W', 'L', 'D'],
    squad: [
      { name: 'Zion Suzuki', position: 'Goleiro', number: 23 },
      { name: 'Ko Itakura', position: 'Defensor', number: 4 },
      { name: 'Shogo Taniguchi', position: 'Defensor', number: 3 },
      { name: 'Yukinari Sugawara', position: 'Defensor', number: 2 },
      { name: 'Hiroki Ito', position: 'Defensor', number: 21 },
      { name: 'Wataru Endo', position: 'Meio-Campista', number: 6 },
      { name: 'Hidemasa Morita', position: 'Meio-Campista', number: 5 },
      { name: 'Takefusa Kubo', position: 'Meio-Campista', number: 20 },
      { name: 'Ritsu Doan', position: 'Atacante', number: 8 },
      { name: 'Takumi Minamino', position: 'Atacante', number: 10 },
      { name: 'Ayase Ueda', position: 'Atacante', number: 9 }
    ]
  },
  'TUN': {
    id: 'TUN', name: 'Tunísia', sigla: 'TUN', coach: 'Montasser Louhichi', ranking: 41, flag: '🇹🇳', avgGoalsScored: 1.0, avgGoalsConceded: 1.1, history: ['L', 'D', 'W', 'L', 'D'],
    squad: [
      { name: 'Bechir Ben Saïd', position: 'Goleiro', number: 22 },
      { name: 'Yassine Meriah', position: 'Defensor', number: 4 },
      { name: 'Montassar Talbi', position: 'Defensor', number: 3 },
      { name: 'Wajdi Kechrida', position: 'Defensor', number: 2 },
      { name: 'Ali Abdi', position: 'Defensor', number: 12 },
      { name: 'Ellyes Skhiri', position: 'Meio-Campista', number: 17 },
      { name: 'Aïssa Laïdouni', position: 'Meio-Campista', number: 14 },
      { name: 'Hamza Rafia', position: 'Meio-Campista', number: 8 },
      { name: 'Elias Achouri', position: 'Atacante', number: 11 },
      { name: 'Youssef Msakni', position: 'Atacante', number: 10 },
      { name: 'Haythem Jouini', position: 'Atacante', number: 9 }
    ]
  },
  'SWE': {
    id: 'SWE', name: 'Suécia', sigla: 'SWE', coach: 'Jon Dahl Tomasson', ranking: 28, flag: '🇸🇪', avgGoalsScored: 1.55, avgGoalsConceded: 1.2, history: ['W', 'W', 'L', 'W', 'D'],
    squad: [
      { name: 'Robin Olsen', position: 'Goleiro', number: 1 },
      { name: 'Victor Lindelöf', position: 'Defensor', number: 3 },
      { name: 'Isak Hien', position: 'Defensor', number: 4 },
      { name: 'Emil Krafth', position: 'Defensor', number: 2 },
      { name: 'Ludwig Augustinsson', position: 'Defensor', number: 5 },
      { name: 'Jens Cajuste', position: 'Meio-Campista', number: 8 },
      { name: 'Anton Salétros', position: 'Meio-Campista', number: 21 },
      { name: 'Dejan Kulusevski', position: 'Meio-Campista', number: 22 },
      { name: 'Emil Forsberg', position: 'Atacante', number: 10 },
      { name: 'Alexander Isak', position: 'Atacante', number: 9 },
      { name: 'Viktor Gyökeres', position: 'Atacante', number: 17 }
    ]
  },

  // Grupo G
  'BEL': {
    id: 'BEL', name: 'Bélgica', sigla: 'BEL', coach: 'Domenico Tedesco', ranking: 3, flag: '🇧🇪', avgGoalsScored: 2.2, avgGoalsConceded: 0.85, history: ['D', 'W', 'L', 'W', 'D'],
    squad: [
      { name: 'Koen Casteels', position: 'Goleiro', number: 1 },
      { name: 'Wout Faes', position: 'Defensor', number: 4 },
      { name: 'Jan Vertonghen', position: 'Defensor', number: 5 },
      { name: 'Timothy Castagne', position: 'Defensor', number: 21 },
      { name: 'Arthur Theate', position: 'Defensor', number: 3 },
      { name: 'Amadou Onana', position: 'Meio-Campista', number: 24 },
      { name: 'Orel Mangala', position: 'Meio-Campista', number: 18 },
      { name: 'Kevin De Bruyne', position: 'Meio-Campista', number: 7 },
      { name: 'Jeremy Doku', position: 'Atacante', number: 11 },
      { name: 'Romelu Lukaku', position: 'Atacante', number: 9 },
      { name: 'Leandro Trossard', position: 'Atacante', number: 22 }
    ]
  },
  'EGY': {
    id: 'EGY', name: 'Egito', sigla: 'EGY', coach: 'Hossam Hassan', ranking: 36, flag: '🇪🇬', avgGoalsScored: 1.4, avgGoalsConceded: 1.1, history: ['D', 'D', 'W', 'W', 'L'],
    squad: [
      { name: 'Mohamed El Shenawy', position: 'Goleiro', number: 1 },
      { name: 'Mohamed Abdelmonem', position: 'Defensor', number: 24 },
      { name: 'Ahmed Hegazi', position: 'Defensor', number: 6 },
      { name: 'Mohamed Hany', position: 'Defensor', number: 3 },
      { name: 'Mohamed Hamdy', position: 'Defensor', number: 12 },
      { name: 'Hamdi Fathi', position: 'Meio-Campista', number: 5 },
      { name: 'Marwan Attia', position: 'Meio-Campista', number: 14 },
      { name: 'Emam Ashour', position: 'Meio-Campista', number: 8 },
      { name: 'Mohamed Salah', position: 'Atacante', number: 10 },
      { name: 'Mostafa Mohamed', position: 'Atacante', number: 19 },
      { name: 'Trezeguet', position: 'Atacante', number: 7 }
    ]
  },
  'IRN': {
    id: 'IRN', name: 'Irã', sigla: 'IRN', coach: 'Amir Ghalenoei', ranking: 20, flag: '🇮🇷', avgGoalsScored: 1.5, avgGoalsConceded: 1.0, history: ['D', 'W', 'W', 'L', 'W'],
    squad: [
      { name: 'Alireza Beiranvand', position: 'Goleiro', number: 1 },
      { name: 'Shojae Khalilzadeh', position: 'Defensor', number: 4 },
      { name: 'Hossein Kanaanizadegan', position: 'Defensor', number: 13 },
      { name: 'Ramin Rezaeian', position: 'Defensor', number: 23 },
      { name: 'Milad Mohammadi', position: 'Defensor', number: 5 },
      { name: 'Saeid Ezatolahi', position: 'Meio-Campista', number: 6 },
      { name: 'Saman Ghoddos', position: 'Meio-Campista', number: 14 },
      { name: 'Alireza Jahanbakhsh', position: 'Meio-Campista', number: 7 },
      { name: 'Mehdi Taremi', position: 'Atacante', number: 9 },
      { name: 'Sardar Azmoun', position: 'Atacante', number: 20 },
      { name: 'Ali Gholizadeh', position: 'Atacante', number: 17 }
    ]
  },
  'NZL': {
    id: 'NZL', name: 'Nova Zelândia', sigla: 'NZL', coach: 'Darren Bazeley', ranking: 104, flag: '🇳🇿', avgGoalsScored: 0.85, avgGoalsConceded: 1.9, history: ['D', 'L', 'D', 'W', 'L'],
    squad: [
      { name: 'Alex Paulsen', position: 'Goleiro', number: 1 },
      { name: 'Michael Boxall', position: 'Defensor', number: 4 },
      { name: 'Tyler Bindon', position: 'Defensor', number: 3 },
      { name: 'Dane Ingham', position: 'Defensor', number: 2 },
      { name: 'Liberato Cacace', position: 'Defensor', number: 13 },
      { name: 'Marko Stamenic', position: 'Meio-Campista', number: 6 },
      { name: 'Matthew Garbett', position: 'Meio-Campista', number: 8 },
      { name: 'Sarpreet Singh', position: 'Meio-Campista', number: 10 },
      { name: 'Chris Wood', position: 'Atacante', number: 9 },
      { name: 'Ben Waine', position: 'Atacante', number: 11 },
      { name: 'Kosta Barbarouses', position: 'Atacante', number: 7 }
    ]
  },

  // Grupo H
  'ESP': {
    id: 'ESP', name: 'Espanha', sigla: 'ESP', coach: 'Luis de la Fuente', ranking: 8, flag: '🇪🇸', avgGoalsScored: 2.3, avgGoalsConceded: 0.7, history: ['D', 'W', 'W', 'W', 'W'],
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
  'CPV': {
    id: 'CPV', name: 'Cabo Verde', sigla: 'CPV', coach: 'Bubista', ranking: 65, flag: '🇨🇻', avgGoalsScored: 1.1, avgGoalsConceded: 1.3, history: ['D', 'W', 'D', 'W', 'L'],
    squad: [
      { name: 'Vozinha', position: 'Goleiro', number: 1 },
      { name: 'Logan Costa', position: 'Defensor', number: 4 },
      { name: 'Roberto Lopes', position: 'Defensor', number: 3 },
      { name: 'Steven Moreira', position: 'Defensor', number: 23 },
      { name: 'João Paulo', position: 'Defensor', number: 5 },
      { name: 'Kevin Pina', position: 'Meio-Campista', number: 26 },
      { name: 'Jamiro Monteiro', position: 'Meio-Campista', number: 10 },
      { name: 'Kenny Rocha Santos', position: 'Meio-Campista', number: 18 },
      { name: 'Ryan Mendes', position: 'Atacante', number: 20 },
      { name: 'Bebé', position: 'Atacante', number: 11 },
      { name: 'Jovane Cabral', position: 'Atacante', number: 7 }
    ]
  },
  'KSA': {
    id: 'KSA', name: 'Arábia Saudita', sigla: 'KSA', coach: 'Roberto Mancini', ranking: 53, flag: '🇸🇦', avgGoalsScored: 1.2, avgGoalsConceded: 1.25, history: ['D', 'W', 'L', 'D', 'W'],
    squad: [
      { name: 'Mohammed Al-Owais', position: 'Goleiro', number: 21 },
      { name: 'Ali Lajami', position: 'Defensor', number: 4 },
      { name: 'Ali Al-Bulaihi', position: 'Defensor', number: 5 },
      { name: 'Saud Abdulhamid', position: 'Defensor', number: 12 },
      { name: 'Yasser Al-Shahrani', position: 'Defensor', number: 13 },
      { name: 'Abdulelah Al-Malki', position: 'Meio-Campista', number: 8 },
      { name: 'Mohamed Kanno', position: 'Meio-Campista', number: 23 },
      { name: 'Salem Al-Dawsari', position: 'Meio-Campista', number: 10 },
      { name: 'Firas Al-Buraikan', position: 'Atacante', number: 9 },
      { name: 'Saleh Al-Shehri', position: 'Atacante', number: 11 },
      { name: 'Abdulrahman Ghareeb', position: 'Atacante', number: 18 }
    ]
  },
  'URU': {
    id: 'URU', name: 'Uruguai', sigla: 'URU', coach: 'Marcelo Bielsa', ranking: 14, flag: '🇺🇾', avgGoalsScored: 1.85, avgGoalsConceded: 0.95, history: ['D', 'L', 'D', 'W', 'L'],
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

  // Grupo I
  'FRA': {
    id: 'FRA', name: 'França', sigla: 'FRA', coach: 'Didier Deschamps', ranking: 2, flag: '🇫🇷', avgGoalsScored: 2.4, avgGoalsConceded: 0.65, history: ['W', 'W', 'D', 'W', 'L'],
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
  'SEN': {
    id: 'SEN', name: 'Senegal', sigla: 'SEN', coach: 'Aliou Cissé', ranking: 17, flag: '🇸🇳', avgGoalsScored: 1.65, avgGoalsConceded: 0.95, history: ['L', 'W', 'W', 'D', 'W'],
    squad: [
      { name: 'Édouard Mendy', position: 'Goleiro', number: 16 },
      { name: 'Kalidou Koulibaly', position: 'Defensor', number: 3 },
      { name: 'Abdou Diallo', position: 'Defensor', number: 22 },
      { name: 'Abdoulaye Seck', position: 'Defensor', number: 4 },
      { name: 'Ismail Jakobs', position: 'Defensor', number: 14 },
      { name: 'Pape Gueye', position: 'Meio-Campista', number: 26 },
      { name: 'Lamine Camara', position: 'Meio-Campista', number: 25 },
      { name: 'Pape Matar Sarr', position: 'Meio-Campista', number: 17 },
      { name: 'Ismaïla Sarr', position: 'Atacante', number: 18 },
      { name: 'Sadio Mané', position: 'Atacante', number: 10 },
      { name: 'Nicolas Jackson', position: 'Atacante', number: 7 }
    ]
  },
  'NOR': {
    id: 'NOR', name: 'Noruega', sigla: 'NOR', coach: 'Ståle Solbakken', ranking: 47, flag: '🇳🇴', avgGoalsScored: 1.3, avgGoalsConceded: 1.3, history: ['L', 'W', 'L', 'D', 'W'],
    squad: [
      { name: 'Ørjan Nyland', position: 'Goleiro', number: 1 },
      { name: 'Leo Østigård', position: 'Defensor', number: 4 },
      { name: 'Kristoffer Ajer', position: 'Defensor', number: 3 },
      { name: 'Julian Ryerson', position: 'Defensor', number: 14 },
      { name: 'David Møller Wolfe', position: 'Defensor', number: 5 },
      { name: 'Sander Berge', position: 'Meio-Campista', number: 8 },
      { name: 'Martin Ødegaard', position: 'Meio-Campista', number: 10 },
      { name: 'Patrick Berg', position: 'Meio-Campista', number: 6 },
      { name: 'Oscar Bobb', position: 'Atacante', number: 21 },
      { name: 'Erling Haaland', position: 'Atacante', number: 9 },
      { name: 'Alexander Sørloth', position: 'Atacante', number: 7 }
    ]
  },
  'IRQ': {
    id: 'IRQ', name: 'Iraque', sigla: 'IRQ', coach: 'Jesús Casas', ranking: 58, flag: '🇮🇶', avgGoalsScored: 1.1, avgGoalsConceded: 1.4, history: ['W', 'L', 'W', 'W', 'L'],
    squad: [
      { name: 'Jalal Hassan', position: 'Goleiro', number: 12 },
      { name: 'Saad Natiq', position: 'Defensor', number: 4 },
      { name: 'Rebin Sulaka', position: 'Defensor', number: 3 },
      { name: 'Hussein Ali', position: 'Defensor', number: 2 },
      { name: 'Merchas Doski', position: 'Defensor', number: 23 },
      { name: 'Amir Al-Ammari', position: 'Meio-Campista', number: 16 },
      { name: 'Osama Rashid', position: 'Meio-Campista', number: 8 },
      { name: 'Ibrahim Bayesh', position: 'Meio-Campista', number: 8 },
      { name: 'Zidane Iqbal', position: 'Atacante', number: 17 },
      { name: 'Aymen Hussein', position: 'Atacante', number: 18 },
      { name: 'Ali Jasim', position: 'Atacante', number: 7 }
    ]
  },

  // Grupo J
  'ARG': {
    id: 'ARG', name: 'Argentina', sigla: 'ARG', coach: 'Lionel Scaloni', ranking: 1, flag: '🇦🇷', avgGoalsScored: 2.5, avgGoalsConceded: 0.5, history: ['D', 'W', 'W', 'D', 'W'],
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
  'ALG': {
    id: 'ALG', name: 'Argélia', sigla: 'ALG', coach: 'Vladimir Petković', ranking: 43, flag: '🇩🇿', avgGoalsScored: 1.35, avgGoalsConceded: 1.15, history: ['D', 'L', 'W', 'W', 'L'],
    squad: [
      { name: 'Anthony Mandrea', position: 'Goleiro', number: 1 },
      { name: 'Aïssa Mandi', position: 'Defensor', number: 2 },
      { name: 'Mohamed Amine Tougai', position: 'Defensor', number: 3 },
      { name: 'Youcef Atal', position: 'Defensor', number: 20 },
      { name: 'Rayan Aït-Nouri', position: 'Defensor', number: 15 },
      { name: 'Nabil Bentaleb', position: 'Meio-Campista', number: 14 },
      { name: 'Ismaël Bennacer', position: 'Meio-Campista', number: 22 },
      { name: 'Houssem Aouar', position: 'Meio-Campista', number: 11 },
      { name: 'Riyad Mahrez', position: 'Atacante', number: 7 },
      { name: 'Baghdad Bounedjah', position: 'Atacante', number: 9 },
      { name: 'Amine Gouiri', position: 'Atacante', number: 10 }
    ]
  },
  'AUT': {
    id: 'AUT', name: 'Áustria', sigla: 'AUT', coach: 'Ralf Rangnick', ranking: 25, flag: '🇦🇹', avgGoalsScored: 1.4, avgGoalsConceded: 1.1, history: ['W', 'L', 'W', 'W', 'D'],
    squad: [
      { name: 'Patrick Pentz', position: 'Goleiro', number: 13 },
      { name: 'Kevin Danso', position: 'Defensor', number: 4 },
      { name: 'Philipp Lienhart', position: 'Defensor', number: 15 },
      { name: 'Stefan Posch', position: 'Defensor', number: 5 },
      { name: 'Phillipp Mwene', position: 'Defensor', number: 16 },
      { name: 'Nicolas Seiwald', position: 'Meio-Campista', number: 6 },
      { name: 'Konrad Laimer', position: 'Meio-Campista', number: 20 },
      { name: 'Marcel Sabitzer', position: 'Meio-Campista', number: 9 },
      { name: 'Christoph Baumgartner', position: 'Atacante', number: 19 },
      { name: 'Michael Gregoritsch', position: 'Atacante', number: 11 },
      { name: 'Marko Arnautović', position: 'Atacante', number: 7 }
    ]
  },
  'JOR': {
    id: 'JOR', name: 'Jordânia', sigla: 'JOR', coach: 'Jamal Sellami', ranking: 68, flag: '🇯🇴', avgGoalsScored: 0.95, avgGoalsConceded: 1.45, history: ['W', 'D', 'W', 'L', 'L'],
    squad: [
      { name: 'Yazeed Abulaila', position: 'Goleiro', number: 1 },
      { name: 'Yazan Al-Arab', position: 'Defensor', number: 5 },
      { name: 'Abdallah Nasib', position: 'Defensor', number: 3 },
      { name: 'Ehsan Haddad', position: 'Defensor', number: 23 },
      { name: 'Salem Al-Ajalin', position: 'Defensor', number: 17 },
      { name: 'Nizar Al-Rashdan', position: 'Meio-Campista', number: 4 },
      { name: 'Noor Al-Rawabdeh', position: 'Meio-Campista', number: 8 },
      { name: 'Mahmoud Al-Mardi', position: 'Meio-Campista', number: 13 },
      { name: 'Mousa Al-Tamari', position: 'Atacante', number: 10 },
      { name: 'Yazan Al-Naimat', position: 'Atacante', number: 11 },
      { name: 'Ali Olwan', position: 'Atacante', number: 9 }
    ]
  },

  // Grupo K
  'POR': {
    id: 'POR', name: 'Portugal', sigla: 'POR', coach: 'Roberto Martínez', ranking: 6, flag: '🇵🇹', avgGoalsScored: 2.15, avgGoalsConceded: 0.75, history: ['W', 'W', 'L', 'W', 'D'],
    squad: [
      { name: 'Diogo Costa', position: 'Goleiro', number: 22 },
      { name: 'Rúben Dias', position: 'Defensor', number: 4 },
      { name: 'Gonçalo Inácio', position: 'Defensor', number: 3 },
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
  'UZB': {
    id: 'UZB', name: 'Uzbequistão', sigla: 'UZB', coach: 'Srečko Katanec', ranking: 64, flag: '🇺🇿', avgGoalsScored: 1.15, avgGoalsConceded: 1.2, history: ['W', 'D', 'W', 'L', 'W'],
    squad: [
      { name: 'Utkir Yusupov', position: 'Goleiro', number: 1 },
      { name: 'Rustam Ashurmatov', position: 'Defensor', number: 3 },
      { name: 'Abdukodir Khusanov', position: 'Defensor', number: 15 },
      { name: 'Husniddin Aliqulov', position: 'Defensor', number: 4 },
      { name: 'Sherzod Nasrullaev', position: 'Defensor', number: 19 },
      { name: 'Otabek Shukurov', position: 'Meio-Campista', number: 9 },
      { name: 'Odiljon Hamrobekov', position: 'Meio-Campista', number: 7 },
      { name: 'Jaloliddin Masharipov', position: 'Meio-Campista', number: 10 },
      { name: 'Eldor Shomurodov', position: 'Atacante', number: 14 },
      { name: 'Abbosbek Fayzullaev', position: 'Atacante', number: 22 },
      { name: 'Igor Sergeev', position: 'Atacante', number: 11 }
    ]
  },
  'COL': {
    id: 'COL', name: 'Colômbia', sigla: 'COL', coach: 'Néstor Lorenzo', ranking: 12, flag: '🇨🇴', avgGoalsScored: 1.7, avgGoalsConceded: 0.9, history: ['W', 'W', 'W', 'D', 'W'],
    squad: [
      { name: 'Camilo Vargas', position: 'Goleiro', number: 12 },
      { name: 'Davinson Sánchez', position: 'Defensor', number: 23 },
      { name: 'Jhon Lucumí', position: 'Defensor', number: 3 },
      { name: 'Daniel Muñoz', position: 'Defensor', number: 21 },
      { name: 'Johan Mojica', position: 'Defensor', number: 17 },
      { name: 'Jefferson Lerma', position: 'Meio-Campista', number: 16 },
      { name: 'Richard Ríos', position: 'Meio-Campista', number: 6 },
      { name: 'James Rodríguez', position: 'Meio-Campista', number: 10 },
      { name: 'Jhon Arias', position: 'Atacante', number: 7 },
      { name: 'Luis Díaz', position: 'Atacante', number: 14 },
      { name: 'Jhon Córdoba', position: 'Atacante', number: 9 }
    ]
  },
  'COD': {
    id: 'COD', name: 'RD Congo', sigla: 'COD', coach: 'Sébastien Desabre', ranking: 62, flag: '🇨🇩', avgGoalsScored: 1.2, avgGoalsConceded: 1.25, history: ['L', 'W', 'D', 'L', 'D'],
    squad: [
      { name: 'Lionel Mpasi', position: 'Goleiro', number: 1 },
      { name: 'Chancel Mbemba', position: 'Defensor', number: 22 },
      { name: 'Dylan Batubinsika', position: 'Defensor', number: 5 },
      { name: 'Gedeon Kalulu', position: 'Defensor', number: 24 },
      { name: 'Arthur Masuaku', position: 'Defensor', number: 26 },
      { name: 'Samuel Moutoussamy', position: 'Meio-Campista', number: 8 },
      { name: 'Charles Pickel', position: 'Meio-Campista', number: 18 },
      { name: 'Gaël Kakuta', position: 'Meio-Campista', number: 14 },
      { name: 'Meschack Elia', position: 'Atacante', number: 13 },
      { name: 'Cédric Bakambu', position: 'Atacante', number: 9 },
      { name: 'Yoane Wissa', position: 'Atacante', number: 20 }
    ]
  },

  // Grupo L
  'ENG': {
    id: 'ENG', name: 'Inglaterra', sigla: 'ENG', coach: 'Thomas Tuchel', ranking: 4, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avgGoalsScored: 2.2, avgGoalsConceded: 0.75, history: ['W', 'D', 'W', 'L', 'D'],
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
  },
  'CRO': {
    id: 'CRO', name: 'Croácia', sigla: 'CRO', coach: 'Zlatko Dalić', ranking: 10, flag: '🇭🇷', avgGoalsScored: 1.6, avgGoalsConceded: 1.05, history: ['D', 'W', 'W', 'D', 'L'],
    squad: [
      { name: 'Dominik Livaković', position: 'Goleiro', number: 1 },
      { name: 'Josip Šutalo', position: 'Defensor', number: 6 },
      { name: 'Marin Pongračić', position: 'Defensor', number: 3 },
      { name: 'Josip Stanišić', position: 'Defensor', number: 2 },
      { name: 'Joško Gvardiol', position: 'Defensor', number: 4 },
      { name: 'Luka Modrić', position: 'Meio-Campista', number: 10 },
      { name: 'Mateo Kovačić', position: 'Meio-Campista', number: 8 },
      { name: 'Marcelo Brozović', position: 'Meio-Campista', number: 11 },
      { name: 'Lovro Majer', position: 'Atacante', number: 7 },
      { name: 'Andrej Kramarić', position: 'Atacante', number: 9 },
      { name: 'Ivan Perišić', position: 'Atacante', number: 14 }
    ]
  },
  'GHA': {
    id: 'GHA', name: 'Gana', sigla: 'GHA', coach: 'Otto Addo', ranking: 68, flag: '🇬🇭', avgGoalsScored: 1.25, avgGoalsConceded: 1.35, history: ['W', 'D', 'L', 'L', 'W'],
    squad: [
      { name: 'Lawrence Ati-Zigi', position: 'Goleiro', number: 1 },
      { name: 'Alexander Djiku', position: 'Defensor', number: 23 },
      { name: 'Mohammed Salisu', position: 'Defensor', number: 6 },
      { name: 'Alidu Seidu', position: 'Defensor', number: 2 },
      { name: 'Gideon Mensah', position: 'Defensor', number: 14 },
      { name: 'Salis Abdul Samed', position: 'Meio-Campista', number: 21 },
      { name: 'Thomas Partey', position: 'Meio-Campista', number: 5 },
      { name: 'Mohammed Kudus', position: 'Meio-Campista', number: 20 },
      { name: 'Jordan Ayew', position: 'Atacante', number: 9 },
      { name: 'Iñaki Williams', position: 'Atacante', number: 19 },
      { name: 'Antoine Semenyo', position: 'Atacante', number: 25 }
    ]
  },
  'PAN': {
    id: 'PAN', name: 'Panamá', sigla: 'PAN', coach: 'Thomas Christiansen', ranking: 43, flag: '🇵🇦', avgGoalsScored: 1.1, avgGoalsConceded: 1.25, history: ['L', 'W', 'W', 'L', 'D'],
    squad: [
      { name: 'Orlando Mosquera', position: 'Goleiro', number: 22 },
      { name: 'José Córdoba', position: 'Defensor', number: 3 },
      { name: 'Edgardo Fariña', position: 'Defensor', number: 24 },
      { name: 'Michael Amir Murillo', position: 'Defensor', number: 23 },
      { name: 'Eric Davis', position: 'Defensor', number: 15 },
      { name: 'Cristian Martínez', position: 'Meio-Campista', number: 6 },
      { name: 'Adalberto Carrasquilla', position: 'Meio-Campista', number: 8 },
      { name: 'Édgar Yoel Bárcenas', position: 'Meio-Campista', number: 10 },
      { name: 'José Luis Rodríguez', position: 'Atacante', number: 7 },
      { name: 'José Fajardo', position: 'Atacante', number: 17 },
      { name: 'Ismael Díaz', position: 'Atacante', number: 11 }
    ]
  }
};

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match_1', homeTeamId: 'MEX', awayTeamId: 'RSA', status: 'FINALIZADA', placarCasa: 2, placarFora: 0, minute: 90,
    estadio: 'Estádio Azteca, Cidade do México', data: '2026-06-11', hora: '17:00',
    stats: {
      home: { possession: 58, shots: 14, shotsOnGoal: 6, fouls: 10, corners: 6, yellowCards: 1, redCards: 0 },
      away: { possession: 42, shots: 7, shotsOnGoal: 2, fouls: 14, corners: 2, yellowCards: 2, redCards: 0 }
    },
    events: [
      { id: 'ev_m1_1', type: 'GOAL', minute: 28, teamId: 'MEX', player: 'Julián Quiñones', description: 'GOL! Julián Quiñones abre o placar após jogada individual e finalização no canto.' },
      { id: 'ev_m1_2', type: 'YELLOW_CARD', minute: 42, teamId: 'RSA', player: 'Teboho Mokoena', description: 'Cartão amarelo por falta dura no meio campo.' },
      { id: 'ev_m1_3', type: 'GOAL', minute: 75, teamId: 'MEX', player: 'Raúl Jiménez', description: 'GOL! Raúl Jiménez cabeceia firme após cruzamento preciso de Gallardo.' }
    ],
    probability: { homeWin: 100, awayWin: 0, draw: 0, criterio: 'Partida Finalizada. Vitória do México por 2-0.' }
  },
  {
    id: 'match_2', homeTeamId: 'KOR', awayTeamId: 'CZE', status: 'FINALIZADA', placarCasa: 2, placarFora: 1, minute: 90,
    estadio: 'BMO Field, Toronto', data: '2026-06-12', hora: '14:00',
    stats: {
      home: { possession: 52, shots: 11, shotsOnGoal: 5, fouls: 12, corners: 4, yellowCards: 2, redCards: 0 },
      away: { possession: 48, shots: 10, shotsOnGoal: 3, fouls: 11, corners: 5, yellowCards: 1, redCards: 0 }
    },
    events: [
      { id: 'ev_m2_1', type: 'GOAL', minute: 34, teamId: 'KOR', player: 'Son Heung-min', description: 'GOL! Son Heung-min finaliza com categoria após passe de Lee Kang-in.' },
      { id: 'ev_m2_2', type: 'GOAL', minute: 58, teamId: 'CZE', player: 'Patrik Schick', description: 'GOL! Patrik Schick empata o jogo finalizando de perna esquerda.' },
      { id: 'ev_m2_3', type: 'GOAL', minute: 81, teamId: 'KOR', player: 'Hwang Hee-chan', description: 'GOL! Hwang Hee-chan marca o gol da vitória em chute cruzado.' }
    ],
    probability: { homeWin: 100, awayWin: 0, draw: 0, criterio: 'Partida Finalizada. Vitória da Coreia do Sul por 2-1.' }
  },
  {
    id: 'match_3', homeTeamId: 'CAN', awayTeamId: 'BIH', status: 'FINALIZADA', placarCasa: 1, placarFora: 1, minute: 90,
    estadio: 'BC Place, Vancouver', data: '2026-06-12', hora: '18:00',
    stats: {
      home: { possession: 56, shots: 15, shotsOnGoal: 4, fouls: 9, corners: 7, yellowCards: 1, redCards: 0 },
      away: { possession: 44, shots: 8, shotsOnGoal: 3, fouls: 13, corners: 3, yellowCards: 3, redCards: 0 }
    },
    events: [
      { id: 'ev_m3_1', type: 'GOAL', minute: 40, teamId: 'BIH', player: 'Edin Džeko', description: 'GOL! Edin Džeko abre o placar de cabeça após cobrança de falta.' },
      { id: 'ev_m3_2', type: 'GOAL', minute: 67, teamId: 'CAN', player: 'Jonathan David', description: 'GOL! Jonathan David empata aproveitando assistência de Alphonso Davies.' }
    ],
    probability: { homeWin: 0, awayWin: 0, draw: 100, criterio: 'Partida Finalizada. Empate em 1-1.' }
  },
  {
    id: 'match_4', homeTeamId: 'USA', awayTeamId: 'PAR', status: 'FINALIZADA', placarCasa: 4, placarFora: 1, minute: 90,
    estadio: 'SoFi Stadium, Los Angeles', data: '2026-06-13', hora: '15:00',
    stats: {
      home: { possession: 54, shots: 18, shotsOnGoal: 8, fouls: 10, corners: 8, yellowCards: 1, redCards: 0 },
      away: { possession: 46, shots: 9, shotsOnGoal: 3, fouls: 15, corners: 4, yellowCards: 2, redCards: 0 }
    },
    events: [
      { id: 'ev_m4_1', type: 'GOAL', minute: 12, teamId: 'USA', player: 'Christian Pulisic', description: 'GOL! Christian Pulisic cobra falta com perfeição no ângulo.' },
      { id: 'ev_m4_2', type: 'GOAL', minute: 31, teamId: 'USA', player: 'Folarin Balogun', description: 'GOL! Balogun chuta forte na saída do goleiro.' },
      { id: 'ev_m4_3', type: 'GOAL', minute: 49, teamId: 'PAR', player: 'Miguel Almirón', description: 'GOL! Miguel Almirón diminui com belo chute de fora da área.' },
      { id: 'ev_m4_4', type: 'GOAL', minute: 70, teamId: 'USA', player: 'Timothy Weah', description: 'GOL! Timothy Weah chuta de primeira após cruzamento rasteiro.' },
      { id: 'ev_m4_5', type: 'GOAL', minute: 88, teamId: 'USA', player: 'Weston McKennie', description: 'GOL! McKennie de cabeça fecha a goleada após cobrança de escanteio.' }
    ],
    probability: { homeWin: 100, awayWin: 0, draw: 0, criterio: 'Partida Finalizada. Vitória dos Estados Unidos por 4-1.' }
  },
  {
    id: 'match_5', homeTeamId: 'QAT', awayTeamId: 'SUI', status: 'FINALIZADA', placarCasa: 1, placarFora: 1, minute: 90,
    estadio: 'Levi\'s Stadium, São Francisco', data: '2026-06-13', hora: '18:00',
    stats: {
      home: { possession: 40, shots: 6, shotsOnGoal: 2, fouls: 14, corners: 1, yellowCards: 2, redCards: 0 },
      away: { possession: 60, shots: 17, shotsOnGoal: 5, fouls: 8, corners: 8, yellowCards: 0, redCards: 0 }
    },
    events: [
      { id: 'ev_m5_1', type: 'GOAL', minute: 29, teamId: 'QAT', player: 'Akram Afif', description: 'GOL! Akram Afif marca gol histórico após contra-ataque rápido.' },
      { id: 'ev_m5_2', type: 'GOAL', minute: 73, teamId: 'SUI', player: 'Breel Embolo', description: 'GOL! Breel Embolo empata a partida empurrando de primeira para o gol.' }
    ],
    probability: { homeWin: 0, awayWin: 0, draw: 100, criterio: 'Partida Finalizada. Empate em 1-1.' }
  },
  {
    id: 'match_6', homeTeamId: 'BRA', awayTeamId: 'MAR', status: 'FINALIZADA', placarCasa: 1, placarFora: 1, minute: 90,
    estadio: 'MetLife Stadium, Nova York', data: '2026-06-13', hora: '21:00',
    stats: {
      home: { possession: 52, shots: 13, shotsOnGoal: 4, fouls: 11, corners: 6, yellowCards: 2, redCards: 0 },
      away: { possession: 48, shots: 11, shotsOnGoal: 4, fouls: 12, corners: 5, yellowCards: 1, redCards: 0 }
    },
    events: [
      { id: 'ev_m6_1', type: 'GOAL', minute: 38, teamId: 'MAR', player: 'Hakim Ziyech', description: 'GOL! Hakim Ziyech abre o placar em linda cobrança de falta direto pro gol.' },
      { id: 'ev_m6_2', type: 'YELLOW_CARD', minute: 54, teamId: 'BRA', player: 'Bruno Guimarães', description: 'Cartão amarelo por falta em Ounahi.' },
      { id: 'ev_m6_3', type: 'GOAL', minute: 64, teamId: 'BRA', player: 'Vinícius Júnior', description: 'GOL! Vinícius Júnior empata o clássico aproveitando passe de Paquetá.' }
    ],
    probability: { homeWin: 0, awayWin: 0, draw: 100, criterio: 'Partida Finalizada. Empate em 1-1.' }
  },
  {
    id: 'match_7', homeTeamId: 'HAI', awayTeamId: 'SCO', status: 'FINALIZADA', placarCasa: 0, placarFora: 1, minute: 90,
    estadio: 'Gillette Stadium, Boston', data: '2026-06-14', hora: '13:00',
    stats: {
      home: { possession: 42, shots: 8, shotsOnGoal: 2, fouls: 15, corners: 3, yellowCards: 2, redCards: 0 },
      away: { possession: 58, shots: 14, shotsOnGoal: 5, fouls: 9, corners: 6, yellowCards: 1, redCards: 0 }
    },
    events: [
      { id: 'ev_m7_1', type: 'GOAL', minute: 61, teamId: 'SCO', player: 'Scott McTominay', description: 'GOL! Scott McTominay entra como elemento surpresa e faz o único gol do jogo.' }
    ],
    probability: { homeWin: 0, awayWin: 100, draw: 0, criterio: 'Partida Finalizada. Vitória da Escócia por 1-0.' }
  },
  {
    id: 'match_8', homeTeamId: 'AUS', awayTeamId: 'TUR', status: 'FINALIZADA', placarCasa: 2, placarFora: 0, minute: 90,
    estadio: 'NRG Stadium, Houston', data: '2026-06-14', hora: '16:00',
    stats: {
      home: { possession: 46, shots: 11, shotsOnGoal: 4, fouls: 12, corners: 4, yellowCards: 1, redCards: 0 },
      away: { possession: 54, shots: 12, shotsOnGoal: 2, fouls: 10, corners: 5, yellowCards: 2, redCards: 0 }
    },
    events: [
      { id: 'ev_m8_1', type: 'GOAL', minute: 45, teamId: 'AUS', player: 'Mitchell Duke', description: 'GOL! Mitchell Duke coloca a Austrália na frente aproveitando bola cruzada.' },
      { id: 'ev_m8_2', type: 'GOAL', minute: 82, teamId: 'AUS', player: 'Jackson Irvine', description: 'GOL! Jackson Irvine amplia de cabeça após escanteio cobrar.' }
    ],
    probability: { homeWin: 100, awayWin: 0, draw: 0, criterio: 'Partida Finalizada. Vitória da Austrália por 2-0.' }
  },
  {
    id: 'match_9', homeTeamId: 'GER', awayTeamId: 'CUW', status: 'FINALIZADA', placarCasa: 7, placarFora: 1, minute: 90,
    estadio: 'AT&T Stadium, Dallas', data: '2026-06-14', hora: '19:00',
    stats: {
      home: { possession: 68, shots: 27, shotsOnGoal: 14, fouls: 7, corners: 9, yellowCards: 0, redCards: 0 },
      away: { possession: 32, shots: 4, shotsOnGoal: 2, fouls: 13, corners: 1, yellowCards: 1, redCards: 0 }
    },
    events: [
      { id: 'ev_m9_1', type: 'GOAL', minute: 9, teamId: 'GER', player: 'Kai Havertz', description: 'GOL! Kai Havertz abre o placar com finalização precisa.' },
      { id: 'ev_m9_2', type: 'GOAL', minute: 18, teamId: 'GER', player: 'Florian Wirtz', description: 'GOL! Florian Wirtz amplia em jogada rápida de ataque.' },
      { id: 'ev_m9_3', type: 'GOAL', minute: 33, teamId: 'GER', player: 'Jamal Musiala', description: 'GOL! Jamal Musiala dribla o defensor e chuta colocado.' },
      { id: 'ev_m9_4', type: 'GOAL', minute: 41, teamId: 'GER', player: 'Kai Havertz', description: 'GOL! Mais um de Kai Havertz antes do intervalo.' },
      { id: 'ev_m9_5', type: 'GOAL', minute: 52, teamId: 'CUW', player: 'Rangelo Janga', description: 'GOL! Curaçau marca o gol de honra com Janga após rebote.' },
      { id: 'ev_m9_6', type: 'GOAL', minute: 61, teamId: 'GER', player: 'Niclas Füllkrug', description: 'GOL! Niclas Füllkrug de cabeça após escanteio.' },
      { id: 'ev_m9_7', type: 'GOAL', minute: 77, teamId: 'GER', player: 'Florian Wirtz', description: 'GOL! Florian Wirtz faz o sexto em chute forte da entrada da área.' },
      { id: 'ev_m9_8', type: 'GOAL', minute: 86, teamId: 'GER', player: 'Niclas Füllkrug', description: 'GOL! Füllkrug fecha a goleada de 7-1 com chute cruzado.' }
    ],
    probability: { homeWin: 100, awayWin: 0, draw: 0, criterio: 'Partida Finalizada. Vitória histórica da Alemanha por 7-1.' }
  },
  {
    id: 'match_10', homeTeamId: 'NED', awayTeamId: 'JPN', status: 'FINALIZADA', placarCasa: 2, placarFora: 2, minute: 90,
    estadio: 'Lumen Field, Seattle', data: '2026-06-14', hora: '22:00',
    stats: {
      home: { possession: 53, shots: 14, shotsOnGoal: 6, fouls: 11, corners: 5, yellowCards: 1, redCards: 0 },
      away: { possession: 47, shots: 13, shotsOnGoal: 5, fouls: 9, corners: 4, yellowCards: 1, redCards: 0 }
    },
    events: [
      { id: 'ev_m10_1', type: 'GOAL', minute: 24, teamId: 'NED', player: 'Cody Gakpo', description: 'GOL! Cody Gakpo aproveita passe de Reijnders e marca.' },
      { id: 'ev_m10_2', type: 'GOAL', minute: 37, teamId: 'JPN', player: 'Takumi Minamino', description: 'GOL! Minamino empata batendo no canto do goleiro.' },
      { id: 'ev_m10_3', type: 'GOAL', minute: 59, teamId: 'NED', player: 'Memphis Depay', description: 'GOL! Depay recoloca a Holanda na frente em cobrança de pênalti.' },
      { id: 'ev_m10_4', type: 'GOAL', minute: 83, teamId: 'JPN', player: 'Ayase Ueda', description: 'GOL! Ueda empata de cabeça nos minutos finais.' }
    ],
    probability: { homeWin: 0, awayWin: 0, draw: 100, criterio: 'Partida Finalizada. Empate eletrizante em 2-2.' }
  },
  {
    id: 'match_11', homeTeamId: 'CIV', awayTeamId: 'ECU', status: 'FINALIZADA', placarCasa: 1, placarFora: 0, minute: 90,
    estadio: 'Mercedes-Benz Stadium, Atlanta', data: '2026-06-15', hora: '14:00',
    stats: {
      home: { possession: 47, shots: 10, shotsOnGoal: 3, fouls: 13, corners: 4, yellowCards: 2, redCards: 0 },
      away: { possession: 53, shots: 11, shotsOnGoal: 2, fouls: 12, corners: 5, yellowCards: 1, redCards: 0 }
    },
    events: [
      { id: 'ev_m11_1', type: 'GOAL', minute: 56, teamId: 'CIV', player: 'Sébastien Haller', description: 'GOL! Sébastien Haller finaliza de forma espetacular na pequena área.' }
    ],
    probability: { homeWin: 100, awayWin: 0, draw: 0, criterio: 'Partida Finalizada. Vitória da Costa do Marfim por 1-0.' }
  },
  {
    id: 'match_12', homeTeamId: 'SWE', awayTeamId: 'TUN', status: 'FINALIZADA', placarCasa: 5, placarFora: 1, minute: 90,
    estadio: 'Arrowhead Stadium, Kansas City', data: '2026-06-15', hora: '17:00',
    stats: {
      home: { possession: 60, shots: 19, shotsOnGoal: 9, fouls: 8, corners: 7, yellowCards: 0, redCards: 0 },
      away: { possession: 40, shots: 6, shotsOnGoal: 2, fouls: 14, corners: 2, yellowCards: 3, redCards: 0 }
    },
    events: [
      { id: 'ev_m12_1', type: 'GOAL', minute: 15, teamId: 'SWE', player: 'Alexander Isak', description: 'GOL! Alexander Isak abre o placar com finalização precisa.' },
      { id: 'ev_m12_2', type: 'GOAL', minute: 31, teamId: 'SWE', player: 'Viktor Gyökeres', description: 'GOL! Viktor Gyökeres amplia após drible desconcertante.' },
      { id: 'ev_m12_3', type: 'GOAL', minute: 48, teamId: 'TUN', player: 'Elias Achouri', description: 'GOL! Tunísia desconta logo no início do segundo tempo.' },
      { id: 'ev_m12_4', type: 'GOAL', minute: 57, teamId: 'SWE', player: 'Alexander Isak', description: 'GOL! Isak faz o terceiro em assistência de Kulusevski.' },
      { id: 'ev_m12_5', type: 'GOAL', minute: 72, teamId: 'SWE', player: 'Dejan Kulusevski', description: 'GOL! Kulusevski também deixa sua marca com chute rasteiro.' },
      { id: 'ev_m12_6', type: 'GOAL', minute: 85, teamId: 'SWE', player: 'Viktor Gyökeres', description: 'GOL! Gyökeres fecha a goleada de 5-1 de cabeça.' }
    ],
    probability: { homeWin: 100, awayWin: 0, draw: 0, criterio: 'Partida Finalizada. Vitória da Suécia por 5-1.' }
  },
  {
    id: 'match_13', homeTeamId: 'ESP', awayTeamId: 'CPV', status: 'FINALIZADA', placarCasa: 0, placarFora: 0, minute: 90,
    estadio: 'Hard Rock Stadium, Miami', data: '2026-06-15', hora: '20:00',
    stats: {
      home: { possession: 71, shots: 21, shotsOnGoal: 5, fouls: 6, corners: 11, yellowCards: 0, redCards: 0 },
      away: { possession: 29, shots: 3, shotsOnGoal: 1, fouls: 16, corners: 1, yellowCards: 4, redCards: 0 }
    },
    events: [
      { id: 'ev_m13_1', type: 'YELLOW_CARD', minute: 38, teamId: 'CPV', player: 'Logan Costa', description: 'Cartão amarelo após puxão de camisa em Morata.' }
    ],
    probability: { homeWin: 0, awayWin: 0, draw: 100, criterio: 'Partida Finalizada. Empate sem gols (0-0).' }
  },
  {
    id: 'match_14', homeTeamId: 'EGY', awayTeamId: 'BEL', status: 'FINALIZADA', placarCasa: 1, placarFora: 1, minute: 90,
    estadio: 'Lincoln Financial Field, Filadélfia', data: '2026-06-15', hora: '21:00',
    stats: {
      home: { possession: 43, shots: 8, shotsOnGoal: 3, fouls: 12, corners: 3, yellowCards: 2, redCards: 0 },
      away: { possession: 57, shots: 15, shotsOnGoal: 5, fouls: 9, corners: 7, yellowCards: 1, redCards: 0 }
    },
    events: [
      { id: 'ev_m14_1', type: 'GOAL', minute: 22, teamId: 'EGY', player: 'Mohamed Salah', description: 'GOL! Mohamed Salah abre o placar em lindo chute cruzado.' },
      { id: 'ev_m14_2', type: 'GOAL', minute: 69, teamId: 'BEL', player: 'Kevin De Bruyne', description: 'GOL! De Bruyne empata a partida com chute forte da entrada da área.' }
    ],
    probability: { homeWin: 0, awayWin: 0, draw: 100, criterio: 'Partida Finalizada. Empate em 1-1.' }
  },
  {
    id: 'match_15', homeTeamId: 'KSA', awayTeamId: 'URU', status: 'FINALIZADA', placarCasa: 1, placarFora: 1, minute: 90,
    estadio: 'Levi\'s Stadium, São Francisco', data: '2026-06-15', hora: '23:00',
    stats: {
      home: { possession: 45, shots: 7, shotsOnGoal: 2, fouls: 13, corners: 2, yellowCards: 2, redCards: 0 },
      away: { possession: 55, shots: 14, shotsOnGoal: 4, fouls: 11, corners: 6, yellowCards: 1, redCards: 0 }
    },
    events: [
      { id: 'ev_m15_1', type: 'GOAL', minute: 42, teamId: 'URU', player: 'Darwin Núñez', description: 'GOL! Darwin Núñez finaliza na pequena área após jogada de escanteio.' },
      { id: 'ev_m15_2', type: 'GOAL', minute: 78, teamId: 'KSA', player: 'Salem Al-Dawsari', description: 'GOL! Salem Al-Dawsari empata em linda cobrança de pênalti.' }
    ],
    probability: { homeWin: 0, awayWin: 0, draw: 100, criterio: 'Partida Finalizada. Empate em 1-1.' }
  },
  {
    id: 'match_16', homeTeamId: 'IRN', awayTeamId: 'NZL', status: 'FINALIZADA', placarCasa: 2, placarFora: 2, minute: 90,
    estadio: 'BC Place, Vancouver', data: '2026-06-16', hora: '12:00',
    stats: {
      home: { possession: 51, shots: 12, shotsOnGoal: 5, fouls: 10, corners: 4, yellowCards: 1, redCards: 0 },
      away: { possession: 49, shots: 11, shotsOnGoal: 4, fouls: 12, corners: 5, yellowCards: 1, redCards: 0 }
    },
    events: [
      { id: 'ev_m16_1', type: 'GOAL', minute: 26, teamId: 'IRN', player: 'Mehdi Taremi', description: 'GOL! Mehdi Taremi coloca o Irã na frente aproveitando passe na área.' },
      { id: 'ev_m16_2', type: 'GOAL', minute: 39, teamId: 'NZL', player: 'Chris Wood', description: 'GOL! Chris Wood empata a partida de cabeça de forma clássica.' },
      { id: 'ev_m16_3', type: 'GOAL', minute: 67, teamId: 'NZL', player: 'Ben Waine', description: 'GOL! Ben Waine chuta forte no ângulo e vira o jogo.' },
      { id: 'ev_m16_4', type: 'GOAL', minute: 84, teamId: 'IRN', player: 'Sardar Azmoun', description: 'GOL! Sardar Azmoun garante o empate para o Irã no final.' }
    ],
    probability: { homeWin: 0, awayWin: 0, draw: 100, criterio: 'Partida Finalizada. Empate em 2-2.' }
  },
  {
    id: 'match_17', homeTeamId: 'FRA', awayTeamId: 'SEN', status: 'FINALIZADA', placarCasa: 2, placarFora: 1, minute: 90,
    estadio: 'MetLife Stadium, Nova York', data: '2026-06-16', hora: '15:00',
    stats: {
      home: { possession: 55, shots: 14, shotsOnGoal: 6, fouls: 9, corners: 5, yellowCards: 1, redCards: 0 },
      away: { possession: 45, shots: 9, shotsOnGoal: 3, fouls: 13, corners: 4, yellowCards: 2, redCards: 0 }
    },
    events: [
      { id: 'ev_m17_1', type: 'GOAL', minute: 32, teamId: 'FRA', player: 'Kylian Mbappé', description: 'GOL! Kylian Mbappé fuzila após jogada rápida de contra-ataque.' },
      { id: 'ev_m17_2', type: 'GOAL', minute: 61, teamId: 'SEN', player: 'Nicolas Jackson', description: 'GOL! Nicolas Jackson empata escorando cruzamento na área.' },
      { id: 'ev_m17_3', type: 'GOAL', minute: 78, teamId: 'FRA', player: 'Antoine Griezmann', description: 'GOL! Griezmann chuta colocado de fora da área para dar a vitória à França.' }
    ],
    probability: { homeWin: 100, awayWin: 0, draw: 0, criterio: 'Partida Finalizada. Vitória da França por 2-1.' }
  },
  {
    id: 'match_18', homeTeamId: 'ARG', awayTeamId: 'ALG', status: 'FUTURA', placarCasa: 0, placarFora: 0, minute: 0,
    estadio: 'Arrowhead Stadium, Kansas City', data: '2026-06-16', hora: '21:00',
    stats: {
      home: { possession: 50, shots: 0, shotsOnGoal: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0 },
      away: { possession: 50, shots: 0, shotsOnGoal: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0 }
    },
    events: [],
    probability: {
      homeWin: 65, awayWin: 12, draw: 23,
      criterio: 'Cálculo pré-jogo baseado nos rankings FIFA (Argentina #1, Argélia #43) e no histórico de confrontos recentes.'
    }
  }
];
