const express=require('express');
const users=require('./users.json');
const app=express();
app.use(express.json());
const fs=require('fs');



//http://localhost:3000/users/:10
app.get('/user/:id',(req,res)=>{
    let id=req.params.id;
    let user=users.find((user)=>user.id ===parseInt(id))
    console.log(user)
    res.json(user);
})

// http://localhost:3000/add/user
app.post('/add/user',(req,res)=>{
    console.log(req.body);
    req.body.id=users.length+1;
    users.push(req.body);
    fs.writeFile('users.json',JSON.stringify(users),(err)=>{
        if(err){
            console.log("error")
        }
        else{
            console.log("data added successfully.......")
            res.end("data added successfully")
        }
    })
})
// http://localhost:3000/users
app.get('/users',(req,res)=>{
    res.json(users);
})

// http://localhost:3000/edit/user/10
app.put('/edit/user/:id',(req,res)=>{
    let id=req.params.id;
    console.log(id);
    let index=users.findIndex((user)=>user.id===parseFloat(id));
    users[index].first_name="rahul";
    users[index].last_name="sharma";
    res.end("upgrade in progess. ");
    fs.writeFile('users.json',JSON.stringify(users),(err)=>{
        if(err){
            console.log("error")
        }
        else{
            console.log("data updated successfully.......")
            res.end("data updated successfully")
        }
    })
})

app.delete('/delete/user/:id',(req,res)=>{
    let id=req.params.id;
    console.log(id);
    let index=users.findIndex((user)=>user.id===parseFloat(id));
    users.splice(index,1);
    res.end("deletion  in progess. ");
    fs.writeFile('users.json',JSON.stringify(users),(err)=>{
        if(err){
            console.log("error")
        }
        else{
            console.log("data updated successfully.......")
            res.end("data updated successfully")
        }
    })
})




app.listen(3000,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("server is running on 3000")
    }
})