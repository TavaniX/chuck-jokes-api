const btn = document.querySelector('.btn')
const content = document.querySelector('.content')
const img = document.querySelector('.container img')
const URL = 'https://api.chucknorris.io/jokes/random'
const CATEGORIES = 'https://api.chucknorris.io/jokes/categories'
const selectCategoryElem = document.querySelector('#category')

const categoryList = fetch(CATEGORIES)
    .then((data) => data.json())
    .then((response) =>
        response.map((item) => {
            let optionElem = document.createElement('option')
            optionElem.value = item
            optionElem.innerHTML = item
            selectCategoryElem.appendChild(optionElem)
        })
    )
    .catch((err) => console.log(err))

let optionElem = document.createElement('option')
optionElem.value = 'All'
optionElem.innerHTML = 'All'
selectCategoryElem.appendChild(optionElem)

let jokesArr = []
const counterUniqueJokes = document.querySelector('.counterU')
const counterDublicateJokes = document.querySelector('.counterD')
let countUniqueValues = 0
let countDublicatedValues = 0

function saveJokeId(id) {
    if (jokesArr.every((currValue) => currValue !== id)) {
        jokesArr.push(id)
        countUniqueValues++
        counterUniqueJokes.textContent = countUniqueValues
    } else {
        countDublicatedValues++
        counterDublicateJokes.textContent = countDublicatedValues
    }
}

btn.addEventListener('click', async () => {
    const selectedCategory = selectCategoryElem.value
    const categorizedURL = URL + '?category=' + selectedCategory

    try {
        if (selectedCategory === 'All') {
            const data = await fetch(URL)
            const response = await data.json()
            displayData(response)
            saveJokeId(response.id)
        } else {
            const data = await fetch(categorizedURL)
            const response = await data.json()
            displayData(response)
            saveJokeId(response.id)
        }
    } catch {
        console.log(error)
    }
})

function displayData({ value: joke }) {
    img.classList.add('shake-img')
    const random = Math.random() * 1000
    content.textContent = joke
    setTimeout(() => {
        img.classList.remove('shake-img')
    }, random)
}
