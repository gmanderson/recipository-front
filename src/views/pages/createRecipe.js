import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import RecipeAPI from '../../RecipeAPI'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class CreateRecipeView {
  init(){
    document.title = 'Create Recipe'
    this.render()    
    Utils.pageIntroAnim()
  }

  async saveRecipe(e){
    // const createBtn = document.querySelector('.create-btn')
    // createBtn.setAttribute('loading', '')   
    const formData = e.detail.formData

    let jsonObject = {}

    for (const [key, value]  of formData) {
     jsonObject[key] = value
    }
    console.log(jsonObject)

    try{
      const newRecipe = await RecipeAPI.newRecipe(formData)
      Toast.show('Recipe added')
      // createBtn.removeAttribute('loading') 
      // reset form
      // text & text area fields
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)

      // // image selector
      // const fileInput = document.querySelector('input[type=file]')
      // if(fileInput) fileInput.value = null

      // Add recipe to user collection
      try{
        await UserAPI.collectRecipe(newRecipe._id)
        Toast.show('Recipe collected')
      }catch(err){
        Toast.show(err, 'error')
      }

      // Return to recipe book
      gotoRoute('/')

    }catch(err){
      Toast.show(err, 'error')
      // createBtn.removeAttribute('loading') 
    }
  }

  // Triggers submission of form
  submitForm(){
    const submitSL = document.querySelector('sl-form');
    submitSL.submit();
  }

  addIngredientLine(){
    let ingredientSection = document.querySelector('.ingredients')

    let quantityField = document.createElement("sl-input")
    quantityField.setAttribute('class', 'ingredient-field')
    quantityField.setAttribute('name', 'quantity')
    quantityField.setAttribute('type', 'text')
    quantityField.setAttribute('pill', '')
    quantityField.setAttribute('size', 'small')

    let unitField = document.createElement("sl-input")
    unitField.setAttribute('class', 'ingredient-field')
    unitField.setAttribute('name', 'unit')
    unitField.setAttribute('type', 'text')
    unitField.setAttribute('pill', '')
    unitField.setAttribute('size', 'small')

    let nameField = document.createElement("sl-input")
    nameField.setAttribute('class', 'ingredient-field ingredient-name-field')
    nameField.setAttribute('name', 'name')
    nameField.setAttribute('type', 'text')
    nameField.setAttribute('pill', '')
    nameField.setAttribute('size', 'small')

    let ingredientDiv = document.createElement("div")

    ingredientDiv.appendChild(quantityField)
    ingredientDiv.appendChild(unitField)
    ingredientDiv.appendChild(nameField)

    ingredientSection.appendChild(ingredientDiv)
  }

  removeIngredientLine(){
    let ingredientSection = document.querySelector('.ingredients')

    ingredientSection.removeChild(ingredientSection.lastChild)
  }

  render(){
    const template = html`
      <style>
        sl-input{
          width: 50%;
          
        }
      </style>

<img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">
    
      <va-app-header class="marker-heading" title="Create Recipe" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  
        <div class="create-sheet">
        <h1 class="marker-heading create-heading">Create Your Own Recipe</h1>
        <sl-form method="POST" @sl-submit="${this.saveRecipe}">
          <div class="create-grid">
            <div class="create-left-top">


          <div class='create-brief-details'>
          <p>Recipe Title</p><sl-input name="title" type="text" pill size="small"></sl-input>
          </div>

          <div class='create-brief-details'>
          <p>Prep Time</p><sl-input name="prepTime" type="text" pill size="small"></sl-input>
          </div>

          <div class='create-brief-details'>
          <p>Cook Time</p><sl-input name="cookTime" type="text" pill size="small"></sl-input>
          </div>

          <div class='create-brief-details'>
          <p>Servings</p><sl-input name="servings" type="text" pill size="small"></sl-input>
          </div>

            </div>
          <div class="create-left-bottom">
          <div class="ingredients"> 
          <h2 class="marker-heading">Ingredients</h2>
          <p>(Quantity must be a decimal number)</p>
            <div>
            <p class="ingredient-field">Qty</p><p class="ingredient-field">Unit</p><p class="ingredient-field ingredient-name-field">Ingredient Name</p>
            </div>

          </div>

          <div>
          <sl-button @click="${() => this.addIngredientLine()}" class="add-remove-btns" circle size="small">+</sl-button>
          <sl-button @click="${() => this.removeIngredientLine()}" class="add-remove-btns" circle size="small">-</sl-button>
          <p class=add-remove-text>Add/Remove Line</p>
          </div>



            </div>

            <div class="create-right-top">
              <div class="image-selector">
                <input type="file" name="image" id="file-input" style="display:none" @change=${() => preview.src=URL.createObjectURL(event.target.files[0])}/> 
                <sl-button pill type="file" name="image" @click=${() => document.querySelector('#file-input').click()}>Choose Photo</sl-button>
                <img id="preview" src="./../../images/image-regular.svg"/>
              </div>

            </div>
            <div class="create-right-bottom">
          <h2 class="marker-heading">Directions</h2>
          <sl-textarea name="directions" type="text" pill></sl-textarea>
          <h2 class="marker-heading">Notes</h2>
          <sl-textarea name="notes" type="text" pill></sl-textarea>
            </div>

          </div>


        </sl-form>
        </div>      

        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new CreateRecipeView()