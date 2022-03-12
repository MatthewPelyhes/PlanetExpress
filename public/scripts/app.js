console.log("I am connected :)");

const visit = document.querySelector('#custom-launcher')
const boot = document.querySelector("#boot");
const update = document.querySelector("#update");
const shutdown = document.querySelector("#shutdown");

const email = document.querySelector("#email");
const app_ID = document.querySelector("#app_id");
const user_ID = document.querySelector("#user_id");
const user_name = document.querySelector("#user_name");
const company_name = document.querySelector("#company_name")
const company_id = document.querySelector("#company_id")


visit.addEventListener("click", () => {
    window.Intercom('boot', {
        "app_id": `${app_ID.value}`
    })
})

boot.addEventListener("click", ()=> {
    window.Intercom('boot', {  
        "app_id": `${app_ID.value}`,  
        "email": `${email.value}`,
        "user_id": `${user_ID.value}`,
        "name": `${user_name.value}`,
        "company": {
            "id": `${company_id.value}`,
            "name": `${company_name.value}`
        }
    })
    console.log(`${user_name.value}`)
    console.log("clicked boot")
})

update.addEventListener("click", ()=> {
    console.log("You're up to no good!")
    console.log(Date.now());

    window.Intercom('update', {
        "app_id": `${app_ID.value}`,  
        "last_seen_at": `${Date.now()}`
    })
})

shutdown.addEventListener("click", () => {
    Intercom('shutdown')
    window.location.reload()
    console.log('shutdown called')
})


console.log("Test in Terminal")

