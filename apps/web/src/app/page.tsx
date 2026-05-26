'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Flex,
  Grid,
  Text,
  Heading,
  Button,
  Badge,
  Spinner,
  Separator,
  Circle
} from '@pwep/ui'
import {
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Award,
  Users,
  ChevronRight,
  Clock,
  Shield,
  Activity,
  UserCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle
} from 'lucide-react'
import {
  TEAMS,
  INITIAL_MATCHES,
  Match,
  Team,
  MatchEvent,
  Player
} from '../utils/mockData'

export default function Home() {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES)
  const [selectedMatchId, setSelectedMatchId] = useState<string>('match_1')
  const [isSimulating, setIsSimulating] = useState<boolean>(true)
  const [simSpeed, setSimSpeed] = useState<number>(3000) // ms per tick

  // Left sidebar selected team for profile lookup
  const [selectedProfileTeamId, setSelectedProfileTeamId] = useState<string>('BRA')

  // Comparison panel selected teams
  const [compTeamAId, setCompTeamAId] = useState<string>('BRA')
  const [compTeamBId, setCompTeamBId] = useState<string>('ARG')

  // Log of simulation highlights/notifications
  const [notifications, setNotifications] = useState<{ id: string; text: string; time: string }[]>([])

  const selectedMatch = matches.find((m) => m.id === selectedMatchId) || matches[0]

  // Recalculate probabilities based on ranking, score, time, cards, etc.
  const calculateProbability = (
    homeTeam: Team,
    awayTeam: Team,
    placarCasa: number,
    placarFora: number,
    minute: number,
    homeRed: number,
    awayRed: number,
    status: string
  ) => {
    if (status === 'FINALIZADA') {
      if (placarCasa > placarFora) return { homeWin: 100, awayWin: 0, draw: 0 }
      if (placarFora > placarCasa) return { homeWin: 0, awayWin: 100, draw: 0 }
      return { homeWin: 0, awayWin: 0, draw: 100 }
    }

    if (status === 'FUTURA') {
      // Pre-match calculation
      const rankDiff = awayTeam.ranking - homeTeam.ranking; // smaller ranking is better
      const baseHome = 38 + rankDiff * 1.5;
      const baseAway = 34 - rankDiff * 1.5;
      const baseDraw = 28;
      
      const total = baseHome + baseAway + baseDraw;
      return {
        homeWin: Math.round((baseHome / total) * 100),
        awayWin: Math.round((baseAway / total) * 100),
        draw: Math.round((baseDraw / total) * 100)
      };
    }

    // Live calculation
    const rankDiff = awayTeam.ranking - homeTeam.ranking;
    const scoreDiff = placarCasa - placarFora;
    const matchProgress = minute / 90; // 0 to 1

    let homeWeight = 35 + rankDiff * 1.0 + scoreDiff * 35;
    let awayWeight = 35 - rankDiff * 1.0 - scoreDiff * 35;
    let drawWeight = 30 - Math.abs(scoreDiff) * 15;

    // Apply red card penalties
    homeWeight -= homeRed * 15;
    awayWeight -= awayRed * 15;

    // Late match adjustments: as time runs out, the current state locks in
    if (scoreDiff > 0) {
      // Home is winning
      homeWeight += matchProgress * 100;
      awayWeight -= matchProgress * 50;
      drawWeight -= matchProgress * 50;
    } else if (scoreDiff < 0) {
      // Away is winning
      awayWeight += matchProgress * 100;
      homeWeight -= matchProgress * 50;
      drawWeight -= matchProgress * 50;
    } else {
      // Draw
      drawWeight += matchProgress * 80;
      homeWeight -= matchProgress * 40;
      awayWeight -= matchProgress * 40;
    }

    // Keep weights positive
    homeWeight = Math.max(2, homeWeight);
    awayWeight = Math.max(2, awayWeight);
    drawWeight = Math.max(2, drawWeight);

    const sum = homeWeight + awayWeight + drawWeight;
    return {
      homeWin: Math.round((homeWeight / sum) * 100),
      awayWin: Math.round((awayWeight / sum) * 100),
      draw: Math.round((drawWeight / sum) * 100)
    };
  };

  // Main simulation loop
  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      setMatches((prevMatches) => {
        return prevMatches.map((match) => {
          if (match.status !== 'EM_ANDAMENTO') return match

          const nextMinute = match.minute + 1
          const isFinished = nextMinute >= 90
          const status = isFinished ? 'FINALIZADA' : 'EM_ANDAMENTO'

          const homeTeam = TEAMS[match.homeTeamId]
          const awayTeam = TEAMS[match.awayTeamId]

          let placarCasa = match.placarCasa
          let placarFora = match.placarFora
          const events = [...match.events]
          const stats = {
            home: { ...match.stats.home },
            away: { ...match.stats.away }
          }

          // Random event chance (approx 8% per tick)
          const rollEvent = Math.random() < 0.08
          if (rollEvent && !isFinished) {
            const isHomeEvent = Math.random() < 0.53 // slight home advantage for events
            const activeTeamId = isHomeEvent ? match.homeTeamId : match.awayTeamId
            const activeTeam = TEAMS[activeTeamId]
            const opponentTeamId = isHomeEvent ? match.awayTeamId : match.homeTeamId

            // Random squad player
            const playerIndex = Math.floor(Math.random() * activeTeam.squad.length)
            const player = activeTeam.squad[playerIndex].name

            const eventTypeRoll = Math.random()
            if (eventTypeRoll < 0.5) {
              // Goal!
              if (isHomeEvent) {
                placarCasa += 1
                stats.home.shotsOnGoal += 1
                stats.home.shots += 1
              } else {
                placarFora += 1
                stats.away.shotsOnGoal += 1
                stats.away.shots += 1
              }
              const newGoalEvent: MatchEvent = {
                id: `ev_${match.id}_${Date.now()}`,
                type: 'GOAL',
                minute: nextMinute,
                teamId: activeTeamId,
                player,
                description: `GOLAÇO! Finalização precisa de ${player}. Placar: ${placarCasa} - ${placarFora}`
              }
              events.push(newGoalEvent)
              addNotification(`⚽ GOL do ${activeTeam.name}! ${player} marcou! (${placarCasa}-${placarFora})`)
            } else if (eventTypeRoll < 0.8) {
              // Yellow Card
              if (isHomeEvent) {
                stats.home.yellowCards += 1
              } else {
                stats.away.yellowCards += 1
              }
              events.push({
                id: `ev_${match.id}_${Date.now()}`,
                type: 'YELLOW_CARD',
                minute: nextMinute,
                teamId: activeTeamId,
                player,
                description: `Cartão amarelo para ${player} por falta dura.`
              })
            } else if (eventTypeRoll < 0.9) {
              // Red Card
              if (isHomeEvent) {
                stats.home.redCards += 1
              } else {
                stats.away.redCards += 1
              }
              events.push({
                id: `ev_${match.id}_${Date.now()}`,
                type: 'RED_CARD',
                minute: nextMinute,
                teamId: activeTeamId,
                player,
                description: `Expulso! Cartão vermelho direto para ${player} após falta gravíssima.`
              })
              addNotification(`🟥 Expulsão no ${activeTeam.name}! ${player} recebeu cartão vermelho!`)
            } else {
              // Substitution
              const outPlayer = activeTeam.squad[Math.floor(Math.random() * activeTeam.squad.length)].name
              events.push({
                id: `ev_${match.id}_${Date.now()}`,
                type: 'SUBSTITUTION',
                minute: nextMinute,
                teamId: activeTeamId,
                player,
                description: `Substituição: entra ${player}, sai ${outPlayer}.`
              })
            }
          }

          // Random stats update (shots, possession fluctuation, corners, fouls)
          const rollStats = Math.random() < 0.25
          if (rollStats && !isFinished) {
            const isHomeUpdate = Math.random() < 0.5
            if (isHomeUpdate) {
              stats.home.shots += Math.floor(Math.random() * 2)
              stats.home.fouls += Math.floor(Math.random() * 2)
              stats.home.corners += Math.floor(Math.random() * 2)
            } else {
              stats.away.shots += Math.floor(Math.random() * 2)
              stats.away.fouls += Math.floor(Math.random() * 2)
              stats.away.corners += Math.floor(Math.random() * 2)
            }
            // Fluctuate possession slightly
            const diff = Math.floor(Math.random() * 3) - 1
            const newHomePoss = Math.min(70, Math.max(30, stats.home.possession + diff))
            stats.home.possession = newHomePoss
            stats.away.possession = 100 - newHomePoss
          }

          // Recalculate probabilities
          const probs = calculateProbability(
            homeTeam,
            awayTeam,
            placarCasa,
            placarFora,
            nextMinute,
            stats.home.redCards,
            stats.away.redCards,
            status
          )

          if (isFinished) {
            addNotification(`🏁 Fim de jogo! ${homeTeam.name} ${placarCasa} - ${placarFora} ${awayTeam.name}`)
          }

          return {
            ...match,
            minute: nextMinute,
            status,
            placarCasa,
            placarFora,
            stats,
            events,
            probability: {
              homeWin: probs.homeWin,
              awayWin: probs.awayWin,
              draw: probs.draw,
              criterio: isFinished 
                ? `Partida Finalizada. Resultado: ${placarCasa} - ${placarFora}.`
                : `Motor de Probabilidades: Ajustado dinamicamente com base no placar atual (${placarCasa}-${placarFora}), minuto (${nextMinute}'), cartões vermelhos e força das seleções.`
            }
          }
        })
      })
    }, simSpeed)

    return () => clearInterval(interval)
  }, [isSimulating, simSpeed])

  const addNotification = (text: string) => {
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    setNotifications((prev) => [{ id: Date.now().toString(), text, time }, ...prev.slice(0, 19)])
  }

  // Reset matches to initial state
  const resetSimulation = () => {
    setMatches(INITIAL_MATCHES)
    setNotifications([])
    addNotification('🔄 Simulação reiniciada para o estado original.')
  }

  // Select team for comparison
  const compTeamA = TEAMS[compTeamAId]
  const compTeamB = TEAMS[compTeamBId]
  const profileTeam = TEAMS[selectedProfileTeamId]

  // Filter match status selector
  const [statusFilter, setStatusFilter] = useState<'TODOS' | 'LIVE' | 'FINALIZADA' | 'FUTURA'>('TODOS')

  const filteredMatches = matches.filter((m) => {
    if (statusFilter === 'TODOS') return true
    if (statusFilter === 'LIVE') return m.status === 'EM_ANDAMENTO'
    return m.status === statusFilter
  })

  // Start a pre-match game live
  const startFutureMatchLive = (matchId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id === matchId && m.status === 'FUTURA') {
        addNotification(`🚀 Partida iniciada em tempo real: ${TEAMS[m.homeTeamId].name} vs ${TEAMS[m.awayTeamId].name}!`)
        return {
          ...m,
          status: 'EM_ANDAMENTO',
          minute: 1,
          stats: {
            home: { possession: 50, shots: 0, shotsOnGoal: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0 },
            away: { possession: 50, shots: 0, shotsOnGoal: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0 }
          }
        }
      }
      return m
    }))
  }

  return (
    <Box minH="100vh" bg="#0b0e17" color="white" fontFamily="Inter, sans-serif" overflowX="hidden" pb={10}>
      {/* NAVBAR */}
      <Box bg="#0e1322" borderBottom="1px solid" borderColor="whiteAlpha.100" px={6} py={4} boxShadow="lg">
        <Flex justify="space-between" align="center" maxW="container.xl" mx="auto" wrap="wrap" gap={4}>
          <Flex align="center" gap={3}>
            <Circle size="10" bgGradient="linear(to-r, #00529b, #03a9f4)" border="2px solid" borderColor="#8c7042" boxShadow="0 0 15px rgba(3,169,244,0.4)">
              <TrendingUp size={20} color="#8c7042" />
            </Circle>
            <Box>
              <Heading size="md" letterSpacing="wide" color="white">
                PWEP
              </Heading>
              <Text fontSize="xs" color="whiteAlpha.600" fontWeight="bold">
                PLATAFORMA DE ESTATÍSTICA E PROBABILIDADE
              </Text>
            </Box>
          </Flex>

          {/* SIMULATOR CONTROLS */}
          <Flex align="center" bg="#151a2e" px={4} py={2} borderRadius="xl" gap={4} border="1px solid" borderColor="whiteAlpha.100">
            <Text fontSize="xs" fontWeight="bold" color="#8c7042" display={{ base: 'none', md: 'block' }}>
              SIMULADOR EM TEMPO REAL:
            </Text>
            <Flex gap={2}>
              <Button
                size="sm"
                bg={isSimulating ? 'amber.700' : 'teal.600'}
                color="white"
                onClick={() => setIsSimulating(!isSimulating)}
                borderRadius="lg"
                _hover={{ opacity: 0.9 }}
                px={3}
              >
                {isSimulating ? <Pause size={14} style={{ marginRight: '6px' }} /> : <Play size={14} style={{ marginRight: '6px' }} />}
                {isSimulating ? 'Pausar' : 'Iniciar'}
              </Button>
              <Button
                size="sm"
                bg="whiteAlpha.100"
                color="white"
                onClick={resetSimulation}
                borderRadius="lg"
                _hover={{ bg: 'whiteAlpha.200' }}
                title="Reiniciar Simulação"
              >
                <RotateCcw size={14} />
              </Button>
            </Flex>

            <Separator orientation="vertical" h="4" borderColor="whiteAlpha.200" />

            <Flex align="center" gap={2}>
              <Text fontSize="xs" color="whiteAlpha.600">Velocidade:</Text>
              <select
                value={simSpeed}
                onChange={(e) => setSimSpeed(Number(e.target.value))}
                style={{
                  background: '#0b0e17',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '12px',
                  padding: '2px 8px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value={5000}>Lento (5s)</option>
                <option value={3000}>Normal (3s)</option>
                <option value={1000}>Rápido (1s)</option>
              </select>
            </Flex>
          </Flex>

          <Flex align="center" gap={4}>
            <Badge bg="teal.950" color="teal.400" border="1px solid" borderColor="teal.800" borderRadius="md" px={3} py={1}>
              <Box w={2} h={2} borderRadius="full" bg="teal.400" display="inline-block" mr={2} className="live-pulse" />
              MVP FUNCIONAL
            </Badge>
          </Flex>
        </Flex>
      </Box>

      {/* DASHBOARD CONTENT */}
      <Grid templateColumns={{ base: '1fr', lg: '320px 1fr 340px' }} gap={6} maxW="container.xl" mx="auto" px={4} mt={6}>
        
        {/* LEFT PANEL: MATCH LIST & FILTER */}
        <Box bg="#0e1322" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" p={4} display="flex" flexDirection="column" gap={4}>
          <Heading size="xs" color="whiteAlpha.600" letterSpacing="widest" textTransform="uppercase">
            Partidas da Copa
          </Heading>

          {/* Filters */}
          <Flex gap={1} overflowX="auto" pb={2}>
            {(['TODOS', 'LIVE', 'FINALIZADA', 'FUTURA'] as const).map((filter) => (
              <Button
                key={filter}
                size="xs"
                variant={statusFilter === filter ? 'solid' : 'ghost'}
                bg={statusFilter === filter ? '#00529b' : 'transparent'}
                color={statusFilter === filter ? 'white' : 'whiteAlpha.700'}
                border="1px solid"
                borderColor={statusFilter === filter ? '#00529b' : 'whiteAlpha.100'}
                onClick={() => setStatusFilter(filter)}
                borderRadius="lg"
                px={3}
                _hover={{ bg: statusFilter === filter ? '#00529b' : 'whiteAlpha.50' }}
              >
                {filter}
              </Button>
            ))}
          </Flex>

          {/* Match Cards List */}
          <Flex direction="column" gap={3} overflowY="auto" maxH="600px" pr={1}>
            {filteredMatches.length === 0 ? (
              <Box py={8} textAlign="center">
                <Text fontSize="sm" color="whiteAlpha.500">Nenhuma partida encontrada.</Text>
              </Box>
            ) : (
              filteredMatches.map((match) => {
                const home = TEAMS[match.homeTeamId]
                const away = TEAMS[match.awayTeamId]
                const isSelected = match.id === selectedMatchId

                return (
                  <Box
                    key={match.id}
                    onClick={() => setSelectedMatchId(match.id)}
                    bg={isSelected ? '#171e36' : '#11172b'}
                    border="1px solid"
                    borderColor={isSelected ? '#03a9f4' : 'whiteAlpha.50'}
                    borderRadius="xl"
                    p={3.5}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{ transform: 'translateY(-2px)', borderColor: 'whiteAlpha.300', bg: isSelected ? '#171e36' : '#141c33' }}
                    boxShadow={isSelected ? '0 0 15px rgba(3,169,244,0.15)' : 'none'}
                  >
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text fontSize="10px" color="whiteAlpha.500" fontWeight="bold" display="flex" alignItems="center" gap={1}>
                        <Clock size={10} />
                        {match.data} — {match.hora}
                      </Text>
                      <Badge
                        bg={
                          match.status === 'EM_ANDAMENTO'
                            ? 'red.950'
                            : match.status === 'FINALIZADA'
                            ? 'whiteAlpha.100'
                            : 'teal.950'
                        }
                        color={
                          match.status === 'EM_ANDAMENTO'
                            ? 'red.400'
                            : match.status === 'FINALIZADA'
                            ? 'whiteAlpha.600'
                            : 'teal.400'
                        }
                        border="1px solid"
                        borderColor={
                          match.status === 'EM_ANDAMENTO'
                            ? 'red.800'
                            : match.status === 'FINALIZADA'
                            ? 'whiteAlpha.200'
                            : 'teal.800'
                        }
                        borderRadius="md"
                        fontSize="9px"
                        px={1.5}
                        py={0.5}
                      >
                        {match.status === 'EM_ANDAMENTO' ? (
                          <Flex align="center" gap={1}>
                            <Box w={1.5} h={1.5} borderRadius="full" bg="red.500" className="live-pulse" />
                            {match.minute}'
                          </Flex>
                        ) : match.status === 'FINALIZADA' ? (
                          'FIM'
                        ) : (
                          'FUTURO'
                        )}
                      </Badge>
                    </Flex>

                    {/* Team Names and flags */}
                    <Grid templateColumns="1fr auto 1fr" gap={2} alignItems="center" my={2}>
                      <Flex align="center" gap={2}>
                        <Text fontSize="lg">{home.flag}</Text>
                        <Text fontSize="xs" fontWeight="bold" truncate>{home.name}</Text>
                      </Flex>
                      <Flex bg="#0b0e17" px={2} py={0.5} borderRadius="md" align="center">
                        <Text fontSize="sm" fontWeight="black" color={match.status === 'FUTURA' ? 'whiteAlpha.400' : 'white'}>
                          {match.status === 'FUTURA' ? '-' : match.placarCasa}
                        </Text>
                        <Text fontSize="xs" color="whiteAlpha.400" mx={1}>:</Text>
                        <Text fontSize="sm" fontWeight="black" color={match.status === 'FUTURA' ? 'whiteAlpha.400' : 'white'}>
                          {match.status === 'FUTURA' ? '-' : match.placarFora}
                        </Text>
                      </Flex>
                      <Flex align="center" gap={2} justify="flex-end">
                        <Text fontSize="xs" fontWeight="bold" truncate>{away.name}</Text>
                        <Text fontSize="lg">{away.flag}</Text>
                      </Flex>
                    </Grid>

                    {/* Prob sparkline preview */}
                    {match.status !== 'FINALIZADA' && (
                      <Flex align="center" gap={2} mt={3} pt={2} borderTop="1px dashed" borderColor="whiteAlpha.100">
                        <Text fontSize="9px" color="whiteAlpha.500" fontWeight="bold">Prob. Vitória:</Text>
                        <Flex w="full" h="1.5" borderRadius="full" overflow="hidden" bg="whiteAlpha.100">
                          <Box w={`${match.probability.homeWin}%`} bg="teal.500" />
                          <Box w={`${match.probability.draw}%`} bg="gray.500" />
                          <Box w={`${match.probability.awayWin}%`} bg="red.500" />
                        </Flex>
                        <Text fontSize="9px" fontWeight="bold" color="teal.400">{match.probability.homeWin}%</Text>
                      </Flex>
                    )}

                    {match.status === 'FUTURA' && (
                      <Button
                        size="xs"
                        bg="#00529b"
                        color="white"
                        mt={2}
                        w="full"
                        onClick={(e) => {
                          e.stopPropagation()
                          startFutureMatchLive(match.id)
                        }}
                        borderRadius="md"
                        fontSize="9px"
                        _hover={{ bg: '#03a9f4' }}
                      >
                        Simular Início Ao Vivo
                      </Button>
                    )}
                  </Box>
                )
              })
            )}
          </Flex>

          {/* Simulation Events Logs in Side Panel */}
          <Box mt="auto" borderTop="1px solid" borderColor="whiteAlpha.100" pt={4}>
            <Heading size="xs" color="#8c7042" mb={2} display="flex" alignItems="center" gap={1.5}>
              <Activity size={12} />
              Acontecimentos Recentes
            </Heading>
            <Box maxH="120px" overflowY="auto" pr={1} fontSize="11px">
              {notifications.length === 0 ? (
                <Text color="whiteAlpha.400" fontSize="10px">Os eventos de simulação ao vivo aparecerão aqui...</Text>
              ) : (
                notifications.map((n) => (
                  <Flex key={n.id} gap={2} mb={1.5} align="start">
                    <Text color="whiteAlpha.400" fontSize="9px" pt={0.5}>{n.time}</Text>
                    <Text color="whiteAlpha.800" lineHeight="tight">{n.text}</Text>
                  </Flex>
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* CENTER PANEL: MATCH DETAIL & LIVE STATS */}
        <Box display="flex" flexDirection="column" gap={6}>
          {/* Main scoreboard */}
          <Box bgGradient="linear(to-b, #0e1322, #0b0e17)" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6} position="relative" overflow="hidden">
            <Box position="absolute" top={0} left={0} w="full" h="2px" bgGradient="linear(to-r, #00529b, #8c7042, #00529b)" />
            
            <Flex justify="center" direction="column" align="center" gap={1} mb={4}>
              <Text fontSize="xs" color="whiteAlpha.600" fontWeight="bold" letterSpacing="wide">
                🏆 COPA DO MUNDO FIFA — FASE DE GRUPOS
              </Text>
              <Text fontSize="11px" color="whiteAlpha.400" bg="#151a2e" px={3} py={0.5} borderRadius="full">
                📍 {selectedMatch.estadio}
              </Text>
            </Flex>

            {/* Scoreboard teams and flags */}
            <Grid templateColumns="1fr 120px 1fr" gap={4} alignItems="center" py={4}>
              <Flex direction="column" align="center" gap={2}>
                <Text fontSize="5xl" filter="drop-shadow(0 0 10px rgba(255,255,255,0.15))">
                  {TEAMS[selectedMatch.homeTeamId].flag}
                </Text>
                <Heading size="md" color="white">{TEAMS[selectedMatch.homeTeamId].name}</Heading>
                <Text fontSize="xs" color="whiteAlpha.500" cursor="pointer" onClick={() => setSelectedProfileTeamId(selectedMatch.homeTeamId)} _hover={{ color: '#03a9f4', textDecoration: 'underline' }}>
                  Ver Elenco &rarr;
                </Text>
              </Flex>

              <Flex direction="column" align="center" justify="center">
                <Flex bg="#06080f" px={5} py={2.5} borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" align="center" gap={3}>
                  <Text fontSize="3xl" fontWeight="black" color={selectedMatch.status === 'FUTURA' ? 'whiteAlpha.400' : 'white'}>
                    {selectedMatch.status === 'FUTURA' ? '-' : selectedMatch.placarCasa}
                  </Text>
                  <Text fontSize="xl" color="whiteAlpha.400">:</Text>
                  <Text fontSize="3xl" fontWeight="black" color={selectedMatch.status === 'FUTURA' ? 'whiteAlpha.400' : 'white'}>
                    {selectedMatch.status === 'FUTURA' ? '-' : selectedMatch.placarFora}
                  </Text>
                </Flex>

                <Box mt={3}>
                  {selectedMatch.status === 'EM_ANDAMENTO' ? (
                    <Badge bg="red.950" color="red.400" border="1px solid" borderColor="red.800" borderRadius="full" px={3} py={1} fontSize="xs">
                      <Spinner size="xs" color="red.500" mr={1.5} />
                      AO VIVO — {selectedMatch.minute}'
                    </Badge>
                  ) : selectedMatch.status === 'FINALIZADA' ? (
                    <Badge bg="whiteAlpha.100" color="whiteAlpha.600" border="1px solid" borderColor="whiteAlpha.200" borderRadius="full" px={3} py={1} fontSize="xs">
                      FINALIZADO
                    </Badge>
                  ) : (
                    <Badge bg="teal.950" color="teal.400" border="1px solid" borderColor="teal.800" borderRadius="full" px={3} py={1} fontSize="xs">
                      AGENDADO
                    </Badge>
                  )}
                </Box>
              </Flex>

              <Flex direction="column" align="center" gap={2}>
                <Text fontSize="5xl" filter="drop-shadow(0 0 10px rgba(255,255,255,0.15))">
                  {TEAMS[selectedMatch.awayTeamId].flag}
                </Text>
                <Heading size="md" color="white">{TEAMS[selectedMatch.awayTeamId].name}</Heading>
                <Text fontSize="xs" color="whiteAlpha.500" cursor="pointer" onClick={() => setSelectedProfileTeamId(selectedMatch.awayTeamId)} _hover={{ color: '#03a9f4', textDecoration: 'underline' }}>
                  Ver Elenco &rarr;
                </Text>
              </Flex>
            </Grid>
          </Box>

          {/* REAL TIME WIN PROBABILITY DISPLAY */}
          <Box bg="#0e1322" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" p={5}>
            <Flex justify="space-between" align="center" mb={2}>
              <Heading size="xs" color="#8c7042" letterSpacing="wider" display="flex" alignItems="center" gap={2}>
                <TrendingUp size={16} />
                PROBABILIDADE DE VITÓRIA (MOTOR DE DADOS)
              </Heading>
              <Badge bg="#151a2e" color="whiteAlpha.700" fontSize="9px">Cálculo em tempo real</Badge>
            </Flex>
            <Text fontSize="xs" color="whiteAlpha.500" mb={4}>
              {selectedMatch.probability.criterio}
            </Text>

            {/* Custom Interactive Multi-part Progress Bar */}
            <Flex w="full" h="6" borderRadius="xl" overflow="hidden" bg="whiteAlpha.50" my={4} border="1px solid" borderColor="whiteAlpha.100" position="relative">
              {/* Home Win Segment */}
              <Box
                w={`${selectedMatch.probability.homeWin}%`}
                bg="teal.600"
                transition="all 0.5s ease"
                display="flex"
                alignItems="center"
                justifyContent="center"
                minW={selectedMatch.probability.homeWin > 0 ? "35px" : "0"}
              >
                <Text fontSize="10px" fontWeight="black" color="white">{selectedMatch.probability.homeWin}%</Text>
              </Box>
              {/* Draw Segment */}
              <Box
                w={`${selectedMatch.probability.draw}%`}
                bg="gray.600"
                transition="all 0.5s ease"
                display="flex"
                alignItems="center"
                justifyContent="center"
                minW={selectedMatch.probability.draw > 0 ? "35px" : "0"}
              >
                <Text fontSize="10px" fontWeight="black" color="white">{selectedMatch.probability.draw}%</Text>
              </Box>
              {/* Away Win Segment */}
              <Box
                w={`${selectedMatch.probability.awayWin}%`}
                bg="red.600"
                transition="all 0.5s ease"
                display="flex"
                alignItems="center"
                justifyContent="center"
                minW={selectedMatch.probability.awayWin > 0 ? "35px" : "0"}
              >
                <Text fontSize="10px" fontWeight="black" color="white">{selectedMatch.probability.awayWin}%</Text>
              </Box>
            </Flex>

            {/* Label keys */}
            <Grid templateColumns="1fr 1fr 1fr" gap={2} textAlign="center" fontSize="xs" fontWeight="bold">
              <Flex align="center" justify="center" gap={1.5} color="teal.400">
                <Circle size="2.5" bg="teal.600" />
                Vitória {TEAMS[selectedMatch.homeTeamId].name}
              </Flex>
              <Flex align="center" justify="center" gap={1.5} color="whiteAlpha.600">
                <Circle size="2.5" bg="gray.600" />
                Empate
              </Flex>
              <Flex align="center" justify="center" gap={1.5} color="red.400">
                <Circle size="2.5" bg="red.600" />
                Vitória {TEAMS[selectedMatch.awayTeamId].name}
              </Flex>
            </Grid>
          </Box>

          {/* DUAL STATS & TIMELINE ROW */}
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
            {/* Match stats comparison */}
            <Box bg="#0e1322" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" p={5}>
              <Heading size="xs" color="whiteAlpha.600" letterSpacing="wider" mb={4} display="flex" alignItems="center" gap={2}>
                <Activity size={14} />
                ESTATÍSTICAS DA PARTIDA
              </Heading>

              <Flex direction="column" gap={4}>
                {/* Possession */}
                <Box>
                  <Flex justify="space-between" fontSize="xs" fontWeight="bold" mb={1.5}>
                    <Text color="teal.400">{selectedMatch.stats.home.possession}%</Text>
                    <Text>Posse de Bola</Text>
                    <Text color="red.400">{selectedMatch.stats.away.possession}%</Text>
                  </Flex>
                  <Flex w="full" h="2" borderRadius="full" overflow="hidden" bg="whiteAlpha.100">
                    <Box w={`${selectedMatch.stats.home.possession}%`} bg="teal.500" transition="all 0.5s ease" />
                    <Box w={`${selectedMatch.stats.away.possession}%`} bg="red.500" transition="all 0.5s ease" />
                  </Flex>
                </Box>

                {/* Shots on Goal */}
                <Box>
                  <Flex justify="space-between" fontSize="xs" fontWeight="bold" mb={1.5}>
                    <Text color="teal.400">{selectedMatch.stats.home.shotsOnGoal} ({selectedMatch.stats.home.shots})</Text>
                    <Text>Chutes no Gol (Total)</Text>
                    <Text color="red.400">{selectedMatch.stats.away.shotsOnGoal} ({selectedMatch.stats.away.shots})</Text>
                  </Flex>
                  <Flex w="full" h="2" borderRadius="full" overflow="hidden" bg="whiteAlpha.100">
                    {/* Math ratio for total shots */}
                    {(() => {
                      const totalShots = selectedMatch.stats.home.shots + selectedMatch.stats.away.shots || 1
                      const homeRatio = (selectedMatch.stats.home.shots / totalShots) * 100
                      const awayRatio = (selectedMatch.stats.away.shots / totalShots) * 100
                      return (
                        <>
                          <Box w={`${homeRatio}%`} bg="teal.500" transition="all 0.5s ease" />
                          <Box w={`${awayRatio}%`} bg="red.500" transition="all 0.5s ease" />
                        </>
                      )
                    })()}
                  </Flex>
                </Box>

                {/* Corners */}
                <Box>
                  <Flex justify="space-between" fontSize="xs" fontWeight="bold" mb={1.5}>
                    <Text color="teal.400">{selectedMatch.stats.home.corners}</Text>
                    <Text>Escanteios</Text>
                    <Text color="red.400">{selectedMatch.stats.away.corners}</Text>
                  </Flex>
                  <Flex w="full" h="2" borderRadius="full" overflow="hidden" bg="whiteAlpha.100">
                    {(() => {
                      const total = selectedMatch.stats.home.corners + selectedMatch.stats.away.corners || 1
                      const homeRatio = (selectedMatch.stats.home.corners / total) * 100
                      const awayRatio = (selectedMatch.stats.away.corners / total) * 100
                      return (
                        <>
                          <Box w={`${homeRatio}%`} bg="teal.500" transition="all 0.5s ease" />
                          <Box w={`${awayRatio}%`} bg="red.500" transition="all 0.5s ease" />
                        </>
                      )
                    })()}
                  </Flex>
                </Box>

                {/* Fouls */}
                <Box>
                  <Flex justify="space-between" fontSize="xs" fontWeight="bold" mb={1.5}>
                    <Text color="teal.400">{selectedMatch.stats.home.fouls}</Text>
                    <Text>Faltas</Text>
                    <Text color="red.400">{selectedMatch.stats.away.fouls}</Text>
                  </Flex>
                  <Flex w="full" h="2" borderRadius="full" overflow="hidden" bg="whiteAlpha.100">
                    {(() => {
                      const total = selectedMatch.stats.home.fouls + selectedMatch.stats.away.fouls || 1
                      const homeRatio = (selectedMatch.stats.home.fouls / total) * 100
                      const awayRatio = (selectedMatch.stats.away.fouls / total) * 100
                      return (
                        <>
                          <Box w={`${homeRatio}%`} bg="teal.500" transition="all 0.5s ease" />
                          <Box w={`${awayRatio}%`} bg="red.500" transition="all 0.5s ease" />
                        </>
                      )
                    })()}
                  </Flex>
                </Box>

                {/* Cards */}
                <Grid templateColumns="1fr 1fr" gap={4} mt={2} borderTop="1px dashed" borderColor="whiteAlpha.100" pt={3}>
                  <Flex direction="column" gap={1.5} align="center">
                    <Text fontSize="10px" color="whiteAlpha.600" fontWeight="bold">CARTÕES BRASIL</Text>
                    <Flex gap={3}>
                      <Flex align="center" gap={1}>
                        <Box w={3} h={4} bg="yellow.400" borderRadius="sm" />
                        <Text fontSize="xs" fontWeight="bold">{selectedMatch.stats.home.yellowCards}</Text>
                      </Flex>
                      <Flex align="center" gap={1}>
                        <Box w={3} h={4} bg="red.500" borderRadius="sm" />
                        <Text fontSize="xs" fontWeight="bold">{selectedMatch.stats.home.redCards}</Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex direction="column" gap={1.5} align="center">
                    <Text fontSize="10px" color="whiteAlpha.600" fontWeight="bold">CARTÕES ADVERSÁRIO</Text>
                    <Flex gap={3}>
                      <Flex align="center" gap={1}>
                        <Box w={3} h={4} bg="yellow.400" borderRadius="sm" />
                        <Text fontSize="xs" fontWeight="bold">{selectedMatch.stats.away.yellowCards}</Text>
                      </Flex>
                      <Flex align="center" gap={1}>
                        <Box w={3} h={4} bg="red.500" borderRadius="sm" />
                        <Text fontSize="xs" fontWeight="bold">{selectedMatch.stats.away.redCards}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Grid>
              </Flex>
            </Box>

            {/* Match Timeline */}
            <Box bg="#0e1322" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" p={5} display="flex" flexDirection="column">
              <Heading size="xs" color="whiteAlpha.600" letterSpacing="wider" mb={4} display="flex" alignItems="center" gap={2}>
                <Clock size={14} />
                LINHA DO TEMPO DA PARTIDA
              </Heading>

              <Flex direction="column" gap={3} overflowY="auto" maxH="280px" className="custom-scrollbar" flex="1">
                {selectedMatch.events.length === 0 ? (
                  <Flex align="center" justify="center" h="full" py={12} direction="column" gap={2}>
                    <Clock size={24} color="whiteAlpha.300" />
                    <Text fontSize="xs" color="whiteAlpha.500">Sem lances importantes registrados ainda.</Text>
                  </Flex>
                ) : (
                  [...selectedMatch.events].reverse().map((ev) => {
                    const team = TEAMS[ev.teamId]
                    return (
                      <Flex key={ev.id} align="start" gap={3} position="relative" pb={2}>
                        <Badge bg="#151a2e" color="whiteAlpha.800" border="1px solid" borderColor="whiteAlpha.100" borderRadius="md" fontSize="9px" px={1.5} py={0.5} mt={0.5} minW="32px" textAlign="center">
                          {ev.minute}'
                        </Badge>
                        <Box>
                          <Flex align="center" gap={1.5} mb={0.5}>
                            <Text fontSize="xs" fontWeight="black" color="white">
                              {ev.type === 'GOAL' ? '⚽ GOL!' : ev.type === 'YELLOW_CARD' ? '🟨 Cartão Amarelo' : ev.type === 'RED_CARD' ? '🟥 Cartão Vermelho' : '🔄 Substituição'}
                            </Text>
                            <Text fontSize="10px" color="whiteAlpha.600">({team.name})</Text>
                          </Flex>
                          <Text fontSize="xs" color="whiteAlpha.700" fontWeight="semibold">
                            {ev.player}
                          </Text>
                          <Text fontSize="10px" color="whiteAlpha.500" mt={0.5}>
                            {ev.description}
                          </Text>
                        </Box>
                      </Flex>
                    )
                  })
                )}
              </Flex>
            </Box>
          </Grid>
        </Box>

        {/* RIGHT PANEL: SELEÇÃO PROFILE & COMPARISON */}
        <Box display="flex" flexDirection="column" gap={6}>
          {/* SELEÇÃO PROFILE (Consultar Seleção - RF03) */}
          <Box bg="#0e1322" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" p={5}>
            <Heading size="xs" color="#8c7042" letterSpacing="wider" mb={4} display="flex" alignItems="center" gap={2}>
              <Award size={16} />
              PERFIL DA SELEÇÃO
            </Heading>

            {/* Select dropdown */}
            <Box mb={4}>
              <Text fontSize="10px" color="whiteAlpha.500" mb={1} fontWeight="bold">SELECIONE UMA EQUIPE:</Text>
              <select
                value={selectedProfileTeamId}
                onChange={(e) => setSelectedProfileTeamId(e.target.value)}
                style={{
                  width: '100%',
                  background: '#151a2e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '13px',
                  padding: '8px 12px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {Object.values(TEAMS).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.flag} {t.name} ({t.sigla})
                  </option>
                ))}
              </select>
            </Box>

            {/* Team details */}
            <Flex direction="column" gap={3.5}>
              <Flex justify="space-between" align="center" bg="#151a2e" p={3} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.50">
                <Box>
                  <Text fontSize="10px" color="whiteAlpha.500">TÉCNICO</Text>
                  <Text fontSize="sm" fontWeight="bold">{profileTeam.coach}</Text>
                </Box>
                <Box textAlign="right">
                  <Text fontSize="10px" color="whiteAlpha.500">RANKING FIFA</Text>
                  <Text fontSize="sm" fontWeight="black" color="amber.400">#{profileTeam.ranking}</Text>
                </Box>
              </Flex>

              <Grid templateColumns="1fr 1fr" gap={3}>
                <Box bg="#11162b" p={2.5} borderRadius="lg" border="1px solid" borderColor="whiteAlpha.50" textAlign="center">
                  <Text fontSize="9px" color="whiteAlpha.500">MÉDIA GOLS PRO</Text>
                  <Text fontSize="md" fontWeight="black" color="teal.400">{profileTeam.avgGoalsScored}</Text>
                </Box>
                <Box bg="#11162b" p={2.5} borderRadius="lg" border="1px solid" borderColor="whiteAlpha.50" textAlign="center">
                  <Text fontSize="9px" color="whiteAlpha.500">MÉDIA GOLS CONTRA</Text>
                  <Text fontSize="md" fontWeight="black" color="red.400">{profileTeam.avgGoalsConceded}</Text>
                </Box>
              </Grid>

              {/* History */}
              <Box>
                <Text fontSize="10px" color="whiteAlpha.500" mb={1.5} fontWeight="bold">HISTÓRICO RECENTE:</Text>
                <Flex gap={2}>
                  {profileTeam.history.map((res, i) => (
                    <Badge
                      key={i}
                      bg={res === 'W' ? 'teal.950' : res === 'D' ? 'whiteAlpha.100' : 'red.950'}
                      color={res === 'W' ? 'teal.400' : res === 'D' ? 'whiteAlpha.600' : 'red.400'}
                      border="1px solid"
                      borderColor={res === 'W' ? 'teal.800' : res === 'D' ? 'whiteAlpha.200' : 'red.800'}
                      borderRadius="md"
                      px={2}
                      py={0.5}
                      fontSize="10px"
                      fontWeight="black"
                    >
                      {res === 'W' ? 'V' : res === 'D' ? 'E' : 'D'}
                    </Badge>
                  ))}
                </Flex>
              </Box>

              {/* Squad List */}
              <Box>
                <Text fontSize="10px" color="whiteAlpha.500" mb={1.5} fontWeight="bold">CONVOCADOS / ELENCO:</Text>
                <Box maxH="160px" overflowY="auto" border="1px solid" borderColor="whiteAlpha.50" borderRadius="xl" bg="#11162b" p={2}>
                  {profileTeam.squad.map((p, idx) => (
                    <Flex key={idx} justify="space-between" py={1.5} px={2} borderBottom="1px solid" borderColor="whiteAlpha.50" _last={{ borderBottom: 'none' }} fontSize="11px">
                      <Flex align="center" gap={2}>
                        <Text color="#8c7042" fontWeight="black" minW="16px">Nº{p.number}</Text>
                        <Text fontWeight="semibold" color="whiteAlpha.900">{p.name}</Text>
                      </Flex>
                      <Text color="whiteAlpha.500" fontSize="10px">{p.position}</Text>
                    </Flex>
                  ))}
                </Box>
              </Box>
            </Flex>
          </Box>

          {/* TEAM COMPARISON PANEL (Comparar Seleções - RF05) */}
          <Box bg="#0e1322" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" p={5}>
            <Heading size="xs" color="#8c7042" letterSpacing="wider" mb={4} display="flex" alignItems="center" gap={2}>
              <Users size={16} />
              PAINEL DE COMPARAÇÃO
            </Heading>

            {/* Dropdowns side by side */}
            <Grid templateColumns="1fr 1fr" gap={3} mb={4}>
              <Box>
                <Text fontSize="9px" color="whiteAlpha.500" mb={1} fontWeight="bold">SELEÇÃO A</Text>
                <select
                  value={compTeamAId}
                  onChange={(e) => setCompTeamAId(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#151a2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '11px',
                    padding: '6px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {Object.values(TEAMS).map((t) => (
                    <option key={t.id} value={t.id} disabled={t.id === compTeamBId}>
                      {t.flag} {t.name}
                    </option>
                  ))}
                </select>
              </Box>

              <Box>
                <Text fontSize="9px" color="whiteAlpha.500" mb={1} fontWeight="bold">SELEÇÃO B</Text>
                <select
                  value={compTeamBId}
                  onChange={(e) => setCompTeamBId(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#151a2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '11px',
                    padding: '6px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {Object.values(TEAMS).map((t) => (
                    <option key={t.id} value={t.id} disabled={t.id === compTeamAId}>
                      {t.flag} {t.name}
                    </option>
                  ))}
                </select>
              </Box>
            </Grid>

            {/* Comparison Metrics */}
            <Flex direction="column" gap={3} fontSize="xs">
              {/* Flag vs Flag Header */}
              <Flex justify="space-around" align="center" py={2} bg="#151a2e" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.50">
                <Flex direction="column" align="center">
                  <Text fontSize="2xl">{compTeamA.flag}</Text>
                  <Text fontWeight="black">{compTeamA.sigla}</Text>
                </Flex>
                <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.400">VS</Text>
                <Flex direction="column" align="center">
                  <Text fontSize="2xl">{compTeamB.flag}</Text>
                  <Text fontWeight="black">{compTeamB.sigla}</Text>
                </Flex>
              </Flex>

              {/* Ranking Comparison */}
              <Box>
                <Flex justify="space-between" mb={1} fontSize="11px">
                  <Text color="teal.400" fontWeight="bold">#{compTeamA.ranking}</Text>
                  <Text color="whiteAlpha.500">Ranking FIFA</Text>
                  <Text color="red.400" fontWeight="bold">#{compTeamB.ranking}</Text>
                </Flex>
                <Flex w="full" h="1.5" borderRadius="full" overflow="hidden" bg="whiteAlpha.100">
                  {/* Lower ranking is better, so compare reciprocals or values */}
                  {(() => {
                    const total = compTeamA.ranking + compTeamB.ranking
                    const homePct = (compTeamB.ranking / total) * 100 // inverse relation
                    const awayPct = (compTeamA.ranking / total) * 100
                    return (
                      <>
                        <Box w={`${homePct}%`} bg="teal.500" />
                        <Box w={`${awayPct}%`} bg="red.500" />
                      </>
                    )
                  })()}
                </Flex>
              </Box>

              {/* Avg goals scored */}
              <Box>
                <Flex justify="space-between" mb={1} fontSize="11px">
                  <Text color="teal.400" fontWeight="bold">{compTeamA.avgGoalsScored}</Text>
                  <Text color="whiteAlpha.500">Média Gols Feitos</Text>
                  <Text color="red.400" fontWeight="bold">{compTeamB.avgGoalsScored}</Text>
                </Flex>
                <Flex w="full" h="1.5" borderRadius="full" overflow="hidden" bg="whiteAlpha.100">
                  {(() => {
                    const total = compTeamA.avgGoalsScored + compTeamB.avgGoalsScored || 1
                    const homePct = (compTeamA.avgGoalsScored / total) * 100
                    const awayPct = (compTeamB.avgGoalsScored / total) * 100
                    return (
                      <>
                        <Box w={`${homePct}%`} bg="teal.500" />
                        <Box w={`${awayPct}%`} bg="red.500" />
                      </>
                    )
                  })()}
                </Flex>
              </Box>

              {/* Avg goals conceded */}
              <Box>
                <Flex justify="space-between" mb={1} fontSize="11px">
                  <Text color="teal.400" fontWeight="bold">{compTeamA.avgGoalsConceded}</Text>
                  <Text color="whiteAlpha.500">Média Gols Sofridos</Text>
                  <Text color="red.400" fontWeight="bold">{compTeamB.avgGoalsConceded}</Text>
                </Flex>
                <Flex w="full" h="1.5" borderRadius="full" overflow="hidden" bg="whiteAlpha.100">
                  {(() => {
                    const total = compTeamA.avgGoalsConceded + compTeamB.avgGoalsConceded || 1
                    const homePct = (compTeamB.avgGoalsConceded / total) * 100 // inverse: lower is better
                    const awayPct = (compTeamA.avgGoalsConceded / total) * 100
                    return (
                      <>
                        <Box w={`${homePct}%`} bg="teal.500" />
                        <Box w={`${awayPct}%`} bg="red.500" />
                      </>
                    )
                  })()}
                </Flex>
              </Box>

              {/* Head to Head Probability simulation */}
              <Box bg="#151a2e" p={3} borderRadius="xl" mt={2} border="1px solid" borderColor="whiteAlpha.50">
                <Text fontSize="9px" color="whiteAlpha.500" mb={1.5} fontWeight="bold" textAlign="center">
                  PROBABILIDADE ESTIMADA DE CONFRONTO DIRETO:
                </Text>
                {(() => {
                  const rankDiff = compTeamB.ranking - compTeamA.ranking
                  const baseHome = 38 + rankDiff * 1.5
                  const baseAway = 34 - rankDiff * 1.5
                  const baseDraw = 28
                  const sum = baseHome + baseAway + baseDraw
                  const aWin = Math.round((baseHome / sum) * 100)
                  const bWin = Math.round((baseAway / sum) * 100)
                  const draw = Math.round((baseDraw / sum) * 100)

                  return (
                    <Flex direction="column" gap={1.5}>
                      <Flex w="full" h="3" borderRadius="lg" overflow="hidden" bg="whiteAlpha.100">
                        <Box w={`${aWin}%`} bg="teal.600" />
                        <Box w={`${draw}%`} bg="gray.600" />
                        <Box w={`${bWin}%`} bg="red.600" />
                      </Flex>
                      <Flex justify="space-between" fontSize="9px" fontWeight="bold">
                        <Text color="teal.400">{compTeamA.name} {aWin}%</Text>
                        <Text color="whiteAlpha.600">Empate {draw}%</Text>
                        <Text color="red.400">{compTeamB.name} {bWin}%</Text>
                      </Flex>
                    </Flex>
                  )
                })()}
              </Box>
            </Flex>
          </Box>
        </Box>

      </Grid>
    </Box>
  )
}
