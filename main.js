document.addEventListener('DOMContentLoaded', () => {
    const indicator = document.getElementById('arrowIndicator');
    const currentValueDisplay = document.getElementById('currentValueDisplay');
    const keyboardContainer = document.getElementById('keyboard');
    const ticksContainer = document.querySelector('.indicator-ticks');
    const body = document.body;

    const minValue = parseInt(indicator.min);
    const maxValue = parseInt(indicator.max);

    // Создаем кнопки клавиатуры
    for (let i = 0; i <= 9; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.dataset.value = i;
        button.addEventListener('click', () => {
            const value = parseInt(button.dataset.value);
            indicator.value = value;
            updateIndicatorAppearance(value);
            // Для обновления thumb position в некоторых браузерах при программном изменении
            const event = new Event('input', { bubbles: true });
            indicator.dispatchEvent(event);
        });
        keyboardContainer.appendChild(button);
    }

    // Создаем тики (деления)
    for (let i = minValue; i <= maxValue; i++) {
        const tick = document.createElement('span');
        tick.textContent = i;
        ticksContainer.appendChild(tick);
    }
     // Выравниваем тики по ширине. Первый и последний тики нужно позиционировать точно по краям.
    const tickElements = ticksContainer.querySelectorAll('span');
    tickElements.forEach((tick, index) => {
        const percent = (index / (maxValue - minValue)) * 100;
        if (index === 0) {
            tick.style.transform = 'translateX(0%)'; // Начало
        } else if (index === tickElements.length - 1) {
            tick.style.transform = 'translateX(-100%)'; // Конец
        } else {
             // Для промежуточных тиков, пытаемся центрировать над делением
            tick.style.transform = `translateX(-50%)`;
        }
        // Для space-between этого может быть достаточно, но для точного позиционирования:
        // tick.style.left = `${percent}%`;
    });


    // Функция обновления вида индикатора и фона
    function updateIndicatorAppearance(value) {
        currentValueDisplay.textContent = value;
        if (value > 5) {
            body.classList.add('high-value-active');
            indicator.classList.add('high-value');
            currentValueDisplay.classList.add('high-value');
        } else {
            body.classList.remove('high-value-active');
            indicator.classList.remove('high-value');
            currentValueDisplay.classList.remove('high-value');
        }
    }

    // Обновление при ручном перемещении слайдера
    indicator.addEventListener('input', (event) => {
        updateIndicatorAppearance(parseInt(event.target.value));
    });

    // Инициализация при загрузке
    updateIndicatorAppearance(parseInt(indicator.value));
});