/**
 * Maid & Nanny Service Management Platform - Application Architecture Module MVP
 * Contains Model Datasets, Filtering Interfaces and State Engines.
 */

// 1. PHASE 1 DOMAIN CONTEXT RECORD INSTANCES (Sample Service Data Models)
const HELPER_REGISTRY = [
    {
        id: 101,
        name: "Amina Al-Mansoor",
        type: "Maid",
        experience: 5,
        rating: 4.9,
        plans: ["Hourly", "Monthly"],
        pricing: { Hourly: "$15/hr", Monthly: "$600/mo" },
        availability: "Full-Time",
        verified: true
    },
    {
        id: 102,
        name: "Sarah Jenkins",
        type: "Babysitter",
        experience: 3,
        rating: 4.7,
        plans: ["Hourly"],
        pricing: { Hourly: "$20/hr" },
        availability: "Weekends Only",
        verified: true
    },
    {
        id: 103,
        name: "Maria Rodriguez",
        type: "Nanny",
        experience: 8,
        rating: 5.0,
        plans: ["Monthly", "Yearly"],
        pricing: { Monthly: "$1200/mo", Yearly: "$13000/yr" },
        availability: "Live-in Option Available",
        verified: true
    },
    {
        id: 104,
        name: "Florence Carter",
        type: "Maid",
        experience: 4,
        rating: 4.6,
        plans: ["Hourly", "Monthly", "Yearly"],
        pricing: { Hourly: "$12/hr", Monthly: "$500/mo", Yearly: "$5500/yr" },
        availability: "Flexible Placement",
        verified: true
    },
    {
        id: 105,
        name: "Elena Rostova",
        type: "Nanny",
        experience: 6,
        rating: 4.8,
        plans: ["Monthly"],
        pricing: { Monthly: "$1100/mo" },
        availability: "Full-Time Days",
        verified: true
    }
];

// Operational Reactive Engine Local States
let runtimeBookings = [];
let targetActiveHelper = null;

// Initialize Application Component Hooks
document.addEventListener("DOMContentLoaded", () => {
    renderHelperGrid(HELPER_REGISTRY);
    refreshPlatformKPIs();
});

/**
 * Views Manager Logic: Evaluates interface transitions across target sections
 * @param {string} targetViewId Element ID structure target to display
 */
function switchView(targetViewId) {
    document.querySelectorAll(".view-section").forEach(view => {
        view.classList.add("hidden");
    });
    
    document.getElementById(targetViewId).classList.remove("hidden");

    // Track state styles inside global header navigation arrays
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === `#${targetViewId.split('-')[0]}`) {
            link.classList.add("active");
        }
    });
    window.scrollTo(0,0);
}

/**
 * UI Grid Generator Engine: Appends operational models inside the search matrix container
 * @param {Array} collection Dataset Array containing registry entries
 */
function renderHelperGrid(collection) {
    const grid = document.getElementById("helper-grid");
    grid.innerHTML = "";

    if (collection.length === 0) {
        grid.innerHTML = `<div class="text-center w-100" style="grid-column: 1/-1; padding: 40px; color: var(--text-muted);">
            <h3>No certified matching helpers found. Try adjusting options.</h3>
        </div>`;
        return;
    }

    collection.forEach(helper => {
        const card = document.createElement("div");
        card.className = "helper-card";
        
        // Construct display structures for preferred structural rate definitions
        let pricingHTML = "";
        for (const [plan, rate] of Object.entries(helper.pricing)) {
            pricingHTML += `<strong>${plan}:</strong> ${rate} &nbsp; `;
        }

        card.innerHTML = `
            <div class="helper-info">
                ${helper.verified ? `<span class="badge-verified">✓ Background Verified</span>` : ''}
                <h4>${helper.name}</h4>
                <div class="helper-type">${helper.type}</div>
                <div class="helper-meta">⭐ <strong>${helper.rating}</strong> Rating Score</div>
                <div class="helper-meta">💼 <strong>${helper.experience} Years</strong> Industry Experience</div>
                <div class="helper-meta">📅 Availability: <em>${helper.availability}</em></div>
                <div class="helper-pricing">
                    ${pricingHTML}
                </div>
            </div>
            <button class="btn btn-primary" onclick="initiateBookingWorkflow(${helper.id})">Request Subscription Booking</button>
        `;
        grid.appendChild(card);
    });
}

/**
 * Marketplace Filtering Engine
 */
function applyFilters() {
    const searchVal = document.getElementById("search-input").value.toLowerCase();
    const typeVal = document.getElementById("type-filter").value;
    const planVal = document.getElementById("plan-filter").value;

    const pipelineResults = HELPER_REGISTRY.filter(helper => {
        const matchesSearch = helper.name.toLowerCase().includes(searchVal);
        const matchesType = (typeVal === "all") || (helper.type === typeVal);
        const matchesPlan = (planVal === "all") || (helper.plans.includes(planVal));
        
        return matchesSearch && matchesType && matchesPlan;
    });

    renderHelperGrid(pipelineResults);
}

function resetFilters() {
    document.getElementById("search-input").value = "";
    document.getElementById("type-filter").value = "all";
    document.getElementById("plan-filter").value = "all";
    renderHelperGrid(HELPER_REGISTRY);
}

/**
 * Booking Transition Pipeline Management Actions
 * @param {number} helperId Unique targeting identification key
 */
function initiateBookingWorkflow(helperId) {
    const helperMatch = HELPER_REGISTRY.find(h => h.id === helperId);
    if (!helperMatch) return;

    targetActiveHelper = helperMatch;
    
    // Parse target values configuration arrays elements out to screen elements dynamically
    const containerSummary = document.getElementById("booking-details-summary");
    containerSummary.innerHTML = `
        <div style="margin: 15px 0; padding: 15px; background: var(--background-light); border-radius:6px;">
            <p><strong>Helper Candidate Selected:</strong> ${helperMatch.name} (${helperMatch.type})</p>
            <p><strong>Standard Baseline Experience:</strong> ${helperMatch.experience} Years</p>
            <p><strong>Available Pricing Plans Context:</strong> Setup confirmation values depend on choices made below during live phase updates.</p>
        </div>
    `;

    switchView("booking-view");
}

/**
 * Intercept transactional submissions, mutating functional admin registries safely
 * @param {Event} event Event object context tracker passing downstream
 */
function executeBooking(event) {
    event.preventDefault();
    
    const selectedDate = document.getElementById("start-date").value;
    const notesInput = document.getElementById("household-notes").value;

    const newBookingInstance = {
        bookingId: "BK-" + Math.floor(100000 + Math.random() * 900000),
        helperName: targetActiveHelper.name,
        planType: targetActiveHelper.plans.join(" / "),
        startDate: selectedDate,
        status: "Pending Admin Approval"
    };

    runtimeBookings.push(newBookingInstance);
    
    // Reset structural forms elements variables
    document.getElementById("booking-form").reset();
    
    // Synchronize global metric indexes arrays configurations parameters
    refreshPlatformKPIs();
    updateAdminBookingsTable();

    alert(`Success! Booking request ${newBookingInstance.bookingId} created. The request is currently sitting under review parameters within the Admin Panel.`);
    
    switchView("marketplace-view");
}

/**
 * Dashboard KPI Metric Renderers
 */
function refreshPlatformKPIs() {
    document.getElementById("kpi-helpers").innerText = HELPER_REGISTRY.length;
    document.getElementById("kpi-bookings").innerText = runtimeBookings.length;
}

/**
 * Populates operational data analytics view modules tables
 */
function updateAdminBookingsTable() {
    const tbody = document.getElementById("admin-bookings-table");
    tbody.innerHTML = "";

    if (runtimeBookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center" style="color: var(--text-muted);">No booking requests made yet.</td></tr>`;
        return;
    }

    runtimeBookings.forEach(b => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${b.bookingId}</strong></td>
            <td>${b.helperName}</td>
            <td>${b.planType}</td>
            <td>${b.startDate}</td>
            <td><span style="background:#fef3c7; color:#92400e; padding:3px 8px; border-radius:4px; font-size:12px; font-weight:600;">${b.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}