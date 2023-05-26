const inputSlider = document.querySelector("[data-lengthSlider]");
const  lengthDisplay = document.querySelector("[data-lengthNumber]");
const  passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generator = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordlength = 10;
let checkCount = 1; 
const symbols = "!@#$%^&*_?.,;:";
// set circle to grey;

//set passwordLength
function handleSlider()
{
    inputSlider.value = passwordlength;  
    lengthDisplay.innerText = Number(passwordlength);  
}

handleSlider(); 

function setIndicator(color)
{
    indicator.style.backgroundcolor = color;
}

function getRndInterger(min , max){
    let randome =  Math.floor(Math.random() * ( max-min)) + min;
    return randome;
}

function generateRandomNumber()
{
    return getRndInterger(0,9);   
}

function generateLowerCase()
{
    return String.fromCharCode(getRndInterger(97,123)); 

}

function generateUpperCase()
{
    return String.fromCharCode(getRndInterger(65,91)); 
}

function generateSymbol()
{
    return symbols.charAt(getRndInterger(0, symbols.length)) ;     
}

function calculateStrength(Mystring)
{
    let hasUpper = false ; 
    let hasLower = false ; 
    let hasNum   = false ;
    let hasSym   = false ; 
    
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked)    hasNum   = true;
    if(symbolsCheck.checked)   hasSym   = true;
    
    if( hasUpper && hasLower && (hasSym || hasNum) && passwordlength>=8)
    {
        setIndicator('#0f0');
    }else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) && 
        passwordlength>=6
    ) {
        setIndicator('#ff0');
    }
    else
    {
        setIndicator("#f00");
    }

}

async function copyContent()
{
    let text = passwordDisplay.value; 
    try{
    await navigator.clipboard.writeText(text);
    copyMsg.innerText = "copied";
    console.log('Copied successfully');
    
    }catch(err)
    {
        console.log('Copying failed ' , err);
    }

    //To make copy wala span visible 
    copyMsg.classList.add("active"); 

    setTimeout(()=>{
      copyMsg.classList.remove("active");    
    } , 2000 ); 

}


inputSlider.addEventListener('input' , (e)=>{ 
    passwordlength = e.target.value; 
    handleSlider();
} );

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
        copyContent();
});



allCheckBox.forEach( (checkbox)=>{
    checkbox.addEventListener('change' , handleCheckBoxChange);
});

function handleCheckBoxChange(){
   checkCount = 0 ;
   allCheckBox.forEach( (checkbox)=> {
        if(checkbox.checked)
        {
        checkCount++;
        }
    }); 


    if(checkCount> passwordlength)
    {
        passwordlength = checkCount; 
        handleSlider();
    }

 
}

function shuffleString(str) {
    let arr = str.split(""); // split the string into an array of characters
    arr.sort(() => Math.random() - 0.5); // randomly sort the array
    return arr.join(""); // join the array back into a string
  }

generator.addEventListener('click' , ()=>{

    
 
    if(checkCount<=0)return; 

    handleCheckBoxChange();

    password= "";  
    
    let val = [] ;  
    if(uppercaseCheck.checked){
        val.push(1);
    }
    if(lowercaseCheck.checked){
        val.push(2);
    }
    if(numbersCheck.checked){
        val.push(3);
    }
    if(symbolsCheck.checked){
        val.push(4);
    }

    let indexofVal=0; 


    for(let i=0 ; i<passwordlength ; i++)
    { 
        switch (val[i%checkCount])
        {
            case 1: password = password.concat(generateUpperCase());
                    console
                    break;
            case 2 :password = password.concat(generateLowerCase());
                    break;
            case 3 :password = password.concat(generateRandomNumber());
                    break;
            case 4 :password = password.concat(generateSymbol());
                    break;

        }  
    }
    password = shuffleString(password);
    passwordDisplay.value = password;

});

