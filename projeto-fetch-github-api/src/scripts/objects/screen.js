const screen = {
    userProfile: document.querySelector('.profile-data'),

    renderUser(user) {
        this.userProfile.innerHTML = `<div class='info'>
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                            <div class= "data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                <p>Seguidores: ${user.followers}</p>
                                <p>Seguindo: ${user.following}</p>
                            </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_user}" target="_blank">${repo.name}></a>
                                                                    <div class="container_info space-between">
                                                                        <div class="item">🍴${repo.forks_count}</div>
                                                                        <div class="item">👨‍💻${repo.language}</div>
                                                                        <div class="item">⭐${repo.stargazers_count}</div>
                                                                        <div class="item">👀${repo.watchers_count}</div>
                                                                    </div>
                                                                </li>`);

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>  
                                                <ul>${repositoriesItens}</ul>
                                             </div>
            `
        }

        let eventsItens = ''
        let msn = []

        for (let i = 0; i < user.events.length; i++) {
            if (user.events[i].type == "PushEvent") {
                msn.push(user.events[i].payload.commits[0])
            }
        }

        for(let i = 0; i < msn.length; i++){
            eventsItens += `<li><p><span class="bold">${user.events[i].repo.name}</span> - ${msn[i].message}</p></li>`
        }

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="section events">
                                               <h2>Eventos</h2>
                                               <ul>${eventsItens}</ul>
                                           </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado.</h3>"
    }
}

export { screen }

// undeffined