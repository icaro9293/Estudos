const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/User')
const Message = require('./models/Message')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const ws = require('ws')
const fs = require('fs')

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
const jwtSecret = process.env.JWT_SECRET
const bcryptSalt = bcrypt.genSaltSync(10)

const app = express()
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
const port = process.env.PORT || 4000

const getUserDataFromRequest = async (req) => {
    return new Promise((resolve, reject) => {
        const { token } = req.cookies
        console.log('token usando a forma direta desconstruindo', token)


        if (token) {
            jwt.verify(token, jwtSecret, {}, (err, userData) => {
                if (err) {
                    throw err
                }
                console.log('userData dentro do jwt.verify: ', userData)
                resolve(userData)
            })
        } else {
            reject('no token')
        }
    })
}

app.get('/test', (req, res) => {
    res.json('teste ok')
})

//filtrar mensagens do usuário selecionado.
app.get('/messages/:userId', async (req, res) => {
    const { userId } = req.params
    const userData = await getUserDataFromRequest(req) //dados do usuário logado, que está no cookie.
    const ourUserId = userData.userId
    const mensagens = await Message.find({
        //verificação se no sender e recipiente está o id selecionado ou o meu próprio id. Pode ser q somos o sender e o receptor é o id selecionado ou vice-versa.
        sender: { $in: [userId, ourUserId] },
        receptor: { $in: [userId, ourUserId] }
    }).sort({ createdAt: 1 })
    res.json(mensagens)
})

app.get('/users', async (req, res) => {
    const users = await User.find({}, { '_id': true, username: true })
    res.json(users)
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies
    console.log('token usando a forma direta desconstruindo', token)

    const data = req.cookies
    const userToken = {
        token2: data.token
    }
    console.log('token com a outra forma', userToken)

    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            //no frontend não é possivel ler esse token pois esta codificado com o 'jwtSecret'
            if (err) {
                throw err
            }
            console.log('userData dentro do jwt.verify: ', userData)
            // const { id, username } = userData
            res.json(userData)
        })
    } else {
        res.status(401).json('no token')
    }

})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const foundUser = await User.findOne({ username })
    if (foundUser) {
        console.log(foundUser)
        const passOk = bcrypt.compareSync(password, foundUser.password)
        if (passOk) {
            jwt.sign({
                userId: foundUser._id,
                username: foundUser.username
            }, jwtSecret, {}, (err, token) => {
                res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                    id: foundUser._id
                })
            })
        }
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok')
})

app.post('/register', async (req, res) => {
    try {
        const data = req.body
        const hashedPassword = bcrypt.hashSync(data.password, bcryptSalt)
        const userData = {
            username: data.username,
            password: hashedPassword
        }
        // ou
        // const {username,password} = req.body 

        const user = await User.create(userData)
        //terceiro parametro de sign() é options, aqui não é necessario.
        jwt.sign({
            userId: user._id,
            username: user.username
        }, jwtSecret, {}, (err, token) => {
            if (err) {
                throw err
            }
            //opção 'sameSite' é o browser mandar o cookie para site com diferente hostname, no caso é de 127.0.0.1 para localhost.
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: user._id,
                username: user.username
            })
        })
    } catch (error) {
        if (error) {
            throw error
        }
        res.status(500).json('error')
    }
})

const server = app.listen(port, () => {
    console.log('servidor rodando na porta ' + port)
})

//ws é a biblioteca web socket. Com o cookie é feito a verificação de quem está logado.
const wss = new ws.WebSocketServer({ server })
wss.on('connection', (connection, req) => { //event listener

    const notifyAboutOnlineUsers = () => {
        [...wss.clients].forEach((client) => {
            client.send(JSON.stringify({
                online: [...wss.clients].map((c) => {
                    return { userId: c.userId, username: c.username }
                })
            }))
        })
    }


    connection.isAlive = true
    connection.timer = setInterval(() => {
        connection.ping()
        connection.deathTimer = setTimeout(() => {
            connection.isAlive = false
            clearInterval(connection.timer)
            connection.terminate()
            notifyAboutOnlineUsers()
        }, 1000);
    }, 5000);

    connection.on('pong', () => {
        clearTimeout(connection.deathTimer)
    })


    //ler username e id do cookie para os users conectados.
    const cookies = req.headers.cookie
    // o cookie que foi criado no 'sign' com userId e username pode ser resgatado neste request.
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(string => string.startsWith('token=')) // os cookies são recebidos me uma única string, é necessário separar.

        if (tokenCookieString) {
            //depois é necessário remover 'token=' da string, o split irá separar a string em 2 aonde tem o '=', e irá armazenar apenas a da posição 1 que é o valor do token.
            const token = tokenCookieString.split('=')[1]
            if (token) {
                console.log('token: ', token)
                jwt.verify(token, jwtSecret, {}, (err, userData) => {
                    if (err) {
                        throw err
                    }
                    console.log('dados do usuario: ', userData)
                    const { userId, username } = userData
                    connection.userId = userId
                    connection.username = username
                })
            }
        }
    }
    //pegar os clients conectados ao wss e ver quem está online. O react renderiza o componente 2 vezes ao inicializar, por isso aparece 2 itens na lista.
    console.log([...wss.clients].map((c) => {
        return 'usuários online: ' + c.username
    }))

    connection.on('message', async (msg) => {
        // a mensagem é recebida em buffer binário. A 'message' é o ws.send da função sendMessage()
        const mensagem = JSON.parse(msg.toString()) //msg é recebido da função sendMessage do submit do formulário.
        const { receptor, text, file } = mensagem
        let fileName = null

        if (file) {
            const parts = file.name.split('.')
            const ext = parts[parts.length - 1] // pegando a ultima parte 
            fileName = Date.now() + '.' + ext
            const path = __dirname + '/uploads/' + fileName
            const bufferData = new Buffer(file.data.split(',')[1], 'base64')
            fs.writeFile(path, bufferData, () => {
                console.log('arquivo salvo', path)
            })
        }

        if (receptor && (text || file)) {
            const messageDoc = await Message.create({
                sender: connection.userId,
                receptor: receptor,
                text: text,
                file: file ? fileName : null
            });

            //mensagem que o receptor receberá. Este id é o id gerado pelo mongoose de cada mensagem _id.
            //aqui é necessário dar filter no client pois o usuário pode estar logado em mais de 1 dispositivo, então pode ser que tenha mais de 1, por isso o forEach.
            [...wss.clients].filter(c => c.userId === receptor).forEach(c => c.send(JSON.stringify({
                text,
                sender: connection.userId,
                receptor: receptor,
                file: file ? fileName : null,
                _id: messageDoc._id
            })))
        }
    })

    // notificar sobre quem está online
    notifyAboutOnlineUsers()

})

