const getUser = async (id) => {
    const endpoint = `https://reqres.in/api/users?id=${id}`
    return fetch(endpoint)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}

const exibirUser = async (id) => {
    const nome = await getUser(id)
    console.log(`nome do usuario acessado: ${nome.data.email}`)
}

exibirUser(3)

