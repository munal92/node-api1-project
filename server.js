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
   if(dta.name && dta.bio){

    try {
        dta.id = shortid.generate();
        users.push(dta);
        res.status(201).json(dta);
      }
      catch(err) {
        res.status(500).json({errorMessage: "There was an error while saving the user to the database" })
      }



   
   }else{
       res.status(400).json({errorMessage: "Please provide name and bio for the user." })
   }
   
})

//--------------------READ // GET REQUEST ----------------------------//
server.get('/api/users', (req,res) => {
    // res.send("naber")
    //res.json({testing : "checking"})
    try {
        res.status(200).json(users);    
      }
      catch(err) {
        res.status(500).json({errorMessage: "The users information could not be retrieved." })
      }


   
})

//--------------------READ // GET REQUEST ----------------------------//
server.get('/api/users/:id', (req,res) => {
    const {id} = req.params
     const reqData = req.body;
     let found = users.find(item => item.id === id);


   


     if(found){
        try {
            res.status(200).json(found);    
          }
          catch(err) {
            res.status(500).json({errorMessage: "The users information could not be retrieved." })
          }
       
     }else{
        res.status(404).json({message: "The user with the specified ID does not exist."} );    
     }
    
   
})


//--------------------UPDATE // PATCH REQUEST ----------------------------//
server.patch('/api/users/:id', (req,res) => {
    const {id} = req.params;
    const updatedItem = req.body;

    let found = users.find(item => item.id === id);

    if(updatedItem.id && updatedItem.name && updatedItem.bio ){

        try {
            Object.assign(found,updatedItem)
            res.status(200).json(found)
          }
          catch(err) {
            res.status(500).json({errorMessage: "The user information could not be modified." })
          }

      
    }else if (!updatedItem.id){
        res.status(404).json({message: 'The user with the specified ID does not exist.'})
    }else{
        res.status(400).json({message: 'Please provide name and bio for the user.'})
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

            try {
                found.id = id;
                users = users.filter(item => item.id !== id);
                res.status(200).json(found)
              }
              catch(err) {
                res.status(500).json({errorMessage: "The user could not be removed" })
              }
           
        }else{
            res.status(404).json({message:"The user with the specified ID does not exist." })
        }

        // res.status(200).json({message : "success"})
        
})

