import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-recipe-block', class RecipeBlock extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
    //   title: {
    //     type: String
    //   },
    //   user: {
    //     type: Object
    //   }
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
          width: 100%;
      }

    </style>

    <div>
        <sl-card>
            <img slot="image" src="">
            <div slot="footer"><h3>Recipe Title</h3></div>
        </sl-card>
        <img>
        
    </div>

    `
  }
  
})
