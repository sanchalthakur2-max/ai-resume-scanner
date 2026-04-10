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
        // Click to upload
        this.clickHere.addEventListener('click', () => this.resumeInput.click());
        this.uploadArea.addEventListener('click', () => this.resumeInput.click());

        // Drag & drop
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));

        // File input
        this.resumeInput.addEventListener('change', this.handleFileSelect.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    async processFile(file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        this.showLoading();
        
        // Simulate AI processing
        await this.simulateAIProcessing(file);
    }

    showLoading() {
        this.uploadArea.style.display = 'none';
        this.loading.style.display = 'block';
        this.results.style.display = 'none';
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    showResults() {
        this.loading.style.display = 'none';
        this.results.style.display = 'block';
    }

    async simulateAIProcessing(file) {
        // Simulate file reading delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate mock AI analysis
        const analysis = this.generateAIResults(file.name);
        
        setTimeout(() => {
            this.hideLoading();
            this.displayResults(analysis);
            this.showResults();
        }, 2000);
    }

    generateAIResults(filename) {
        // Mock AI analysis - in production, integrate with OpenAI/Gemini/etc.
        const randomScore = Math.floor(Math.random() * 30) + 70; // 70-100 range
        
        return {
            overallScore: randomScore,
            keywordMatch: Math.floor(Math.random() * 20) + 80,
            experience: Math.floor(Math.random() * 25) + 75,
            skills: Math.floor(Math.random() * 20) + 80,
            format: Math.floor(Math.random() * 15) + 85,
            strengths: [
                "Strong technical skills highlighted",
                "Clear career progression shown",
                "Quantifiable achievements included",
                "Professional formatting"
            ],
            improvements: [
                "Add more specific metrics to achievements",
                "Include recent projects or certifications",
                "Tailor keywords for target job description",
                "Shorten summary section"
            ],
            tips: [
                "Use action verbs: 'Led', 'Developed', 'Optimized'",
                "Quantify achievements: 'Increased sales by 30%'",
                "Tailor resume for each job application",
                "Keep it to 1-2 pages maximum",
                "Use ATS-friendly fonts and formatting"
            ]
        };
    }

    displayResults(analysis) {
        // Update scores
        document.getElementById('overallScore').textContent = analysis.overallScore;
        document.getElementById('scoreFill').style.width = `${analysis.overallScore}%`;
        
        document.getElementById('keywordScore').textContent = `${analysis.keywordMatch}%`;
        document.getElementById('expScore').textContent = `${analysis.experience}%`;
        document.getElementById('skillsScore').textContent = `${analysis.skills}%`;
        document.getElementById('formatScore').textContent = `${analysis.format}%`;

        // Update analysis
        this.updateList('strengths', analysis.strengths);
        this.updateList('improvements', analysis.improvements);
        this.updateList('tips', analysis.tips.map(tip => ({ text: tip })));
    }

    updateList(containerId, items) {
        const container = document.getElementById(containerId);
        container.innerHTML = items.map(item => 
            `<div class="item">${item.text || item}</div>`
        ).join('');
    }
}

// Initialize app
const scanner = new AIResumeScanner();

// Global reset function
function resetApp() {
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('resumeInput').value = '';
    document.querySelector('.upload-area').classList.remove('dragover');
}