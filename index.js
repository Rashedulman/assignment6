const loadCategory=()=>{
    const url = "https://openapi.programming-hero.com/api/categories"

    fetch(url)
    .then(res=>res.json())
    .then(data => displayCategory(data.categories))
}

const loadTrees = (id) => {
    document.getElementById('tree-container').classList.add('hidden')
    document.getElementById('loading-spinner').classList.remove('hidden')
const url = id
? `https://openapi.programming-hero.com/api/category/${id}`
: `https://openapi.programming-hero.com/api/plants`

const catBtns = document.querySelectorAll(".btn-category")
catBtns.forEach(btn=> btn.classList.remove("active"))

const currentBtn = document.getElementById(`cat-btn-${id}`)
currentBtn.classList.add("active")
    
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayTrees(data.plants))
}

const displayCategory=(categories)=>{
    const categoryContainer = document.getElementById('category-container')
    categoryContainer.innerHTML = ""

// default All Trees button
// const allBtn = document.createElement('div')

// allBtn.innerHTML = `
// <button onclick="loadAllData()"
// class="btn btn-block justify-start bg-green-700 text-white">
// All Trees
// </button>
// `

// categoryContainer.append(allBtn)


    for(let category of categories){
        const categoryCard = document.createElement("div")
        categoryCard.innerHTML = `
        <button id="cat-btn-${category.id}" onclick="loadTrees(${category.id})" class="btn btn-block justify-start btn-category">${category.category_name}</button>`

        categoryContainer.append(categoryCard)
    }
}

const loadTreeDetails = (id) => {
   const url = `https://openapi.programming-hero.com/api/plant/${id}`
   
   fetch(url)
   .then(res=>res.json())
   .then(data=>displayDetails(data.plants))
}

const loadAllData = () => {
    const url =`https://openapi.programming-hero.com/api/plants`

    fetch(url)
    .then(res=>res.json())
    .then(data=>displayTrees(data.plants))
}


const displayTrees = (plants) => {
    const treeContainer = document.getElementById('tree-container')
    treeContainer.innerHTML= ''

    for(let plant of plants){
       
        const treeCard = document.createElement('div')
        treeCard.innerHTML= `
        <div  class="card bg-white shadow-sm p-5 rounded-3xl h-full">
  <figure>
    <img
    class=" w-full rounded-xl object-cover h-56"
      src="${plant.image}"
      alt="" />
  </figure>
  <div class="card-body px-0">
    <h2 onclick="loadTreeDetails(${plant.id})" class="card-title">${plant.name}</h2>
    <p class="text-gray-600">${plant.description}</p>
    <div class="flex justify-between items-center">
        <span class="bg-green-100 text-green-700 px-5 py-2 rounded-full">${plant.category}</span>
        <span>৳${plant.price}</span>
    </div>
    <div class="card-actions ">
      <button  class="btn bg-green-700 text-white rounded-full text-lg  py-4  w-full">Add to Cart</button>
    </div>
  </div>
</div>`

treeContainer.append(treeCard)

    }
    document.getElementById('tree-container').classList.remove('hidden')
    document.getElementById('loading-spinner').classList.add('hidden')
}        
    
const displayDetails = (plant) => {
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
     <div class="card bg-white shadow-md p-8 rounded-3xl">
    <h2  class="card-title text-4xl font-semibold mb-4">${plant.name}</h2>
  <figure>
    <img
      class="w-full h-72 object-cover rounded-xl"
      src="${plant.image}"
    />
  </figure>
<div class="card-body px-0">
    <p class="text-xl mt-4"><span class="font-bold">Category:</span>${plant.category}</p>
    <p class="text-xl"><span class="font-bold">Price:</span>৳${plant.price}</p>
    <p class="text-xl leading-relaxed"><span class="font-bold">Description:</span>${plant.description}</p>
    <form method="dialog">
    <div class="flex justify-end mt-8">
  <button class="btn px-4">Close</button>
  </div>
  </form>
  </div>
</div>
    `
    document.getElementById("my_modal_1").showModal()
}

loadCategory()
loadAllData()
