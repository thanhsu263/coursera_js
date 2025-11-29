document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    let currentIndex = 0;
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <span class="prev">&#10094;</span>
        <span class="next">&#10095;</span>
        <img class="lightbox-img" src="" alt="">
        <div class="caption"></div>
        <div class="counter"></div>
    `;
    document.body.appendChild(lightbox);
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const caption = lightbox.querySelector('.caption');
    const counter = lightbox.querySelector('.counter');
    const closeBtn = lightbox.querySelector('.close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');
    images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function updateLightbox() {
        const currentImg = images[currentIndex];
        lightboxImg.src = currentImg.src;
        caption.textContent = currentImg.alt;
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    }
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });

    
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .lightbox-img {
            max-width: 90%;
            max-height: 80%;
            object-fit: contain;
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        .close, .prev, .next {
            position: absolute;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s;
            padding: 10px;
        }

        .close {
            top: 20px;
            right: 40px;
        }

        .close:hover {
            color: #ff6600;
            transform: rotate(90deg);
        }

        .prev {
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }

        .next {
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }

        .prev:hover, .next:hover {
            color: #ff6600;
            transform: translateY(-50%) scale(1.2);
        }

        .caption {
            color: white;
            text-align: center;
            padding: 15px;
            font-size: 18px;
            margin-top: 10px;
        }

        .counter {
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 16px;
        }

        
        img {
            transition: transform 0.3s, box-shadow 0.3s;
        }

        img:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(255, 102, 0, 0.3);
        }

        @media (max-width: 768px) {
            .close { top: 10px; right: 20px; font-size: 30px; }
            .prev, .next { font-size: 30px; }
            .lightbox-img { max-width: 95%; max-height: 70%; }
        }
    `;
    document.head.appendChild(style);
});
