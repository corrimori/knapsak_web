let apiUrl = 'http://localhost:8010'

const loadKnapsaks = () => {
  console.log('loading knapsaks...')

  let knskList = document.querySelector('#knapsak-lists')
  knskList.innerHTML = ''
  let userId = 2

  axios.get(`${apiUrl}/users/${userId}/knapsaks`).then(result => {
    console.log('result.data------->', result.data)
    let data = result.data
    console.log('result.data[0]>>>', result.data[0]);
    data.forEach( element => {
      let descItem = document.createElement('li')
      descItem.innerHTML = element.description
      knskList.appendChild(descItem).addEventListener('click', () => {
        let knskListId = element.id
        console.log('>>', knskListId);
        localStorage.setItem('knapsak_id', JSON.stringify(knskListId))
        console.log('button clicked!');
        console.log('element id>>', element.id)
        console.log('element userid>>', element.user_id);
        loadItems()
      })
    })
  })
} // end function loadKnapsaks

loadKnapsaks()

// add items to page, add counter with increment functionality
const loadItems = () => {
  console.log('loading items...')

  // clear display
  document.querySelector('#items-container').innerHTML = ''

  let itemsList = document.querySelector('#items-container')
  let knapsakId = JSON.parse(localStorage.getItem('knapsak_id'))

  //grab items related to knapsak
  axios.get(`${apiUrl}/knapsaks/${knapsakId}/items`).then(result => {
    console.log('result.data ITEMS -------->', result.data);
    console.log('name', result.data[3].name);
    let itemData = result.data
    let qtyObj = {}

    itemData.forEach( element => {
      // create an object to store the quanity of each item
      // qtyObj[`${element.id}`] = 1
      // console.log('qtyobj>>>', qtyObj);

      // create a card from each element
      console.log('elem>>>', element);
      let itemCard = `
        <div class="card d-flex flex-row" style="width: 55rem;">
          <img src="./img/${element.itemImage}" width="150px" height="150px" alt="item">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <br>

            <div class="qtyIncButton d-inline-flex p-6">

              <button type="button" class="btn btn-default btn-number btn-outline-secondary" id="${element.name}-minus-btn">
                <span class="fas fa-minus"></span>
              </button>

              <input type="text" data-item="${element.id}" class="form-control qty-item input-number col-md-2" id="qty-${element.name}" value="${element.quantity}">

              <button type="button" class="btn btn-default btn-number btn-outline-secondary" id="${element.name}-plus-btn">
                <span class="fas fa-plus"></span>
              </button>

            </div>
          </div>
        </div>
      `
      //append card div to html page
      let newCard = document.createElement('div')
      newCard.innerHTML = itemCard
      itemsList.appendChild(newCard)

      // minus qty from input value button
      let minusButton = document.querySelector(`#${element.name}-minus-btn`)

      minusButton.addEventListener("click", () => {
        let count = document.querySelector(`#qty-${element.name}`).value
        if (count > 0)
        document.querySelector(`#qty-${element.name}`).value--
        // localStorage.setItem(${element.name}:count)
      })

      // plus qty from input value button
      let plusButton = document.querySelector(`#${element.name}-plus-btn`)

      plusButton.addEventListener("click", () => {
        document.querySelector(`#qty-${element.name}`).value++
        // {name1: element.name,
        // quantity: count},
        // name2: 5,
        // save btn
      })
    })
  })
}

const formSubmit = (e) => {
  e.preventDefault()
  console.log('working form submit')
  // get knapsak id - stored in local storage?
  let itemQtys = document.querySelectorAll(".qty-item")
  itemQtys.forEach( (item) => {
    let knapsak_id = JSON.parse(localStorage.getItem('knapsak_id'))
    let item_id = item.getAttribute('data-item')
    let quantity = item.value
    let payload = { knapsak_id, item_id, quantity }
    console.log('payload', payload);

    // axios post with payload
  })
}
let form = document.querySelector("#knapsak-form")
form.addEventListener("submit", formSubmit)

// let storeKnapsak = {'boy_undies': 0, 'girl_undies': 0, 'socks': 0, 'tshirt': 0, 'longsleeve': 0, 'shorts': 0, 'pants': 0, 'skirt': 0, 'jacket': 0, 'shoes': 0, 'boy_swimsuit': 0, 'girl_swimsuit': 0, 'toothbrush': 0}

// const getQty = () => {
//   let itemQty = document.querySelector(`#qty-${element.name}`).value
//   console.log('itemQty', itemQty)
//
//   getQtyButton.addEventListener = ("click", (${element.id}) => {
//     let itemQty = document.querySelector(`#qty-${element.name}`).value
//     console.log('itemQty', itemQty)
//   })
// }
//
// LOCAL STORAGE =================================
// // Save data to the current local store
// localStorage.setItem("username", "John");
//
// // Access some stored data
// alert( "username = " + localStorage.getItem("username"));


// console.log('finished loading functions...');
console.log('boy undies>> ', document.querySelector('#qty-boy_undies').value);


// document.getElementById(elId).value = 2
// {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1}
