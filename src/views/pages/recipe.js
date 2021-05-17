import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import RecipeAPI from './../../RecipeAPI'
import Toast from './../../Toast'

class RecipeView {
  init(){
    document.title = 'Recipe'
    let recipeID = location.search.substring(1).split('=')[1]
    console.log(recipeID)
    this.render()
    Utils.pageIntroAnim()
    this.getRecipeByID(recipeID)   

  }

  async getRecipeByID(id){
    try{
      this.recipe = await RecipeAPI.getRecipeByID(id)
      console.log(this.recipe)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Recipe" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
      ${this.recipe == null ? html`
            <sl-spinner></sl-spinner>
        ` : html`       
          <img src="${App.apiBase}/images/${this.recipe.image}">
          <p>${this.recipe.title}</p>
          <p>Prep Time: ${this.recipe.prepTime}</p>
          <p>Cook Time: ${this.recipe.cookTime}</p>
          <p>Servings: ${this.recipe.servings}</p>

          <sl-button>Scale Serves</sl-button>

          <h3>Ingredients</h3>
          <sl-button>Add to Shopping List</sl-button>
          <div class="ingredients-list"></div>
          <p>${this.recipe.ingredients[0].quantity} ${this.recipe.ingredients[0].unit} ${this.recipe.ingredients[0].name}</p>

          <h3>Notes</h3>
          <p>${this.recipe.notes}</p>

          <h3>Directions</h3>
          <p>${this.recipe.directions}</p>
        
        `}
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new RecipeView()