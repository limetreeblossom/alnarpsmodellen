// Alnarpsmodellen - Beräkning av återanskaffningskostnad för träd

document.addEventListener('DOMContentLoaded', function() {
    // Setup modal functionality
    setupModal();

    // Setup slider value displays
    setupSliderValueDisplays();

    // Setup form submission
    const form = document.getElementById('calculationForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

// Setup modal for image tooltips
function setupModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');

    // Get all info icons with image-icon class
    const infoIcons = document.querySelectorAll('.info-icon.image-icon');

    // Add click event to each info icon
    infoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const tooltipContent = this.querySelector('.tooltip-content');
            if (tooltipContent) {
                const img = tooltipContent.querySelector('img');
                const p = tooltipContent.querySelector('p');
                
                if (img) {
                    modalImage.src = img.src;
                    modalImage.alt = img.alt;
                }
                
                if (p) {
                    modalDescription.textContent = p.textContent;
                }
                
                modal.style.display = 'block';
            }
        });
    });

    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Setup slider value displays
function setupSliderValueDisplays() {
    const sliders = [
        { id: 'vitality', displayId: 'vitalityValue' },
        { id: 'rootDamage', displayId: 'rootDamageValue' },
        { id: 'stemDamage', displayId: 'stemDamageValue' },
        { id: 'crownDamage', displayId: 'crownDamageValue' }
    ];

    sliders.forEach(slider => {
        const input = document.getElementById(slider.id);
        const display = document.getElementById(slider.displayId);
        
        if (input && display) {
            // Update display on input change
            input.addEventListener('input', function() {
                display.textContent = this.value;
            });
        }
    });
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const stemCircumference = parseFloat(document.getElementById('stemCircumference').value);
    const nurseryPrice = parseFloat(document.getElementById('nurseryPrice').value);
    
    const vitality = parseInt(document.getElementById('vitality').value);
    const rootDamage = parseInt(document.getElementById('rootDamage').value);
    const stemDamage = parseInt(document.getElementById('stemDamage').value);
    const crownDamage = parseInt(document.getElementById('crownDamage').value);
    
    const treeLocation = document.querySelector('input[name="treeLocation"]:checked').value;

    // Validate inputs
    if (isNaN(stemCircumference) || isNaN(nurseryPrice) || stemCircumference <= 0 || nurseryPrice <= 0) {
        alert('Vänligen fyll i alla obligatoriska fält med giltiga värden.');
        return;
    }

    // Perform calculations
    const results = calculateAlnarpsmodellen(
        stemCircumference,
        nurseryPrice,
        vitality,
        rootDamage,
        stemDamage,
        crownDamage,
        treeLocation
    );

    // Display results
    displayResults(results);

    // Scroll to results
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Calculate according to Alnarpsmodellen
function calculateAlnarpsmodellen(stemCircumference, nurseryPrice, vitality, rootDamage, stemDamage, crownDamage, treeLocation) {
    // Constants from the model
    const FOUR_TIMES_PI = 12.56; // 4 × π as specified in PDF
    const NURSERY_TREE_AREA = 13.45; // cm² for size 12-14
    const COST_PER_CM2 = 70; // kr per cm² for establishment
    
    // 1. Calculate area of valued tree
    // Formula: (Stamomkrets²) / (4 × π) where 4 × π = 12.56
    const treeArea = Math.pow(stemCircumference, 2) / FOUR_TIMES_PI;
    
    // 2. Calculate price per cm² for nursery tree
    // Formula: Nursery price / 13.45
    const pricePerCm2 = nurseryPrice / NURSERY_TREE_AREA;
    
    // 3. Calculate tree price
    // Formula: Price per cm² × Area of valued tree
    const treePrice = pricePerCm2 * treeArea;
    
    // 4. Calculate damage and vitality factor
    // Formula: Sum of all assessments / 16
    const damageSum = vitality + rootDamage + stemDamage + crownDamage;
    const damageFactor = damageSum / 16;
    
    // 5. Calculate establishment cost
    let establishmentCost;
    if (treeLocation === 'street') {
        // Street tree: 70 × Area + 20,000 kr (Max: 85,000 kr)
        establishmentCost = COST_PER_CM2 * treeArea + 20000;
        const MAX_STREET_ESTABLISHMENT_COST = 85000;
        establishmentCost = Math.min(establishmentCost, MAX_STREET_ESTABLISHMENT_COST);
    } else {
        // Other location: 70 × Area + 10,000 kr (Max: 75,000 kr)
        establishmentCost = COST_PER_CM2 * treeArea + 10000;
        const MAX_ESTABLISHMENT_COST = 75000;
        establishmentCost = Math.min(establishmentCost, MAX_ESTABLISHMENT_COST);
    }
    
    // 6. Calculate total replacement cost
    // Formula: (Tree price × Damage factor) + Establishment cost
    const totalCost = (treePrice * damageFactor) + establishmentCost;
    
    return {
        treeArea: treeArea,
        pricePerCm2: pricePerCm2,
        treePrice: treePrice,
        damageFactor: damageFactor,
        damageSum: damageSum,
        establishmentCost: establishmentCost,
        totalCost: totalCost
    };
}

// Display calculation results
function displayResults(results) {
    // Format numbers
    const formatNumber = (num, decimals = 2) => {
        return num.toLocaleString('sv-SE', { 
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals 
        });
    };

    const formatCurrency = (num) => {
        return num.toLocaleString('sv-SE', { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
        }) + ' kr';
    };

    // Update result displays
    document.getElementById('treeArea').textContent = formatNumber(results.treeArea, 2) + ' cm²';
    document.getElementById('pricePerCm2').textContent = formatCurrency(results.pricePerCm2);
    document.getElementById('treePrice').textContent = formatCurrency(results.treePrice);
    document.getElementById('damageFactor').textContent = formatNumber(results.damageFactor, 3) + 
        ' (' + results.damageSum + '/16)';
    document.getElementById('establishmentCost').textContent = formatCurrency(results.establishmentCost);
    document.getElementById('totalCost').textContent = formatCurrency(results.totalCost);

    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.classList.remove('hidden');
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateAlnarpsmodellen
    };
}
