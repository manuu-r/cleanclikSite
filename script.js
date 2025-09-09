// Smooth scroll to features section
function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
}

// No longer needed since everything is on one screen

// Email form handling with Formspree integration
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('email-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        
        // Validate email
        if (!validateEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        hideMessages();
        
        try {
            // For demo purposes, we'll simulate the Formspree submission
            // In production, replace with actual Formspree endpoint
            const response = await simulateFormSubmission(email);
            
            if (response.ok) {
                showSuccess();
                emailForm.reset();
            } else {
                showError('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showError('Network error. Please check your connection and try again.');
        } finally {
            setLoadingState(false);
        }
    });
    
    function setLoadingState(loading) {
        submitBtn.disabled = loading;
        if (loading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }
    
    function showSuccess() {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    }
    
    function showError(message) {
        errorMessage.querySelector('p').textContent = `⚠️ ${message}`;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
    
    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }
    
    // Simulate form submission for demo (replace with actual Formspree in production)
    async function simulateFormSubmission(email) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo, always return success
        // In production, this would be:
        // return fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email: email })
        // });
        
        return { ok: true };
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});