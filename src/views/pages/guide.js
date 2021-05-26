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

<img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">
    
      <div class="page-content calign guide-step">  
      <h1 class="brand-name">Congratulations!</h1> 
      <h1 class="ralign">You're almost there...</h1>
      
      <div class="page-sub-content lalign">
      <p>The menu contains the following sections:</p>
        <div>
        <i class="fas fa-book guide-sub-heading"></i>
        <p class="guide-sub-heading marker-heading">My Recipe Book</p>
        </div>
        <p>Here you’ll find your collected recipes to browse or search. Pro members 
        will also find their own created recipes here and be able to create and 
        edit recipes.</p>

        <div>
        <i class="fas fa-search guide-sub-heading"></i>
        <p class="guide-sub-heading marker-heading">Explore Recipes</p>
        </div>
        <p>Search or browse our entire catalogue of recipes and add them to your
        collection.</p>

        <div>
        <i class="fas fa-list guide-sub-heading"></i>
        <p class="guide-sub-heading marker-heading">Shopping List</p>
        </div>
        <p>Add ingredients directly from recipes to the shopping list. Add and
        remove items manually so you know exactly what you need.</p>
        <div>
        <i class="fas fa-user guide-sub-heading"></i>
        <p class="guide-sub-heading marker-heading">Account</p>
        </div>
        <p>Edit your details, change your password and change your subscription 
        level here.</p>
      </div>



        <sl-button type="primary" @click=${() => gotoRoute('/')} pill>Let's Go!</sl-button>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TemplateView()