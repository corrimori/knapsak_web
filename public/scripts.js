let apiUrl = 'http://localhost:8010'

const loadKnapsaks = () => {
  console.log('loading knapsaks...')

  let knskList = document.querySelector('#knapsakLists')
  knskList.innerHTML = ''

  axios.get(apiUrl + '/knapsaks').then(result => {
    console.log('result.data------->', result.data)
    let data = result.data
    console.log('result.data[0]>>>', result.data[0]);
    data.forEach( element => {
      let descItem = document.createElement('li')
      descItem.innerHTML = element.description
      knskList.appendChild(descItem).addEventListener('click', () => {
        let knskListId = knskList.id
        console.log('button clicked!');
        console.log('element id>>', element.id)
        console.log('element userid>>', element.user_id);
      })

    })

  })

} // end function loadKnapsaks

loadKnapsaks()

const loadItems = () => {
  console.log('loading items...')

  let itemsList = document.querySelector('#items-container')

  axios.get(apiUrl + '/items').then(result => {
    console.log('result.data ITEMS -------->', result.data);
    console.log('name', result.data[3].name);
    let itemData = result.data
    itemData.forEach( element => {
      // create a card from each element
      let itemCard = `
      <div class="card d-flex flex-row" style="width: 55rem;">
              <img src="./img/${element.itemImage}" width="150px" height="150px" alt="item">
              <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <br>

                <div class="qtyIncButton d-inline-flex p-6">
                  <button type="button" class="btn btn-default btn-number btn-outline-secondary" onclick="${minus}">
                    <span class="fas fa-minus"></span>
                  </button>

                  <input type="text" class="form-control input-number col-md-2" value="${count}" class="count">

                  <button type="button" class="btn btn-default btn-number btn-outline-secondary" onclick="plus()">
                    <span class="fas fa-plus"></span>
                  </button>

                </div>
              </div>
            </div>
      `
      let newItemCard = document.createElement('div')
      newItemCard.innerHTML = itemCard
      itemsList.appendChild(newItemCard)
    })
  })
}

loadItems()

// increment counter

let count = 1;
let counter = document.querySelectorAll(".count");
function plus(){
  console.log('event>>', event);
    count++;
    event.target.value = count;
    console.log('count', count);
}
function minus(){
  if (count > 1) {
    count--;
    counter.value = count;
  }
}
