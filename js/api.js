const getJobs = async() => {
    showView("spinner")
    let response = await fetch("https://65214fb8a4199548356d0a7d.mockapi.io/api/jobs")
    let data = await response.json()
    setTimeout(() => {
        renderJobs(data);
    }, 2000);
}
getJobs()