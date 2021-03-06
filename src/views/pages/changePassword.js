import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class ShoppingListView {
  init(){
    document.title = 'Change Password'   
    this.user = null 
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async changePassword(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const updatedUser = await UserAPI.changePassword(Auth.currentUser._id, formData)     
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('password updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
    gotoRoute('/account')
  }

  render(){
    const template = html`

<img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">
    
      <va-app-header title="Account" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content"> 
      <div class="account-edit">       
        <h1 class="marker-heading">Change Password</h1>
      
        ${(this.user == null) ? html`
          <sl-spinner></sl-spinner>
        `:html`
          <sl-form class="page-form" @sl-submit=${this.changePassword.bind(this)}>
            <div class="input-group">
            <p class="marker-heading">New Password</p>
              <sl-input pill type="password" name="newPassword"></sl-input>
            </div>
            <div class="input-group">
            <p class="marker-heading">Confirm New Password</p>
            <sl-input pill type="password" name="confirmNewPassword"></sl-input>
            </div>            
            <sl-button pill type="primary" class="submit-btn" submit>Confirm</sl-button>
            <sl-button pill type="primary" class="cancel-btn" @click="${() => gotoRoute('/account')}">Cancel</sl-button>
          </sl-form>
        `}
        </div>
      </div>
           
    `
    render(template, App.rootEl)
  }
}


export default new ShoppingListView()