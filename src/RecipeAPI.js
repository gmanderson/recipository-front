import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class RecipeAPI {
  
  async getCompanyRecipes(){
    const response = await fetch(`${App.apiBase}/recipe/explore`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

      // if response not ok
      if(!response.ok){ 
        // console log error
        const err = await response.json()
        if(err) console.log(err)
        // throw error (exit this function)      
        throw new Error('Problem getting recipes')
      }
      
      // convert response payload into json - store as data
      const data = await response.json()
      
      // return data
      return data
  }

  // async createList(){
  //   const response = await fetch(`${App.apiBase}/list`, {
  //     method: 'POST'
  //   })

  //     // if response not ok
  //     if(!response.ok){ 
  //       // console log error
  //       const err = await response.json()
  //       if(err) console.log(err)
  //       // throw error (exit this function)      
  //       throw new Error('Problem creating list')
  //     }
      
  //     // convert response payload into json - store as data
  //     const data = await response.json()
      
  //     // return data
  //     return data
  // }

  // async getUser(userId){
  //   // validate
  //   if(!userId) return
    
  //   // fetch the json data
  //   const response = await fetch(`${App.apiBase}/user/${userId}`, {
  //     headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
  //   })

  //   // if response not ok
  //   if(!response.ok){ 
  //     // console log error
  //     const err = await response.json()
  //     if(err) console.log(err)
  //     // throw error (exit this function)      
  //     throw new Error('Problem getting user')
  //   }
    
  //   // convert response payload into json - store as data
  //   const data = await response.json()
    
  //   // return data
  //   return data
  // }
}

export default new RecipeAPI()