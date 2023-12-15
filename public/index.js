const mySignup_Form = document.querySelector('#my-Signup-form');
const Signup_nameInput = document.querySelector('#username');
const Signup_emailInput = document.querySelector('#email');
const Signup_phoneInput = document.querySelector('#phone');
const Signup_passInput=document.querySelector('#password');

const myLogin_Form = document.querySelector('#my-Login-form');
const Login_emailInput = document.querySelector('#usermail');
const Login_passInput = document.querySelector('#pswd');


mySignup_Form.addEventListener('submit',SignUp);
myLogin_Form.addEventListener('submit',Login);



function SignUp(e) {
    e.preventDefault();

    let myObj={
        username:Signup_nameInput.value,
        email:Signup_emailInput.value,
        password:Signup_passInput.value,
        phone:Signup_phoneInput.value
    };
    console.log(myObj);

    axios.post("http://localhost:3000/SignUp",myObj)
            .then((response)=>{
                if(response.data.newUserDetails){
                    console.log(response.data.newUserDetails);
                    alert("Signup Successful");
                }else{
                    console.log(response.data);
                    alert("user already exist"); 
                }
            })
            .catch((err)=>{
                console.log(err);
            })

};


function Login(e) {
    e.preventDefault();

    let myObj={
        email:Login_emailInput.value,
        password:Login_passInput.value,
    };
    console.log(myObj);

    axios.post("http://localhost:3000/login",myObj)
            .then((response)=>{
    
                //redirect to index if password match i.e, Login successfullly
                if(response.data.success===true){
                    console.log(response.data);
                    console.log(response.data.token);
                    //const UserId=response.data.Uid;
                    localStorage.setItem("Token",response.data.token);
                    
                    // clear local storage from pre-saved data
                    const logMessage = [];
                    localStorage.setItem("msgArr",JSON.stringify(logMessage));
                    localStorage.setItem("groupId",0);
                    //localStorage.setItem()

                    window.location.href = "../ChatApp/groupChat.html";
                }
            })
            .catch((err)=>{
                console.log(err);
            })
};