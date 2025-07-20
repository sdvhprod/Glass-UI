/**
 * Glassmorphism UI - JavaScript pour effets de verre modernes
 * Design translucide avec interactions avancées et animations fluides
 */

class GlassmorphismUI {
    constructor() {
        this.isInitialized = false;
        this.preferences = this.loadPreferences();
        this.activeToasts = new Set();
        this.fabIsOpen = false;
        
        this.init();
    }

    /**
     * Initialise l'interface glassmorphism
     */
    init() {
        if (this.isInitialized) return;
        
        try {
            this.setupGlassEffects();
            this.setupInteractions();
            this.setupControls();
            this.setupAnimations();
            this.setupFAB();
            this.setupToastSystem();
            this.setupThemeControls();
            this.setupResponsive();
            
            this.applyPreferences();
            this.startBackgroundAnimation();
            this.isInitialized = true;
            
            this.showToast('Interface glassmorphism initialisée', 'success');
            console.log('✅ Glassmorphism UI initialisée avec succès');
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation:', error);
            this.showToast('Erreur lors de l\'initialisation', 'error');
        }
    }

    /**
     * Configure les effets de verre dynamiques
     */
    setupGlassEffects() {
        // Intensité du flou dynamique
        const blurSlider = document.getElementById('blur-intensity');
        if (blurSlider) {
            blurSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                document.documentElement.style.setProperty('--blur-light', `${value}px`);
                document.documentElement.style.setProperty('--blur-medium', `${value * 2}px`);
                this.preferences.blurIntensity = value;
                this.savePreferences();
            });
        }

        // Transparence dynamique
        const transparencySlider = document.getElementById('transparency');
        if (transparencySlider) {
            transparencySlider.addEventListener('input', (e) => {
                const value = e.target.value / 100;
                document.documentElement.style.setProperty('--glass-bg', `rgba(255, 255, 255, ${0.15 + value * 0.3})`);
                document.documentElement.style.setProperty('--glass-bg-light', `rgba(255, 255, 255, ${0.25 + value * 0.3})`);
                this.preferences.transparency = e.target.value;
                this.savePreferences();
            });
        }

        // Effets de survol pour toutes les cartes
        document.querySelectorAll('.glass-card').forEach(card => {
            this.addHoverEffects(card);
        });

        // Parallax sur les orbes de fond
        this.setupParallaxEffect();
    }

    /**
     * Ajoute des effets de survol avancés
     */
    addHoverEffects(element) {
        element.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-8px) scale(1.02)';
            e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.25)';
        });

        element.addEventListener('mouseleave', (e) => {
            e.target.style.transform = '';
            e.target.style.boxShadow = '';
        });

        // Effet de suivi de souris pour les cartes
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    }

    /**
     * Configure l'effet parallax
     */
    setupParallaxEffect() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
                const speed = 0.2 + (index * 0.1);
                orb.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }

    /**
     * Configure les interactions utilisateur
     */
    setupInteractions() {
        // Navigation active
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Retire la classe active de tous les items
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                
                // Ajoute la classe active à l'item cliqué
                item.classList.add('active');
                
                this.showToast(`Navigation vers ${item.textContent}`, 'info');
            });
        });

        // Tâches interactives
        document.querySelectorAll('.task-item').forEach(task => {
            const checkbox = task.querySelector('.task-checkbox');
            if (checkbox) {
                task.addEventListener('click', () => {
                    task.classList.toggle('completed');
                    const isCompleted = task.classList.contains('completed');
                    
                    if (isCompleted) {
                        checkbox.textContent = '✓';
                        this.showToast('Tâche marquée comme terminée', 'success');
                    } else {
                        checkbox.textContent = '';
                        this.showToast('Tâche marquée comme en cours', 'info');
                    }
                });
            }
        });

        // Barres de graphique interactives
        document.querySelectorAll('.bar').forEach((bar, index) => {
            bar.addEventListener('click', () => {
                const height = bar.style.height;
                this.showToast(`Barre ${index + 1}: ${height} de performance`, 'info');
            });
        });

        // Boutons d'action rapide
        document.querySelectorAll('.action-button').forEach(button => {
            button.addEventListener('click', () => {
                const label = button.querySelector('.action-label').textContent;
                this.triggerActionAnimation(button);
                this.showToast(`Action: ${label}`, 'success');
            });
        });
    }

    /**
     * Animation pour les boutons d'action
     */
    triggerActionAnimation(button) {
        button.style.transform = 'scale(0.95)';
        button.style.filter = 'brightness(1.2)';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.filter = '';
        }, 150);
    }

    /**
     * Configure les contrôles de l'interface
     */
    setupControls() {
        // Sélecteur de thème
        const themeSelector = document.getElementById('theme-selector');
        if (themeSelector) {
            themeSelector.addEventListener('change', (e) => {
                this.setTheme(e.target.value);
            });
        }

        // Interrupteurs à bascule
        document.querySelectorAll('.glass-toggle input[type="checkbox"]').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const label = e.target.parentElement.querySelector('.toggle-label').textContent;
                const isChecked = e.target.checked;
                
                this.handleToggleChange(label, isChecked);
                this.showToast(`${label}: ${isChecked ? 'Activé' : 'Désactivé'}`, 'info');
            });
        });

        // Contrôles de la sidebar
        document.querySelectorAll('.tool-button').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                this.handleToolAction(action, button);
            });
        });

        // Bouton de collapse de la sidebar
        const collapseButton = document.querySelector('.collapse-button');
        if (collapseButton) {
            collapseButton.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
    }

    /**
     * Gère les changements d'interrupteurs
     */
    handleToggleChange(label, isChecked) {
        switch(label) {
            case 'Animations':
                this.preferences.animations = isChecked;
                this.toggleAnimations(isChecked);
                break;
            case 'Mode sombre auto':
                this.preferences.autoDark = isChecked;
                this.toggleAutoDark(isChecked);
                break;
            case 'Effets de particules':
                this.preferences.particles = isChecked;
                this.toggleParticles(isChecked);
                break;
        }
        this.savePreferences();
    }

    /**
     * Gère les actions des outils
     */
    handleToolAction(action, button) {
        switch(action) {
            case 'toggle-blur':
                this.toggleBlurEffect();
                break;
            case 'toggle-particles':
                this.toggleParticles();
                break;
            case 'change-theme':
                this.cycleTheme();
                break;
            case 'add-orb':
                this.addRandomOrb();
                break;
            case 'shake-effect':
                this.triggerShakeEffect();
                break;
            case 'rainbow-mode':
                this.toggleRainbowMode();
                break;
        }
        
        // Animation du bouton
        button.style.transform = 'translateX(8px)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }

    /**
     * Configure les animations de l'interface
     */
    setupAnimations() {
        // Animation d'entrée pour les cartes
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.glass-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(card);
        });

        // Animation des statistiques au chargement
        this.animateStats();
    }

    /**
     * Anime les statistiques numériques
     */
    animateStats() {
        document.querySelectorAll('.stat-value').forEach(stat => {
            const target = stat.textContent;
            const isNumber = !isNaN(parseFloat(target));
            
            if (isNumber) {
                const finalValue = parseFloat(target);
                let currentValue = 0;
                const increment = finalValue / 50;
                const unit = target.replace(/[\d.]/g, '');
                
                const updateValue = () => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = target;
                    } else {
                        stat.textContent = Math.floor(currentValue) + unit;
                        requestAnimationFrame(updateValue);
                    }
                };
                
                setTimeout(updateValue, 500);
            }
        });
    }

    /**
     * Configure le bouton flottant (FAB)
     */
    setupFAB() {
        const fabMain = document.querySelector('.fab-main');
        if (!fabMain) return;

        fabMain.addEventListener('click', () => {
            this.fabIsOpen = !this.fabIsOpen;
            fabMain.classList.toggle('active', this.fabIsOpen);
            
            if (this.fabIsOpen) {
                this.showToast('Menu d\'actions ouvert', 'info');
            }
        });

        // Ferme le FAB en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (!fabMain.contains(e.target) && this.fabIsOpen) {
                this.fabIsOpen = false;
                fabMain.classList.remove('active');
            }
        });

        // Options du FAB
        document.querySelectorAll('.fab-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = option.getAttribute('data-action');
                const label = option.querySelector('.fab-option-label').textContent;
                
                this.handleFABAction(action);
                this.showToast(`${label} démarré`, 'success');
                
                // Ferme le menu
                this.fabIsOpen = false;
                fabMain.classList.remove('active');
            });
        });
    }

    /**
     * Gère les actions du FAB
     */
    handleFABAction(action) {
        switch(action) {
            case 'new-project':
                this.createNewProject();
                break;
            case 'new-task':
                this.createNewTask();
                break;
            case 'new-team':
                this.inviteTeam();
                break;
        }
    }

    /**
     * Simule la création d'un nouveau projet
     */
    createNewProject() {
        const projectNames = ['Projet Alpha', 'Innovation Beta', 'Solution Gamma', 'Plateforme Delta'];
        const randomName = projectNames[Math.floor(Math.random() * projectNames.length)];
        
        // Animation de création
        this.addFloatingMessage(`📁 ${randomName} créé !`);
        
        // Mise à jour des stats (simulation)
        setTimeout(() => {
            const statValue = document.querySelector('.stat-value');
            if (statValue) {
                const current = parseInt(statValue.textContent);
                statValue.textContent = `${current + 1}k`;
            }
        }, 1000);
    }

    /**
     * Simule la création d'une nouvelle tâche
     */
    createNewTask() {
        const taskList = document.querySelector('.task-list');
        if (!taskList) return;

        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.style.opacity = '0';
        taskItem.style.transform = 'translateX(-20px)';
        
        taskItem.innerHTML = `
            <div class="task-checkbox"></div>
            <div class="task-content">
                <div class="task-title">Nouvelle tâche créée</div>
                <div class="task-meta">À l'instant</div>
            </div>
            <div class="task-priority medium">Moyenne</div>
        `;
        
        taskList.insertBefore(taskItem, taskList.firstChild);
        
        // Animation d'apparition
        setTimeout(() => {
            taskItem.style.opacity = '1';
            taskItem.style.transform = 'translateX(0)';
        }, 100);
        
        // Ajoute l'interaction
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });
    }

    /**
     * Simule l'invitation d'équipe
     */
    inviteTeam() {
        this.addFloatingMessage('👥 Invitation envoyée !');
        
        // Ajoute une nouvelle activité
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.style.opacity = '0';
            
            activityItem.innerHTML = `
                <div class="activity-avatar">👤</div>
                <div class="activity-content">
                    <div class="activity-text">Nouvelle invitation envoyée</div>
                    <div class="activity-time">À l'instant</div>
                </div>
                <div class="activity-type new">Nouveau</div>
            `;
            
            activityList.insertBefore(activityItem, activityList.firstChild);
            
            setTimeout(() => {
                activityItem.style.opacity = '1';
            }, 100);
        }
    }

    /**
     * Configure le système de notifications toast
     */
    setupToastSystem() {
        this.toastContainer = document.querySelector('.toast-container');
        if (!this.toastContainer) {
            this.toastContainer = document.createElement('div');
            this.toastContainer.className = 'toast-container';
            document.body.appendChild(this.toastContainer);
        }
    }

    /**
     * Affiche une notification toast
     */
    showToast(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        const id = Date.now();
        toast.dataset.id = id;
        this.activeToasts.add(id);
        
        this.toastContainer.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            this.removeToast(id);
        }, duration);
        
        // Suppression au clic
        toast.addEventListener('click', () => {
            this.removeToast(id);
        });
    }

    /**
     * Supprime une notification toast
     */
    removeToast(id) {
        const toast = document.querySelector(`[data-id="${id}"]`);
        if (toast && this.activeToasts.has(id)) {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
                this.activeToasts.delete(id);
            }, 300);
        }
    }

    /**
     * Configure les contrôles de thème
     */
    setupThemeControls() {
        // Détection du thème système
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(() => {
            if (this.preferences.autoDark) {
                this.applySystemTheme();
            }
        });
    }

    /**
     * Configure la réactivité
     */
    setupResponsive() {
        let resizeTimer;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Configuration initiale
        this.handleResize();
    }

    /**
     * Gère le redimensionnement
     */
    handleResize() {
        const width = window.innerWidth;
        
        if (width <= 768) {
            document.body.classList.add('mobile');
            this.preferences.isMobile = true;
        } else {
            document.body.classList.remove('mobile');
            this.preferences.isMobile = false;
        }
        
        this.savePreferences();
    }

    /**
     * Démarre l'animation d'arrière-plan
     */
    startBackgroundAnimation() {
        if (!this.preferences.animations) return;
        
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 6 + Math.random() * 4;
            
            orb.style.animationDelay = `${randomDelay}s`;
            orb.style.animationDuration = `${randomDuration}s`;
        });
    }

    // Méthodes d'effets visuels

    /**
     * Bascule l'effet de flou
     */
    toggleBlurEffect() {
        const currentBlur = getComputedStyle(document.documentElement).getPropertyValue('--blur-light');
        const newBlur = currentBlur === '0px' ? '10px' : '0px';
        
        document.documentElement.style.setProperty('--blur-light', newBlur);
        document.documentElement.style.setProperty('--blur-medium', `${parseInt(newBlur) * 2}px`);
        
        this.showToast(`Effet de flou ${newBlur === '0px' ? 'désactivé' : 'activé'}`, 'info');
    }

    /**
     * Bascule les particules
     */
    toggleParticles(enabled = null) {
        const particles = document.querySelector('.floating-shapes');
        if (!particles) return;
        
        const isEnabled = enabled !== null ? enabled : particles.style.display !== 'none';
        
        particles.style.display = isEnabled ? 'none' : 'block';
        this.preferences.particles = !isEnabled;
        this.savePreferences();
    }

    /**
     * Fait tourner les thèmes
     */
    cycleTheme() {
        const themes = ['auto', 'light', 'dark'];
        const currentIndex = themes.indexOf(this.preferences.theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        
        this.setTheme(themes[nextIndex]);
    }

    /**
     * Définit le thème
     */
    setTheme(theme) {
        this.preferences.theme = theme;
        
        switch(theme) {
            case 'light':
                document.documentElement.removeAttribute('data-theme');
                break;
            case 'dark':
                document.documentElement.setAttribute('data-theme', 'dark');
                break;
            case 'auto':
                this.applySystemTheme();
                break;
        }
        
        this.savePreferences();
        this.showToast(`Thème: ${theme}`, 'info');
    }

    /**
     * Applique le thème système
     */
    applySystemTheme() {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    /**
     * Ajoute un orbe aléatoire
     */
    addRandomOrb() {
        const container = document.querySelector('.background-container');
        if (!container) return;
        
        const orb = document.createElement('div');
        orb.className = 'gradient-orb';
        
        const size = 100 + Math.random() * 200;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const gradients = ['var(--gradient-1)', 'var(--gradient-2)', 'var(--gradient-3)', 'var(--gradient-4)', 'var(--gradient-5)'];
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.left = `${x}%`;
        orb.style.top = `${y}%`;
        orb.style.background = randomGradient;
        orb.style.opacity = '0';
        
        container.appendChild(orb);
        
        setTimeout(() => {
            orb.style.opacity = '0.7';
        }, 100);
        
        // Supprime après 10 secondes
        setTimeout(() => {
            orb.style.opacity = '0';
            setTimeout(() => {
                if (orb.parentNode) {
                    orb.parentNode.removeChild(orb);
                }
            }, 1000);
        }, 10000);
        
        this.showToast('Nouvel orbe ajouté', 'success');
    }

    /**
     * Déclenche un effet de secousse
     */
    triggerShakeEffect() {
        document.body.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
        
        // Ajoute le style shake s'il n'existe pas
        if (!document.getElementById('shake-style')) {
            const style = document.createElement('style');
            style.id = 'shake-style';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.showToast('Effet de secousse activé', 'warning');
    }

    /**
     * Bascule le mode arc-en-ciel
     */
    toggleRainbowMode() {
        const isRainbow = document.body.classList.contains('rainbow-mode');
        
        if (isRainbow) {
            document.body.classList.remove('rainbow-mode');
            this.showToast('Mode arc-en-ciel désactivé', 'info');
        } else {
            document.body.classList.add('rainbow-mode');
            this.addRainbowStyles();
            this.showToast('Mode arc-en-ciel activé', 'success');
        }
    }

    /**
     * Ajoute les styles arc-en-ciel
     */
    addRainbowStyles() {
        if (!document.getElementById('rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                .rainbow-mode .glass-card {
                    animation: rainbow 3s linear infinite !important;
                }
                
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Bascule les animations
     */
    toggleAnimations(enabled) {
        if (enabled) {
            document.documentElement.style.removeProperty('--transition-duration');
            this.startBackgroundAnimation();
        } else {
            document.documentElement.style.setProperty('--transition-duration', '0ms');
            document.querySelectorAll('.gradient-orb, .floating-shapes').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        }
    }

    /**
     * Bascule le mode sombre automatique
     */
    toggleAutoDark(enabled) {
        if (enabled) {
            this.applySystemTheme();
        }
    }

    /**
     * Bascule la sidebar
     */
    toggleSidebar() {
        const sidebar = document.querySelector('.floating-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            const isCollapsed = sidebar.classList.contains('collapsed');
            
            if (isCollapsed) {
                sidebar.style.transform = 'translateX(220px)';
            } else {
                sidebar.style.transform = '';
            }
        }
    }

    /**
     * Ajoute un message flottant
     */
    addFloatingMessage(message) {
        const msg = document.createElement('div');
        msg.textContent = message;
        msg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--glass-bg-light);
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            border: 1px solid var(--glass-border);
            backdrop-filter: blur(var(--blur-medium));
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            animation: floatingMessage 2s ease-out forwards;
        `;
        
        document.body.appendChild(msg);
        
        // Style d'animation
        if (!document.getElementById('floating-message-style')) {
            const style = document.createElement('style');
            style.id = 'floating-message-style';
            style.textContent = `
                @keyframes floatingMessage {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (msg.parentNode) {
                msg.parentNode.removeChild(msg);
            }
        }, 2000);
    }

    // Gestion des préférences

    /**
     * Applique les préférences sauvegardées
     */
    applyPreferences() {
        // Thème
        this.setTheme(this.preferences.theme);
        
        // Flou
        if (this.preferences.blurIntensity) {
            document.documentElement.style.setProperty('--blur-light', `${this.preferences.blurIntensity}px`);
            document.documentElement.style.setProperty('--blur-medium', `${this.preferences.blurIntensity * 2}px`);
        }
        
        // Transparence
        if (this.preferences.transparency) {
            const value = this.preferences.transparency / 100;
            document.documentElement.style.setProperty('--glass-bg', `rgba(255, 255, 255, ${0.15 + value * 0.3})`);
            document.documentElement.style.setProperty('--glass-bg-light', `rgba(255, 255, 255, ${0.25 + value * 0.3})`);
        }
        
        // Animations
        if (!this.preferences.animations) {
            this.toggleAnimations(false);
        }
        
        // Particules
        if (!this.preferences.particles) {
            this.toggleParticles(false);
        }
    }

    /**
     * Sauvegarde les préférences
     */
    savePreferences() {
        localStorage.setItem('glassmorphismPreferences', JSON.stringify(this.preferences));
    }

    /**
     * Charge les préférences
     */
    loadPreferences() {
        const defaults = {
            theme: 'auto',
            blurIntensity: 10,
            transparency: 20,
            animations: true,
            particles: true,
            autoDark: false,
            isMobile: false
        };
        
        try {
            const saved = localStorage.getItem('glassmorphismPreferences');
            return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
        } catch (error) {
            console.warn('Erreur lors du chargement des préférences:', error);
            return defaults;
        }
    }
}

// Auto-initialisation quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.glassmorphismUI = new GlassmorphismUI();
    });
} else {
    window.glassmorphismUI = new GlassmorphismUI();
}

// Export pour usage en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlassmorphismUI;
}
