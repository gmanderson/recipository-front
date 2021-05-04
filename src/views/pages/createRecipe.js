import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class CreateRecipeView {
  init(){
    document.title = 'Create Recipe'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <style>
        sl-input{
          width: 50%;
          
        }
      </style>


      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        

        <sl-form>
          <sl-input name="A Name" type="input" label="Recipe Title" pill size="small"></sl-input>
          <sl-input name="A Name" type="input" label="Prep Time" pill></sl-input>
          <sl-input name="A Name" type="input" label="Cook Time" pill></sl-input>
        </sl-form>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new CreateRecipeView()