import App from './../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import { parseTwoDigitYear } from 'moment'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`      
      <div class="page-content page-centered">
        <div class="signinup-box">
        <h1 class="brand-name">Recipository</h1>         
          <sl-form class="form-signup dark-theme" @sl-submit=${this.signInSubmitHandler}>          
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required pill></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required toggle-password pill></sl-input>
            </div>
            <sl-button class="submit-btn" type="primary" submit pill style="width: 100%;">Log In</sl-button>
          </sl-form>
          <p>Not a member?</p>
          <sl-button class="" pill style="width: 100%;" type="primary" @click=${() => gotoRoute('/signup')}>Sign Up</sl-button>
          <p>&#169; ${new Date().getFullYear()} Friendly Food Conglomerate</p>
        </div>
      </div>
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()