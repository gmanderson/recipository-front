import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import RecipeAPI from './../../RecipeAPI'
import Toast from './../../Toast'
import UserAPI from '../../UserAPI'
import ListAPI from './../../ListAPI'

class RecipeView {
  init(){

    // console.log(recipeID)
    this.render()
    Utils.pageIntroAnim()
    this.getRecipeByID()   

  }

  async getRecipeByID(){
    try{
      let recipeID = location.search.substring(1).split('=')[1]
      this.recipe = await RecipeAPI.getRecipeByID(recipeID)
      console.log(this.recipe)
      document.title = this.recipe.title
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async collectRemoveRecipe(){
    const currentUser = await UserAPI.getUser(Auth.currentUser._id)
    console.log(currentUser.recipes)

    // Compares if recipe exists in collection
    if(currentUser.recipes.find(singleRecipe => singleRecipe['_id'] === this.recipe._id)){
      try{
        // Removes if exists in collection (if user recipe also deletes)
        console.log(this.recipe._id)
        await UserAPI.removeRecipe(this.recipe._id)

        if(this.recipe.isUserRecipe === true){
          await RecipeAPI.deleteRecipe(this.recipe._id)
          gotoRoute(localStorage.getItem('previousPath'))
        }
        Toast.show('Recipe removed')
      }catch(err){
        Toast.show(err, 'error')
      }
    }else{
      // Adds only if doesn't exist in collection
      try{
        console.log(this.recipe._id)
        await UserAPI.collectRecipe(this.recipe._id)
        Toast.show('Recipe collected')
      }catch(err){
        Toast.show(err, 'error')
      }
    }

  }

  async addItemsToList(){
    const currentUser = await UserAPI.getUser(Auth.currentUser._id)
    const listId = currentUser.shoppingList._id
    console.log(listId)

    const ingredientsList = this.recipe.ingredients.map(ingredient => ingredient.name)
    console.log(ingredientsList)

    try{
      await ListAPI.addItemsToList(listId, ingredientsList)
      Toast.show('Items added to list')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  scaleDialog(){
    const scaleDialog = document.querySelector('.scale-servings')
    scaleDialog.show()
  }

  async scaleServes(){
    // Reset all to original quantities
    await this.getRecipeByID()


    let scaledQuantity = document.querySelector('.scale-input').value

    this.recipe.servings = this.recipe.servings * scaledQuantity
    this.recipe.ingredients.map(ingredient => {
    ingredient.quantity = ingredient.quantity * scaledQuantity})

    document.querySelector('.scale-input').value = ''
    document.querySelector('.scale-servings').hide()
    
    this.render()


  }

  render(){
    const template = html`

<img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">
    
      <va-app-header title="${localStorage.getItem('previousName')}" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
      ${this.recipe == null ? html`
            <sl-spinner></sl-spinner>
        ` : html`
        <div class="recipe-sheet">   
          <div class="recipe-image">
          <img src="${App.apiBase}/images/${this.recipe.image}">
          </div>

          <div class="recipe-brief">
          <p class="marker-heading">${this.recipe.title}</p>
          <p>Prep Time: ${this.recipe.prepTime}</p>
          <p>Cook Time: ${this.recipe.cookTime}</p>
          <p>Servings: ${this.recipe.servings}</p>

          <sl-button @click="${() => this.scaleDialog()}" pill>Scale Serves</sl-button>
          </div>

          <div class="recipe-ingredients">
          <h3 class="ingredient-heading-button marker-heading">Ingredients</h3>
          <sl-button class="ingredient-heading-button" @click="${() => this.addItemsToList()}" pill>Add to Shopping List</sl-button>
          <ul class="ingredients-list">
            ${this.recipe.ingredients.map(ingredient => html`<li>${ingredient.quantity} ${ingredient.unit} ${ingredient.name}</li>`)}
  </ul>
        


          <h3 class="marker-heading">Notes</h3>
          <p>${this.recipe.notes}</p>
          </div>

          <div class="recipe-directions">
          <h3 class="marker-heading">Directions</h3>
          <p>${this.recipe.directions}</p>

          </div>

          </div> 
        
        `}
      </div>
      <sl-dialog class="scale-servings" no-header>
        <p>Enter number to scale ingredient quantities by</p>
<p>(eg. 0.5 for half, 2 for double)</p>
        <sl-input pill class="scale-input"></sl-input>
        <sl-button pill @click="${() => this.scaleServes()}">Scale</sl-button>
        <sl-button pill @click="${() => document.querySelector('.scale-servings').hide()}">Cancel</sl-button>
      </sl-dialog>
    `
    render(template, App.rootEl)
  }
}


export default new RecipeView()