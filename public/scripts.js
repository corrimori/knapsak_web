let apiUrl = 'http://localhost:8010'
let userId = 2
let user_id = 2

// ==========================================
//  LOADS KNAPSAK LIST ON left
// ==========================================

const loadKnapsaks = () => {
  console.log('loading knapsaks...')

  let knskList = document.querySelector('#knapsak-lists')
  knskList.innerHTML = ''

  // get all knapsaks belonging to a user
  axios.get(`${apiUrl}/users/${userId}/knapsaks`).then(result => {
    let data = result.data

    console.log('result.data------->', result.data)
    // console.log('result>>>>', result);
    // console.log('result.data[0]>>>', result.data[0]);

    data.forEach( element => {
      let descItem = document.createElement('li')
      descItem.innerHTML = element.description

      knskList.appendChild(descItem).addEventListener('click', () => {
        let knapsakId = element.id
        localStorage.setItem('knapsak_id', JSON.stringify(knapsakId))
        console.log('button clicked!');
        console.log(`saved knapsak id ${knapsakId} to LOCAL STORAGE`)
        console.log('element id>>', element.id)  // knapsakId
        console.log('element userid>>', element.user_id);
        loadItems()
      })
    })

  }) // end axios
} // end function loadKnapsaks

loadKnapsaks()

// let displayKsInput = document.getElementById('#displayInput')
// displayKsInput.style.display = 'none'

// ==========================================
//  LOADS ITEMS in KNAPSAK
// ==========================================

const loadItems = () => {
  console.log('loading items...')

  // clear display
  document.querySelector('#items-container').innerHTML = ''

  let itemsList = document.querySelector('#items-container')
  let knapsakId = JSON.parse(localStorage.getItem('knapsak_id'))

  // GET items related to knapsak
  // axios.get(`${apiUrl}/knapsaks/${knapsakId}/items`).then(result => {
  axios.get(`${apiUrl}/knapsaks/${knapsakId}/items`).then(result => {
    console.log('result.data ITEMS -------->', result.data);
    // console.log('name', result.data[3].name);
    let itemData = result.data
    let qtyObj = {}

    itemData.forEach( element => {

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
      })
    })
  })
}

const formSubmit = (e) => {
  e.preventDefault()
  console.log('working form submit ...')
  // retrieve knapsak id - stored in local storage
  let itemQtys = document.querySelectorAll(".qty-item")
  console.log('itemQtys---------->>', itemQtys);

  // for each item, post to database
  itemQtys.forEach((item) => {
    let knapsak_id = JSON.parse(localStorage.getItem('knapsak_id'))
    let item_id = item.getAttribute('data-item')
    let quantity = item.value
    let payload = { knapsak_id, item_id, quantity }
    console.log('payload', payload);


    // knapsak/1/items
    // axios.post(`${apiUrl}/knapsaks/${knapsak_id}/items`, payload )
    //   // console.log('in axios post ... ');
    //   .then(response => {
    //     console.log('saved successfully')
    //   });

    // add axios post with payload to create knapsak_item
  })
}

// ==========================================
//  LSKDGSGJSG JSG
// ==========================================

let newKsform = document.querySelector("#knapsak-form")
  newKsform.addEventListener("submit", formSubmit)


// ==========================================
//  Create New Knapsak and Display items
// ==========================================

const createNewKnapsak = () => {
  console.log('new knapsk button clicked');
  // displayKsInput.style.display = 'block'
  let newKnapsak = document.querySelector('#newKsName').value
  console.log('newKnapsak>>>>', newKnapsak);

  // ** get user_id from Local Storage
  // let user_id = JSON.parse(localStorage.getItem('user_id'))
  let description = newKnapsak
  let user_id = 2
  let payload = { description, user_id }
  console.log('payload', payload);

  axios.post(`${apiUrl}/knapsaks`, payload )
    .then(response => {
      console.log('new knapsak saved successfully')
    });

  axios.get(`${apiUrl}/knapsaks`)
    .then(response => {
      // get the last id that was created
      console.log('response.data>>>', response.data)
      newKsIndex = response.data.length - 1
      newKsId = response.data[newKsIndex].id
      console.log('newKsIndex>>', newKsIndex);
      console.log('newKS id>>>', newKsId);
      localStorage.setItem('knapsak_id', JSON.stringify(newKsId))
    })

  // get knapsak id
  // get description username
  // axios - create new ks:
  //  - description
  //  - user_id
  // SAVE knapsak.id to LOCAL storage
  // clear contents col 2
  // get all items from knapsak_items table for KS_items
}

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

// let storeKnapsak = {'boy_undies': 0, 'girl_undies': 0, 'socks': 0, 'tshirt': 0, 'longsleeve': 0, 'shorts': 0, 'pants': 0, 'skirt': 0, 'jacket': 0, 'shoes': 0, 'boy_swimsuit': 0, 'girl_swimsuit': 0, 'toothbrush': 0}

// document.getElementById(elId).value = 2
// {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1}
