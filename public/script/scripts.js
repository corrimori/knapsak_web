let apiUrl = 'http://localhost:8010'
let userId = 2
localStorage.setItem('user_id', JSON.stringify(userId))

// ==========================================
//  script for login form
// ==========================================

// $('.message a').click(function(){
//    $('form-login').animate({height: "toggle", opacity: "toggle"}, "slow");
// });

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
      let knapsakList = document.createElement('li')
      knapsakList.innerHTML = element.description

      // Add close x to delete knapsak
      let span = document.createElement("SPAN");
      let txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      let knapsakId = element.id

      knskList.appendChild(span).addEventListener('click', () => {
        console.log('knapsakId>>>', knapsakId)
        axios.delete(`${apiUrl}/knapsaks/${knapsakId}`).then( result => {
          let data = result.data
          console.log('knapsak successfully removed');
          loadKnapsaks()
        })
      })
      // knskList.appendChild(span).addEventListener('click', deleteKnapsak(knapsakId))

      // Add click on each Knapsak
      knskList.appendChild(knapsakList).addEventListener('click', () => {
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

// delete knapsak with id onClick of X
const deleteKnapsak = (knapsakId) => {
   axios.delete(`${apiUrl}/knapsaks/${knapsakId}`).then( result => {
     let data = result.data
     console.log('knapsak successfully removed');
     loadKnapsaks()
   })
}

// let displayKsInput = document.getElementById('#displayInput')
// displayKsInput.style.display = 'none'

const clearDisplay = () => {
  document.querySelector('#items-container').innerHTML = ''
}

// ==========================================
//  LOADS ITEMS in KNAPSAK
// ==========================================

const loadItems = () => {
  console.log('loading items...')

  clearDisplay()

  let itemsList = document.querySelector('#items-container')
  let knapsakId = JSON.parse(localStorage.getItem('knapsak_id'))

  // GET items related to knapsak
  axios.get(`${apiUrl}/knapsaks/${knapsakId}/items`)
    .then(result => {
    console.log('result.data ITEMS -------->', result.data);
    // console.log('name', result.data[3].name);
    let itemData = result.data

    itemData.forEach( element => {

      // create a card from each element
      console.log('elem from GET KS/#/items>>>', element);
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

              <input type="text" data-item="${element.itemId}" class="form-control qty-item input-number col-md-2" id="qty-${element.name}" value="${element.quantity}">

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
  console.log('itemQtys-------->', itemQtys);
  // itemQtys = [ nodelist ]

  // for each item, post to database
  itemQtys.forEach((item) => {
    let knapsak_id = JSON.parse(localStorage.getItem('knapsak_id'))
    let item_id = +item.getAttribute('data-item')
    let quantity = +item.value
    let payload = { knapsak_id, item_id, quantity }
    console.log('payload', payload);

    // knapsak/1/items
    // update the quantity of the items
    axios.put(`${apiUrl}/knapsaks/${knapsak_id}/items/${item_id}`, payload )
      // console.log('in axios post ... ');
      .then(response => {
        console.log('saved successfully')
      });

    // add axios post with payload to create knapsak_item
  })
  window.location.replace("toPrint.html")
}


// ==========================================
//  Listen submit, call formSumbit function
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

  // create a new knapsak
  axios.post(`${apiUrl}/knapsaks`, payload )
    .then(response => {
      loadKnapsaks()
      console.log('new knapsak saved successfully')
    });

  // get all knapsaks
  axios.get(`${apiUrl}/knapsaks`)
    .then(response => {
      // get the last id that was created
      newKsIndex = response.data.length - 1
      newKsId = response.data[newKsIndex].id
      localStorage.setItem('knapsak_id', JSON.stringify(newKsId))
    })

  // for Each item, post row to db to fill KS with all 13 items
  for (var i = 1; i < 14; i++) {
    let knapsak_id = JSON.parse(localStorage.getItem('knapsak_id'))
    item_id = i
    quantity = 0
    let payload = { knapsak_id, item_id, quantity }
    console.log('loading item payload>>>', payload);
    // post row item in knapsak to db
    axios.post(`${apiUrl}/knapsaks/${knapsak_id}/items`, payload )
      .then(response => {
        console.log(`new item ${i}, saved to knapsak ${knapsak_id}`)
      });
  }

  clearDisplay()
  loadItems()


  // link to print page
  // window.location.href = "../toPrint.html";
  // trigger collecting qty and post to db


}

//==================================================
