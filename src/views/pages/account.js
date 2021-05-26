import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import moment from 'moment'
import UserAPI from '../../UserAPI'
import Toast from './../../Toast'
import RecipeAPI from '../../RecipeAPI'
import ListAPI from '../../ListAPI'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Account'    
    this.render()    
    Utils.pageIntroAnim()

  }

  subscriptionDialog(){
    const subscriptionDialog = document.querySelector('.subscription')
    subscriptionDialog.show()
  }

  closeAccountDialog(){
    const closeAccountDialog = document.querySelector('.close-account')
    closeAccountDialog.show()
  }

  async deleteAccount(){

    //Fetch current user
    const currentUser = await UserAPI.getUser(Auth.currentUser._id)

    console.log(currentUser.shoppingList)

    // Delete shopping list
    await ListAPI.deleteList(currentUser.shoppingList._id)

    // Delete each recipe
    try{
      currentUser.recipes.forEach(recipe => {
        if(recipe.isUserRecipe === true){
          RecipeAPI.deleteRecipe(recipe._id)
        }
      })
      Toast.show('Recipes deleted')
    }catch(err){
      Toast.show(err, 'error')
    }

    // Delete User
    try{
      await UserAPI.deleteUser(currentUser._id)
      Toast.show('User deleted')
    }catch(err){
      Toast.show(err, 'error')
    }

    // Return to signin page
    Auth.signOut()

  }

  async changeSubscription(e){
    e.preventDefault()
    const formData = e.detail.formData


    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      console.log(updatedUser.accessLevel)
      this.render()
      Toast.show('Subscription updated')
    }catch(err){      
      Toast.show(err, 'error')
    }

    document.querySelector('.subscription').hide()
  }

  render(){
    const template = html`

<img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">

      <va-app-header title="Account" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">
        <div class='account-grid'>
          <div class="account-item-avatar">
          ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
        `}
          </div>
          <div class="account-item-name">
          <h1 class="marker-heading">${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h1>
        <h3 class="marker-heading">${Auth.currentUser.accessLevel == 1 ? html`Standard User` : html `Pro User`}</h3>
          </div>
          <div class="account-item-info">
            <div class="info-title">
              <div>
              <p class="marker-heading">Email</p><p class="info-details"> ${Auth.currentUser.email}</p>
              </div>
              <div>
              <p class="marker-heading">State</p><p class="info-details">  ${Auth.currentUser.state}</p>
              </div>

              <div>
              <p class="marker-heading">Updated</p><p class="info-details"> ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
              </div>
            </div>
          </div>
          <div class="account-item-buttons">
              <sl-button class='account-btn' pill @click=${()=> gotoRoute('/editProfile')}>Edit Details</sl-button>
            <sl-button class='account-btn' pill @click=${()=> gotoRoute('/changePassword')}>Change Password</sl-button>
            <sl-button class='account-btn' pill @click=${()=> this.subscriptionDialog()}>Subscription Level</sl-button>
            <sl-button class='account-btn red-btn' pill @click=${()=> this.closeAccountDialog()}>Close Account</sl-button>
          </div>
        </div>      


        <sl-dialog class="close-account" no-header>
        <p>Are you sure you want to close your account?<br>
        <p style="color:var(--brand-color-red)">WARNING:</p> CLOSURE IS PERMANENT
        AND CAN NOT BE UNDONE</p>
        <sl-button class="red-btn" @click="${() => this.deleteAccount()}" pill>Close</sl-button>
        <sl-button pill @click="${() => document.querySelector('.close-account').hide()}">Cancel</sl-button>
        </sl-dialog>

        <sl-dialog class="subscription" no-header>
          <p>Select your subscription level:</p>
          <sl-form class="page-form" @sl-submit=${this.changeSubscription.bind(this)}>
        <div class="input-group">
                    <sl-select class="access-level-select" name="accessLevel" required size="small" pill value=${Auth.currentUser.accessLevel}>
                    <sl-menu-item value="1">Standard Member</sl-menu-item>
                    <sl-menu-item value="2">Pro Member</sl-menu-item>
                  </sl-select>
              </div> 
              <sl-button pill type="primary" class="submit-btn" submit>Confirm</sl-button>
              <sl-button pill @click="${() => document.querySelector('.subscription').hide()}">Cancel</sl-button>
          </sl-form>

        </sl-dialog>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()