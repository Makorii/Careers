const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const hideElements = (selectors) => {
    for (const eachSelector of selectors) {
        $(eachSelector).classList.add('visually-hidden')
    }
}

const showElements = (selectors) => {
    for (const eachSelector of selectors) {
        $(eachSelector).classList.remove('visually-hidden')
    }
}

const showView = (view) => {  
    $$(".view").forEach((view) => view.classList.add("visually-hidden"));  
    $(`#${view}`).classList.remove("visually-hidden");
};

let jobs = []; 

const renderJobs = (jobsData) => {
    $("#jobs-list").innerHTML = ""
    showView("jobs-list");
    jobs = jobsData;
    jobs.forEach(({id, name, image, description, location, category, seniority}) => {
        $("#jobs-list").innerHTML += `
        <div class="card p-3 shadow" style="width: 18rem;">
            <div style="height: 127px;" class="d-flex align-items-center">
                <img src="${image}" class="card-img-top" alt="image of job" style="height: 100%;">
            </div>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text description">${description.replace(/\n/g, '<br>')}</p>
            </div>
            <ul class="d-flex gap-3 p-0">
            ${location ? `<li class="list-group-item tag px-1 rounded">${location}</li>` : ''}
            ${category ? `<li class="list-group-item tag px-1 rounded">${category}</li>` : ''}
            ${seniority ? `<li class="list-group-item tag px-1 rounded">${seniority}</li>` : ''}
            </ul>
            <div class="mb-3">
                <a href="#" id="${id}" class="btn btn-tags" onclick="showDetails('${id}')" >See details</a>
            </div>
        </div>
        `
    });
}

//Funcion para traer de manera dinamica los paises
const getCountries = (data) => {
    $("#select-location").innerHTML = `<option selected>Location</option>`
    const countries = []
    data.forEach(element => {
        if (!countries.includes(element.location) && element.location !== "") {
            countries.push(element.location);
            
        }
    });
    return countries.map(country => {
        $("#select-location").innerHTML += `
        <option value="${country}">${country}</option>
        `
    })
}

//Funcion para traer de manera dinamica las categorias
const getCategories = (data) => {
    $("#select-category").innerHTML = `<option selected>Category</option>`
    const categories = []
    data.forEach(element => {
        if(!categories.includes(element.category) && element.category !== ""){
            categories.push(element.category);
        }
    })
    return categories.map(category => {
        $("#select-category").innerHTML += `
        <option value="${category}">${category}</option>
        `
    })
}

//Funcion para traer de manera dinamica los seniorities
const getSeniorities = (data) => {
    $("#select-seniority").innerHTML = `<option selected>Seniority</option>`
    const seniorities = []
    data.forEach(element => {
        if(!seniorities.includes(element.seniority) && element.seniority !== ""){
            seniorities.push(element.seniority)
        }
    })
    return seniorities.map(seniority => {
        $("#select-seniority").innerHTML += `
        <option value="${seniority}">${seniority}</option>
        `
    })
}

//Funcion para que se vea el detalle de cada job
const showDetails = (jobId) => {
    const job = jobs.find(job => job.id === jobId);

    if (job) {
        $("#details-job").innerHTML = `
            <div class="card p-3 shadow" style="width: 20.5rem;" id="card-details">
                <div style="height: 127px;" style="width: 18rem;" class="d-flex align-items-center">
                    <img src="${job.image}" class="card-img-top" alt="image of job" style="height: 100%;">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${job.name}</h5>
                    <p class="card-text">${job.description.replace(/\n/g, '<br>')}</p>
                    <ul class="p-0">Beneficios:
                        ${job.benefits.vacation ? `<li class="list-group-item">Vacaciones: ${job.benefits.vacation ? "Si" : "No"}</li>` : `<li class="list-group-item">Vacaciones: No </li>`}
                        ${job.benefits.health_ensurance ? `<li class="list-group-item">Obra social: ${job.benefits.health_ensurance ? "Si" : "No"}</li>` : `<li class="list-group-item">Obra social: No </li>`}
                        ${job.benefits.internet_paid ? `<li class="list-group-item">Internet pago: ${job.benefits.internet_paid ? "Si" : "No"}</li>` : `<li class="list-group-item">Internet pago: No </li>`}
                    </ul>
                    ${job.salary ? `<p>Salario: $${job.salary}</p>` : ''}
                    ${job.long_term ? `<li class="list-group-item">Contrato a largo plazo: ${job.long_term ? "Si" : "No"}</li>` : `<li class="list-group-item">Contrato a largo plazo: No </li>`}
                    ${job.languages ? `<p>Conocimientos: ${job.languages.join(', ')}</p>` : ''}
                </div>
                <ul class="d-flex gap-3 p-0">
                    ${job.location ? `<li class="list-group-item tag px-1 rounded">${job.location}</li>` : ''}
                    ${job.category ? `<li class="list-group-item tag px-1 rounded">${job.category}</li>` : ''}
                    ${job.seniority ? `<li class="list-group-item tag px-1 rounded">${job.seniority}</li>` : ''}
                </ul>
                <div class="d-flex gap-4 m-2">
                    <a href="#" onclick="showEditJob('${job.id}')" id="${job.id}" class="btn btn-edit">Edit</a>
                    <a href="#" onclick="deleteView('${job.id}')" id="${job.id}" class="btn btn-delete">Delete</a>
                </div>
                
            </div>
        `;
        showView("details-job");
    }
}

//Funcion que muestra el form para editar el job seleccionado
const showEditJob = (jobId) => {
    const job = jobs.find(job => job.id === jobId);
    if (job) {
        const name = job.name || "";
        const description = job.description || "";
        const image = job.image || "";
        const location = job.location || "";
        const seniority = job.seniority || "";
        const category = job.category || "";
        const vacation = job.benefits.vacation || "";
        const health_ensurance = job.benefits.health_ensurance || "";
        const internet_paid = job.benefits.internet_paid || "";
        const salary = job.salary || "";
        const long_term = job.long_term || "";

        $("#details-job").innerHTML += `
        <section class="container py-4 px-0">
            <form class="container border p-4 shadow form rounded">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label"></label>
                        <input type="text" class="form-control" id="title-edit-job" placeholder="Job Title" value="${name}">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" id="description-edit-job" rows="10" cols="50">${description}</textarea>
                    </div>
                    <div class="mb-3">
                        <label for="image-edit-job" class="form-label">URL image</label>
                        <input type="url" name="" id="image-edit-job" value="${image}">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Tags</label>
                        <input type="text" class="form-control" id="location-edit-job" placeholder="Location" value="${location}">
                        <!-- <label for="exampleFormControlInput1" class="form-label"></label> -->
                        <input type="text" class="form-control" id="seniority-edit-job" placeholder="Seniority" value="${seniority}">
                        <!-- <label for="exampleFormControlInput1" class="form-label"></label> -->
                        <input type="text" class="form-control" id="category-edit-job" placeholder="Category" value="${category}">
                        <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Benefits</label>
                    <div class="form-check form-switch">
                    <label class="form-check-label" for="vacation-edit-job">
                        Vacation
                    </label>
                    <input class="form-check-input" role="switch" type="checkbox" value="${vacation}" id="vacation-edit-job" ${vacation ? 'checked' : ''}>
                </div>
                    <div class="form-check form-switch">
                        <label class="form-check-label" for="health_ensurance-edit-job">
                            Health ensurance
                        </label>
                        <input class="form-check-input" role="switch" type="checkbox" value="${health_ensurance}" id="health_ensurance-edit-job" ${health_ensurance ? 'checked' : ''}>
                    </div>
                    <div class="form-check form-switch">
                        <label class="form-check-label" for="internet_paid-edit-job">
                            Internet paid
                        </label>
                        <input class="form-check-input" role="switch" type="checkbox" value="${internet_paid}" id="internet_paid-edit-job" ${internet_paid ? 'checked' : ''}>
                    </div>
                </div>
                <label for="salary-edit-job" class="form-label">Salary</label>
                <p id="salaryValue" class="m-0 salaryValue">$${salary}</p>
                <input type="range" class="form-range d-flex" min="0" max="1000000" step="1000" value="${salary}" oninput="updateSalaryValue(this.value)" style="width: 20rem;" id="salary-edit-job">
                <div class="form-check form-switch">
                    <label class="form-check-label" for="long_term-edit-job">
                        Long term
                    </label>
                    <input class="form-check-input" role="switch" type="checkbox" value="${long_term}" id="long_term-edit-job" ${long_term ? 'checked' : ''}>
                </div>
                <div class="mb-3">
                <label for="lenguages" class="form-label">Conocimientos</label>
                <div class="d-flex">
                    <input type="text" class="form-control" id="lenguages-edit" placeholder="Conocimientos" style="width: 15rem;">
                    <button type="button" class="btn" id="add-lenguages-edit" onclick="updateButtons()">Add</button>
                </div>
                <ul class="list-group list-group-flush" id="ul">
                ${createLanguageButtons(languages)}
                </ul>
            </div>
                    <a href="#" type="submit" class="btn btn-edit mb-3" onclick="editJob('${job.id}')" id="${job.id}">Edit</a>
                </form>
            </section>
        `;
    }
}

let languages = []

const createLanguageButtons = (languages) => {
    let buttons = "";
    for (let language of languages) {
        languages.push(language);
        buttons += `
        <li>
            <button type="button" class="btn btn-lenguages-edit my-1" value="${language}">
                ${language}
            </button>
            <button type="button" class="btn-close" aria-label="Close" onclick="removeLenguage(this, '${language}')"></button>
        </li>
        `;
    }
    return buttons;
}

//Funcion que muestra la card para eliminar un job
const deleteView = (jobId) => {
    const job = jobs.find(job => job.id === jobId);
    if (job) {
    $("#card-details").classList.add("visually-hidden");
    $("#details-job").innerHTML += `
    <div class="card p-3 mx-auto" style="width: 16rem;">
        <div class="modal-body">
            <p>Are you sure to detele this job?</p>
            <div class="mx-auto">
                <a href="#" class="btn btn-delete" onclick="deleteJob('${job.id}')" id="${job.id}">Delete</a>
                <a href="#" class="btn btn-clear" onclick="showView('jobs-list')">Cancel</a>
            </div>
            
        </div>
    </div>
    `
    }
}

const updateSalaryValue = (value) => {
    $$(".salaryValue").forEach((valor) => valor.innerHTML = `$${value}`)
}

const getSelectedLanguages = () => {
    const checkboxes = $$('.btn-check');
    const selectedLanguages = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedLanguages.push(checkbox.id);
        }
    });
    return selectedLanguages;
}

const initializeViews = () => {
    $("#new-job").onclick = () => showView("create-job");
    $("#home").onclick = () => {
        showView("spinner") 
        setTimeout(() => {
            showView("jobs-list");
        }, 1500)
    }; 
}

window.onload = initializeViews()