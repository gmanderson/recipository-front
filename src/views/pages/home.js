import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import RecipeAPI from './../../RecipeAPI'
import UserAPI from './../../UserAPI'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home' 
    this.favRecipes = null   
    this.render()    
    this.getFavRecipes()
    Utils.recipeCardsAnim()  
  }

  async getFavRecipes(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favRecipes = currentUser.recipes
      console.log(this.favRecipes)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async searchRecipes(searchTerm){
    console.log(searchTerm)
    // Get fresh results to search
    const currentUser = await UserAPI.getUser(Auth.currentUser._id)
    this.favRecipes = currentUser.recipes

    console.log(this.favRecipes)

    let searchResult = this.favRecipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))

    this.favRecipes = searchResult
    console.log(this.favRecipes)
    console.log(this.favRecipes.title)
    this.render()
  }

  render(){
    const template = html`

    <img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">

      <va-app-header title="My Recipe Book" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content">

      <div class="alt-create-btn">
      ${(Auth.currentUser.accessLevel == 2) ? html `
        <sl-button pill @click="${() => gotoRoute('/createRecipe')}">Create Recipe</sl-button>
        ` : html`
        <sl-button pill @click="${() => document.querySelector('va-app-header').shadowRoot.querySelector('.no-access-dialog').show()}">Create Recipe</sl-button>
        `}
        </div>
        
      <div class="recipes-grid">
        ${this.favRecipes == null ? html`
            <sl-spinner></sl-spinner>
        ` : html`
        ${this.favRecipes.map(recipe => html`
          <va-recipe-card class="recipe-card"
          id=${recipe._id}
          title=${recipe.title}
          image=${recipe.image}
          >
          </va-recipe-card>
        `)}
        
        `}
      </div>
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()