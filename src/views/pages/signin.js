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
    Utils.backgroundAnim()
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
       <img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">

      <div class="page-content page-centered">
        <div class="signinup-box">
        <h1 class="brand-name" id="brand-sign-in">Recipository</h1>
        <div class="signinfields"> 
          <sl-form class="dark-theme" @sl-submit=${this.signInSubmitHandler}>          
            <div>
              <sl-input name="email" type="email" placeholder="Email address" required pill></sl-input>
            </div>
            <div>
              <sl-input name="password" type="password" placeholder="Password" required toggle-password pill></sl-input>
            </div>
            <sl-button class="submit-btn" type="primary" submit pill style="width: 100%;">Log In</sl-button>
          </sl-form>
          <p>Not a member?</p>
          <sl-button class="" pill style="width: 100%;" type="primary" @click=${() => gotoRoute('/signup')}>Sign Up</sl-button>
          </div>  

        </div>

      </div>
      <div class="copyright">
      <p>&#169; ${new Date().getFullYear()} Friendly Food Conglomerate</p>
      </div>

    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()