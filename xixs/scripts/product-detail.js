document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-list img');
    const colorBtns = document.querySelectorAll('.color-btn');
    const tabs = document.querySelectorAll('.detail-tab');
    const panels = document.querySelectorAll('.detail-panel');
    
    // 缩略图切换
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // 更新主图
            mainImage.src = this.src;
            // 更新激活状态
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // 更新颜色选择
            const color = this.dataset.color;
            colorBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.color === color);
            });
        });
    });
    
    // 颜色选择
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新图片
            const imageName = this.dataset.image;
            mainImage.src = `assets/images/${imageName}`;
            
            // 添加切换动画
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 50);
            
            // 更新缩略图选中状态
            thumbnails.forEach(thumb => {
                thumb.classList.toggle('active', thumb.dataset.color === this.dataset.color);
            });
        });
    });
    
    // 添加图片悬停效果
    mainImage.addEventListener('mousemove', function(e) {
        const { left, top, width, height } = this.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        this.style.transform = `scale(1.05) translate(${(x - 0.5) * -20}px, ${(y - 0.5) * -20}px)`;
    });
    
    mainImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translate(0, 0)';
    });
    
    // 添加标签切换功能
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有活动状态
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // 添加当前选中状态
            tab.classList.add('active');
            const panel = document.getElementById(tab.dataset.tab);
            if (panel) {
                panel.classList.add('active');
            }

            // 如果切换到产品特性面板，重置图片动画
            if (tab.dataset.tab === 'features') {
                const images = document.querySelectorAll('.feature-image');
                images.forEach((img, index) => {
                    setTimeout(() => {
                        img.classList.add('visible');
                    }, index * 100); // 依次显示图片
                });
            }
        });
    });

    // 添加图片懒加载
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('visible');
                observer.unobserve(img); // 图片显示后停止观察
            }
        });
    }, observerOptions);

    // 观察所有特性图片
    document.querySelectorAll('.feature-image').forEach(img => {
        imageObserver.observe(img);
    });
}); 