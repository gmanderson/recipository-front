import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class TemplateView {
  init(){
    document.title = 'Template'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try{
      console.log(Auth.currentUser)
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser: false}, 'json')

      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <div class="page-content calign">  
      <h1 class="brand-name">Congratulations!</h1> 
      <h2>You're almost there...</h2>       
        <p>The menu (that just peeked out to say hello) contains the following sections:</p>
        <i class="fas fa-book"></i>
        <p>My Recipe Book</p>
        <p>Here you’ll find your collected recipes to browse or search. Pro members 
        will also find their own created recipes here and be able to create and 
        edit recipes.</p>
        <i class="fas fa-search"></i>
        <p>Explore Recipes</p>
        <p>Search or browse our entire catalogue of recipes and add them to your
        collection.</p>
        <i class="fas fa-list"></i>
        <p>Shopping List</p>
        <p>Add ingredients directly from recipes to the shopping list. Add and
        remove items manually so you know exactly what you need.</p>
        <i class="fas fa-user"></i>
        <p>Account</p>
        <p>Edit your details, change your password and change your subscription 
        level here.</p>


        <sl-button type="primary" @click=${() => gotoRoute('/')} pill>Let's Go!</sl-button>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TemplateView()