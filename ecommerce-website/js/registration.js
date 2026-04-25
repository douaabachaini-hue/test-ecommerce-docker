// Registration Form Validation and Dynamic Interactions

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const fields = {
        lastName: document.getElementById('lastName'),
        firstName: document.getElementById('firstName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        username: document.getElementById('username'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        terms: document.getElementById('terms')
    };

    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');

    // City data based on country
    const citiesByCountry = {
        usa: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
        canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
        uk: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
        france: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
        germany: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne']
    };

    // Populate cities based on country selection
    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        citySelect.innerHTML = '<option value="">Sélectionner une ville</option>';
        
        if (selectedCountry && citiesByCountry[selectedCountry]) {
            citiesByCountry[selectedCountry].forEach(city => {
                const option = document.createElement('option');
                option.value = city.toLowerCase().replace(/\s+/g, '-');
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
        
        // Add visual feedback
        if (selectedCountry) {
            citySelect.style.borderColor = '#6C7A89';
        }
    });

    // Real-time validation for each field
    Object.keys(fields).forEach(fieldName => {
        if (fields[fieldName]) {
            fields[fieldName].addEventListener('blur', () => validateField(fieldName));
            fields[fieldName].addEventListener('input', () => {
                if (fieldName === 'password') {
                    validatePasswordStrength();
                }
                if (fieldName === 'confirmPassword') {
                    validatePasswordMatch();
                }
            });
        }
    });

    // Focus effects
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.backgroundColor = 'rgba(217, 217, 217, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.backgroundColor = '';
        });
    });

    // Checkbox and radio button visual feedback
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            const label = this.closest('label');
            if (this.checked) {
                label.style.boxShadow = '0 0 10px rgba(108, 122, 137, 0.5)';
                setTimeout(() => {
                    label.style.boxShadow = '';
                }, 300);
            }
        });
    });

    // Validate individual field
    function validateField(fieldName) {
        const field = fields[fieldName];
        const errorElement = document.getElementById(fieldName + 'Error');
        const iconElement = document.getElementById(fieldName + 'Icon');
        
        if (!field) return true;

        let isValid = true;
        let errorMessage = '';

        switch(fieldName) {
            case 'lastName':
            case 'firstName':
            case 'username':
                if (!field.value.trim()) {
                    isValid = false;
                    errorMessage = 'Ce champ est requis';
                } else if (field.value.trim().length < 2) {
                    isValid = false;
                    errorMessage = 'Doit contenir au moins 2 caractères';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!field.value.trim()) {
                    isValid = false;
                    errorMessage = 'L\'email est requis';
                } else if (!emailRegex.test(field.value)) {
                    isValid = false;
                    errorMessage = 'Format d\'email invalide';
                }
                break;

            case 'phone':
                if (field.value.trim()) {
                    // Tunisian phone number formats: +216 XX XXX XXX, 00 216 XX XXX XXX, 216 XX XXX XXX, or XX XXX XXX (8 digits)
                    const phoneRegex = /^(\+?216|00\s?216|216)?[\s\-]?([2-9][0-9]{7}|[2-9][0-9]{2}[\s\-]?[0-9]{3}[\s\-]?[0-9]{3})$/;
                    if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
                        isValid = false;
                        errorMessage = 'Format de numéro de téléphone tunisien invalide (ex. : +216 XX XXX XXX)';
                    }
                }
                break;

            case 'password':
                isValid = validatePassword();
                if (!isValid) {
                    errorMessage = 'Le mot de passe ne respecte pas les exigences';
                }
                break;

            case 'confirmPassword':
                isValid = validatePasswordMatch();
                if (!isValid) {
                    errorMessage = 'Les mots de passe ne correspondent pas';
                }
                break;

            case 'terms':
                if (!field.checked) {
                    isValid = false;
                    errorMessage = 'Vous devez accepter les conditions générales';
                }
                break;
        }

        // Update UI
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
        
        if (iconElement) {
            iconElement.className = 'validation-icon';
            if (field.value.trim()) {
                iconElement.classList.add(isValid ? 'valid' : 'invalid');
            }
        }

        field.style.borderColor = isValid ? '#6C7A89' : '#2E2E2E';
        
        return isValid;
    }

    // Validate password strength
    function validatePassword() {
        const password = fields.password.value;
        const requirements = {
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        // Update requirement indicators
        Object.keys(requirements).forEach(req => {
            const element = document.getElementById('req-' + req);
            if (element) {
                element.className = requirements[req] ? 'valid' : 'invalid';
            }
        });

        return Object.values(requirements).every(req => req === true);
    }

    function validatePasswordStrength() {
        validatePassword();
    }

    function validatePasswordMatch() {
        const password = fields.password.value;
        const confirmPassword = fields.confirmPassword.value;
        
        if (!confirmPassword) return false;
        
        const isValid = password === confirmPassword;
        const iconElement = document.getElementById('confirmPasswordIcon');
        
        if (iconElement) {
            iconElement.className = 'validation-icon';
            if (confirmPassword) {
                iconElement.classList.add(isValid ? 'valid' : 'invalid');
            }
        }
        
        fields.confirmPassword.style.borderColor = isValid ? '#6C7A89' : '#2E2E2E';
        
        return isValid;
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all required fields
        let isFormValid = true;
        Object.keys(fields).forEach(fieldName => {
            if (fields[fieldName] && fields[fieldName].hasAttribute('required')) {
                if (!validateField(fieldName)) {
                    isFormValid = false;
                }
            }
        });

        // Validate password match
        if (!validatePasswordMatch()) {
            isFormValid = false;
        }

        if (isFormValid) {
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            form.reset();
            
            // Reset all validation indicators
            document.querySelectorAll('.validation-icon').forEach(icon => {
                icon.className = 'validation-icon';
            });
            
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
            
            // Reset password requirements
            document.querySelectorAll('#password-requirements li').forEach(li => {
                li.className = '';
            });
            
            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.closest('.form-field').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Form reset
    form.addEventListener('reset', function() {
        // Reset all validation indicators
        document.querySelectorAll('.validation-icon').forEach(icon => {
            icon.className = 'validation-icon';
        });
        
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        document.querySelectorAll('input, select').forEach(input => {
            input.style.borderColor = '';
            input.style.backgroundColor = '';
        });
        
        // Reset password requirements
        document.querySelectorAll('#password-requirements li').forEach(li => {
            li.className = '';
        });
        
        // Reset city dropdown
        citySelect.innerHTML = '<option value="">Sélectionner une ville</option>';
        
        // Reset preferences
        resetPreferences();
    });
});

// Popup Functions
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        // Load existing values when opening popup
        if (popupId === 'newsletterPopup') {
            loadNewsletterValues();
        } else if (popupId === 'genderPopup') {
            loadGenderValue();
        } else if (popupId === 'interestsPopup') {
            loadInterestsValue();
        }
        
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function loadNewsletterValues() {
    const newsletterValue = document.getElementById('newsletter').value;
    const promotionsValue = document.getElementById('promotions').value;
    
    document.getElementById('popupNewsletter').checked = newsletterValue === 'true';
    document.getElementById('popupPromotions').checked = promotionsValue === 'true';
}

function loadGenderValue() {
    const genderValue = document.getElementById('gender').value;
    if (genderValue) {
        const radio = document.querySelector(`input[name="popupGender"][value="${genderValue}"]`);
        if (radio) {
            radio.checked = true;
        }
    }
}

function loadInterestsValue() {
    const interestsValue = document.getElementById('interests').value;
    if (interestsValue) {
        const radio = document.querySelector(`input[name="popupInterests"][value="${interestsValue}"]`);
        if (radio) {
            radio.checked = true;
        }
    }
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup-modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Newsletter & Offers Functions
function updateNewsletterStatus() {
    // This function is called when checkboxes change, but status is updated on save
}

function saveNewsletterPreferences() {
    const newsletter = document.getElementById('popupNewsletter').checked;
    const promotions = document.getElementById('popupPromotions').checked;
    
    // Update hidden inputs
    document.getElementById('newsletter').value = newsletter ? 'true' : '';
    document.getElementById('promotions').value = promotions ? 'true' : '';
    
    // Update status display
    const status = document.getElementById('newsletterStatus');
    const selected = [];
    if (newsletter) selected.push('Newsletter');
    if (promotions) selected.push('Promotions');
    
    if (selected.length > 0) {
        status.textContent = '(' + selected.join(', ') + ')';
        status.classList.add('has-value');
    } else {
        status.textContent = '';
        status.classList.remove('has-value');
    }
    
    closePopup('newsletterPopup');
}

// Gender Functions
function updateGenderStatus() {
    // This function is called when radio changes, but status is updated on save
}

function saveGenderPreference() {
    const selectedGender = document.querySelector('input[name="popupGender"]:checked');
    
    if (selectedGender) {
        document.getElementById('gender').value = selectedGender.value;
        
        // Update status display
        const status = document.getElementById('genderStatus');
        const genderLabels = {
            'male': 'Homme',
            'female': 'Femme',
            'other': 'Autre',
            'prefer-not-to-say': 'Je préfère ne pas le dire'
        };
        status.textContent = '(' + genderLabels[selectedGender.value] + ')';
        status.classList.add('has-value');
    } else {
        document.getElementById('gender').value = '';
        const status = document.getElementById('genderStatus');
        status.textContent = '';
        status.classList.remove('has-value');
    }
    
    closePopup('genderPopup');
}

// Interest Categories Functions
function updateInterestsStatus() {
    // This function is called when radio changes, but status is updated on save
}

function saveInterestsPreference() {
    const selectedInterest = document.querySelector('input[name="popupInterests"]:checked');
    
    if (selectedInterest) {
        document.getElementById('interests').value = selectedInterest.value;
        
        // Update status display
        const status = document.getElementById('interestsStatus');
        const interestLabels = {
            'Bois olives': 'bois olive',
            'couffin': 'couffin',
            'home': 'Maison & Décoration',
            'faux bijouts': 'faux bijouts'
        };
        status.textContent = '(' + interestLabels[selectedInterest.value] + ')';
        status.classList.add('has-value');
    } else {
        document.getElementById('interests').value = '';
        const status = document.getElementById('interestsStatus');
        status.textContent = '';
        status.classList.remove('has-value');
    }
    
    closePopup('interestsPopup');
}

// Reset preferences function
function resetPreferences() {
    // Reset newsletter
    document.getElementById('popupNewsletter').checked = false;
    document.getElementById('popupPromotions').checked = false;
    document.getElementById('newsletter').value = '';
    document.getElementById('promotions').value = '';
    document.getElementById('newsletterStatus').textContent = '';
    document.getElementById('newsletterStatus').classList.remove('has-value');
    
    // Reset gender
    document.querySelectorAll('input[name="popupGender"]').forEach(radio => {
        radio.checked = false;
    });
    document.getElementById('gender').value = '';
    document.getElementById('genderStatus').textContent = '';
    document.getElementById('genderStatus').classList.remove('has-value');
    
    // Reset interests
    document.querySelectorAll('input[name="popupInterests"]').forEach(radio => {
        radio.checked = false;
    });
    document.getElementById('interests').value = '';
    document.getElementById('interestsStatus').textContent = '';
    document.getElementById('interestsStatus').classList.remove('has-value');
}

