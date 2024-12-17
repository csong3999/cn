// 简化的滚动效果
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const parallaxBg = document.querySelector('.parallax-bg');

    // 只保留导航栏的滚动效果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 添加图片加载完成的渐入效果
    parallaxBg.addEventListener('load', () => {
        parallaxBg.style.opacity = '1';
    });

    // 添加产品图片轮播功能
    const sliders = document.querySelectorAll('.product-image-slider');
    
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider-image');
        const dots = slider.querySelectorAll('.dot');
        let currentIndex = 0;
        
        // 点击切换图片
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                setActiveImage(index);
            });
        });
        
        // 自动轮播
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            setActiveImage(currentIndex);
        }, 3000);
        
        function setActiveImage(index) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            images[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
    });
}); 