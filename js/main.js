const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);



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
        const location = job.location || "";
        const seniority = job.seniority || "";
        const category = job.category || "";

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
                        <label for="exampleFormControlInput1" class="form-label">Tags</label>
                        <input type="text" class="form-control" id="location-edit-job" placeholder="Location" value="${location}">
                        <!-- <label for="exampleFormControlInput1" class="form-label"></label> -->
                        <input type="text" class="form-control" id="seniority-edit-job" placeholder="Seniority" value="${seniority}">
                        <!-- <label for="exampleFormControlInput1" class="form-label"></label> -->
                        <input type="text" class="form-control" id="category-edit-job" placeholder="Category" value="${category}">
                    </div>
                    <a href="#" type="submit" class="btn btn-edit mb-3" onclick="editJob('${job.id}')" id="${job.id}">Edit</a>
                </form>
            </section>
        `;
    }
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