'use strict';
/* global $ */

const STORE = {
  items: [
    { name: 'apples', checked: false },
    { name: 'oranges', checked: false },
    { name: 'milk', checked: true },
    { name: 'bread', checked: false }
  ],
  hideCompletedItems: false,
  filterSearch: {}
};
  



function generateItemElement(item, itemIndex, template) {
  return `

    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item,index));

  return items.join('');
}

function renderShoppingList() {
  console.log('`renderShoppingList`, ran');
  console.log('`handleHideCompletedItems` ran 2');
  console.log('`handleFilterSearchBox` ran 2');

  let filteredItems = STORE.items; // a copy of STORE.items - array of objects
  if (STORE.hideCompletedItems) {    // when STORE.hideCompletedItems === true, 
    filteredItems = STORE.items.filter(function(item) {  // the key/value pair in STORE.items that has a checked value of false gets filtered out and gets stored it in the copy of STORE.items 
      return item.checked === false;
    });
  }
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);
  $('.js-shopping-list').html(shoppingListItemsString);


}






function addItemToShoppingList(itemName) {
  console.log(`Adding '${itemName}' to shopping list}`);
  STORE.items.push({name: itemName, checked: false});
}


function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();

    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}



function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items [itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click','.js-item-toggle', event => {
    
    console.log('`handleItemCheckedClick` ran');

    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}






// Delete Item Challenge =========================>>>
function deleteItemList (itemIndex) {
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log('`handleDeleteItemClicked` ran');
    deleteItemList(itemIndex);
    renderShoppingList();
  });
}
// <<<======================== Delete Item Challenge





// Hide Completed Items Challenge ===============>>>

function handleHideCompletedItems() {
  $('.js-shopping-list-hide').on('click', () => {
    console.log('`handleHideCompletedItems` ran'); // test
    STORE.hideCompletedItems = !STORE.hideCompletedItems; // changes the value to true
    renderShoppingList();
  });
}

// 1. first try --->
// function handleHideCompletedItems() {
//   $('#js-shopping-list-hide :checkbox').on('click', () => {
//     console.log('`handleDisplayAllUnchecked` ran');
//     $('.shopping-item__checked').closest('li').toggle();
//   }); 
// }

// <<<=============== Hide Completed Items Challenge 




// Search box that displays only what was searched for ========>>>
function handleFilterSearchBox() {
  $('.js-search-button').on('click', function(event) {
    event.preventDefault();

    const searchText = $('.js-search-item').val();


    if(searchText !== '') {
      const filteredText = STORE.items.filter(x => function(x) {
        return x.item === searchText || x.item.toLowerCase() === searchText;
      });
      const shoppingListItemsString2 = generateShoppingItemsString(filteredText);
      $('.js-shopping-list').html(shoppingListItemsString2);
    }
    $('.search-for-item').val('');
  });
}
    

// for (let i = 0; i < STORE.items.length; i++) {
//   let a = STORE.items[i].name;
//   if (a.toUpperCase().indexOf(searchText) > -1) {
//     console.log('FOREACH WORKS!!!!');
//   } else {
//     console.log(false);
//   }
// }



//     STORE.items.each(i => function() {
//       let a = STORE.items[i].name;
//       let searchText = $('.js-search-item').val().toUpperCase();
//       if (a.toUpperCase().indexOf(searchText) > -1) {
//         console.log('FOREACH WORKS!!!!');
//       }
//     });
//   });
// }
// <<<========Search box that displays only what was searched for 



// Grouped all handle functions into one function
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleHideCompletedItems();
  handleFilterSearchBox();
}

$(handleShoppingList); // when DOM is loaded, do this.

