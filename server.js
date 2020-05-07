const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json());

const PORT = 5000;

//Data Schema 
// {
//     id: "a_unique_id", // hint: use the shortid npm package to generate it
//   name: "Jane Doe", // String, required
//   bio: "Not Tarzan's Wife, another Jane", // String, required
// }

let users = []

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})


//--------------------CREATE // POST REQUEST ----------------------------//
server.post('/api/users', (req,res) => {
    const dta = req.body;
   // console.log("post", dta)
    dta.id = shortid.generate();
    users.push(dta);
    res.status(201).json(dta);
})

//--------------------READ // GET REQUEST ----------------------------//
server.get('/api/users', (req,res) => {
    // res.send("naber")
    //res.json({testing : "checking"})
    res.status(200).json(users);    
})


//--------------------UPDATE // PATCH REQUEST ----------------------------//
server.patch('/api/users/:id', (req,res) => {
    const {id} = req.params;
    const updatedItem = req.body;

    let found = users.find(item => item.id === id);
    if(found){
        Object.assign(found,updatedItem)
        res.status(200).json(found)
    }else{
        res.status(404).json({message: 'The user with the specified ID does not exist.'})
    }
     
})
//--------------------UPDATE // PUT REQUEST ----------------------------//
server.put('/api/users/:id', (req,res) => {
    const {id} = req.params;
    const updatedItem = req.body;

    let index = users.findIndex(user => user.id === id)

    if(index !== -1){
        updatedItem.id = id;
       users[index] = updatedItem;
        res.status(200).json(users[index])
    }else{
        res.status(404).json({message: 'The user with the specified ID does not exist.'})
    }
     
})

//--------------------DELETE // DELETE REQUEST ----------------------------//

server.delete('/api/users/:id', (req,res) => {
        const {id} = req.params;
        const found = users.find( item => item.id === id  )
        
        if(found){
            found.id = id;
            users = users.filter(item => item.id !== id);
            res.status(200).json(found)
        }else{
            res.status(404).json({message:"The user with the specified ID does not exist." })
        }

        // res.status(200).json({message : "success"})
        
})

