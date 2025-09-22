// Get input elements
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const resultContainer = document.getElementById('resultContainer');
const resultElement = document.getElementById('result');

// Add input event listeners for real-time validation
num1Input.addEventListener('input', clearMessages);
num2Input.addEventListener('input', clearMessages);

function clearMessages() {
    // Reset to default state
    resultElement.textContent = '0';
    resultElement.classList.add('zero-result');
    resultElement.classList.remove('error-result');
}

function calculate(operation) {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);

    // Validate inputs
    if (num1Input.value.trim() === '' || num2Input.value.trim() === '') {
        showError('input tidak valid. harap masukan angka yang benar');
        return;
    }

    if (isNaN(num1) || isNaN(num2)) {
        showError('input tidak valid. harap masukan angka yang benar');
        return;
    }

    let result;
    let operationSymbol;

    switch(operation) {
        case 'add':
            result = num1 + num2;
            operationSymbol = '+';
            break;
        case 'subtract':
            result = num1 - num2;
            operationSymbol = '-';
            break;
        case 'multiply':
            result = num1 * num2;
            operationSymbol = '×';
            break;
        case 'divide':
            if (num2 === 0) {
                showError('Tidak bisa membagi dengan nol!');
                return;
            }
            result = num1 / num2;
            operationSymbol = '÷';
            break;
    }

    // Format result
    const formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
    
    // Display result
    resultElement.textContent = formattedResult;
    
    // Change color based on result value
    if (formattedResult == 0) {
        resultElement.classList.add('zero-result');
    } else {
        resultElement.classList.remove('zero-result');
    }
    
    // Remove error class if present
    resultElement.classList.remove('error-result');

    // Add animation
    resultContainer.classList.remove('result-animation');
    void resultContainer.offsetWidth; // Trigger reflow
    resultContainer.classList.add('result-animation');
}

function showError(message) {
    // Display error message in result area
    resultElement.textContent = message;
    resultElement.classList.remove('zero-result');
    resultElement.classList.add('error-result');
    
    // Add animation
    resultContainer.classList.remove('result-animation');
    void resultContainer.offsetWidth; // Trigger reflow
    resultContainer.classList.add('result-animation');
}