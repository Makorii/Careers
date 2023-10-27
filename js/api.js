const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const showView = (view) => {  
    $$(".view").forEach((view) => view.classList.add("visually-hidden"));  
    $(`#${view}`).classList.remove("visually-hidden");
};

// funcion que trae los datos
const getJobs = async() => {
    showView("spinner")
    let response = await fetch("https://65214fb8a4199548356d0a7d.mockapi.io/api/jobs")
    let data = await response.json()
    setTimeout(() => {
        initialize(data);
    }, 2000);
}
getJobs()

// funcion que agrega un nuevo job
const addNewJob = async () => {
    showView("spinner");
    const newJob = createNewJob(lenguages)
    const response = await fetch("https://65214fb8a4199548356d0a7d.mockapi.io/api/jobs", {
        method: "POST",
        body: JSON.stringify(newJob),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    const data = await response.json();
    if (data) {
        setTimeout(() => {
            getJobs();
            showElements(["#search-bar"])
        }, 2000);
    }
}

const createNewJob = (languages) => {
    return {
        name: $("#title-new-job").value,
        description: $("#description-new-job").value,
        image: $("#image-new-job").value,
        location: $("#location-new-job").value,
        seniority: $("#seniority-new-job").value,
        category: $("#category-new-job").value,
        benefits: {
            vacation: $("#vacation-new-job").checked,
            health_ensurance: $("#health_ensurance-new-job").checked,
            internet_paid: $("#internet_paid-new-job").checked
        },
        salary: $("#salary-new-job").value,
        long_term: $("#long_term-new-job").checked,
        languages: languages,
    };
}

const editJob = async (id) => {
    showView("spinner");
    let response = await fetch(`https://65214fb8a4199548356d0a7d.mockapi.io/api/jobs/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            name: $("#title-edit-job").value,
            image: $("#image-edit-job").value,
            description: $("#description-edit-job").value,
            location: $("#location-edit-job").value,
            seniority: $("#seniority-edit-job").value,
            category: $("#category-edit-job").value,
            benefits: {
                vacation: $("#vacation-edit-job").checked,
                health_ensurance: $("#health_ensurance-edit-job").checked,
                internet_paid: $("#internet_paid-edit-job").checked
            },
            salary: $("#salary-edit-job").value,
            long_term: $("#long_term-edit-job").checked,
            languages: languages
        }),
        headers: {
            'Content-type': 'application/json',
        }
    });

    let data = await response.json();
    if (data) {
        setTimeout(() => {
            getJobs();
            showElements(["#search-bar"]);
        }, 2000);
    }
}

const deleteJob = async (id) => {
    showView("spinner")
    let response = await fetch(`https://65214fb8a4199548356d0a7d.mockapi.io/api/jobs/${id}`, {
        method: "DELETE",
        headers: {},
        body: "",
    })
    let data = await response.json()
    setTimeout(() => {
        getJobs(data)
        
    }, 2000);
}

const initialize = (data) => {
    renderJobs(data)
    getCountries(data)
    getCategories(data)
    getSeniorities(data)
}

window.onload = getJobs();