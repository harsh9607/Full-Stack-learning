const cardArray = [

    {
        name:'fries',
        img: './images/fries.png',
    },

    {
        name:'cheeseburger',
        img: './images/cheeseburger.png',
    },

    {
        name:'hotdog',
        img: './images/hotdog.png',
    },

    {
        name:'ice-cream',
        img: './images/ice-cream.png',
    },

    {
        name:'pizza',
        img: './images/pizza.png',
    },

    {
        name:'milkshake',
        img: './images/milkshake.png',
    },

    {
        name:'fries',
        img: './images/fries.png',
    },

    {
        name:'cheeseburger',
        img: './images/cheeseburger.png',
    },

    {
        name:'hotdog',
        img: './images/hotdog.png',
    },

    {
        name:'ice-cream',
        img: './images/ice-cream.png',
    },

    {
        name:'pizza',
        img: './images/pizza.png',
    },

    {
        name:'milkshake',
        img: './images/milkshake.png',
    },


]

cardArray.sort(()=> 0.5 - Math.random());
const gridDisplay = document.querySelector("#grid");
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = [] 


function createBoard()
{
    const newLocal = 12;
    for(let i=0 ; i<cardArray.length ; i++)
    {
        const card= document.createElement('img');
        card.setAttribute('src','images/blank.png');
        card.setAttribute('data-id',i);
        card.setAttribute('border','1px solid black');
        card.addEventListener('click',flipCard)
        card.style.marginRight = '0px';
        gridDisplay.append(card);
        console.log(card,i);
    }

}

createBoard()

var scorectr=0 ;


function checkMatch()
{  

    const cards = document.querySelectorAll('#grid img');
   
    console.log('Check for match!');
    
    if(cardsChosen[0] == cardsChosen[1])
    {
        scorectr+=10;
        cards[cardsChosenIds[0]].setAttribute('src','images/white.png');
        cards[cardsChosenIds[1]].setAttribute('src','images/white.png');
        cards[cardsChosenIds[0]].removeEventListener('click',flipCard);
        cards[cardsChosenIds[1]].removeEventListener('click',flipCard);
        cardsWon.push(cardsChosen);
    }
    else
    {
        scorectr-=1;
        cards[cardsChosenIds[0]].setAttribute('src','images/blank.png');
        cards[cardsChosenIds[1]].setAttribute('src','images/blank.png');

    }
    let result = document.querySelector('#result');
    result.innerHTML= scorectr;
    cardsChosen = [];
    cardsChosenIds= []; 

    if(cardsWon.length == (cardArray.length/2))
    {
        alert('Congratulations on game completion')
        location.reload();
    }
}


function flipCard(){

    const cardId = this.getAttribute('data-id')
    const cardName = cardArray[cardId].name
    cardsChosen.push(cardName);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img)
    if(cardsChosen.length == 2)
    {
        setTimeout(checkMatch,150);
    }

}