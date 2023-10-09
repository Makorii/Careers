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

const initializeViews = () => {
    $("#new-job").onclick = () => showView("create-job");
}

window.onload = initializeViews()