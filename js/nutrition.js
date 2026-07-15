// ============================================
// NUTRITION PAGE - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // CALORIE CALCULATOR
    // ============================================
    const calorieForm = document.getElementById('calorieForm');

    if (calorieForm) {
        calorieForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const gender = document.getElementById('gender').value;
            const age = parseInt(document.getElementById('age').value);
            const weight = parseInt(document.getElementById('weight').value);
            const height = parseInt(document.getElementById('height').value);
            const activity = parseFloat(document.getElementById('activity').value);

            // BMR calculation using Mifflin-St Jeor Equation
            let bmr;
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }

            // TDEE (Total Daily Energy Expenditure)
            const tdee = Math.round(bmr * activity);

            // Display result
            document.getElementById('calorieValue').textContent = tdee + ' แคลอรี่/วัน';
            document.getElementById('resultDesc').innerHTML = `
                <strong>BMR (พลังงานพื้นฐาน):</strong> ${Math.round(bmr)} แคลอรี่/วัน<br>
                <strong>TDEE (พลังงานที่ต้องการต่อวัน):</strong> ${tdee} แคลอรี่/วัน<br><br>
                <em>หมายเหตุ:</em> นี่คือปริมาณแคลอรี่โดยประมาณเพื่อรักษาน้ำหนักปัจจุบัน
                หากต้องการลดน้ำหนัก ควรลดลง 300-500 แคลอรี่ต่อวัน
            `;

            const resultElement = document.getElementById('result');
            resultElement.classList.add('show');
            resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // ============================================
    // GSAP SCROLL ANIMATIONS
    // ============================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate stats
        gsap.from('.stat-card', {
            scrollTrigger: {
                trigger: '.quick-stats',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1
        });

        // Animate guide cards
        gsap.from('.guide-card', {
            scrollTrigger: {
                trigger: '.nutrition-guide',
                start: 'top 80%'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15
        });

        // Animate tips
        gsap.from('.tip-item', {
            scrollTrigger: {
                trigger: '.nutrition-tips',
                start: 'top 80%'
            },
            x: -50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        });

        // Animate calculator
        gsap.from('.calculator-container', {
            scrollTrigger: {
                trigger: '.food-calculator',
                start: 'top 80%'
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8
        });
    }

});
