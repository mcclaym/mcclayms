// 语言切换功能
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'zh';
        this.langBtn = document.getElementById('langBtn');
        this.currentLangSpan = document.getElementById('currentLang');
        this.init();
    }

    init() {
        this.updateLanguage();
        this.bindEvents();
    }

    bindEvents() {
        if (this.langBtn) {
            this.langBtn.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', this.currentLang);
        this.updateLanguage();
    }

    updateLanguage() {
        const elements = document.querySelectorAll('[data-zh][data-en]');
        
        elements.forEach(element => {
            const zhText = element.getAttribute('data-zh');
            const enText = element.getAttribute('data-en');
            
            if (this.currentLang === 'zh') {
                element.textContent = zhText;
            } else {
                element.textContent = enText;
            }
        });

        // 更新语言按钮文本
        if (this.currentLangSpan) {
            this.currentLangSpan.textContent = this.currentLang === 'zh' ? '中文' : 'English';
        }

        // 更新页面语言属性
        document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
    }
}

// 移动端导航菜单
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // 点击导航链接时关闭菜单
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // 点击外部区域关闭菜单
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// 滚动效果
class ScrollEffects {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // 导航栏背景透明度变化
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// 平滑滚动
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // 处理锚点链接的平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // 考虑固定导航栏高度
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// 动画观察器
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        // 创建交叉观察器
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察需要动画的元素
        const animateElements = document.querySelectorAll('.benefit-card, .step, .featured-item, .stat-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// 统计数字动画
class CounterAnimation {
    constructor() {
        this.init();
    }

    init() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // 保持原有的格式（如$符号、+号等）
            const originalText = element.textContent;
            const prefix = originalText.match(/^[^\d]*/)[0];
            const suffix = originalText.match(/[^\d]*$/)[0];
            
            element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }, 16);
    }
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new MobileNavigation();
    new ScrollEffects();
    new SmoothScroll();
    new AnimationObserver();
    new CounterAnimation();
});

// 添加移动端导航样式
const mobileNavStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-link {
            margin: 1rem 0;
            font-size: 1.2rem;
        }
        
        .language-switch {
            margin: 2rem 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;

// 动态添加样式
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileNavStyles;
document.head.appendChild(styleSheet); 