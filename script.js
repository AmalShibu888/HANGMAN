


import { options } from "./database.js";

 
// readFile('test.txt' ,'utf8' ,(err ,data) =>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data);
// })

const wordContainer = document.querySelector('.word');
const digitalKeyboard = document.querySelectorAll(".alphaKeys");
 

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




class keyboard extends SelectedWord{
    digitalKeyboard(){
        digitalKeyboard.forEach((e)=>{
            e.addEventListener('click',(x)=>{
                this.updateKeyboard(e.textContent , e);
                
                
            })
        })
        return this;
    }
    analogKeyboard(){
        document.addEventListener('keypress' , updateAnalogKeyboard);
        return this;
    }

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
        }
        else if(x == 3){
            let x = document.querySelector('.try3');
            x.style.strokeWidth = "3";
        }
        else if(x == 4){
            let x = document.querySelector('.try4');
            x.style.strokeWidth = "3";
        }
        else if(x == 5){
            let x = document.querySelector('.try5');
            x.style.strokeWidth = "3";
        }
        else{
            let x = document.querySelector('.try6');
            x.style.strokeWidth = "3";
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
    init(){
        this.logstat = 0;
        this.displaySignupLogin();
        this.closebutton();
    }

  
    logout(){

    }
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

    switchbutton(curnode , newnode){
        curnode.addEventListener('click' , (e)=>{
            const par = curnode.parentNode;
            par.style.display = "none";
            newnode.style.display = "block";
        })
        
    }
    closebutton(){
        const close_buttons = document.querySelectorAll('.popup-close');
        close_buttons.forEach(button=> {
            // console.log("y");
                button.addEventListener('click' , (e)=>{
                document.addEventListener('keypress' , updateAnalogKeyboard);
                const par = button.parentNode;
                par.style.display = "none";
                par.parentNode.style.display = "none";
            })
        });
    }
    buttonWork(button , box){
            button.addEventListener('click' ,(e) =>{
            document.removeEventListener('keypress' , updateAnalogKeyboard);
            const par =   box.parentNode;
            par.style.display = "flex";
            box.style.display = "block";
    })
}
    signup(){
        const signupButton = document.querySelector('.signup-button');
        const signupBox = document.querySelector('.signuppop');
        const curnode = document.querySelector('.loginLink');
        const newnode = document.querySelector(".loginpop");
        this.buttonWork(signupButton , signupBox);
        this.switchbutton(curnode , newnode);
        const signupsubmitbutton = document.querySelector('.signupSubmitButton');

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
    login(){
        const loginButton = document.querySelector('.login-button');
        const loginBox = document.querySelector('.loginpop');
        this.buttonWork(loginButton , loginBox);

        const curnode = document.querySelector('.signupLink');
        const newnode = document.querySelector(".signuppop");
        this.switchbutton(curnode , newnode);

        const loginForm = document.querySelector('.loginSubmitButton');
        loginForm.addEventListener('click', (e)=>{
            e.preventDefault();
            this.displayLogout();
            loginForm.parentElement.parentElement.style.display = "none";
            loginForm.parentElement.style.display = "none";
            this.logout();
        })
        
        // this.loginValidation();
        return this;
    }

    logout(){
        const logoutTriggerButton = document.querySelector('.logout-button');
        console.log(logoutTriggerButton)
        logoutTriggerButton.addEventListener('click', (e) =>{
            this.displaySignupLogin();
            const loginButton = document.querySelector('.login-button');
            const loginBox = document.querySelector('.loginpop');
            this.buttonWork(loginButton , loginBox);
            const signupButton = document.querySelector('.signup-button');
            const signupBox = document.querySelector('.signuppop');
            this.buttonWork(signupButton , signupBox);
        })
        return this;
    }

    displaySignupLogin(){
        const par = document.querySelector('.loginSignup-button');
        par.innerHTML = ""
        let x = document.createElement('span');
        x.className = "login-button";
        x.textContent = "Login"
        par.appendChild(x);
        x = document.createTextNode('/');
        par.appendChild(x);
        x = document.createElement('span');
        x.className = "signup-button";
        x.textContent = "Signup"
        par.appendChild(x);
    }
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