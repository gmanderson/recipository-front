import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import moment from 'moment'

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

  render(){
    const template = html`
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
          <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        ${Auth.currentUser.accessLevel == 1 ? html`Standard User` : html `Pro User`}
          </div>
          <div class="account-item-info">
            <div class="info-title">
              <p>Email</p>
              <p>State</p>
              <p>Updated</p>
            </div>
            <div class="info-details">
            <p> ${Auth.currentUser.email}</p>
        <p>  ${Auth.currentUser.state}</p>
        <p>INSERT STATE HERE</p>
        <p> ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
            </div>

          </div>
          <div class="account-item-buttons">
              <sl-button class='account-btn' pill @click=${()=> gotoRoute('/editProfile')}>Edit Details</sl-button>
            <sl-button class='account-btn' pill @click=${()=> gotoRoute('/changePassword')}>Change Password</sl-button>
            <sl-button class='account-btn' pill @click=${()=> this.subscriptionDialog()}>Subscription Level</sl-button>
            <sl-button class='account-btn' pill @click=${()=> this.closeAccountDialog()}>Close Account</sl-button>
          </div>
        </div>      






        <sl-dialog class="close-account" label="close account"></sl-dialog>
        <sl-dialog class="subscription"></sl-dialog>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()