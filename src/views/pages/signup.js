import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '') 
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`  
    
    <img class="left-background"src="./../../images/left-background.svg">
    <img class="right-background" src="./../../images/right-background.svg">

      <div class="page-content page-centered">      
        <div class="signinup-box signup-box">
        <h1>Welcome to</h1>
        <h1 class="brand-name" id="brand-sign-in">Recipository</h1>
          <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
          <div class="form-container">
            <div class="signup-left">
            <div>
                <sl-input name="firstName" type="text" placeholder="First Name" required pill></sl-input>
              </div>
              <div>
                <sl-input name="email" type="email" placeholder="Email" required pill></sl-input>
              </div>

              <div>
                    <sl-select name="state" placeholder="State" required pill>
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


              <div class="signup-right">

              <div>
                <sl-input name="lastName" type="text" placeholder="Last Name" required pill></sl-input>
              </div>


              <div>
                <sl-input name="password" type="password" placeholder="Password" required toggle-password pill></sl-input>
              </div> 

              </div>
            </div>

            <sl-checkbox name="accessLevel" type="checkbox" value="2">I wish to subscribe to Pro level membership.</sl-checkbox>        
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;" pill>Create Account</sl-button>
          </sl-form>
          <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()