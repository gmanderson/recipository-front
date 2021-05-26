import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
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

  async updateProfileSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('profile updated')
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
    
      <va-app-header title="Account" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      <div class="page-content">     
        <div class="account-edit">

        <h1 class="marker-heading">Edit Details</h1>   
        ${(this.user == null) ? html`
          <sl-spinner></sl-spinner>
        `:html`
          <sl-form class="page-form" @sl-submit=${this.updateProfileSubmitHandler.bind(this)}>
            <div class="input-group">
              <p class="marker-heading">First Name</p>
              <sl-input pill type="text" name="firstName" value="${this.user.firstName}" placeholder="First Name" size="small"></sl-input>
            </div>
            <div class="input-group">
            <p class="marker-heading">Last Name</p>
              <sl-input pill type="text" name="lastName" value="${this.user.lastName}" placeholder="Last Name" size="small"></sl-input>
            </div>
            <div class="input-group">
            <p class="marker-heading">Email Address</p>
              <sl-input pill type="text" name="email" value="${this.user.email}" placeholder="Email Address" size="small"></sl-input>
            </div>  
            <div class="input-group">
            <p class="marker-heading">State</p>
                    <sl-select name="state" placeholder="State" required size="small" pill value=${this.user.state}>
                    <sl-menu-item value="Australian Capital Territory">Australian Capital Territory</sl-menu-item>
                    <sl-menu-item value="New South Wales">New South Wales</sl-menu-item>
                    <sl-menu-item value="Northern Territory">Northern Territory</sl-menu-item>
                    <sl-menu-item value="Queensland">Queensland</sl-menu-item>
                    <sl-menu-item value="South Australia">South Australia</sl-menu-item>
                    <sl-menu-item value="Tasmania">Tasmania</sl-menu-item>
                    <sl-menu-item value="Victoria">Victoria</sl-menu-item>
                    <sl-menu-item value="Western Australia">Western Australia</sl-menu-item>
                  </sl-select>
              </div> 
            </div>            
            <div class="input-group">
              <p class="marker-heading">Profile Picture</p>          
              ${(this.user.avatar) ? html`
                <!-- <sl-avatar image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar> -->
                <input id="avatar-input" style="display:none" type="file" name="avatar" />
                <sl-button pill size="medium" type="file" name="image" @click=${() => document.querySelector('#avatar-input').click()}>Choose File</sl-button>
              `: html`
              <input id="avatar-input" style="display:none" type="file" name="avatar" />
                <sl-button pill size="medium" type="file" name="image" @click=${() => document.querySelector('#avatar-input').click()}>Choose File</sl-button>
              `}
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

export default new EditProfileView()