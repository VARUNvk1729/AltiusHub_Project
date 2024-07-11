
const userRoutes = (app, fs) => {
  const dataPath = './application.json';
  //POST REQUEST
  app.post('/users', (req, res) => {

    const data={
        "60": {
          "name": "king arthur",
          "body": "password1",
          "tag": "king",
          "id": 23
        }
      };   
      res.send(JSON.parse(data));
  });
  
    // READ
    app.get('/users', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        console.log(data)
        res.send(JSON.parse(data));
      });
    });
    
   //SPECIFIC USER
  app.post('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id)
    res.send(foundUser)
  });
  
    //DELETE
    app.delete('/users/:id',(req,res)=>{
        const { id } = req.params;
        users = users.filter((user) => user.id !== id)
        res.send(`${id} deleted successfully from database`);
    })

    //UPDATE A SPECIFIC USER
    app.patch('/users/:id',(req,res)=>{
        const { id } = req.params;
        const { title, body, tag} = req.body;
        const user = users.find((user) => user.id === id)
        if(title) user.title = title;
        if(body) user.body = body;
        if(tag) user.tag = tag;
        res.send(`User with the ${id} has been updated`)
    })
  };
  
  module.exports = userRoutes;