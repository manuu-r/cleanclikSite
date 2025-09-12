// Smooth scroll to features section
function scrollToFeatures() {
  document.getElementById("features").scrollIntoView({
    behavior: "smooth",
  });
}

// No longer needed since everything is on one screen

// Email form handling with Formspree integration
document.addEventListener("DOMContentLoaded", function () {
  const emailForm = document.getElementById("email-form");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  if (emailForm) {
    emailForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();

      // Validate email
      if (!validateEmail(email)) {
        showError("Please enter a valid email address.");
        return;
      }

      // Show loading state
      setLoadingState(true);
      hideMessages();

      try {
        const response = await fetch(emailForm.action, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        });

        if (response.ok) {
          showSuccess();
          emailForm.reset();
        } else {
          showError("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        showError("Network error. Please check your connection and try again.");
      } finally {
        setLoadingState(false);
      }
    });
  }

  function setLoadingState(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    if (loading) {
      btnText.style.display = "none";
      btnLoading.style.display = "inline";
    } else {
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
    }
  }

  function showSuccess() {
    if (!successMessage) return;
    successMessage.style.display = "block";
    if (errorMessage) errorMessage.style.display = "none";
  }

  function showError(message) {
    if (!errorMessage) return;
    errorMessage.querySelector("p").textContent = `⚠️ ${message}`;
    errorMessage.style.display = "block";
    if (successMessage) successMessage.style.display = "none";
  }

  function hideMessages() {
    if (successMessage) successMessage.style.display = "none";
    if (errorMessage) errorMessage.style.display = "none";
  }

  // QR Code Print Button
  const printBtn = document.getElementById("print-qr-btn");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  // Scroll animations
  const animatedElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
