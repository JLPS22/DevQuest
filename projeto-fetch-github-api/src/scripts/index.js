import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if(validateEmptyInput(userName)) return
    getUserData(userName);
});



// async function x(userName){
//     const n = await getRepositories(userName)
//     console.log(n[1].forks_count)
//     console.log(n[1].language)
//     console.log(n[1].stargazers_count)
//     console.log(n[1].watchers_count)
// }
// x("torvalds")




document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPress = key === 13;
    
    if (isEnterKeyPress) {
        if(validateEmptyInput(userName)) return
        getUserData(userName);
    }
    
});

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub');
        return true;
    }
}

async function getUserData(userName) {
    
    const userResponse = await getUser(userName);

    if(userResponse.message === "Not Found"){
        screen.renderNotFound();
        return 
    }

    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse)

    screen.renderUser(user);
}