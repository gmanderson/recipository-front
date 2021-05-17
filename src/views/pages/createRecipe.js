import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import RecipeAPI from '../../RecipeAPI'
import Toast from './../../Toast'

class CreateRecipeView {
  init(){
    document.title = 'Create Recipe'
    this.render()    
    Utils.pageIntroAnim()
  }

  async saveRecipe(e){
    const createBtn = document.querySelector('.create-btn')
    createBtn.setAttribute('loading', '')   
    const formData = e.detail.formData

    let jsonObject = {}

    for (const [key, value]  of formData) {
     jsonObject[key] = value
    }
    console.log(jsonObject)

    try{
      await RecipeAPI.newRecipe(formData)
      Toast.show('Recipe added')
      createBtn.removeAttribute('loading') 
      // reset form
      // text & text area fields
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)

      // // image selector
      // const fileInput = document.querySelector('input[type=file]')
      // if(fileInput) fileInput.value = null

    }catch(err){
      Toast.show(err, 'error')
      createBtn.removeAttribute('loading') 
    }
  }

  displayImage(){
    console.log("HELLO")
  }

  render(){
    const template = html`
      <style>
        sl-input{
          width: 50%;
          
        }
      </style>


      <va-app-header class="marker-heading" title="Create Recipe" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h2 class="marker-heading">Create Your Own Recipe</h2>
        <sl-form method="POST" @sl-submit="${this.saveRecipe}">
          <sl-input name="title" type="text" label="Recipe Title" pill size="small"></sl-input>
          <sl-input name="prepTime" type="text" label="Prep Time" pill size="small"></sl-input>
          <sl-input name="cookTime" type="text" label="Cook Time" pill size="small"></sl-input>
          <sl-input name="servings" type="text" label="Servings" pill size="small"></sl-input>
          <h3 class="marker-heading">Ingredients</h3>
          <p>(Quantity must be a decimal number)</p>
          <sl-input name="quantity" type="text" label="Qty" pill size="small"></sl-input>
          <sl-input name="unit" type="text" label="Unit" pill size="small"></sl-input>
          <sl-input name="name" type="text" label="Ingredient Name" pill size="small"></sl-input>
          <sl-input name="quantity" type="text" label="Qty" pill size="small"></sl-input>
          <sl-input name="unit" type="text" label="Unit" pill size="small"></sl-input>
          <sl-input name="name" type="text" label="Ingredient Name" pill size="small"></sl-input>
          <input type="file" name="image" id="file-input" style="display:none" @change=${() => preview.src=URL.createObjectURL(event.target.files[0])}/> 
          <sl-button pill type="file" name="image" @click=${() => document.querySelector('#file-input').click()}>Choose Photo</sl-button>
          <img id="preview" src=""/>
          <sl-textarea name="directions" type="text" label="Directions" pill></sl-textarea>

          <sl-textarea name="notes" type="text" label="Notes" pill></sl-textarea>
          <sl-button class="create-btn" pill submit>Save Recipe</sl-button>
        </sl-form>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new CreateRecipeView()