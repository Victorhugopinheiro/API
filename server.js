import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())




app.post('/usuarios', async(req,res) => {

    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
    
})

app.get('/usuarios', async (req,res) =>{

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where:{
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else{

        await prisma.user.findMany()
    }
    
    

    res.status(200).json(users)

})


app.put('/usuarios/:id', async(req,res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
    
})


app.delete('/usuarios/:id', async (req,res) =>{

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message:"usuário deletado com sucesso!"})

})

app.listen(3000)


/*
Criar Nossa API de usuários

-Criar um Usuário
-Listar todos os usuários
-editar um usuário
-Deletar um Usuário


*/