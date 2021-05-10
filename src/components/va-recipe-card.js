import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import RecipeAPI from '../RecipeAPI'
import Toast from '../Toast'

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

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }

      div{
          display: block;
          width: 20em;
      }

      sl-card{
        --border-radius: 50px;
      }

      .wrap{
        display: flex;
      }

    </style>

    <div class="wrap">
        <sl-card>
            <img slot="image" src="${App.apiBase}/images/${this.image}">
            <div slot="footer"><h3>${this.title}</h3></div>
        </sl-card>
        <img>
        
    </div>

    `
  }
  
})
