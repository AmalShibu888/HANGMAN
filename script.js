


// import { options } from "./database.js";

// const pool =  require("./module/database2.js");
// console.log(pool);
const { createPool } = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "leo10@messi",
    database: "wordslist",
    connectionLimit: 10
})

pool.query('select * from book1 ORDER BY RANd() LIMIT 1' ,(err ,result ,fields) =>{
    if(err)
        return console.log(err);
    return console.log(result);
})
// readFile('test.txt' ,'utf8' ,(err ,data) =>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data);
// })

const wordContainer = document.querySelector('.word');
const digitalKeyboard = document.querySelectorAll(".alphaKeys");
 
const signupBox = document.querySelector('.signuppop');
const loginBox = document.querySelector('.loginpop');

const LoginToSignupButton =  document.querySelector('.signupLink');
const SignupToSignupButton =  document.querySelector('.loginLink');

const BoxCloseButtons = document.querySelectorAll('.popup-close');

const signupsubmitbutton = document.querySelector('.signupSubmitButton');
const loginSubmitButton = document.querySelector('.loginSubmitButton');




// class to select hide the word
class SelectedWord{

    // get a random word from the database
    getWord(){
        const keyss = Object.keys(options);
        this.category = keyss[Math.floor(Math.random()*keyss.length)];
        const arr = options[this.category];
        this.word = arr[Math.floor(Math.random()*arr.length)];
        console.log(this.word);
        this.hideWord();
        this.noOfRepeat();
        return this;
        
    }


    // hiding the word and and marking each letter with underline

    hideWord(){
        
        let s = this.word;
        for(let i = 0;i<s.length;i++){
            const x = document.createElement('span');
            if(s[i] === " ")
                x.className = "letter space";
            else
                x.className = "letter S" + s[i].toLowerCase();
                wordContainer.appendChild(x);
            
        }
    }


    // returning the number of times a letter is present in the word selected by the getword function into repeat object 

    noOfRepeat(){
        this.repeat = {'a':0,'b':0,'c':0,'d':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0};
        let s = this.word;
        for(let i = 0;i<s.length;i++)
            this.repeat[s[i].toLowerCase()]++;
        
        this.fail = 0;
        let spaces = this.word.split(' ').length - 1;
        this.success = this.word.length - spaces;
    }

    

}



// making digital and analog Keyboard responsive
class keyboard extends SelectedWord{


// making digital Keyboard responsive
    digitalKeyboard(){
        digitalKeyboard.forEach((e)=>{
            e.addEventListener('click',(x)=>{
                this.updateKeyboard(e.textContent , e);
                
                
            })
        })
        return this;
    }


// making analog Keyboard responsive
    analogKeyboard(){
        document.addEventListener('keypress' , updateAnalogKeyboard);
        return this;
    }
    // updating on the keyboard image
    updateKeyboard(s , node){
        if(newvariable.repeat[s.toLowerCase()] >= 0)
        {
            console.log(newvariable.success);
            if(newvariable.repeat[s.toLowerCase()] > 0)
            {
                node.className += " rightLetter";
                newvariable.updateLetter(s);
            }
            else
            {
                node.className += " wrongLetter";
                newvariable.fail++;
                newvariable.updateFigure(newvariable.fail);
                newvariable.updateWrongLetter(s);
            }
            newvariable.repeat[s.toLocaleLowerCase()] = -1;
            if(newvariable.fail == 6){
                alert('Sorry you are hanged !!!!');
                newvariable.reset();
            }
            else if(newvariable.success == 0){
                alert('yay you won !!!!');
                newvariable.reset();
            }
        }
    }
}




// updating the figure the analog keyboard and the wrong letters slots with each press
class updatingReset extends keyboard{

    // updating the figure in accordance with the current state
    updateFigure(x){
        if(x == 1){
            let x = document.querySelector('.try1');
            x.style.r = "20";
        }
        else if(x == 2){
            let x = document.querySelector('.try2');
            console.log(x);
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
        else if(x == 3){
            let x = document.querySelector('.try3');
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
        else if(x == 4){
            let x = document.querySelector('.try4');
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
        else if(x == 5){
            let x = document.querySelector('.try5');
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
        else{
            let x = document.querySelector('.try6');
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
    }


    // makes the character visible and decrease the success parameter by 1

    updateLetter(s){
        let x = document.querySelectorAll('.S'+s.toLowerCase());
        x.forEach(e => {
            e.textContent = s.toUpperCase();
            this.success--;
        });
        
    }




    // makes the wrong letters popup in the wrong letters section
    updateWrongLetter(s){
        let x = document.querySelector('.wrongLetterList');
        x.textContent += " "+s;
    }


    // resets the entire game takes and takes new random word and the game starts again

    reset(){
        this.fail = 0;
        let x = document.querySelectorAll('.rightLetter');
        x.forEach(e => {
            e.className = "alphaKeys " + e.textContent.toLowerCase();
        });
        x = document.querySelectorAll('.wrongLetter');
        x.forEach(e => {
            e.className = "alphaKeys " + e.textContent.toLowerCase();
        });

        x = document.querySelectorAll('.figure-part');
        x.forEach(e => {
            e.style.strokeWidth = "0";
            e.style.r = "0";
        });
        x = document.querySelector('.word');
        while (x.firstChild) {
            x.removeChild(x.firstChild);
        }
        x = document.querySelector('.wrongLetterList');
        x.textContent = "";
        this.getWord();
    }
}




// import { workSheet } from "./users.js";


class PlayerVerification extends updatingReset {

    // making all popup as well as buttons associated with it except submit button operational
    init(){
        this.logstat = 0;
        this.displaySignupLogin();
        this.closebutton();
        this.switchbutton(LoginToSignupButton , signupBox);
        this.switchbutton(SignupToSignupButton, loginBox);
    }

//   validating the values written in submit form are allowable
    signupValidation(){
        const password = document.querySelector("#passworddec");
        const confpassword = document.querySelector("#confpassword");
        if(password.value != confpassword.value)
        {
            alert("Password does not match");
            return false;
        }
        return true;
    }

    // making curnode capable of toggling the newnode popupbox
    switchbutton(curnode , newnode){
        curnode.addEventListener('click' , (e)=>{
            const par = curnode.parentNode;
            par.style.display = "none";
            newnode.style.display = "block";
        })
        
    }


    // making the close button on the top right corner of every popup box operational
    closebutton(){
        
        BoxCloseButtons.forEach(button=> {
            // console.log("y");
                button.addEventListener('click' , (e)=>{
                document.addEventListener('keypress' , updateAnalogKeyboard);
                const par = button.parentNode;
                par.style.display = "none";
                par.parentNode.style.display = "none";
            })
        });
    }
    
    
    // making the login/signup button(button) on top right corner of the screen operational ie toggle the respective form (box)
    buttonWork(button , box){
            button.addEventListener('click' ,(e) =>{
            document.removeEventListener('keypress' , updateAnalogKeyboard);
            const par =   box.parentNode;
            par.style.display = "flex";
            box.style.display = "block";
        })
    }

    // make signup possible
    signup(){
        signupsubmitbutton.addEventListener('click' ,(e)=>{
            if(this.signupValidation())
            {
                this.displayLogout();
                signupBox.style.display = "none";
                signupBox.parentElement.style.display = "none";
                this.logout();  
            }
            e.preventDefault();
        })
        return this;
    }

// make login possible
    login(){
        loginSubmitButton.addEventListener('click', (e)=>{
            e.preventDefault();
            this.displayLogout();
            loginBox.parentElement.style.display = "none";
            loginBox.style.display = "none";
            this.logout();
        })
        
        // this.loginValidation();
        return this;
    }

    // make logout possible
    logout(){
        const logoutTriggerButton = document.querySelector('.logout-button');
        logoutTriggerButton.addEventListener('click', (e) =>{
            this.displaySignupLogin();
        })
        return this;
    }

    // display the signup/ligin button and make them responsive
    displaySignupLogin(){
        const par = document.querySelector('.loginSignup-button');
        par.innerHTML = ""
        let x = document.createElement('span');
        x.className = "login-button";
        x.textContent = "Login"
        par.appendChild(x);
        this.buttonWork(x , loginBox);
        x = document.createTextNode('/');
        par.appendChild(x);
        x = document.createElement('span');
        x.className = "signup-button";
        x.textContent = "Signup"
        par.appendChild(x);
        this.buttonWork(x , signupBox);
    }

    // display logout button
    displayLogout(){
        const par = document.querySelector('.loginSignup-button');
        par.innerHTML = ""
        let x = document.createElement('span');
        x.className = "logout-button";
        x.textContent = "Logout"
        par.appendChild(x);
    }
}





const newvariable = new PlayerVerification;
newvariable.init();

newvariable.signup().login();

    newvariable.getWord().digitalKeyboard().analogKeyboard();


 

    
    

    
// function to update when typing physically using keyboard

    function updateAnalogKeyboard(e){
        if((e.charCode>64 && e.charCode <91) || (e.charCode >96 && e.charCode <123))
        {
            let s = e.key;
            let node = document.querySelector('.' + e.key.toLowerCase());
            if(newvariable.repeat[s.toLowerCase()] >= 0)
            {
                console.log(newvariable.success);
                if(newvariable.repeat[s.toLowerCase()] > 0)
                {
                    node.className += " rightLetter";
                    newvariable.updateLetter(s);
                }
                else
                {
                    node.className += " wrongLetter";
                    newvariable.fail++;
                    newvariable.updateFigure(newvariable.fail);
                    newvariable.updateWrongLetter(s);
                }
                newvariable.repeat[s.toLocaleLowerCase()] = -1;
                if(newvariable.fail == 6){
                    alert('Sorry you are hanged !!!!');
                    newvariable.reset();
                }
                else if(newvariable.success == 0){
                    alert('yay you won !!!!');
                    newvariable.reset();
                }
            }
        }
    }
    // console.log(this.repeat);