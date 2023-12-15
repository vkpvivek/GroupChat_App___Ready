const path=require('path');
const express = require('express');
const sequelize=require('./util/database');
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config();

// console.log(process.env.test);

const app = express();
app.use(express.json());  //to parse JSON request bodies

//models:
const User=require('./models/user');
const Message=require('./models/message');
const Group=require('./models/group');
const User_Group=require('./models/usergroup');

//routes
const userRoutes=require('./routes/user');
const chatRoutes=require('./routes/chat');
const groupRoutes=require('./routes/group');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(userRoutes);
app.use(chatRoutes);
app.use(groupRoutes);

// Define the associations
Group.hasMany(Message);
Message.belongsTo(Group);


User.belongsToMany(Group, { through: User_Group, foreignKey: 'userId' });
Group.belongsToMany(User, { through: User_Group, foreignKey: 'groupId' });

// app.use('/',(req, res) => {
//   console.log('urll',req.url);
//   res.sendFile(path.join(__dirname, 'public/Login.html'));
//   //res.sendFile(path.join(__dirname, 'public/index.js'));
// });


app.use(express.static(path.join(__dirname,'public')));

app.use((req,res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname, 'public/ERROR-404.html'));    
})


sequelize
    .sync()
    //.sync({force:true})
    .then(result=>
        console.log("databse successfully setup")
    )
    .catch(err=>console.log(err));


var port = process.env.PORT || 3000;

app.listen(port, () =>
     console.log(`Example app is listening on port ${port}.`)
);


