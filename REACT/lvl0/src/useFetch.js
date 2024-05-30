import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [erro, setErro] = useState(null)
    useEffect(() => {
        const abortCont = new AbortController() // para dar fetch no erro de um fetch ser intorrompido durante sua execução, por exemplo trocar de página.

        // setTimeout usado para poder visualizar o loading de 1 segundo.
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then((res) => {
                    if (!res.ok) {
                        // quando da throw em um erro, é possivel dar catch nele.
                        throw Error('erro ao dar fetch nos dados deste endpoint.')
                    }
                    return res.json()
                })
                .then((res) => {
                    console.log(res)
                    setData(res)
                    setIsPending(false)
                    setErro(null)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch abortado')
                    } else {
                        setErro(err.message)
                        setIsPending(false)
                    }
                })
        }, 1000)
        return () => {
            abortCont.abort()
        }
    }, [url])
    return { data, isPending, erro }
}

export default useFetch;
