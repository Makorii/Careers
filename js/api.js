// funcion que trae los datos
const getJobs = async() => {
    showView("spinner")
    let response = await fetch("https://65214fb8a4199548356d0a7d.mockapi.io/api/jobs")
    let data = await response.json()
    setTimeout(() => {
        renderJobs(data);
    }, 2000);
}
getJobs()

// funcion que agrega un nuevo job
const addNewJob = async (id) => {
    showView("spinner")
    let response = await fetch("https://65214fb8a4199548356d0a7d.mockapi.io/api/jobs", {
        method: "POST",
        body: JSON.stringify({
            name: $("#title-new-job").value,
            description: $("#description-new-job").value,
            image: "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg",
            location: $("#location-new-job").value,
            seniority: $("#seniority-new-job").value,
            category: $("#category-new-job").value,
            id: id,
        }),
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        } 
    })
    let data = await response.json()
    setTimeout(() => {
        getJobs(data)
        
    }, 2000);
}

$("#submit-new-job").addEventListener("click", () => addNewJob())

const editJob = async (id) => {
    showView("spinner")
    let response = await fetch(`https://65214fb8a4199548356d0a7d.mockapi.io/api/jobs/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            name: $("#title-edit-job").value,
            description: $("#description-edit-job").value,
            location: $("#location-edit-job").value,
            seniority: $("#seniority-edit-job").value,
            category: $("#category-edit-job").value,
        }),
        headers:{
            'Content-type':'application/json',
        } 
    })
    let data = await response.json()
    setTimeout(() => {
        getJobs(data)
        
    }, 2000);
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