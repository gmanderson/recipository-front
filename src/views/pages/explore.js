import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import RecipeAPI from './../../RecipeAPI'

class GuideView {
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

  render(){
    const template = html`
      <va-app-header title="Explore Recipes" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
      ${this.recipes == null ? html`
            <sl-spinner></sl-spinner>
        ` : html`        
        ${this.recipes.map(recipe => html`
          <va-recipe-card
          title=${recipe.title}
          image=${recipe.image}
          >
          </va-recipe-card>
          <p>${recipe._id}</p>
        `)}
        
        `}
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()