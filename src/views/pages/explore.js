import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import RecipeAPI from './../../RecipeAPI'

class ExploreView {
  init(){
    document.title = 'Explore Recipes'  
    this.recipes = null  
    this.render()    
    this.getCompanyRecipes()
    Utils.recipeCardsAnim() 
  }

  async getCompanyRecipes(){
    try{
      this.recipes = await RecipeAPI.getCompanyRecipes()
      console.log(this.recipes)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async addFavHandler(){    
    try {
      await UserAPI.addFavHaircut(this.id)
      Toast.show('Haircut added to favourites')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async searchRecipes(searchTerm){
    console.log(searchTerm)
    // Get fresh results to search
    this.recipes = await RecipeAPI.getCompanyRecipes()

    console.log(this.recipes)

    let searchResult = this.recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))

    this.recipes = searchResult
    console.log(this.recipes)
    this.render()
  }

  clearSearch(){
    document.addEventListener('sl-clear', () => {
      console.log("CLEAR BUTTON")
      // this.getCompanyRecipes()
    })
  }

  render(){
    const template = html`

<img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">
    
      <va-app-header title="Explore Recipes" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
      <div class="recipes-grid"> 
      ${this.recipes == null ? html`
            <sl-spinner></sl-spinner>
        ` : html`       

        ${this.recipes.map(recipe => html`
          <va-recipe-card class="recipe-card"
          id=${recipe._id}
          title=${recipe.title}
          image=${recipe.image}
          >
          </va-recipe-card>
        `)}
        </div>
        
        `}
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new ExploreView()