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
    this.list.items.forEach(item => {
      let itemPlace = document.createElement("p")
      let itemText = document.createTextNode(item)
      itemPlace.appendChild(itemText)
      document.querySelector('.list-items').appendChild(itemPlace)
    })
  }

  render(){
    const template = html`
      <va-app-header title="Shopping List" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
      <div class="list-items"></div>
      ${this.list == null ? html`
            <sl-spinner></sl-spinner>
        ` : html`
        ${this.printList()}
        `
      }  
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ShoppingListView()