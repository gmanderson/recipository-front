import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import Router from './../Router'
import CreateRecipe from './../views/pages/createRecipe'
import Recipe from './../views/pages/recipe'
import ShoppingList from './../views/pages/shoppingList'
import RecipeBook from './../views/pages/home'
import Explore from './../views/pages/explore'

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

    // Sets local storage name of page visited before individual recipe
    if(window.location.pathname == '/') {
      localStorage.setItem('previousName', 'My Recipe Book')
      localStorage.setItem('previousPath', '/')
    }
    if(window.location.pathname == '/explore') {
      localStorage.setItem('previousName', 'Explore Recipes')
      localStorage.setItem('previousPath', '/explore')
    }
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

  logOutConfirmation(){
    const logoutDialog = this.shadowRoot.querySelector('.logout-dialog')
    logoutDialog.show()

    const closeBtn = this.shadowRoot.querySelector('.close-btn')
    closeBtn.addEventListener('click', () => logoutDialog.hide())
  }

  searchTerm(){
    let searchTerm = this.shadowRoot.querySelector('.search-input').value

    if (window.location.pathname == '/'){
      RecipeBook.searchRecipes(searchTerm)
    }else{
      Explore.searchRecipes(searchTerm)
    }

  }

  noAccessDialog(){
    const noAccessDialog = this.shadowRoot.querySelector('.no-access-dialog')
    noAccessDialog.show()

    const closeBtn = this.shadowRoot.querySelector('.access-close-btn')
    closeBtn.addEventListener('click', () => noAccessDialog.hide())
  }

  render(){    
    return html`
    <head>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
    </head>
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
        font-size: 150%;
      }

      sl-drawer::part(body){
        background-color: var(--brand-color-yellow);
      }
      sl-drawer::part(header){
        background: linear-gradient(var(--brand-color-red), var(--brand-color-yellow));
      }

      sl-avatar{
        position: relative;
        margin-left: 37%;

      }
      /* sl-icon-button button.icon-button::part(base){
        font-size: 150%;
      } */

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
        display: inline-block;
        padding: .5em;
        text-decoration: none;
        font-size: 1.3em;
        color: var(--brand-color-grey);
        font-family: var(--heading-font);
        width: 80%;
        vertical-align: middle;
        margin-left: 10px;
      }

      .app-side-menu-items i {
        margin-right: 35px;
      }

      .app-side-menu-items a:hover{
        color:#000;
      }

      .app-side-menu-items p {
        text-align: center;
        font-size: 1.5rem;
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
        margin-left: 0.5em;
        font-size: var(--app-header-title-font-size);
      }

      i{
        font-size: 1.9em;
        vertical-align: middle;
      }

      sl-button{
        margin: 0.5em;
      }

      sl-button::part(base){
        background-color: var(--brand-color-yellow);
        border-color: var(--brand-color-grey);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      }

      sl-input::part(base){
        border-color: var(--brand-color-grey);
      }

      .logo-bottom{
        position: fixed;
        bottom: 0px;
        left:13%;
        font-family: var(--brand-font);
        color: var(--brand-color-red);
      }

      sl-dialog::part(base){
        text-align: center;
      }

      sl-dialog sl-button{
        width: 150px;
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
        <sl-input class="search-input" clearable @sl-clear="${()=>RecipeBook.getFavRecipes()}" pill></sl-input>
        <sl-button pill @click="${() => this.searchTerm()}">Search</sl-button>
        ${(this.user.accessLevel == 2) ? html `
        <sl-button pill @click="${() => gotoRoute('/createRecipe')}">Create Recipe</sl-button>
        ` : html`
        <sl-button pill @click="${() => this.noAccessDialog()}">Create Recipe</sl-button>
        `}
        <style>a.home-link{color:#000;} .home-link>.fas{color: var(--brand-color-red)}</style>
        ` : html``}

        <!-- Displays if at explore route -->
        ${(window.location.pathname == '/explore') ? html`
        <sl-input class="search-input" clearable @sl-clear="${() => Explore.getCompanyRecipes()}" pill></sl-input>
        <sl-button pill @click="${() => this.searchTerm()}">Search</sl-button>
        <style>a.explore-link{color:#000;} .explore-link>.fas{color: var(--brand-color-red)}</style>
        ` : html``}

        <!-- Displays if at createRecipe route -->
        ${(window.location.pathname == '/createRecipe') ? html`
        <!-- <sl-button pill class="create-btn" @click="${CreateRecipe.saveRecipe}">Save Recipe</sl-button> -->
        <sl-button class="create-btn" pill @click=${() => CreateRecipe.submitForm()}>Save Recipe</sl-button>
        <sl-button pill @click="${() => gotoRoute('/')}">Back to Recipe Book</sl-button>
        ` : html``}

        <!-- Displays if at shopping list route -->
        ${(window.location.pathname == '/shoppingList') ? html`
        <sl-button class="" pill @click=${() => ShoppingList.openAddItemDialog()}>Add Item</sl-button>
        <sl-button class="" pill @click=${() => ShoppingList.clearListDialog()}>Clear List</sl-button>
        <style>a.list-link{color:#000;} .list-link>.fas{color: var(--brand-color-red)}</style>
        ` : html``}



        ${(window.location.pathname == '/recipe') ? html`
          <sl-button pill @click="${() => Recipe.collectRemoveRecipe()}">Collect/Remove Recipe</sl-button>
          <sl-button pill @click="${() => gotoRoute(localStorage.getItem('previousPath'))}">Back to ${localStorage.getItem('previousName')}</sl-button>
      ` : html``}

      ${(window.location.pathname == '/account') ? html`
      <style>a.account-link{color:#000;} .account-link>.fas{color: var(--brand-color-red)}</style>
      ` : html``}


              
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
      <sl-avatar style="--size: 101px;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar>
        <p>${this.user.firstName} ${this.user.lastName}</p>

        <a href="/" @click="${this.menuClick}" class="home-link"><i class="fas fa-book"></i>My Recipe Book</a>     
        <a href="/explore" @click="${this.menuClick}" class="explore-link"> <i class="fas fa-search"></i>Explore Recipes</a>
        <a href="/shoppingList" @click="${this.menuClick}" class="list-link"><i class="fas fa-list"></i>Shopping List</a>
        <a href="/account" @click="${this.menuClick}" class="account-link"><i class="fas fa-user"></i>Account</a>
        <a href="#" @click="${() => this.logOutConfirmation()}"><i class="fas fa-sign-out-alt"></i>Log Out</a>

      </nav>  
      <h1 class="logo-bottom">Recipository</h1>
    </sl-drawer>

    <sl-dialog class="logout-dialog" no-header="true"><p>Are you sure you want to log out?</p>
      <div>
      <sl-button @click="${() => Auth.signOut()}" pill>Log Out</sl-button>
      <sl-button class="close-btn" pill>Close</sl-button>
      </div>
    </sl-dialog>

    <sl-dialog class="no-access-dialog" no-header="true">Standard members may not create their own recipes.<br> Go to the Account page to upgrade to Pro.
      <div>
      <sl-button @click="${() => gotoRoute('/account')}" pill>Go to Account</sl-button>
      <sl-button class="access-close-btn" pill>Close</sl-button>
      </div>
    </sl-dialog>

    `
  }
  
})

