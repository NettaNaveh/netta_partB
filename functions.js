

class Person {
    constructor(firstName, lastName, Email, Phone) {
        this.firstName = firstName
        this.lastName = lastName
        this.Email = Email
        this.Phone = Phone
    }
}
    const person1 = new Person('Inbal', 'Barbi', 'inbal@gmail.com', '0524545454')
    const person2 = new Person('Itai', 'Naveh', 'itai@gmail.com', '0524548888')

let ShoppingList = [];

// vegetables
const items = [
    {
        image: "cucumber.jpg",
        name: "Cucumber",
        price: 5,
        category: 'Garden vegetables',
        id: 1
    },
    {
        image: "../media/chalah/chalah.jpeg",
        name: "Tomato",
        price: 4,
        category: 'Garden vegetables',
        id: 2
    },
    {
        image: "../media/chalah/chalah.jpeg",
        name: "Salanova lettuce",
        price: 6.3,
        category: 'Lettuce',
        id: 3
    },    {
        image: "../media/chalah/chalah.jpeg",
        name: "Portobello",
        price: 5,
        category: 'Mushrooms',
        id: 4
    }]

//show all items on home page-index
function showItems() {
    const GardenCategory = document.getElementById('Garden-vegetables');
    const LettuceCategory = document.getElementById('Lettuce');
    const HerbsCategory = document.getElementById('Herbs');
    const MushroomsCategory = document.getElementById('Mushrooms');
    var shopping =  sessionStorage.getItem('myArray');
    console.log(ShoppingList)
    if(shopping){
        ShoppingList =  JSON.parse(shopping);
    }

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.category === 'Garden vegetables') {
            createCard(GardenCategory, items[i]);
        } else if (item.category === 'Lettuce') {
            createCard(LettuceCategory, items[i]);
        } else if (item.category === 'Herbs') {
            createCard(HerbsCategory, items[i])
        } else if (item.category === 'Mushrooms') {
            createCard(MushroomsCategory, items[i])
        }
        // else {
        //     createCard(Stars, items[i]);
        // }
    }
}

function createCard(container, item) {
    const containerDiv = document.createElement('div');
    const image = document.createElement('img');
    const title = document.createElement('h2');
    const price = document.createElement('h3');
    const btn_addItem = document.createElement('button');
    const input= document.createElement('input');
    containerDiv.classList.add('card');
    image.classList.add('card-image');
    title.classList.add('card-title');
    price.classList.add('card-price');
    btn_addItem.classList.add('card-btn');
    image.src = item.image;
    title.innerText = item.name;
    price.innerText = "Price: " + item.price + "₪ per kg";
    btn_addItem.innerText = 'Add To Cart';
    input.placeholder=1;

    btn_addItem.onclick = () => {
         addToShoppingList(item,input.value);
    };


   containerDiv.appendChild(image);
    containerDiv.appendChild(title);
    containerDiv.appendChild(price);
    containerDiv.appendChild(input);
    containerDiv.appendChild(btn_addItem);

    container.appendChild(containerDiv);
}

//Thought of it at night had to try it i added a quantity box which works and takes the right amount entered and if nothing is entered it takes it as a 1
//You can check it with console
//You dont have to change your website now :*
//Love you <3<3<3
function addToShoppingList(item,quantity){
        console.log(item)
   ShoppingList.push({name:item.name,
                        price:isNaN(parseFloat(quantity))?item.price:item.price*parseFloat(quantity)})//checks if the quantity is a number by using an inplace if and if it is multiplies it by quantity if not gives the price of 1 kilo
    console.log(ShoppingList,quantity)
    sessionStorage.setItem('myArray', JSON.stringify(ShoppingList));
}

showItems();

function createCartItem(container, item) {
    const containerTR = document.createElement('tr');
    const title = document.createElement('td');
    const price = document.createElement('td');

    containerTR.classList.add('cart-item');
    title.innerText = item.name;
    price.innerText = item.price + "₪";

    containerTR.appendChild(title);
    containerTR.appendChild(price);
    container.appendChild(containerTR);
    console.log(container)
}





//add rows in cart table Of the choosen Items
function createShoppingListCart() {
    // removeAllCartItems();
    ShoppingList=  sessionStorage.getItem('myArray');
    ShoppingList=  JSON.parse(ShoppingList);
    const cart = document.getElementById('shopping-cart');
    let finalPrice = 0;
    const totalContainer = document.getElementById('total-price');

    console.log(ShoppingList)
        for (let i = 0; i < ShoppingList.length; i++) {
            console.log(ShoppingList[i])
            createCartItem(cart, ShoppingList[i], i);
            finalPrice += ShoppingList[i].price;
        }

        console.log(finalPrice)
        totalContainer.innerText = "Total price: " + finalPrice + "₪";

            // total-price.innerText = totalPrice.price + "₪";

}



// function check(){
//     const nameInput = document.querySelector('#shopping-cart')
//     console.log(nameInput)
//     console.log('hello im here')
// }

//
//     const cakesSection = document.getElementById('cakes');
//     const yeastCakesSection = document.getElementById('yeast-cakes');
//     const recomendedSection = document.getElementById('recomended');
//     const cookiesSection = document.getElementById('cookies');
//     const challahBreadsSection = document.getElementById('challah-breads');
//
//     for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         if (item.category === 'yeast') {
//             createCard(yeastCakesSection, items[i]);
//         } else if (item.category === 'cookies') {
//             createCard(cookiesSection, items[i]);
//         } else if (item.category === 'cakes') {
//             createCard(cakesSection, items[i])
//         } else if (item.category === 'bread') {
//             createCard(challahBreadsSection, items[i])
//         } else {
//             createCard(recomendedSection, items[i]);
//         }
//     }
//
// }

//     this.getBirthYear = function () {
//         return this.dob.getFullYear()
//     }
//
//     this.getFullName = function () {
//         return `${this.firstName} ${this.lastName}`
//     }
// }



// // console.log(person1)
// // console.log(person1.dob.getDay())
// // console.log(person1.dob.getFullYear())
// console.log(person1.getBirthYear())
// console.log(person1.getFullName())
// console.log(person2)
/******************************/

// function Person(firstName, lastName, dob) {
//     this.firstName = firstName
//     this.lastName = lastName
//     this.dob = new Date(dob)
//
// }
//
// const person1 = new Person('Moti', 'Katz', '4-3-1980')
//
//
// Person.prototype.getBirthYear = function () {
//     return this.dob.getFullYear()
//     }
//
//
// console.log(person1.getBirthYear())
// // console.log(person1.getFullName())
//
// Person.prototype.getFullName = function () {
//     return `${this.firstName} ${this.lastName}`
// }
//
// console.log(person1.getFullName())

/******************************/

// class Person {
//     constructor(firstName, lastName, dob) {
//         this.firstName = firstName
//         this.lastName = lastName
//         this.dob = new Date(dob)
//     }
//
//     getBirthYear() {
//         return this.dob.getFullYear()
//     }
//
//     getFullName(){
//         return `${this.firstName} ${this.lastName}`
//     }
// }
//
// const person1 = new Person('Moti', 'Katz', '4-3-1980')
//
// console.log(person1)
// console.log(person1.getBirthYear())
// console.log(person1.getFullName())

/******************************/

// console.log(window)
// console.log('hello console')

// window.alert('this is alert!!!')

// console.log(window.innerHeight)
// console.log(window.innerWidth)

// window.localStorage['my_key'] = 'my_value'
// console.log(window.localStorage)

/******************************/

// console.log(document.getElementById('my-form'))
// const form = document.getElementById('my-form')
// console.log(form)

// const form = document.querySelector('#my-form')
// console.log(form)
// const el_2 = document.querySelector('.items')
// console.log(el_2)
// const el_3 = document.querySelector('li')
// console.log(el_3)
/******************************/
// const e1 = document.getElementsByClassName('item')
// console.log(e1)
// const e2 = document.getElementsByTagName('li')
// console.log(e2)
// const e3 = document.querySelectorAll('.item')
// console.log(e3)
// e3[2].innerHTML = 'YUUUUHUUU'
/******************************/

// const ul = document.querySelector('.items')
// console.log(ul)

// ul.remove()
// ul.lastElementChild.remove()

// ul.firstElementChild.textContent = '<h1>This is Item 1</h1>'
// ul.lastElementChild.innerHTML = '<h1>This is Item 4</h1>'
// ul[2].innerHTML = '<h2>This is Item 2</h2>'

// const btn = document.querySelector('.btn')
// btn.style.background = 'red'
// btn.style.color = 'white'

// btn.addEventListener('click', (e) => {
//     e.preventDefault()
//     // console.log('click!')
//     console.log(e)
//     console.log(e.target)
//     console.log(e.target.className)
//
//     e.target.classList.add('btn-2')
//     // e.target.classList.remove('btn')
//
//     document.querySelector('#my-form').style.background = '#ccc'
//     document.querySelector('body').classList.add('bg-dark')
//     document.querySelector('.items').lastElementChild.innerHTML = '<h1>This is Item 4</h1>'
//
// })

// btn.addEventListener('mouseover', (e) => {
//
// })
//
// btn.addEventListener('mouseout', (e) => {
//
// })
/******************************/


/******************************/