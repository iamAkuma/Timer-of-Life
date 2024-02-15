document.addEventListener('DOMContentLoaded', function () {
    const dobInput = document.getElementById('dob');
    const submitBtn = document.getElementById('submitBtn');
    const ageDisplay = document.getElementById('age');
    let backBtn; // Declare back button variable

    // Function to update age display
    function updateAgeDisplay(dob) {
        const age = calculateAge(dob);
        const formattedAge = formatAge(age);
        ageDisplay.textContent = formattedAge;
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

    // Function to format age
    function formatAge(age) {
        return `${padNumber(age.years)}Y:${padNumber(age.months)}M:${padNumber(age.days)}D:${padNumber(age.hours)}H:${padNumber(age.minutes)}M:${padNumber(age.seconds)}S`;
    }

    // Function to add leading zero if number is less than 10
    function padNumber(number) {
        return (number < 10) ? `0${number}` : `${number}`;
    }

    // Event listener for submit button click
    submitBtn.addEventListener('click', function () {
        const dob = new Date(dobInput.value);
        updateAgeDisplay(dob);

        // Hide input fields and show age display
        document.getElementById('dobContainer').style.display = 'none';
        ageDisplay.style.display = 'block';

        // Update age display every second
        setInterval(function () {
            updateAgeDisplay(dob);
        }, 1000);

        // Check if back button exists and remove it before adding a new one
        if (backBtn) {
            ageDisplay.removeChild(backBtn);
        }

        // Create back button
        backBtn = document.createElement('button');
        backBtn.textContent = 'Back';
        backBtn.className = 'button-back';

        // Event listener for back button click
        backBtn.addEventListener('click', function () {
            // Show input fields and hide age display
            document.getElementById('dobContainer').style.display = 'block';
            ageDisplay.style.display = 'none';

            // Remove back button from the DOM
            ageDisplay.removeChild(backBtn);
        });

        // Append back button to age display section
        ageDisplay.appendChild(backBtn);
    });

    // Event listener for Enter keypress on the input field
    dobInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            submitBtn.click(); // Simulate click on submit button
        }
    });
});
