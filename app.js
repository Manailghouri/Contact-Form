const inputs = document.querySelectorAll(".input")
const form = document.getElementById("contactForm")

// Focus and blur functionality for animated labels
function focusFunc() {
  const parent = this.parentNode
  parent.classList.add("focus")
}

function blurFunc() {
  const parent = this.parentNode
  if (this.value === "") {
    parent.classList.remove("focus")
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc)
  input.addEventListener("blur", blurFunc)
})

// Form validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateField(field, value) {
  const container = field.parentNode
  const errorMessage = container.querySelector(".error-message")
  
  // Remove previous error state
  container.classList.remove("error")
  errorMessage.style.display = "none"
  
  // Validate based on field type
  if (!value.trim()) {
    showError(container, errorMessage, "This field is required")
    return false
  }
  
  if (field.type === "email" && !validateEmail(value)) {
    showError(container, errorMessage, "Please enter a valid email address")
    return false
  }
  
  if (field.name === "fullName" && value.trim().length < 2) {
    showError(container, errorMessage, "Name must be at least 2 characters long")
    return false
  }
  
  if (field.name === "subject" && value.trim().length < 3) {
    showError(container, errorMessage, "Subject must be at least 3 characters long")
    return false
  }
  
  if (field.name === "message" && value.trim().length < 10) {
    showError(container, errorMessage, "Message must be at least 10 characters long")
    return false
  }
  
  return true
}

function showError(container, errorElement, message) {
  container.classList.add("error")
  errorElement.textContent = message
  errorElement.style.display = "block"
}

function showSuccess(message) {
  const successElement = document.querySelector(".success-message")
  successElement.textContent = message
  successElement.style.display = "block"
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    successElement.style.display = "none"
  }, 5000)
}

// Real-time validation
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (this.value.trim()) {
      validateField(this, this.value)
    }
  })
})

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault()
  
  let isValid = true
  const formData = new FormData(form)
  
  // Validate all fields
  inputs.forEach((input) => {
    if (!validateField(input, input.value)) {
      isValid = false
    }
  })
  
  if (isValid) {
    // Simulate form submission
    const submitBtn = form.querySelector(".btn")
    const originalText = submitBtn.value
    
    submitBtn.value = "Sending..."
    submitBtn.disabled = true
    
    // Simulate API call delay
    setTimeout(() => {
      showSuccess("Thank you! Your message has been sent successfully.")
      form.reset()
      
      // Remove focus classes
      document.querySelectorAll(".input-container").forEach((container) => {
        container.classList.remove("focus")
      })
      
      submitBtn.value = originalText
      submitBtn.disabled = false
    }, 2000)
  } else {
    // Scroll to first error
    const firstError = document.querySelector(".input-container.error")
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }
})

// Initialize form - check for pre-filled values
window.addEventListener("load", () => {
  inputs.forEach((input) => {
    if (input.value.trim() !== "") {
      input.parentNode.classList.add("focus")
    }
  })
})