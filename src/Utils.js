import gsap from 'gsap'

class Utils {

  isMobile(){
    let viewportWidth = window.innerWidth
    if(viewportWidth <= 768){
      return true
    }else{
      return false
    }
  }


  pageIntroAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(pageContent, {opacity: 0, y: -12}, {opacity: 1, y: 0, ease: 'power2.out', duration: 0.6})
  }

  backgroundAnim(){
    const backgroundLeft = document.querySelector('.left-background')
    gsap.fromTo(backgroundLeft, {y: -500}, {y: 850, ease: 'power0.out', duration: 4}).repeat(-1)
    const backgroundRight = document.querySelector('.right-background')
    gsap.fromTo(backgroundRight, {y: 600}, {y: -900, ease: 'power0.out', duration: 4}).repeat(-1)
  }

  recipeCardsAnim(){
    const recipeCards = document.querySelector('.recipes-grid')
    gsap.from(recipeCards, {x: -1000, ease: 'power2.out', duration: 1})
    
  }

  recipeSheetAnim(){
    const recipeSheet = document.querySelector('.page-content')
    let tl = gsap.timeline()
    tl.to(recipeSheet, {height: 0, ease: 'power2.out', duration: 1})
    tl.to(recipeSheet, {height: 1000, ease: 'power2.out', duration: 1})
  }

  createSheetAnim(){
    const createSheet = document.querySelector('.page-content')
    gsap.from(createSheet, {y: 1000, ease: 'power0.out', duration: 1})
  }
}

export default new Utils()