import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import Router from './../Router'
import CreateRecipe from './../views/pages/createRecipe'

customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){	
    const currentPath = window.location.pathname
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){			
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = this.shadowRoot.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      .app-header {
        background: linear-gradient(#f68400, #F7D720); /*change to vars */
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        color: #000;
        display: flex;
        z-index: 9;
        box-shadow: 4px 0px 10px rgba(0,0,0,0.2);
        align-items: center;
      }      

      .app-header-main {
        flex-grow: 1;
        display: flex;
        align-items: center;
        font-family: var(--heading-font)
      }

      .app-header-main::slotted(h1){
        color: #fff;
      }

      .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;      
      }

      .app-logo img {
        width: 90px;
      }
      
      .hamburger-btn::part(base) {
        color: #000;
      }

      .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
      }

      .app-top-nav a {
        display: inline-block;
        padding: .8em;
        text-decoration: none;
        color: #000;
      }
      
      .app-side-menu-items a {
        display: block;
        padding: .5em;
        text-decoration: none;
        font-size: 1.3em;
        color: #333;
        font-family: var(--heading-font)
      }

      .app-side-menu-logo {
        width: 120px;
        margin-bottom: 1em;
        position: absolute;
        top: 2em;
        left: 1.5em;
      }

      .page-title {
        color: var(--app-header-txt-color);
        margin-right: 0.5em;
        font-size: var(--app-header-title-font-size);
      }

      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
        font-weight: bold;
      }

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .app-top-nav {
          display: none;
        }
      }

    </style>

    <header class="app-header">
      <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 1.5em;"></sl-icon-button>       
      
      <div class="app-header-main">
        ${this.title ? html`
          <h1 class="page-title">${this.title}</h1>
        `:``}
        <slot></slot>
      </div>

      <nav class="app-top-nav">
        <!-- Displays if at home route -->
        ${(window.location.pathname == '/') ? html`
        <sl-input pill></sl-input>
        <sl-button pill>Search</sl-button>
        <sl-button pill @click="${() => gotoRoute('/createRecipe')}">Create Recipe</sl-button>
        ` : html``}

        <!-- Displays if at createRecipe route -->
        ${(window.location.pathname == '/createRecipe') ? html`
        <!-- <sl-button pill class="create-btn" @click="${CreateRecipe.saveRecipe}">Save Recipe</sl-button> -->
        <sl-button pill @click="${() => gotoRoute('/')}">Back to Recipe Book</sl-button>
        ` : html``}

        

        <a href="/" @click="${anchorRoute}">Home</a>        
        <sl-dropdown>
          <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
          
          </a>
          <sl-menu>            
            <sl-menu-item @click="${() => gotoRoute('/account')}">Profile</sl-menu-item>
            <sl-menu-item @click="${() => gotoRoute('/editProfile')}">Edit Profile</sl-menu-item>
            <sl-menu-item @click="${() => Auth.signOut()}">Sign Out</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </nav>
    </header>

    <sl-drawer class="app-side-menu" placement="left">
      <nav class="app-side-menu-items">
      <sl-avatar style="--size: 48px;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar>
        <p>${this.user.firstName} ${this.user.lastName}</p>
        <a href="/" @click="${this.menuClick}">My Recipe Book</a>
        <a href="/explore" @click="${this.menuClick}">Explore Recipes</a>
        <a href="/shoppingList" @click="${this.menuClick}">Shopping List</a>
        <a href="/account" @click="${this.menuClick}">Account</a>
        <a href="#" @click="${() => Auth.signOut()}">Log Out</a>
      </nav>  
      <h1>Recipository</h1>
    </sl-drawer>
    `
  }
  
})

