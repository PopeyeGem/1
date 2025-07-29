// Advanced Calculator JS Functions - Popeye Gym
// وظائف الحاسبة المتقدمة لجيم باباي

// Show alert function
function showAlert(message, type = 'warning') {
    const alert = document.getElementById('alert');
    const alertMessage = document.getElementById('alert-message');

    if (!alert || !alertMessage) {
        console.log('Alert elements not found');
        return;
    }

    alert.className = `alert alert-${type} show`;
    alertMessage.textContent = message;

    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);
}

// Calculate calories and nutrition
function calculateCalories() {
    // Get input values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    const experience = document.getElementById('experience').value;
    const bodyFat = parseFloat(document.getElementById('body-fat').value) || null;

    // Validation
    if (!age || !gender || !weight || !height || !activity || !goal || !experience) {
        showAlert('يرجى ملء جميع الحقول المطلوبة لحساب احتياجاتك بدقة');
        return;
    }

    if (age < 10 || age > 100) {
        showAlert('يرجى إدخال عمر صحيح (10-100 سنة)');
        return;
    }

    if (weight < 20 || weight > 300) {
        showAlert('يرجى إدخال وزن صحيح (20-300 كيلوغرام)');
        return;
    }

    if (height < 100 || height > 250) {
        showAlert('يرجى إدخال طول صحيح (100-250 سم)');
        return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (bodyFat) {
        // Katch-McArdle formula (more accurate with body fat)
        const leanBodyMass = weight * (1 - (bodyFat / 100));
        bmr = 370 + (21.6 * leanBodyMass);
    } else {
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
    }

    // Calculate TDEE based on activity level
    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
    };

    const tdee = bmr * activityFactors[activity];

    // Calculate calories based on goal
    let calories;
    switch (goal) {
        case 'lose':
            calories = tdee * 0.8; // 20% deficit
            break;
        case 'gain':
            calories = tdee * 1.15; // 15% surplus
            break;
        default:
            calories = tdee;
            break;
    }

    // Calculate macronutrients based on goal and experience
    let proteinPerKg, carbPercentage, fatPercentage;

    // Protein calculation
    switch (experience) {
        case 'beginner':
            proteinPerKg = goal === 'gain' ? 1.6 : (goal === 'lose' ? 1.8 : 1.4);
            break;
        case 'intermediate':
            proteinPerKg = goal === 'gain' ? 1.8 : (goal === 'lose' ? 2.2 : 1.6);
            break;
        case 'advanced':
            proteinPerKg = goal === 'gain' ? 2.0 : (goal === 'lose' ? 2.5 : 1.8);
            break;
    }

    const protein = weight * proteinPerKg;

    // Fat calculation (20-30% of calories)
    fatPercentage = goal === 'lose' ? 0.25 : 0.30;
    const fats = (calories * fatPercentage) / 9;

    // Carbs calculation (remaining calories)
    const carbs = (calories - (protein * 4) - (fats * 9)) / 4;

    // Calculate BMI
    const bmi = weight / Math.pow(height / 100, 2);

    // Display results
    const caloriesResult = document.getElementById('calories-result');
    const proteinResult = document.getElementById('protein-result');
    const carbsResult = document.getElementById('carbs-result');
    const fatsResult = document.getElementById('fats-result');
    const bmrResult = document.getElementById('bmr-result');
    const bmiResult = document.getElementById('bmi-result');

    if (caloriesResult) caloriesResult.textContent = Math.round(calories);
    if (proteinResult) proteinResult.textContent = Math.round(protein);
    if (carbsResult) carbsResult.textContent = Math.round(carbs);
    if (fatsResult) fatsResult.textContent = Math.round(fats);
    if (bmrResult) bmrResult.textContent = Math.round(bmr);
    if (bmiResult) bmiResult.textContent = bmi.toFixed(1);

    // Show results section
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        resultsSection.classList.add('show');

        // Scroll to results
        resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    showAlert('تم حساب احتياجاتك بنجاح!', 'success');
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key support
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT')) {
                calculateCalories();
            }
        }
    });

    // Auto-focus first input
    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.focus();
    }

    // Add input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove any non-numeric characters except decimal point
            this.value = this.value.replace(/[^0-9.]/g, '');
        });
    });

    console.log('Calculator JavaScript loaded successfully - Popeye Gym');
});// Advanced Calculator JS Functions - Popeye Gym
// وظائف الحاسبة المتقدمة لجيم باباي

// Show alert function
function showAlert(message, type = 'warning') {
    const alert = document.getElementById('alert');
    const alertMessage = document.getElementById('alert-message');

    if (!alert || !alertMessage) {
        console.log('Alert elements not found');
        return;
    }

    alert.className = `alert alert-${type} show`;
    alertMessage.textContent = message;

    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);
}

// Calculate calories and nutrition
function calculateCalories() {
    // Get input values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    const experience = document.getElementById('experience').value;
    const bodyFat = parseFloat(document.getElementById('body-fat').value) || null;

    // Validation
    if (!age || !gender || !weight || !height || !activity || !goal || !experience) {
        showAlert('يرجى ملء جميع الحقول المطلوبة لحساب احتياجاتك بدقة');
        return;
    }

    if (age < 10 || age > 100) {
        showAlert('يرجى إدخال عمر صحيح (10-100 سنة)');
        return;
    }

    if (weight < 20 || weight > 300) {
        showAlert('يرجى إدخال وزن صحيح (20-300 كيلوغرام)');
        return;
    }

    if (height < 100 || height > 250) {
        showAlert('يرجى إدخال طول صحيح (100-250 سم)');
        return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (bodyFat) {
        // Katch-McArdle formula (more accurate with body fat)
        const leanBodyMass = weight * (1 - (bodyFat / 100));
        bmr = 370 + (21.6 * leanBodyMass);
    } else {
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
    }

    // Calculate TDEE based on activity level
    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
    };

    const tdee = bmr * activityFactors[activity];

    // Calculate calories based on goal
    let calories;
    switch (goal) {
        case 'lose':
            calories = tdee * 0.8; // 20% deficit
            break;
        case 'gain':
            calories = tdee * 1.15; // 15% surplus
            break;
        default:
            calories = tdee;
            break;
    }

    // Calculate macronutrients based on goal and experience
    let proteinPerKg, carbPercentage, fatPercentage;

    // Protein calculation
    switch (experience) {
        case 'beginner':
            proteinPerKg = goal === 'gain' ? 1.6 : (goal === 'lose' ? 1.8 : 1.4);
            break;
        case 'intermediate':
            proteinPerKg = goal === 'gain' ? 1.8 : (goal === 'lose' ? 2.2 : 1.6);
            break;
        case 'advanced':
            proteinPerKg = goal === 'gain' ? 2.0 : (goal === 'lose' ? 2.5 : 1.8);
            break;
    }

    const protein = weight * proteinPerKg;

    // Fat calculation (20-30% of calories)
    fatPercentage = goal === 'lose' ? 0.25 : 0.30;
    const fats = (calories * fatPercentage) / 9;

    // Carbs calculation (remaining calories)
    const carbs = (calories - (protein * 4) - (fats * 9)) / 4;

    // Calculate BMI
    const bmi = weight / Math.pow(height / 100, 2);

    // Display results
    const caloriesResult = document.getElementById('calories-result');
    const proteinResult = document.getElementById('protein-result');
    const carbsResult = document.getElementById('carbs-result');
    const fatsResult = document.getElementById('fats-result');
    const bmrResult = document.getElementById('bmr-result');
    const bmiResult = document.getElementById('bmi-result');

    if (caloriesResult) caloriesResult.textContent = Math.round(calories);
    if (proteinResult) proteinResult.textContent = Math.round(protein);
    if (carbsResult) carbsResult.textContent = Math.round(carbs);
    if (fatsResult) fatsResult.textContent = Math.round(fats);
    if (bmrResult) bmrResult.textContent = Math.round(bmr);
    if (bmiResult) bmiResult.textContent = bmi.toFixed(1);

    // Show results section
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        resultsSection.classList.add('show');

        // Scroll to results
        resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    showAlert('تم حساب احتياجاتك بنجاح!', 'success');
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key support
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT')) {
                calculateCalories();
            }
        }
    });

    // Auto-focus first input
    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.focus();
    }

    // Add input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove any non-numeric characters except decimal point
            this.value = this.value.replace(/[^0-9.]/g, '');
        });
    });

    console.log('Calculator JavaScript loaded successfully - Popeye Gym');
});