import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import ListAPI from './../../ListAPI'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class ShoppingListView {
  init(){
    document.title = 'Shopping List' 
    this.list = null     
    this.render()    
    Utils.pageIntroAnim()
    this.getItems()
  }

  async getItems(){
      try{
        const currentUser = await UserAPI.getUser(Auth.currentUser._id)
        this.list = currentUser.shoppingList
        console.log(this.list)
        console.log(this.list.items)
        console.log(this.list.items[0])
        this.render()
      }catch(err){
        Toast.show(err, 'error')
      }
  }

  printList(){
    let items = document.querySelector('.list-items')
    while(items.firstChild){
      items.removeChild(items.firstChild)
    }
    this.list.items.forEach(item => {
      let itemDeleteButton = document.createElement("sl-button")
      itemDeleteButton.setAttribute('class', 'item item-btn')
      itemDeleteButton.setAttribute('size', 'small')
      itemDeleteButton.setAttribute('pill', '')
      let deleteButtonText = document.createTextNode("-")
      itemDeleteButton.appendChild(deleteButtonText)

      let itemPlace = document.createElement("p")
      itemPlace.setAttribute('class', 'item')
      let itemText = document.createTextNode(item)
      itemPlace.appendChild(itemText)

      let itemDiv = document.createElement("div")
      itemDiv.appendChild(itemDeleteButton)
      itemDiv.appendChild(itemPlace)

      items.appendChild(itemDiv)
    })

    // sets buttons up to work
    let btns = document.querySelectorAll('.item-btn')
    
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.removeItem(btn)
      })
    })
  }

  openAddItemDialog(){
    document.querySelector('.add-item-dialog').show()
  }

  async addItem(){
    let addItemText = document.querySelector('.add-item-input').value
    console.log(addItemText)

    const currentUser = await UserAPI.getUser(Auth.currentUser._id)
    const listId = currentUser.shoppingList._id
    ListAPI.addItemsToList(listId, addItemText)

    document.querySelector('.add-item-input').value = ''
    document.querySelector('.add-item-dialog').hide()

    this.getItems()
  }

  async removeItem(item){
    console.log(item)
    console.log(item.nextElementSibling.innerHTML)

    let itemText = item.nextElementSibling.innerHTML

    const currentUser = await UserAPI.getUser(Auth.currentUser._id)
    const listId = currentUser.shoppingList._id
    ListAPI.removeItemFromList(listId, itemText)

    this.getItems()
  }

  clearListDialog(){
    document.querySelector('.clear-list-dialog').show()
  }

  async clearList(){
    const currentUser = await UserAPI.getUser(Auth.currentUser._id)
    const listId = currentUser.shoppingList._id
    ListAPI.clearList(listId)

    document.querySelector('.clear-list-dialog').hide()

    this.getItems()
  }

  render(){
    const template = html`

<img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">
    
      <va-app-header title="Shopping List" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content ">
      
      <div class="list-sheet">
      <div class="list-items"></div>
      ${this.list == null ? html`
            <sl-spinner></sl-spinner>
        ` : html`
        ${this.printList()}
        `
      }  
      </div>
      </div>


      <sl-dialog no-header class="add-item-dialog">
        <p>Add the following item to shopping list:</p>
        <sl-input pill class="add-item-input"></sl-input>
        <sl-button @click="${() => this.addItem()}" pill>Add</sl-button>
        <sl-button pill @click="${() => document.querySelector('.add-item-dialog').hide()}">Cancel</sl-button>
      </sl-dialog>   
      
      <sl-dialog no-header class="clear-list-dialog">
        <p>Are you sure you want to clear the list?</p>
        <sl-button @click="${() => this.clearList()}" pill>Clear</sl-button>
        <sl-button pill @click="${() => document.querySelector('.clear-list-dialog').hide()}">Cancel</sl-button>
      </sl-dialog>   
    `
    render(template, App.rootEl)
  }
}


export default new ShoppingListView()