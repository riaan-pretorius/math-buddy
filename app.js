const locales = {
    en: {
        title: "🚀 Multiply By 2 Adventure! 🌟",
        subtitle: "Ready to explore space with numbers?",
        menuWelcome: "Welcome Explorer!",
        menuChoose: "Choose your mission:",
        btnLearn: "📖 Learn to Multiply",
        btnTest: "🎮 Test Your Knowledge",
        learnTitle: "Learning Mission",
        btnBack: "🏠 Back to Base",
        btnPrev: "⬅️ Prev",
        btnNext: "Next ➡️",
        testTitle: "Space Quiz",
        scoreLabel: "Score:",
        questionProgress: "Question",
        btnSubmit: "Submit 🚀",
        correctFeedback: "🎉 Correct! Blast off! 🚀",
        incorrectFeedback: "Oops! Black hole! 🌌 The correct answer is",
        missionComplete: "Mission Complete! 🛸",
        starsEarned: "You scored {s} out of {t} stars! 🌟",
        perfectScore: "Perfect! You are a Space Math Commander! 👨‍🚀👩‍🚀",
        btnTryAgain: "🔄 Try Again"
    },
    af: {
        title: "🚀 Maal Met 2 Avontuur! 🌟",
        subtitle: "Gereed om die ruimte met getalle te verken?",
        menuWelcome: "Welkom Ontdekkingsreisiger!",
        menuChoose: "Kies jou missie:",
        btnLearn: "📖 Leer om te Maal",
        btnTest: "🎮 Toets Jou Kennis",
        learnTitle: "Leer Missie",
        btnBack: "🏠 Terug na Basis",
        btnPrev: "⬅️ Vorige",
        btnNext: "Volgende ➡️",
        testTitle: "Ruimte Vasvra",
        scoreLabel: "Telling:",
        questionProgress: "Vraag",
        btnSubmit: "Dien In 🚀",
        correctFeedback: "🎉 Reg! Skiet weg! 🚀",
        incorrectFeedback: "Oeps! Swart gat! 🌌 Die regte antwoord is",
        missionComplete: "Missie Voltooi! 🛸",
        starsEarned: "Jy het {s} uit {t} sterre verdien! 🌟",
        perfectScore: "Perfek! Jy is 'n Ruimte Wiskunde Bevelvoerder! 👨‍🚀👩‍🚀",
        btnTryAgain: "🔄 Probeer Weer"
    }
};

const st = {
    currentScreen: 'menu',
    learnNumber: 0,
    testScore: 0,
    currentTestQuestionIndex: 0,
    lang: 'en',
    testQuestions: []
};

function t(key, vars = {}) {
    let text = locales[st.lang][key] || key;
    for (let k in vars) {
        text = text.replace(`{${k}}`, vars[k]);
    }
    return text;
}

function getExplanationText(n) {
    if (st.lang === 'af') {
        return `Kyk! Dit is ${n} groep${n !== 1 ? 'e' : ''} van 2 sirkels.`;
    }
    return `Look! That's ${n} group${n !== 1 ? 's' : ''} of 2 circles.`;
}

// UI Elements
const mainContent = document.getElementById('main-content');

// --- Screen Renderers ---

function renderMenu() {
    return `
        <div class="screen active" id="screen-menu">
            <div class="card">
                <h2>${t('menuWelcome')}</h2>
                <p style="font-size: 1.2rem; margin-top: 10px;">${t('menuChoose')}</p>
                <div class="menu-buttons">
                    <button class="btn-primary" onclick="app.navigate('learn')">${t('btnLearn')}</button>
                    <button class="btn-primary" style="background-color: var(--secondary-color);" onclick="app.navigate('test')">${t('btnTest')}</button>
                </div>
            </div>
        </div>
    `;
}

function renderLearn() {
    return `
        <div class="screen active" id="screen-learn">
            <h2>${t('learnTitle')}</h2>
            <div class="card" id="learn-card">
                <!-- Learn content will be injected here -->
            </div>
            <button class="btn-secondary" onclick="app.navigate('menu')">${t('btnBack')}</button>
        </div>
    `;
}

function renderTest() {
    return `
        <div class="screen active" id="screen-test">
            <h2>${t('testTitle')}</h2>
            <div class="card" id="test-card">
                <!-- Test content will be injected here -->
            </div>
            <button class="btn-secondary" onclick="app.navigate('menu')">${t('btnBack')}</button>
        </div>
    `;
}

// --- Core Application Logic ---

const app = {
    init() {
        this.updateHeaderLinks();
        this.render();
    },

    setLang(lang) {
        st.lang = lang;
        document.getElementById('lang-btn-en').classList.toggle('active', lang === 'en');
        document.getElementById('lang-btn-af').classList.toggle('active', lang === 'af');
        this.updateHeaderLinks();
        this.render();
        // re-render exact content piece if mid-task 
        if (st.currentScreen === 'learn') this.renderLearnContent();
        else if (st.currentScreen === 'test' && st.currentTestQuestionIndex < st.testQuestions.length) this.renderTestContent();
        else if (st.currentScreen === 'test') this.showResults();
    },

    updateHeaderLinks() {
        document.getElementById('app-title').innerText = t('title');
        document.getElementById('app-subtitle').innerText = t('subtitle');
    },

    navigate(screenStr) {
        st.currentScreen = screenStr;
        this.render();

        if (screenStr === 'learn') {
            st.learnNumber = 0; // Start at 0
            this.initLearn();
        } else if (screenStr === 'test') {
            this.initTest();
        }
    },

    render() {
        let html = '';
        switch (st.currentScreen) {
            case 'menu': html = renderMenu(); break;
            case 'learn': html = renderLearn(); break;
            case 'test': html = renderTest(); break;
        }
        mainContent.innerHTML = html;
    },

    initLearn() {
        this.renderLearnContent();
    },

    renderLearnContent() {
        const lc = document.getElementById('learn-card');
        if (!lc) return;

        const n = st.learnNumber;
        const result = n * 2;

        let groupsHtml = '<div class="visual-groups">';
        for (let i = 0; i < n; i++) {
            groupsHtml += `
                    <div class="circle-group">
                        <div class="circle-item"></div>
                        <div class="circle-item"></div>
                    </div>
                `;
        }
        groupsHtml += '</div>';

        lc.innerHTML = `
                <h3 class="math-equation">${n} &times; 2 = ${result}</h3>
                <p class="explanation-text">${getExplanationText(n)}</p>
                ${groupsHtml}
                <div class="nav-controls">
                    <button class="btn-primary small-btn" onclick="app.prevLearn()" ${n <= 0 ? 'disabled style="opacity:0.5"' : ''}>${t('btnPrev')}</button>
                    <button class="btn-primary small-btn" onclick="app.nextLearn()" ${n >= 12 ? 'disabled style="opacity:0.5"' : ''}>${t('btnNext')}</button>
                </div>
            `;
    },

    nextLearn() {
        if (st.learnNumber < 12) {
            st.learnNumber++;
            this.renderLearnContent();
            this.playSound(400 + (st.learnNumber * 50), 'sine');
        }
    },

    prevLearn() {
        if (st.learnNumber > 0) {
            st.learnNumber--;
            this.renderLearnContent();
        }
    },

    playSound(freq, type = 'sine') {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch (e) { }
    },

    initTest() {
        st.testScore = 0;
        st.currentTestQuestionIndex = 0;
        let q = [];
        for (let i = 0; i <= 12; i++) q.push(i);
        st.testQuestions = q.sort(() => Math.random() - 0.5);
        this.nextQuestion();
    },

    nextQuestion() {
        if (st.currentTestQuestionIndex >= st.testQuestions.length) {
            this.showResults();
            return;
        }
        this.renderTestContent();
    },

    renderTestContent() {
        const card = document.getElementById('test-card');
        if (!card) return;

        const n = st.testQuestions[st.currentTestQuestionIndex];
        const qNum = st.currentTestQuestionIndex + 1;
        const totalQ = st.testQuestions.length;

        card.innerHTML = `
            <div class="score-board">${t('scoreLabel')} ${st.testScore} 🌟</div>
            <h3 class="math-equation">${n} &times; 2 = ?</h3>
            <div class="input-area">
                <input type="number" id="answer-input" class="answer-input" placeholder="?" onkeydown="if(event.key === 'Enter') app.submitAnswer()">
                <button class="btn-primary submit-btn" onclick="app.submitAnswer()">${t('btnSubmit')}</button>
            </div>
            <div id="feedback-area"></div>
            <div class="nav-controls">
                <span style="font-size: 1.2rem; display:flex; align-items:center;">${t('questionProgress')} ${qNum} / ${totalQ}</span>
            </div>
        `;

        // We only focus if the input isn't disabled
        setTimeout(() => {
            const input = document.getElementById('answer-input');
            if (input && !input.disabled) input.focus();
        }, 100);
    },

    submitAnswer() {
        const input = document.getElementById('answer-input');
        if (!input) return;

        const selectedStr = input.value.trim();
        if (selectedStr === '') return;

        const selected = parseInt(selectedStr, 10);
        const correct = st.testQuestions[st.currentTestQuestionIndex] * 2;
        this.checkAnswer(selected, correct, input);
    },

    checkAnswer(selected, correct, inputEl) {
        const feedback = document.getElementById('feedback-area');
        const submitBtn = document.querySelector('.submit-btn');

        inputEl.disabled = true;
        if (submitBtn) submitBtn.disabled = true;

        if (selected === correct) {
            st.testScore++;
            inputEl.classList.add('correct');
            feedback.innerHTML = `<p class="feedback-msg" style="color:var(--success-color)">${t('correctFeedback')}</p>`;
            this.playSound(600, 'sine');
            setTimeout(() => this.playSound(800, 'sine'), 100);
            this.createConfetti();
        } else {
            inputEl.classList.add('incorrect');
            feedback.innerHTML = `<p class="feedback-msg" style="color:var(--error-color)">${t('incorrectFeedback')} ${correct}.</p>`;
            this.playSound(200, 'sawtooth');
            setTimeout(() => this.playSound(150, 'sawtooth'), 150);
        }

        st.currentTestQuestionIndex++;
        setTimeout(() => this.nextQuestion(), 2000);
    },

    showResults() {
        const card = document.getElementById('test-card');
        const totalQ = st.testQuestions.length;
        const scoreText = t('starsEarned', { s: st.testScore, t: totalQ });
        card.innerHTML = `
            <h3 class="math-equation">${t('missionComplete')}</h3>
            <p class="explanation-text" style="font-size: 1.8rem;">${scoreText}</p>
            ${st.testScore === totalQ ? `<p style="font-size: 2rem; margin:10px 0;">${t('perfectScore')}</p>` : ''}
            <button class="btn-primary" onclick="app.initTest()" style="margin-top: 20px;">${t('btnTryAgain')}</button>
        `;
    },

    createConfetti() {
        for (let i = 0; i < 20; i++) {
            const conf = document.createElement('div');
            conf.classList.add('confetti');
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.animationDuration = (Math.random() * 1 + 1) + 's';
            conf.style.backgroundColor = ['#FD79A8', '#00CEC9', '#FDCB6E', '#6C5CE7'][Math.floor(Math.random() * 4)];
            document.body.appendChild(conf);
            setTimeout(() => conf.remove(), 2000);
        }
    }
};

app.init();
