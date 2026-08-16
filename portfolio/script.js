document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Dark / Light Theme Toggle Logic
    ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    applyTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
    });

    /* =========================================
       2. Scroll Reveal Animations
    ========================================= */
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    /* =========================================
       3. Secret Modal Logic
    ========================================= */
    const SECRET_WORD = 'coffee'; // The secret word
    const SECRET_IMG_URL = './assets/bouquet.png';

    // Elements
    const secretInput = document.getElementById('secret-input');
    const secretModal = document.getElementById('secret-modal');
    const secretCloseBtn = secretModal.querySelector('.close-modal');
    const secretBackdrop = secretModal.querySelector('.modal-backdrop');

    const iconState = document.getElementById('secret-icon-state');
    const imageState = document.getElementById('secret-image-state');
    const btnView = document.getElementById('btn-view');
    const btnDownload = document.getElementById('btn-download');
    const secretMsg = document.getElementById('secret-msg');

    let imageRevealed = false;

    function openSecretModal() {
        secretModal.classList.remove('hidden');
        secretModal.classList.add('show');
        resetSecretModal();
    }

    function closeSecretModal() {
        secretModal.classList.remove('show');
        setTimeout(() => secretModal.classList.add('hidden'), 200);
    }

    function resetSecretModal() {
        iconState.classList.remove('hidden');
        imageState.classList.add('hidden');
        imageState.src = '';
        btnView.innerText = "View Image";
        imageRevealed = false;
    }

    secretInput.addEventListener('input', e => {
        if (e.target.value.toLowerCase().trim() === SECRET_WORD) {
            e.target.value = '';
            e.target.blur();
            openSecretModal();
        }
    });

    secretCloseBtn.addEventListener('click', closeSecretModal);
    secretBackdrop.addEventListener('click', closeSecretModal);

    // View / Hide Image Logic
    btnView.addEventListener('click', () => {
        if (!imageRevealed) {
            iconState.classList.add('hidden');
            imageState.src = SECRET_IMG_URL;
            imageState.classList.remove('hidden');
            secretMsg.innerText = "You Found a Flower Bouquet \n credit: https://digibouquet.vercel.app";
            btnView.innerText = "Hide Image";
            imageRevealed = true;
        } else {
            iconState.classList.remove('hidden');
            imageState.classList.add('hidden');
            btnView.innerText = "View Image";
            secretMsg.innerText = "Image hidden.";
            imageRevealed = false;
        }
    });

    // Download Logic
    btnDownload.addEventListener('click', async () => {
        const originalText = btnDownload.innerText;
        btnDownload.innerText = "Downloading...";
        try {
            const response = await fetch(SECRET_IMG_URL);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'secret_archive_file.jpg';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);
            btnDownload.innerText = "Downloaded!";
            setTimeout(() => btnDownload.innerText = originalText, 2000);
        } catch (err) {
            console.error(err);
            btnDownload.innerText = "Error!";
            setTimeout(() => btnDownload.innerText = originalText, 2000);
        }
    });

    /* =========================================
       4. Hint Modal Logic
    ========================================= */
    const hintModal = document.getElementById('hint-modal');
    const hintBtn = document.getElementById('show-hint-btn');
    const hintCloseBtn = hintModal.querySelector('.close-modal, #hint-close');
    const hintBackdrop = hintModal.querySelector('.modal-backdrop');

    function openHintModal() {
        hintModal.classList.remove('hidden');
        hintModal.classList.add('show');
    }

    function closeHintModal() {
        hintModal.classList.remove('show');
        setTimeout(() => hintModal.classList.add('hidden'), 200);
    }

    hintBtn.addEventListener('click', openHintModal);
    hintCloseBtn.addEventListener('click', closeHintModal);
    hintBackdrop.addEventListener('click', closeHintModal);

});