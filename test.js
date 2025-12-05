const characters = [
    {
        name: "Эдвард Каллен",
        image: "edward3.jpg",
        badge: "Вампир-романтик",
        description: "Ты - Эдвард Каллен! Загадочный, интеллигентный и романтичный. Ты ценишь искренние чувства и готов на всё ради любимого человека. Твоя преданность не знает границ, а внутренняя борьба между разумом и чувствами делает тебя особенно интересным."
    },
    {
        name: "Белла Свон",
        image: "bella3.jpg",
        badge: "Преданная душа",
        description: "Ты - Белла Свон! Скромная, но невероятно сильная духом. Ты готова пожертвовать всем ради тех, кого любишь. Твоя преданность и способность видеть хорошее в каждом делают тебя особенной."
    },
    {
        name: "Джейкоб Блэк",
        image: "jacob3.jpg",
        badge: "Верный защитник",
        description: "Ты - Джейкоб Блэк! Страстный, преданный и готовый защищать своих близких до конца. Твоя энергия и жизнерадостность заразительны, а верность друзьям - твоя главная черта."
    },
    {
        name: "Элис Каллен",
        image: "elice3.jpg",
        badge: "Энергичная провидица",
        description: "Ты - Элис Каллен! Яркая, энергичная и непредсказуемая. Ты обладаешь отличной интуицией и всегда находишься в центре событий. Твой оптимизм и стиль вдохновляют окружающих."
    },
    {
        name: "Карлайл Каллен",
        image: "carlisle3.jpg",
        badge: "Мудрый лидер",
        description: "Ты - Карлайл Каллен! Мудрый, спокойный и заботливый. Ты всегда думаешь о других и стремишься помогать людям. Твоя мудрость и терпение делают тебя естественным лидером."
    },
    {
        name: "Виктория",
        image: "viktoria3.jpg",
        badge: "Независимая красавица",
        description: "Ты - Виктория! Независимая, сильная и уверенная в себе. Ты знаешь себе цену и не позволяешь другим диктовать свои правила. Твоя красота скрывает железную волю."
    }
];

const questions = document.querySelectorAll('.question');
const options = document.querySelectorAll('.option');
const progress = document.getElementById('progress');
const progressText = document.getElementById('progress-text');
const result = document.getElementById('result');
const resultCharacter = document.getElementById('result-character');
const restartBtn = document.getElementById('restart-btn');
const nextButtons = document.querySelectorAll('.next-btn');

let currentQuestion = 0;

function selectOption(clickedOption) {
    const question = clickedOption.closest('.question');
    const optionsInQuestion = question.querySelectorAll('.option');
    
    optionsInQuestion.forEach(option => {
        option.classList.remove('selected');
    });
    
    clickedOption.classList.add('selected');
    
    const nextBtn = question.querySelector('.next-btn');
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        const currentQ = questions[currentQuestion];
        currentQ.classList.remove('active');
        currentQ.classList.add('leaving');
        
        setTimeout(() => {
            currentQ.classList.remove('leaving');
            currentQuestion++;
            questions[currentQuestion].classList.add('active');
            updateProgress();
        }, 300);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        const currentQ = questions[currentQuestion];
        currentQ.classList.remove('active');
        currentQ.classList.add('leaving');
        
        setTimeout(() => {
            currentQ.classList.remove('leaving');
            currentQuestion--;
            questions[currentQuestion].classList.add('active');
            updateProgress();
        }, 300);
    }
}

function updateProgress() {
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    progress.style.width = `${progressPercent}%`;
    progressText.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
}

function showRandomResult() {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const character = characters[randomIndex];
    
    const currentQ = questions[currentQuestion];
    currentQ.classList.remove('active');
    currentQ.classList.add('leaving');
    
    setTimeout(() => {
        result.classList.add('active');
        
        resultCharacter.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <div class="badge">${character.badge}</div>
            <div class="result-description">
                <p>${character.description}</p>
            </div>
        `;
    }, 300);
}

function restartQuiz() {
    options.forEach(option => option.classList.remove('selected'));
    
    nextButtons.forEach(btn => btn.disabled = true);
    
    result.classList.remove('active');
    questions.forEach((question, index) => {
        question.classList.remove('active', 'leaving');
        if (index === 0) {
            setTimeout(() => question.classList.add('active'), 50);
        }
    });
    
    currentQuestion = 0;
    updateProgress();
}

options.forEach(option => {
    option.addEventListener('click', () => selectOption(option));
});

document.getElementById('next1').addEventListener('click', nextQuestion);
document.getElementById('next2').addEventListener('click', nextQuestion);
document.getElementById('next3').addEventListener('click', nextQuestion);
document.getElementById('next4').addEventListener('click', nextQuestion);

document.getElementById('prev2').addEventListener('click', prevQuestion);
document.getElementById('prev3').addEventListener('click', prevQuestion);
document.getElementById('prev4').addEventListener('click', prevQuestion);
document.getElementById('prev5').addEventListener('click', prevQuestion);

document.getElementById('show-result').addEventListener('click', showRandomResult);
restartBtn.addEventListener('click', restartQuiz);

updateProgress();