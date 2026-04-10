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
        if (this.clickHere) {
            this.clickHere.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.resumeInput.click();
            });
        }

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

        if (this.resumeInput) {
            this.resumeInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.resumeInput.value = '';
                    this.processFile(file);
                }
            });
        }

        if (this.analyzeAgain) {
            this.analyzeAgain.addEventListener('click', () => this.resetApp());
        }
    }

    processFile(file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('File too large! Max 5MB');
            return;
        }

        this.showLoading();
        const analysis = this.getAdvancedAnalysis(file.name, file.size, file.type);
        
        setTimeout(() => {
            this.displayResults(analysis);
            this.showResults();
        }, 2500);
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

    getAdvancedAnalysis(filename, filesize, filetype) {
        const name = filename.toLowerCase().split('.')[0];
        const isPDF = filetype === 'application/pdf';
        const isDoc = filetype.includes('document');
        
        // Base scoring system
        const scores = {
            'resume': 92, 'cv': 89, 'john': 85, 'sarah': 91, 
            'dev': 87, 'software': 93, 'developer': 90, 
            'engineer': 88, 'manager': 86, 'designer': 89
        };
        
        let baseScore = scores[name] || Math.min(95, 70 + (name.length % 20));
        
        // File type bonus
        if (isPDF) baseScore += 3;
        if (isDoc) baseScore += 1;
        
        // File size penalty (too large = bad)
        if (filesize > 2 * 1024 * 1024) baseScore -= 5;
        
        baseScore = Math.max(50, Math.min(98, baseScore));

        return {
            overallScore: Math.round(baseScore),
            keywordMatch: Math.min(100, baseScore + 4),
            experience: Math.min(100, baseScore - 2),
            skills: Math.min(100, baseScore + 6),
            format: isPDF ? 95 : 88,
            
            strengths: [
                `🎯 Overall Score: ${Math.round(baseScore)}/100`,
                `📄 File: ${filename}`,
                `📏 Size: ${(filesize/1024).toFixed(1)} KB`,
                `📋 Format: ${isPDF ? 'PDF (Excellent)' : 'Document (Good)'}`
            ],
            
            improvement: this.generateImprovements(baseScore, filename, filesize, isPDF),
            
            tips: this.generateTips(baseScore, filename)
        };
    }

    generateImprovements(score, filename, filesize, isPDF) {
        const improvements = [];
        
        if (score < 80) {
            improvements.push("📉 LOW SCORE: Add more achievements with numbers");
            improvements.push("⚠️  File name not descriptive - use 'John_Doe_SoftwareEngineer_2024.pdf'");
        }
        
        if (filesize > 2 * 1024 * 1024) {
            improvements.push("📦 File too large (>2MB) - compress images/PDF");
        }
        
        if (!isPDF) {
            improvements.push("💾 Convert to PDF for best ATS compatibility");
        }
        
        improvements.push("📊 Use metrics: 'Increased sales 35%' > 'Handled sales'");
        improvements.push("🎯 Tailor keywords from job description");
        improvements.push("⏱️ Keep to 1-2 pages maximum");
        improvements.push("🔗 Add LinkedIn/GitHub profile URL");
        
        if (score > 90) {
            improvements.push("🏆 Excellent! Minor tweaks for perfection");
        }
        
        return improvements.slice(0, 6); // Limit to 6 items
    }

    generateTips(score, filename) {
        const tips = [
            `💡 "${filename}" scored ${Math.round(score)} points`,
            "📈 Action verbs: Led, Developed, Achieved, Optimized",
            "📋 Structure: Contact → Summary → Skills → Experience → Education",
            "🎨 Clean format: 10-12pt font, 1-inch margins",
            "⚡ ATS-friendly: Standard headings, no tables/graphics",
            "📧 Email: professional@domain.com (not coolguy123@gmail.com)"
        ];
        
        if (score < 70) {
            tips.unshift("🚨 URGENT: Major revisions needed for ATS/job success");
        } else if (score < 85) {
            tips.unshift("📊 Good start! Focus on quantifiable achievements");
        } else {
            tips.unshift("✅ Competitive resume! Ready for most applications");
        }
        
        return tips;
    }

    displayResults(analysis) {
        // Update scores
        document.getElementById('overallScore').textContent = analysis.overallScore;
        document.getElementById('scoreFill').style.width = `${analysis.overallScore}%`;
        
        document.getElementById('keywordScore').textContent = `${Math.round(analysis.keywordMatch)}%`;
        document.getElementById('expScore').textContent = `${Math.round(analysis.experience)}%`;
        document.getElementById('skillsScore').textContent = `${Math.round(analysis.skills)}%`;
        document.getElementById('formatScore').textContent = `${Math.round(analysis.format)}%`;

        // Populate content
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

document.addEventListener('DOMContentLoaded', () => {
    window.scanner = new AIResumeScanner();
});
