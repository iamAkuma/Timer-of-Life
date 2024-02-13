document.addEventListener('DOMContentLoaded', function () {
    const dobInput = document.getElementById('dob');
    const ageDisplay = document.getElementById('age');

    // Function to update age display
    function updateAgeDisplay(dob) {
        const age = calculateAge(dob);
        ageDisplay.textContent = `You are ${age.years} years, ${age.months} months, ${age.days} days, ${age.hours} hours, ${age.minutes} minutes, and ${age.seconds} seconds old.`;
    }

    // Function to calculate age
    function calculateAge(dob) {
        const now = new Date();
        const diff = now - dob;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return {
            years,
            months,
            days,
            hours,
            minutes,
            seconds
        };
    }

    // Function to continuously update age display
    function startTimer() {
        const dob = new Date(dobInput.value);
        updateAgeDisplay(dob);
        setInterval(function () {
            updateAgeDisplay(dob);
        }, 1000); // Update every second
    }

    // Event listener for input change
    dobInput.addEventListener('change', startTimer);

    // Start the timer immediately if a date is already selected
    if (dobInput.value) {
        startTimer();
    }
});
