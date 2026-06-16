const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, '../apps/web/src/utils/mockData.ts');
let content = fs.readFileSync(mockDataPath, 'utf8');

// Strip TypeScript interfaces/types so we can parse it as JS
content = content.replace(/export interface [\s\S]*?\n}/g, '');
content = content.replace(/: Record<string, Team>/g, '');
content = content.replace(/: Match\[]/g, '');
content = content.replace(/export const/g, 'const');

// Evaluate the mockData to get TEAMS and INITIAL_MATCHES
let TEAMS, INITIAL_MATCHES;
try {
  const sandbox = {};
  const runCode = content + '\nmodule.exports = { TEAMS, INITIAL_MATCHES };';
  const evalResult = eval(content + '\n({ TEAMS, INITIAL_MATCHES })');
  TEAMS = evalResult.TEAMS;
  INITIAL_MATCHES = evalResult.INITIAL_MATCHES;
} catch (e) {
  console.error("Evaluation error:", e);
  process.exit(1);
}

let sql = '-- Seed de Detalhes da Copa do Mundo 2026\n\n';

// 1. Players
sql += '-- 1. Povoamento da Tabela: PLAYERS\n';
sql += 'INSERT INTO public.players (name, position, numero_camisa, id_selecao) VALUES\n';
const playerRows = [];
for (const teamId in TEAMS) {
  const team = TEAMS[teamId];
  for (const player of team.squad) {
    const safeName = player.name.replace(/'/g, "''");
    const safePosition = player.position.replace(/'/g, "''");
    playerRows.push(`('${safeName}', '${safePosition}', ${player.number}, (SELECT id_selecao FROM public.selecoes WHERE sigla = '${teamId}'))`);
  }
}
sql += playerRows.join(',\n') + ';\n\n';

// 2. Probabilidades
sql += '-- 2. Povoamento da Tabela: PROBABILIDADES DA PARTIDA\n';
sql += 'INSERT INTO public.probabilidades_partida (id_partida, id_selecao, prob_vitoria_casa, prob_vitoria_fora, prob_empate, criterio_calculo) VALUES\n';
const probRows = [];
INITIAL_MATCHES.forEach((match, index) => {
  const dbPartidaId = index + 1; // Since we inserted them in order, the serial primary key corresponds to index + 1
  const safeCriterio = match.probability.criterio.replace(/'/g, "''");
  probRows.push(`(${dbPartidaId}, (SELECT id_selecao FROM public.selecoes WHERE sigla = '${match.homeTeamId}'), ${match.probability.homeWin}, ${match.probability.awayWin}, ${match.probability.draw}, '${safeCriterio}')`);
});
sql += probRows.join(',\n') + ';\n\n';

// 3. Estatísticas da Partida
sql += '-- 3. Povoamento da Tabela: ESTATÍSTICAS DA PARTIDA\n';
sql += 'INSERT INTO public.estatisticas_partida (id_partida, id_selecao, posse_bola, chutes, chutes_no_gol, faltas, escanteios, cart_amarelo, cart_vermelho) VALUES\n';
const statsRows = [];
INITIAL_MATCHES.forEach((match, index) => {
  const dbPartidaId = index + 1;
  // Stats for Home Team
  statsRows.push(`(${dbPartidaId}, (SELECT id_selecao FROM public.selecoes WHERE sigla = '${match.homeTeamId}'), ${match.stats.home.possession}, ${match.stats.home.shots}, ${match.stats.home.shotsOnGoal}, ${match.stats.home.fouls}, ${match.stats.home.corners}, ${match.stats.home.yellowCards}, ${match.stats.home.redCards})`);
  // Stats for Away Team
  statsRows.push(`(${dbPartidaId}, (SELECT id_selecao FROM public.selecoes WHERE sigla = '${match.awayTeamId}'), ${match.stats.away.possession}, ${match.stats.away.shots}, ${match.stats.away.shotsOnGoal}, ${match.stats.away.fouls}, ${match.stats.away.corners}, ${match.stats.away.yellowCards}, ${match.stats.away.redCards})`);
});
sql += statsRows.join(',\n') + ';\n\n';

// 4. Eventos da Partida
sql += '-- 4. Povoamento da Tabela: EVENTOS DA PARTIDA\n';
const eventRows = [];
INITIAL_MATCHES.forEach((match, index) => {
  const dbPartidaId = index + 1;
  match.events.forEach(event => {
    const safeDesc = event.description.replace(/'/g, "''");
    const safePlayer = event.player.replace(/'/g, "''");
    eventRows.push(`(${dbPartidaId}, (SELECT id_selecao FROM public.selecoes WHERE sigla = '${event.teamId}'), '${event.type}', ${event.minute}, '${safeDesc}', '${safePlayer}')`);
  });
});

if (eventRows.length > 0) {
  sql += 'INSERT INTO public.eventos_partida (id_partida, id_selecao, event_type, minute, description, player) VALUES\n';
  sql += eventRows.join(',\n') + ';\n';
}

fs.writeFileSync(path.join(__dirname, '../seed_details_copa_2026.sql'), sql, 'utf8');
console.log("SQL generated and saved to seed_details_copa_2026.sql");
