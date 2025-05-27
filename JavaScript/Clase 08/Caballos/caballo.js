document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const $ = id => document.getElementById(id);
    const startBtn = $("startButton"), startAnimBtn = $("startAnimatedButton");
    const pauseBtn = $("pauseButton"), resumeBtn = $("resumeButton"), stopBtn = $("stopButton");
    const boardSizeInput = $("boardSize"), speedInput = $("animationSpeed"), speedValue = $("speedValue");
    const statusDiv = $("status"), boardDiv = $("boardOutput");

    // --- Estado global ---
    let N = 0, delay = +speedInput.value, isPaused = false, running = false, stop = false;
    let knightPos = { x: -1, y: -1 };
    const KNIGHT = "\u265E", moveX = [2,1,-1,-2,-2,-1,1,2], moveY = [1,2,2,1,-1,-2,-2,-1];

    // --- Utilidades ---
    speedInput.addEventListener('input', e => {
        delay = +e.target.value;
        speedValue.textContent = `${delay} ms`;
    });

    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const wait = async ms => { // Delay controlado con pausa y stop
        let t = 0; while (t < ms) {
            if (stop) throw 'STOP';
            if (isPaused) await new Promise(res => {
                const i = setInterval(() => {
                    if (!isPaused || stop) { clearInterval(i); res(); }
                }, 100);
            });
            await sleep(10); t += 10;
        }
    };
    const isSafe = (x, y, b) => x >= 0 && x < N && y >= 0 && y < N && b[x][y] === -1;

    // --- Tablero HTML ---
    function drawBoard(N) {
        let html = '<table>';
        for (let i = 0; i < N; i++) {
            html += '<tr>';
            for (let j = 0; j < N; j++) html += `<td id="cell-${i}-${j}"></td>`;
            html += '</tr>';
        }
        html += '</table>';
        boardDiv.innerHTML = html;
    }
    function setCell(x, y, val, current = false, back = false) {
        const c = $("cell-"+x+"-"+y);
        if (!c) return;
        c.className = '';
        if (current) { c.textContent = KNIGHT; c.classList.add('current-knight'); knightPos = {x,y}; }
        else if (val !== -1) { c.textContent = val; c.classList.add('visited-knight'); }
        else c.textContent = '';
        if (back) { c.classList.add('backtracking'); setTimeout(() => c.classList.remove('backtracking'), delay/2); }
    }
    function clearCell(x, y, val) {
        const c = $("cell-"+x+"-"+y);
        if (!c) return;
        c.className = '';
        if (val !== -1) { c.textContent = val; c.classList.add('visited-knight'); }
        else c.textContent = '';
        if (knightPos.x === x && knightPos.y === y) knightPos = {x:-1,y:-1};
    }

    // --- Algoritmo animado ---
    async function solveAnim(x, y, move, board) {
        if (stop) throw 'STOP';
        board[x][y] = move; setCell(x, y, move, true);
        await wait(delay);
        if (move === N*N) { setCell(x, y, move, false); return true; }
        for (let k = 0; k < 8; k++) {
            let nx = x+moveX[k], ny = y+moveY[k];
            if (isSafe(nx, ny, board)) {
                clearCell(x, y, board[x][y]);
                if (await solveAnim(nx, ny, move+1, board)) return true;
                await wait(delay/2);
                setCell(nx, ny, -1, false, true); board[nx][ny] = -1;
                setCell(x, y, board[x][y], true); await wait(delay/2);
            }
        }
        return false;
    }
    // --- Algoritmo rápido ---
    function solveFast(x, y, move, board) {
        if (move === N*N) return true;
        for (let k = 0; k < 8; k++) {
            let nx = x+moveX[k], ny = y+moveY[k];
            if (isSafe(nx, ny, board)) {
                board[nx][ny] = move+1;
                if (solveFast(nx, ny, move+1, board)) return true;
                board[nx][ny] = -1;
            }
        }
        return false;
    }
    // --- Mostrar tablero numérico ---
    function showBoard(board) {
        let html = '<table>';
        for (let r of board) {
            html += '<tr>' + r.map(v => `<td>${v===-1?'':v}</td>`).join('') + '</tr>';
        }
        html += '</table>';
        boardDiv.innerHTML = html;
    }
    // --- UI y control ---
    function resetUI() {
        isPaused = running = stop = false; knightPos = {x:-1,y:-1};
        startBtn.disabled = startAnimBtn.disabled = false;
        boardSizeInput.disabled = speedInput.disabled = false;
        pauseBtn.disabled = resumeBtn.disabled = stopBtn.disabled = true;
        statusDiv.innerHTML = 'Listo para iniciar.';
    }
    function setAnimUI() {
        running = true; stop = isPaused = false;
        startBtn.disabled = startAnimBtn.disabled = boardSizeInput.disabled = speedInput.disabled = true;
        pauseBtn.disabled = false; resumeBtn.disabled = true; stopBtn.disabled = false;
    }

    // --- Simulación principal ---
    async function runSim(animated) {
        if (running) return alert('Simulación en curso.');
        N = +boardSizeInput.value;
        if (!N || N < 1) return alert('Tamaño inválido.');
        if (N > 6 && animated && !confirm('Animación lenta para N>6. ¿Continuar?')) return;
        if (N > 8 && !animated && !confirm('Puede ser lento/memoria. ¿Continuar?')) return;
        if (N < 5) alert('No hay solución completa para N<5.');
        drawBoard(N);
        let board = Array.from({length:N},()=>Array(N).fill(-1));
        let t0 = performance.now(), found = false;
        if (animated) {
            setAnimUI(); statusDiv.innerHTML = `Visualizando N=${N}...`;
            try { found = await solveAnim(0,0,1,board); }
            catch(e) { if (e==='STOP') statusDiv.innerHTML = 'Simulación detenida.'; else statusDiv.innerHTML = 'Error.'; }
        } else {
            startBtn.disabled = startAnimBtn.disabled = true;
            statusDiv.innerHTML = `Calculando N=${N}...`;
            board[0][0]=1; found = solveFast(0,0,1,board);
            showBoard(board);
        }
        let t1 = performance.now();
        if (!stop) {
            if (found) {
                statusDiv.innerHTML = `¡Solución encontrada en ${(t1-t0)/1000}s!`;
                if (animated) for(let r=0;r<N;r++) for(let c=0;c<N;c++) if(board[r][c]!==-1) setCell(r,c,board[r][c],false);
            } else statusDiv.innerHTML = `No se encontró solución (${(t1-t0)/1000}s).`;
        }
        if (animated && !stop) resetUI();
        else if (!animated) startBtn.disabled = startAnimBtn.disabled = false;
    }

    // --- Eventos de botones ---
    startBtn.onclick = () => runSim(false);
    startAnimBtn.onclick = () => runSim(true);
    pauseBtn.onclick = () => { if (running && !isPaused) { isPaused = true; pauseBtn.disabled = true; resumeBtn.disabled = false; statusDiv.innerHTML += ' (Pausado)'; } };
    resumeBtn.onclick = () => { if (running && isPaused) { isPaused = false; pauseBtn.disabled = false; resumeBtn.disabled = true; statusDiv.innerHTML = statusDiv.innerHTML.replace(' (Pausado)',''); } };
    stopBtn.onclick = () => { if (running) { stop = true; isPaused = false; statusDiv.innerHTML = 'Deteniendo...'; setTimeout(() => { resetUI(); drawBoard(N||+boardSizeInput.value); statusDiv.innerHTML = 'Simulación detenida.'; }, 100); } };

    resetUI();
});

