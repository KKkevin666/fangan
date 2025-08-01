// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击菜单项时关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // 考虑固定导航栏高度
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 滚动动画观察器
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.background-card, .feature-card, .goal-item, .timeline-item, .value-card, .guarantee-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 数字计数动画
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// 当统计数字进入视口时开始动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const text = statNumber.textContent;
                if (text.includes('29,000')) {
                    animateCounter(statNumber, 29000);
                } else if (text.includes('1+2')) {
                    statNumber.textContent = '1+2';
                } else if (text.includes('8')) {
                    animateCounter(statNumber, 8);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
});

// 图片加载处理
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    console.log('找到图片数量:', images.length);
    
    images.forEach((img, index) => {
        console.log(`图片 ${index + 1}:`, img.src);
        
        // 确保图片默认可见
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
        
        // 添加加载错误处理
        img.onerror = function() {
            console.error('图片加载失败:', this.src);
            this.style.display = 'none';
        };
        
        // 添加加载成功处理
        img.onload = function() {
            console.log('图片加载成功:', this.src);
            this.style.opacity = '1';
            this.style.visibility = 'visible';
            this.style.display = 'block';
        };
    });
});

// 联系按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', () => {
            alert('感谢您的关注！请联系我们获取更多详细信息。\n\n电话：400-123-4567\n邮箱：info@example.com');
        });
    }
});

// 页面加载完成后的初始化
window.addEventListener('load', () => {
    // 移除加载动画类（如果有的话）
    document.body.classList.add('loaded');
    
    // 为卡片添加悬停效果
    const cards = document.querySelectorAll('.background-card, .feature-card, .value-card, .guarantee-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// 性能优化：节流滚动事件
let ticking = false;

function updateScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

