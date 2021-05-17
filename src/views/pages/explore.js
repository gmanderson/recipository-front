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
    Utils.pageIntroAnim()
    this.getCompanyRecipes()
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

  render(){
    const template = html`
      <va-app-header title="Explore Recipes" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
      ${this.recipes == null ? html`
            <sl-spinner></sl-spinner>
        ` : html`       
        <div class="recipes-grid"> 
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