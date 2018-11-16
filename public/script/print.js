// const toPrint = require('./folder/jsfile')

// document.querySelector("button").onclick = function () {
//   window.print();
// }

let apiUrl = 'http://localhost:8010'

// ==========================================
//  LOADS ITEMS from a PackList
// ==========================================

const loadItems = () => {
  console.log('loading items...')

  let printContainer = document.querySelector('#print-container')
  let knapsakId = JSON.parse(localStorage.getItem('knapsak_id'))

  // GET items related to knapsak
  axios.get(`${apiUrl}/knapsaks/${knapsakId}/items`)
    .then(result => {

    let printItem = result.data
    console.log('data>>', result.data);
    // let qtyObj = {}

    printItem.forEach( element => {
       // style="width: 55rem;"
      console.log('elem>>>', element);
      let itemToPrint = `
        <div class="print-square">
          <img src="./img/${element.itemImage}" width="150px" height="150px" alt="item">
        </div>
      `
      //append card div to html page
      let printSquare = document.createElement('div')
      printSquare.innerHTML = itemToPrint
      printContainer.appendChild(printSquare)
    })

  })
}

loadItems()



// module.exports = {
//   loadItems
// }
