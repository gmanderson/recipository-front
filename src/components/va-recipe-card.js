import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import RecipeAPI from '../RecipeAPI'
import Toast from '../Toast'
import recipe from '../views/pages/recipe'

customElements.define('va-recipe-card', class RecipeCard extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id:{
        type: String
      },
      title: {
        type: String
      },
      image: {
        type: String
      }
    }
  }

  firstUpdated(){
    super.firstUpdated() 
  }

  recipePageHandler(){
    console.log(this.id)
    console.log(this.title)
    this.id
    gotoRoute(`/recipe?id=${this.id}`)
  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
        cursor: pointer;
      }

      div{
          display: block;
          width: 20em;
      }

      sl-card{
        --border-radius: 50px;
        text-align: center;
        --padding: 0px;
        margin-bottom: 4em;
      }

      sl-card::part(body){
        background-color: var(--brand-color-yellow);
        border-radius: 0px 0px 50px 50px;
      }

      .wrap{
        display: flex;
        /* justify-content: space-around; */
      }

    </style>

    <div class="wrap">
        <sl-card @click=${this.recipePageHandler.bind(this)}>
            <img slot="image" src="${App.apiBase}/images/${this.image}">
            <div><h3>${this.title}</h3></div>
        </sl-card>
        <img>
        
    </div>

    `
  }
  
})
