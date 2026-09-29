// ========================================
// EVENT DATA
// ========================================

const events = [

    {
        id: 1,
        title: "Coding Hackathon",
        icon: "💻",
        date: "15 October 2026",
        time: "10:00 AM",
        venue: "Computer Lab",
        description:
            "A 24-hour coding challenge where students build innovative projects."
    },

    {
        id: 2,
        title: "College Cultural Fest",
        icon: "🎤",
        date: "20 October 2026",
        time: "5:00 PM",
        venue: "College Auditorium",
        description:
            "Enjoy music, dance, drama and exciting cultural performances."
    },

    {
        id: 3,
        title: "Technical Workshop",
        icon: "🤖",
        date: "25 October 2026",
        time: "11:00 AM",
        venue: "Seminar Hall",
        description:
            "Learn about modern technologies and software development."
    },

    {
        id: 4,
        title: "Cricket Tournament",
        icon: "🏏",
        date: "30 October 2026",
        time: "8:00 AM",
        venue: "College Ground",
        description:
            "Participate in an exciting inter-college cricket tournament."
    },

    {
        id: 5,
        title: "Career Seminar",
        icon: "🎓",
        date: "5 November 2026",
        time: "2:00 PM",
        venue: "Main Auditorium",
        description:
            "Meet industry professionals and learn about career opportunities."
    },

    {
        id: 6,
        title: "Music Festival",
        icon: "🎵",
        date: "10 November 2026",
        time: "6:00 PM",
        venue: "Open Ground",
        description:
            "An evening filled with live music, performances and entertainment."
    }

];


// ========================================
// DOM ELEMENTS
// ========================================

const eventContainer =
    document.getElementById("eventContainer");

const eventSelect =
    document.getElementById("eventSelect");

const registrationForm =
    document.getElementById("registrationForm");

const registrationList =
    document.getElementById("registrationList");

const searchInput =
    document.getElementById("searchInput");

const totalRegistrations =
    document.getElementById("totalRegistrations");

const totalEvents =
    document.getElementById("totalEvents");

const successMessage =
    document.getElementById("successMessage");


// ========================================
// LOAD REGISTRATIONS
// ========================================

let registrations =
    JSON.parse(localStorage.getItem("registrations")) || [];


// ========================================
// DISPLAY EVENTS
// ========================================

function displayEvents(eventData = events) {

    eventContainer.innerHTML = "";

    if (eventData.length === 0) {

        eventContainer.innerHTML = `
            <p class="no-registration">
                No events found.
            </p>
        `;

        return;
    }


    eventData.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";


        card.innerHTML = `

            <div class="event-icon">
                ${event.icon}
            </div>

            <h3>
                ${event.title}
            </h3>

            <p>
                ${event.description}
            </p>

            <div class="event-info">

                <span>
                    📅 <strong>Date:</strong>
                    ${event.date}
                </span>

                <span>
                    ⏰ <strong>Time:</strong>
                    ${event.time}
                </span>

                <span>
                    📍 <strong>Venue:</strong>
                    ${event.venue}
                </span>

            </div>

            <button
                class="btn register-event-btn"
                onclick="selectEvent(${event.id})"
            >
                Register
            </button>
        `;


        eventContainer.appendChild(card);

    });

}


// ========================================
// POPULATE EVENT SELECT
// ========================================

function populateEventSelect() {

    eventSelect.innerHTML = `
        <option value="">
            -- Select an Event --
        </option>
    `;


    events.forEach(event => {

        const option =
            document.createElement("option");

        option.value = event.id;

        option.textContent = event.title;

        eventSelect.appendChild(option);

    });

}


// ========================================
// SELECT EVENT
// ========================================

function selectEvent(eventId) {

    eventSelect.value = eventId;

    document
        .getElementById("register")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// SEARCH EVENTS
// ========================================

searchInput.addEventListener(
    "input",
    function () {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        const filteredEvents =
            events.filter(event => {

                return (

                    event.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    event.description
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    event.venue
                        .toLowerCase()
                        .includes(searchText)

                );

            });


        displayEvents(filteredEvents);

    }
);


// ========================================
// REGISTER USER
// ========================================

registrationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const phone =
            document
                .getElementById("phone")
                .value
                .trim();


        const eventId =
            Number(eventSelect.value);


        if (!name || !email || !phone || !eventId) {

            alert(
                "Please fill all the fields."
            );

            return;
        }


        const selectedEvent =
            events.find(
                event => event.id === eventId
            );


        // Check duplicate registration
        const alreadyRegistered =
            registrations.some(registration =>

                registration.email === email &&
                registration.eventId === eventId

            );


        if (alreadyRegistered) {

            alert(
                "You have already registered for this event."
            );

            return;
        }


        // Create registration object

        const registration = {

            id: Date.now(),

            name: name,

            email: email,

            phone: phone,

            eventId: eventId,

            eventName: selectedEvent.title,

            date: selectedEvent.date,

            venue: selectedEvent.venue

        };


        // Add registration

        registrations.push(registration);


        // Save to LocalStorage

        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );


        // Success message

        successMessage.textContent =
            `🎉 ${name}, you successfully registered for ${selectedEvent.title}!`;


        // Reset form

        registrationForm.reset();


        // Update UI

        displayRegistrations();

        updateStatistics();


        // Scroll to registrations

        setTimeout(() => {

            document
                .getElementById("registrations")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 700);

    }
);


// ========================================
// DISPLAY REGISTRATIONS
// ========================================

function displayRegistrations() {

    registrationList.innerHTML = "";


    if (registrations.length === 0) {

        registrationList.innerHTML = `

            <div class="no-registration">

                <h3>
                    No registrations yet.
                </h3>

                <p>
                    Register for an event to see it here.
                </p>

            </div>

        `;

        return;
    }


    registrations.forEach(registration => {

        const card =
            document.createElement("div");

        card.className =
            "registration-card";


        card.innerHTML = `

            <h3>
                👤 ${registration.name}
            </h3>

            <p>
                📧 ${registration.email}
            </p>

            <p>
                📱 ${registration.phone}
            </p>

            <p>
                🎫 <strong>
                    ${registration.eventName}
                </strong>
            </p>

            <p>
                📅 ${registration.date}
            </p>

            <p>
                📍 ${registration.venue}
            </p>

            <button
                class="cancel-btn"
                onclick="cancelRegistration(${registration.id})"
            >
                Cancel Registration
            </button>

        `;


        registrationList.appendChild(card);

    });

}


// ========================================
// CANCEL REGISTRATION
// ========================================

function cancelRegistration(id) {

    const confirmation =
        confirm(
            "Are you sure you want to cancel this registration?"
        );


    if (!confirmation) {

        return;

    }


    registrations =
        registrations.filter(
            registration =>
                registration.id !== id
        );


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    displayRegistrations();

    updateStatistics();

}


// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics() {

    totalRegistrations.textContent =
        registrations.length;


    totalEvents.textContent =
        events.length;

}


// ========================================
// INITIALIZE WEBSITE
// ========================================

displayEvents();

populateEventSelect();

displayRegistrations();

updateStatistics();