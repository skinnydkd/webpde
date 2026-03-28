/**
 * PDE Game Engine — Multiplayer infrastructure for board games.
 * Provides Firebase integration, room management, lobby UI, and shared game components.
 * Loaded with type="text/babel" AFTER pde-shared.js and pde-components.js.
 * Requires: Firebase 9 compat, QRCode.js, React 18, Tailwind CSS.
 */

// ─── Firebase Configuration ─────────────────────────────────────
// IMPORTANT: Replace with your Firebase project config
var PDE_FIREBASE_CONFIG = {
    apiKey: "AIzaSyAmpG_bnvYvg6LQjrFqroNEL1sH_BRnSO4",
    authDomain: "pde-d06a4.firebaseapp.com",
    databaseURL: "https://pde-d06a4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pde-d06a4",
    storageBucket: "pde-d06a4.firebasestorage.app",
    messagingSenderId: "435084952847",
    appId: "1:435084952847:web:afa3214d7e4c34e7192a7a"
};

// ─── Firebase Init ──────────────────────────────────────────────
var PdeFirebase = {
    app: null,
    db: null,

    init: function() {
        if (this.app) return;
        try {
            this.app = firebase.initializeApp(PDE_FIREBASE_CONFIG);
            this.db = firebase.database();
        } catch (e) {
            console.error('Firebase init failed:', e);
        }
    },

    ref: function(path) {
        if (!this.db) this.init();
        return this.db ? this.db.ref(path) : null;
    },

    timestamp: function() {
        return firebase.database.ServerValue.TIMESTAMP;
    },

    isConfigured: function() {
        return PDE_FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY";
    }
};

// ─── Room Manager ───────────────────────────────────────────────
var PdeRoomManager = {
    // Generate a random 6-digit room code
    generateCode: function() {
        var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I/O/0/1 to avoid confusion
        var code = '';
        for (var i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },

    // Generate a unique player ID
    generatePlayerId: function() {
        return 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    },

    // Create a new room (returns promise with roomCode)
    createRoom: function(gameType, hostName, settings) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var code = self.generateCode();
            var hostId = self.generatePlayerId();
            var roomRef = PdeFirebase.ref('rooms/' + code);

            roomRef.once('value').then(function(snap) {
                // If code already exists, try again
                if (snap.exists()) {
                    return self.createRoom(gameType, hostName, settings);
                }

                var roomData = {
                    meta: {
                        gameType: gameType,
                        hostId: hostId,
                        hostName: hostName,
                        status: 'lobby',
                        createdAt: PdeFirebase.timestamp(),
                        settings: settings || {}
                    },
                    players: {},
                    gameState: {}
                };

                // Add host as first player
                roomData.players[hostId] = {
                    name: hostName,
                    team: null,
                    score: 0,
                    connected: true,
                    joinedAt: PdeFirebase.timestamp()
                };

                return roomRef.set(roomData).then(function() {
                    // Set disconnect handler for host
                    roomRef.child('players/' + hostId + '/connected').onDisconnect().set(false);

                    // Store in localStorage for reconnection
                    try {
                        localStorage.setItem('pde_room', JSON.stringify({ code: code, playerId: hostId, isHost: true }));
                    } catch (e) {}

                    resolve({ roomCode: code, playerId: hostId });
                });
            }).catch(reject);
        });
    },

    // Join an existing room
    joinRoom: function(roomCode, playerName) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var roomRef = PdeFirebase.ref('rooms/' + roomCode);

            roomRef.child('meta').once('value').then(function(snap) {
                if (!snap.exists()) {
                    reject(new Error('ROOM_NOT_FOUND'));
                    return;
                }

                var meta = snap.val();
                if (meta.status !== 'lobby') {
                    reject(new Error('GAME_ALREADY_STARTED'));
                    return;
                }

                var playerId = self.generatePlayerId();
                var playerRef = roomRef.child('players/' + playerId);

                return playerRef.set({
                    name: playerName,
                    team: null,
                    score: 0,
                    connected: true,
                    joinedAt: PdeFirebase.timestamp()
                }).then(function() {
                    // Set disconnect handler
                    playerRef.child('connected').onDisconnect().set(false);

                    try {
                        localStorage.setItem('pde_room', JSON.stringify({ code: roomCode, playerId: playerId, isHost: false }));
                    } catch (e) {}

                    resolve({ roomCode: roomCode, playerId: playerId });
                });
            }).catch(reject);
        });
    },

    // Listen to player changes
    onPlayersChange: function(roomCode, callback) {
        var ref = PdeFirebase.ref('rooms/' + roomCode + '/players');
        ref.on('value', function(snap) {
            callback(snap.val() || {});
        });
        return function() { ref.off('value'); };
    },

    // Listen to game state changes
    onGameStateChange: function(roomCode, callback) {
        var ref = PdeFirebase.ref('rooms/' + roomCode + '/gameState');
        ref.on('value', function(snap) {
            callback(snap.val() || {});
        });
        return function() { ref.off('value'); };
    },

    // Listen to meta changes
    onMetaChange: function(roomCode, callback) {
        var ref = PdeFirebase.ref('rooms/' + roomCode + '/meta');
        ref.on('value', function(snap) {
            callback(snap.val() || {});
        });
        return function() { ref.off('value'); };
    },

    // Update game state (merge)
    updateGameState: function(roomCode, updates) {
        return PdeFirebase.ref('rooms/' + roomCode + '/gameState').update(updates);
    },

    // Set full game state
    setGameState: function(roomCode, state) {
        return PdeFirebase.ref('rooms/' + roomCode + '/gameState').set(state);
    },

    // Update player data
    updatePlayer: function(roomCode, playerId, updates) {
        return PdeFirebase.ref('rooms/' + roomCode + '/players/' + playerId).update(updates);
    },

    // Update room meta
    updateMeta: function(roomCode, updates) {
        return PdeFirebase.ref('rooms/' + roomCode + '/meta').update(updates);
    },

    // Get room code from URL params
    getRoomFromURL: function() {
        var params = new URLSearchParams(window.location.search);
        return params.get('room');
    },

    // Get saved room info from localStorage
    getSavedRoom: function() {
        try {
            return JSON.parse(localStorage.getItem('pde_room'));
        } catch (e) {
            return null;
        }
    },

    // Clear saved room
    clearSavedRoom: function() {
        try { localStorage.removeItem('pde_room'); } catch (e) {}
    },

    // Cleanup: delete room
    deleteRoom: function(roomCode) {
        return PdeFirebase.ref('rooms/' + roomCode).remove();
    }
};


// ─── Sound Effects (reuse pattern from playground) ──────────────
var PdeGameSounds = {
    play: function(type) {
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var sounds = {
                pop: [523, 659, 784],
                win: [523, 659, 784, 1047],
                lose: [392, 330, 262],
                click: [800],
                coin: [1200, 1400],
                tick: [600],
                buzz: [200, 150],
                ding: [880, 1100]
            };
            var freqs = sounds[type] || [440];
            freqs.forEach(function(freq, i) {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.2);
                osc.start(ctx.currentTime + i * 0.08);
                osc.stop(ctx.currentTime + i * 0.08 + 0.2);
            });
        } catch (e) {}
    }
};


// ─── React Components ───────────────────────────────────────────
const { useState: useStateGE, useEffect: useEffectGE, useRef: useRefGE, useCallback: useCallbackGE } = React;

// ── Firebase Error Screen ───────────────────────────────────────
function PdeFirebaseError() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-100 to-orange-100">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-4">
                <div className="text-6xl">🔥</div>
                <h2 className="text-2xl font-black text-red-600">Firebase no configurat</h2>
                <p className="text-gray-600">
                    Cal configurar Firebase per jugar online. Edita <code className="bg-gray-100 px-2 py-1 rounded">pde-game-engine.js</code> i
                    substitueix <code className="bg-gray-100 px-2 py-1 rounded">PDE_FIREBASE_CONFIG</code> amb les teues claus.
                </p>
                <a href="./" className="inline-block px-6 py-3 bg-gray-200 rounded-xl font-bold hover:bg-gray-300">🏠 Tornar</a>
            </div>
        </div>
    );
}

// ── Game Timer (circular countdown) ─────────────────────────────
function PdeGameTimer({ seconds, onComplete, size = 80, color = '#ec4899', running = true }) {
    const [timeLeft, setTimeLeft] = useStateGE(seconds);
    const intervalRef = useRefGE(null);

    useEffectGE(function() {
        setTimeLeft(seconds);
    }, [seconds]);

    useEffectGE(function() {
        if (!running || timeLeft <= 0) return;

        intervalRef.current = setInterval(function() {
            setTimeLeft(function(prev) {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    if (onComplete) onComplete();
                    return 0;
                }
                if (prev <= 6) PdeGameSounds.play('tick');
                return prev - 1;
            });
        }, 1000);

        return function() { clearInterval(intervalRef.current); };
    }, [running, timeLeft <= 0]);

    var progress = seconds > 0 ? timeLeft / seconds : 0;
    var radius = (size - 8) / 2;
    var circumference = 2 * Math.PI * radius;
    var strokeDashoffset = circumference * (1 - progress);
    var urgentColor = timeLeft <= 5 ? '#ef4444' : color;

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={urgentColor}
                    strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }} />
            </svg>
            <span className={`absolute font-black ${size > 60 ? 'text-xl' : 'text-sm'}`}
                  style={{ color: urgentColor }}>{timeLeft}</span>
        </div>
    );
}

// ── Game Leaderboard ────────────────────────────────────────────
function PdeGameLeaderboard({ players, sortBy = 'score', maxVisible = 10, title = '🏆 Classificació' }) {
    var sorted = Object.entries(players)
        .map(function(entry) { return { id: entry[0], ...entry[1] }; })
        .filter(function(p) { return p.connected !== false; })
        .sort(function(a, b) { return (b[sortBy] || 0) - (a[sortBy] || 0); })
        .slice(0, maxVisible);

    var medals = ['🥇', '🥈', '🥉'];

    return (
        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-black text-center mb-3">{title}</h3>
            <div className="space-y-2">
                {sorted.map(function(p, i) {
                    return (
                        <div key={p.id}
                             className={'flex items-center gap-3 px-3 py-2 rounded-xl transition-all ' +
                                 (i === 0 ? 'bg-yellow-100 scale-105' : i < 3 ? 'bg-gray-50' : '')}>
                            <span className="text-xl w-8 text-center">{medals[i] || (i + 1)}</span>
                            <span className="font-bold flex-1 truncate">{p.name}</span>
                            <span className="font-black text-lg text-yellow-600">
                                {typeof p[sortBy] === 'number' ? p[sortBy].toLocaleString() : p[sortBy] || 0}
                            </span>
                        </div>
                    );
                })}
                {sorted.length === 0 && <p className="text-center text-gray-400">Cap jugador encara</p>}
            </div>
        </div>
    );
}

// ── QR Code Display ─────────────────────────────────────────────
function PdeQRCode({ url, size = 200 }) {
    const canvasRef = useRefGE(null);

    useEffectGE(function() {
        if (canvasRef.current && typeof QRCode !== 'undefined') {
            QRCode.toCanvas(canvasRef.current, url, {
                width: size,
                margin: 2,
                color: { dark: '#1f2937', light: '#ffffff' }
            });
        }
    }, [url, size]);

    return <canvas ref={canvasRef} className="rounded-xl shadow-md mx-auto" />;
}

// ── Game Lobby (host + player modes) ────────────────────────────
function PdeGameLobby({ gameType, gameName, gameEmoji, gameGradient, minPlayers = 2, maxPlayers = 30, onGameStart, teamMode = false, teamsCount = 4 }) {
    // Determine initial mode from URL
    var urlRoom = PdeRoomManager.getRoomFromURL();
    const [mode, setMode] = useStateGE(urlRoom ? 'join' : 'choose'); // 'choose', 'host', 'join'
    const [roomCode, setRoomCode] = useStateGE(urlRoom || '');
    const [playerId, setPlayerId] = useStateGE(null);
    const [isHost, setIsHost] = useStateGE(false);
    const [playerName, setPlayerName] = useStateGE('');
    const [players, setPlayers] = useStateGE({});
    const [error, setError] = useStateGE('');
    const [joined, setJoined] = useStateGE(false);
    const [inputCode, setInputCode] = useStateGE(urlRoom || '');

    // Listen to player changes when in a room
    useEffectGE(function() {
        if (!roomCode || !joined) return;
        var unsub = PdeRoomManager.onPlayersChange(roomCode, function(p) {
            setPlayers(p);
        });
        return unsub;
    }, [roomCode, joined]);

    var playerCount = Object.keys(players).filter(function(id) {
        return players[id].connected !== false;
    }).length;

    var gameUrl = window.location.origin + window.location.pathname + '?room=' + roomCode;

    // Host: create room
    var handleCreate = function() {
        if (!playerName.trim()) return;
        setError('');
        PdeRoomManager.createRoom(gameType, playerName.trim(), {}).then(function(result) {
            setRoomCode(result.roomCode);
            setPlayerId(result.playerId);
            setIsHost(true);
            setJoined(true);
            PdeGameSounds.play('coin');
        }).catch(function(e) {
            setError('Error creant la sala: ' + e.message);
        });
    };

    // Player: join room
    var handleJoin = function() {
        if (!playerName.trim() || !inputCode.trim()) return;
        setError('');
        var code = inputCode.trim().toUpperCase();
        PdeRoomManager.joinRoom(code, playerName.trim()).then(function(result) {
            setRoomCode(result.roomCode);
            setPlayerId(result.playerId);
            setIsHost(false);
            setJoined(true);
            PdeGameSounds.play('pop');
        }).catch(function(e) {
            if (e.message === 'ROOM_NOT_FOUND') setError('Sala no trobada. Revisa el codi.');
            else if (e.message === 'GAME_ALREADY_STARTED') setError('El joc ja ha començat!');
            else setError('Error: ' + e.message);
        });
    };

    // Host: start game
    var handleStart = function() {
        if (playerCount < minPlayers) return;

        // Auto-assign teams if needed
        if (teamMode) {
            var connectedIds = Object.keys(players).filter(function(id) { return players[id].connected !== false; });
            var shuffled = connectedIds.sort(function() { return Math.random() - 0.5; });
            var updates = {};
            shuffled.forEach(function(id, i) {
                updates['players/' + id + '/team'] = (i % teamsCount);
            });
            PdeFirebase.ref('rooms/' + roomCode).update(updates).then(function() {
                PdeRoomManager.updateMeta(roomCode, { status: 'playing' });
                PdeGameSounds.play('win');
                onGameStart({ roomCode: roomCode, playerId: playerId, isHost: true, players: players });
            });
        } else {
            PdeRoomManager.updateMeta(roomCode, { status: 'playing' });
            PdeGameSounds.play('win');
            onGameStart({ roomCode: roomCode, playerId: playerId, isHost: true, players: players });
        }
    };

    // ── Choose screen (host or join) ──
    if (mode === 'choose') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="max-w-md w-full space-y-6 text-center">
                    <div className={'text-8xl ' + (gameEmoji ? '' : '')}>{gameEmoji || '🎮'}</div>
                    <h1 className="text-4xl font-black text-white">{gameName}</h1>
                    <div className="space-y-3">
                        <button onClick={function() { setMode('host'); }}
                            className={'w-full py-5 rounded-2xl text-white font-black text-xl shadow-lg bg-gradient-to-r ' + (gameGradient || 'from-blue-500 to-purple-600')}>
                            📺 Crear Partida (Professor)
                        </button>
                        <button onClick={function() { setMode('join'); }}
                            className="w-full py-5 rounded-2xl bg-white text-gray-800 font-black text-xl shadow-lg hover:bg-gray-100">
                            📱 Unir-se amb Codi
                        </button>
                    </div>
                    <a href="./" className="inline-block text-gray-400 hover:text-white transition-colors">🏠 Tornar</a>
                </div>
            </div>
        );
    }

    // ── Host: name input + create room ──
    if (mode === 'host' && !joined) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-5">
                    <div className="text-center">
                        <div className="text-5xl mb-2">{gameEmoji || '📺'}</div>
                        <h2 className="text-2xl font-black">Crear Partida</h2>
                    </div>
                    <input type="text" placeholder="El teu nom (Professor)" value={playerName}
                        onChange={function(e) { setPlayerName(e.target.value); }}
                        onKeyDown={function(e) { if (e.key === 'Enter') handleCreate(); }}
                        className="w-full px-5 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-center font-bold" />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button onClick={handleCreate} disabled={!playerName.trim()}
                        className={'w-full py-4 rounded-2xl text-white font-black text-xl shadow-lg bg-gradient-to-r ' +
                            (gameGradient || 'from-blue-500 to-purple-600') +
                            (!playerName.trim() ? ' opacity-50 cursor-not-allowed' : '')}>
                        🚀 Crear Sala
                    </button>
                    <button onClick={function() { setMode('choose'); }} className="w-full text-gray-400 hover:text-gray-600">← Tornar</button>
                </div>
            </div>
        );
    }

    // ── Host: lobby (waiting for players) ──
    if (mode === 'host' && joined && isHost) {
        var teamColors = ['bg-blue-100 text-blue-700', 'bg-red-100 text-red-700', 'bg-green-100 text-green-700', 'bg-yellow-100 text-yellow-700', 'bg-purple-100 text-purple-700', 'bg-pink-100 text-pink-700'];
        var teamEmojis = ['🔵', '🔴', '🟢', '🟡', '🟣', '🩷'];

        return (
            <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-black">{gameEmoji} {gameName}</h1>
                        <p className="text-xl text-gray-400 mt-2">Esperant jugadors...</p>
                    </div>

                    {/* Room code + QR */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-3xl p-6 text-center shadow-2xl">
                            <p className="text-gray-500 font-bold mb-2">CODI DE LA SALA</p>
                            <p className="text-5xl md:text-7xl font-black tracking-widest text-gray-800 font-mono">{roomCode}</p>
                            <p className="text-sm text-gray-400 mt-3">o escaneja el QR →</p>
                        </div>
                        <div className="bg-white rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center justify-center">
                            <PdeQRCode url={gameUrl} size={180} />
                            <p className="text-xs text-gray-400 mt-2 break-all">{gameUrl}</p>
                        </div>
                    </div>

                    {/* Players list */}
                    <div className="bg-white/10 backdrop-blur rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-black text-white">👥 Jugadors ({playerCount})</h3>
                            {playerCount >= minPlayers && (
                                <span className="text-green-400 font-bold animate-pulse">✅ Preparats!</span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {Object.entries(players).map(function(entry) {
                                var id = entry[0], p = entry[1];
                                if (p.connected === false) return null;
                                return (
                                    <div key={id} className="bg-white/20 rounded-xl px-3 py-2 text-white text-center">
                                        <p className="font-bold truncate">{p.name}</p>
                                        {id === playerId && <span className="text-xs text-yellow-300">👑 Host</span>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Start button */}
                    <button onClick={handleStart} disabled={playerCount < minPlayers}
                        className={'w-full py-5 rounded-2xl text-white font-black text-2xl shadow-lg bg-gradient-to-r ' +
                            (gameGradient || 'from-green-500 to-emerald-600') +
                            (playerCount < minPlayers ? ' opacity-50 cursor-not-allowed' : ' hover:brightness-110')}>
                        {playerCount < minPlayers
                            ? '⏳ Mínim ' + minPlayers + ' jugadors'
                            : '🚀 Començar Partida!'}
                    </button>
                </div>
            </div>
        );
    }

    // ── Player: enter code + name ──
    if (mode === 'join' && !joined) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl space-y-5">
                    <div className="text-center">
                        <div className="text-5xl mb-2">📱</div>
                        <h2 className="text-2xl font-black">Unir-se</h2>
                    </div>
                    <input type="text" placeholder="Codi de la sala" value={inputCode} maxLength={6}
                        onChange={function(e) { setInputCode(e.target.value.toUpperCase()); }}
                        className="w-full px-5 py-4 text-2xl rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-center font-black tracking-widest font-mono uppercase" />
                    <input type="text" placeholder="El teu nom" value={playerName}
                        onChange={function(e) { setPlayerName(e.target.value); }}
                        onKeyDown={function(e) { if (e.key === 'Enter') handleJoin(); }}
                        className="w-full px-5 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-center font-bold" />
                    {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}
                    <button onClick={handleJoin} disabled={!playerName.trim() || inputCode.length < 4}
                        className={'w-full py-4 rounded-2xl text-white font-black text-xl shadow-lg bg-gradient-to-r ' +
                            (gameGradient || 'from-blue-500 to-purple-600') +
                            (!playerName.trim() || inputCode.length < 4 ? ' opacity-50 cursor-not-allowed' : '')}>
                        🎮 Entrar!
                    </button>
                    {!urlRoom && (
                        <button onClick={function() { setMode('choose'); }} className="w-full text-gray-400 hover:text-gray-600">← Tornar</button>
                    )}
                </div>
            </div>
        );
    }

    // ── Player: waiting in lobby ──
    if (mode === 'join' && joined && !isHost) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
                    <div className="text-6xl animate-bounce">{gameEmoji || '🎮'}</div>
                    <h2 className="text-2xl font-black">{gameName}</h2>
                    <div className="bg-green-100 rounded-xl p-4">
                        <p className="text-green-700 font-bold">✅ Connectat!</p>
                        <p className="text-green-600 text-sm mt-1">Esperant que el professor inicie la partida...</p>
                    </div>
                    <div className="bg-gray-100 rounded-xl p-3">
                        <p className="text-gray-500 text-sm">Sala: <span className="font-black">{roomCode}</span></p>
                        <p className="text-gray-500 text-sm">Jugadors: <span className="font-black">{playerCount}</span></p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

// ── Confetti (reused from playground) ───────────────────────────
function PdeConfetti({ show }) {
    if (!show) return null;
    var emojis = ['⭐', '🌟', '✨', '🎉', '💫', '🏆'];
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(40)].map(function(_, i) {
                return (
                    <div key={i} className="absolute text-2xl" style={{
                        left: Math.random() * 100 + '%',
                        top: '-50px',
                        animation: 'fall ' + (2 + Math.random() * 2) + 's linear ' + (Math.random() * 0.5) + 's forwards'
                    }}>
                        {emojis[Math.floor(Math.random() * emojis.length)]}
                    </div>
                );
            })}
        </div>
    );
}

// ── Dice Roll Animation ─────────────────────────────────────────
function PdeDiceRoll({ value, rolling, onRollComplete, size = 80 }) {
    const [displayValue, setDisplayValue] = useStateGE(value || 1);
    const [isRolling, setIsRolling] = useStateGE(false);

    useEffectGE(function() {
        if (!rolling) return;
        setIsRolling(true);
        var count = 0;
        var interval = setInterval(function() {
            setDisplayValue(Math.floor(Math.random() * 6) + 1);
            count++;
            if (count >= 15) {
                clearInterval(interval);
                setDisplayValue(value);
                setIsRolling(false);
                PdeGameSounds.play('pop');
                if (onRollComplete) onRollComplete(value);
            }
        }, 80);
        return function() { clearInterval(interval); };
    }, [rolling, value]);

    var faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    return (
        <div className={'inline-flex items-center justify-center rounded-2xl bg-white shadow-lg ' +
                (isRolling ? 'animate-bounce' : '')}
             style={{ width: size, height: size }}>
            <span className="font-black" style={{ fontSize: size * 0.6 }}>
                {faces[displayValue] || displayValue}
            </span>
        </div>
    );
}

// ── Host/Player View Wrappers ───────────────────────────────────
function PdeHostView({ children, title, emoji, gradient }) {
    return (
        <div className={'min-h-screen p-4 md:p-8 bg-gradient-to-br ' + (gradient || 'from-gray-900 to-gray-800')}>
            <div className="max-w-6xl mx-auto space-y-6">
                {title && (
                    <div className="text-center text-white">
                        <h1 className="text-3xl md:text-5xl font-black">{emoji} {title}</h1>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

function PdePlayerView({ children, gradient }) {
    return (
        <div className={'min-h-screen p-4 flex flex-col items-center justify-center bg-gradient-to-br ' + (gradient || 'from-gray-900 to-gray-800')}>
            <div className="max-w-sm w-full space-y-4">
                {children}
            </div>
        </div>
    );
}
