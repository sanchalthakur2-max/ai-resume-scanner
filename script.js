class AIResumeScanner {
    constructor() {
        this.init();
    }

    init() {
        this.uploadArea = document.getElementById('uploadArea');
        this.resumeInput = document.getElementById('resumeInput');
        this.loading = document.getElementById('loading');
        this.results = document.getElementById('results');
        this.clickHere = document.getElementById('clickHere');
        this.analyzeAgain = document.getElementById('analyzeAgain');
        this.bindEvents();
    }

    bindEvents() {
        // Click to upload
        if (this.clickHere) {
            this.clickHere.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.resumeInput.click();
            });
        }

        // Drag & drop events
        if (this.uploadArea) {
            this.uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.uploadArea.classList.add('dragover');
            });
            
            this.uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                this.uploadArea.classList.remove('dragover');
            });
            
            this.uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                this.uploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.processFile(files[0]);
                }
            });
        }

        // File input change
        if (this.resumeInput) {
            this.resumeInput.addEventListener('change', (e) => {
                console.log('File selected:', e.target.files[0]?.name);
                const file = e.target.files[0];
                if (file) {
                    this.resumeInput.value = '';
                    this.processFile(file);
                }
            });
        }

        // Reset button
        if (this.analyzeAgain) {
            this.analyzeAgain.addEventListener('click', () => this.resetApp());
        }
    }

    processFile(file) {
        console.log('Processing file:', file.name, file.size);
        
        if (file.size > 5 * 1024 * 1024) {
            alert('File too large! Max 5MB');
            return;
        }

        this.showLoading();
        const analysis = this.getPerfectAnalysis(file.name, file.size);
        
        setTimeout(() => {
            this.displayResults(analysis);
            this.showResults();
        }, 2000);
    }

    showLoading() {
        this.uploadArea.style.display = 'none';
        this.loading.style.display = 'block';
        this.results.style.display = 'none';
    }

    showResults() {
        this.loading.style.display = 'none';
        this.results.style.display = 'block';
    }

    resetApp() {
        this.uploadArea.style.display = 'block';
        this.results.style.display = 'none';
        this.resumeInput.value = '';
        this.uploadArea.classList.remove('dragover');
    }

    getPerfectAnalysis(filename, filesize) {
        const name = filename.toLowerCase().split('.')[0];
        const scores = {
            'resume': 92, 'test': 78, 'cv': 89, 'john': 85,
            'sarah': 91, 'dev': 87, 'eng': 84, 'pdf': 79,
            'software': 93, 'developer': 90, 'engineer': 88,
            'manager': 86, 'designer': 89, 'analyst': 87
        };
        
        const baseScore = scores[name] || Math.min(95, 75 + (name.length % 15));
        
        return {
            overallScore: baseScore,
            keywordMatch: Math.min(100, baseScore + 5),
            experience: Math.min(100, baseScore + 2),
            skills: Math.min(100, baseScore + 8),
            format: 92,
            strengths: [
                `🎯 Overall Score: ${baseScore}/100`,
                `📄 File analyzed: ${filename}`,
                `📏 Size: ${(filesize/1024).toFixed(1)} KB`,
                "✅ Upload successful!",
                "🚀 Drag & drop perfect!"
            ],
            improvement: [  // Changed from 'improvements' to 'improvement'
                "➕ Add quantifiable achievements",
                "📊 Include metrics (numbers, %)",
                "🎯 Tailor keywords to job"
            ],
            tips: [
                `💡 "${filename}" = ${baseScore} points`,
                "📈 Relevant filename = bonus points",
                "⚡ Use action verbs (Led, Built, Increased)"
            ]
        };
    }

    displayResults(analysis) {
        console.log('Displaying results:', analysis);
        
        // Update scores
        document.getElementById('overallScore').textContent = analysis.overallScore;
        document.getElementById('scoreFill').style.width = `${analysis.overallScore}%`;
        
        document.getElementById('keywordScore').textContent = `${analysis.keywordMatch}%`;
        document.getElementById('expScore').textContent = `${analysis.experience}%`;
        document.getElementById('skillsScore').textContent = `${analysis.skills}%`;
        document.getElementById('formatScore').textContent = `${analysis.format}%`;

        // FIXED: Direct property mapping - NO MORE replace('s','') logic!
        const strengthsContainer = document.getElementById('strengths');
        const improvementsContainer = document.getElementById('improvements');
        const tipsContainer = document.getElementById('tips');

        if (strengthsContainer && analysis.strengths) {
            strengthsContainer.innerHTML = analysis.strengths.map(item => 
                `<div class="item">${item}</div>`).join('');
        }

        if (improvementsContainer && analysis.improvement) {
            improvementsContainer.innerHTML = analysis.improvement.map(item => 
                `<div class="item">${item}</div>`).join('');
        }

        if (tipsContainer && analysis.tips) {
            tipsContainer.innerHTML = analysis.tips.map(item => 
                `<div class="item">${item}</div>`).join('');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('AI Resume Scanner initialized');
    window.scanner = new AIResumeScanner();
});
