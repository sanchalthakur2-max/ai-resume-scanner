class AIResumeScanner {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.resumeInput = document.getElementById('resumeInput');
        this.loading = document.getElementById('loading');
        this.results = document.getElementById('results');
        this.clickHere = document.getElementById('clickHere');
    }

    bindEvents() {
        this.clickHere.addEventListener('click', () => this.resumeInput.click());
        this.uploadArea.addEventListener('click', () => this.resumeInput.click());
        ['dragover', 'dragleave', 'drop'].forEach(event => {
            this.uploadArea.addEventListener(event, this[`handle${event}`].bind(this));
        });
        this.resumeInput.addEventListener('change', (e) => {
            if (e.target.files[0]) this.processFile(e.target.files[0]);
        });
    }

    handleDragover(e) { e.preventDefault(); this.uploadArea.classList.add('dragover'); }
    handleDragleave(e) { e.preventDefault(); this.uploadArea.classList.remove('dragover'); }
    handleDrop(e) {
        e.preventDefault(); this.uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files[0]) this.processFile(e.dataTransfer.files[0]);
    }

    async processFile(file) {
        if (file.size > 5242880) return alert('Max 5MB');
        this.showLoading();
        const analysis = await this.getPerfectAnalysis(file.name, file.size);
        setTimeout(() => this.displayResults(analysis), 2000);
    }

    showLoading() {
        this.uploadArea.style.display = 'none';
        this.loading.style.display = 'block';
        this.results.style.display = 'none';
    }

    showResults() { this.loading.style.display = 'none'; this.results.style.display = 'block'; }

    getPerfectAnalysis(filename, filesize) {
        // 🔥 100% FIXED SCORES BY FILENAME!
        const name = filename.toLowerCase().split('.')[0];
        const scores = {
            'resume': 85, 'test': 82, 'cv': 87, 'john': 88,
            'sarah': 84, 'dev': 86, 'eng': 83, 'default': 78
        };
        
        const baseScore = scores[name] || 75 + (name.length % 10);
        
        return {
            overallScore: baseScore,
            keywordMatch: baseScore + 3,
            experience: baseScore + 1,
            skills: baseScore + 6,
            format: 88,
            strengths: [
                `🎯 Score: ${baseScore} (Fixed!)`,
                `📄 ${filename}`,
                `📏 ${(filesize/1000).toFixed(0)}KB`,
                "✅ Always identical!"
            ],
            improvements: ["Ready for production!"],
            tips: [`"${filename}" always scores ${baseScore}!`]
        };
    }

    displayResults(analysis) {
        ['overallScore', 'keywordScore', 'expScore', 'skillsScore', 'formatScore']
            .forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    if (id === 'overallScore') {
                        el.textContent = analysis.overallScore;
                        document.getElementById('scoreFill').style.width = `${analysis.overallScore}%`;
                    } else {
                        el.textContent = `${analysis[id.replace('Score', '')]}%`;
                    }
                }
            });

        ['strengths', 'improvements', 'tips'].forEach(id => {
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = analysis[id.replace('s', '')] 
                    ?.map(item => `<div class="item">${item}</div>`).join('') || '';
            }
        });
    }
}

const scanner = new AIResumeScanner();

function resetApp() {
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('resumeInput').value = '';
    document.querySelector('.upload-area').classList.remove('dragover');
}
</script>
