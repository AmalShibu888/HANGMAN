


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




// upating and functioning both the inbuilt as well as taking input from the analog keyboard

class keyboard extends SelectedWord{

    // taking the input and take into account of the functioning of the digital keyboard

    digitalPress(){
        
        // console.log(digitalKeyboard);
        digitalKeyboard.forEach((e)=>{
            e.addEventListener('click',(x)=>{
                this.updateKeyboard(e.textContent , e);
                
                
            })
        })
        return this;
    }


    // taking the input and take into account of the functioning of the analog keyboard
     
    analogPress(){
        document.addEventListener('keypress' , (e)=>{
            if((e.charCode>64 && e.charCode <91) || (e.charCode >96 && e.charCode <123))
            {
                this.updateKeyboard(e.key , document.querySelector('.' + e.key.toLowerCase()));
            }
        })
    }


    

    // update the status of each key in the keyboard and let us know wheather it is pressed or not
    updateKeyboard(s , node){
        if(this.repeat[s.toLowerCase()] >= 0)
        {
            console.log(this.success);
            if(this.repeat[s.toLowerCase()] > 0)
            {
                node.className += " rightLetter";
                this.updateLetter(s);
            }
            else
            {
                node.className += " wrongLetter";
                this.fail++;
                this.updateFigure(this.fail);
                this.updateWrongLetter(s);
            }
            this.repeat[s.toLocaleLowerCase()] = -1;
            if(this.fail == 6){
                alert('Sorry you are hanged !!!!');
                this.reset();
            }
            else if(this.success == 0){
                alert('yay you won !!!!');
                this.reset();
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

class Game extends updatingReset{

    // function for getting a random word from the database
    

}




// import { workSheet } from "./users.js";


class PlayerVerification extends Game {
    init(){
        this.logstat = 0;
    }

  
    logout(){

    }
    signupValidation(){
        const form = document.querySelector('.signuppop');
        form.addEventListener('submit' , (e) =>{
        const password = document.querySelector("#passworddec");
        const confpassword = document.querySelector("#confpassword");
        if(password.value != confpassword.value)
        {
            e.preventDefault();
            alert("Password does not match");
        }

        })
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
                const par = button.parentNode;
                par.style.display = "none";
                par.parentNode.style.display = "none";
            })
        });
    }
    buttonWork(button , box){
            button.addEventListener('click' ,(e) =>{
            const par =   box.parentNode;
            par.style.display = "flex";
            box.style.display = "block";
    })
    this.closebutton();
}
    signup(){
        const signupButton = document.querySelector('.signup-button');
        const signupBox = document.querySelector('.signuppop');
        this.buttonWork(signupButton , signupBox);
        this.signupValidation();
        const curnode = document.querySelector('.loginLink');
        const newnode = document.querySelector(".loginpop");
        this.switchbutton(curnode , newnode);
        return this;
    }
    login(){
        const loginButton = document.querySelector('.login-button');
        const loginBox = document.querySelector('.loginpop');
        this.buttonWork(loginButton , loginBox);
        // const loginForm = document.querySelector('.loginpop');
        // loginForm.addEventListener('submit', (e)=>{
        //     this.logstat = 1;
        //     e.preventDefault();
        //     console.log(this.logstat);
        // })
        const curnode = document.querySelector('.signupLink');
        const newnode = document.querySelector(".signuppop");
        this.switchbutton(curnode , newnode);
        // this.loginValidation();
        return this;
    }
}


const newvariable = new PlayerVerification;
newvariable.init();

newvariable.signup().login();

    newvariable.getWord().digitalPress().analogPress();