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

  async getRecipeByID(recipeID){
    const response = await fetch(`${App.apiBase}/recipe/${recipeID}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

      // if response not ok
      if(!response.ok){ 
        // console log error
        const err = await response.json()
        if(err) console.log(err)
        // throw error (exit this function)      
        throw new Error('Problem getting recipe')
      }
      
      // convert response payload into json - store as data
      const data = await response.json()
      
      // return data
      return data
  }

  async newRecipe(formData){
   for(var pair of formData.entries()) {
    console.log(pair[0]+ ', '+ pair[1]);
    }

        // send fetch request
        const response = await fetch(`${App.apiBase}/recipe`, {
          method: 'POST',
          headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
          body: formData
        })
    
        // if response not ok
        if(!response.ok){ 
          let message = 'Problem adding recipe'
          if(response.status == 400){
            const err = await response.json()
            message = err.message
          }      
          // throw error (exit this function)      
          throw new Error(message)
        }
        
        // convert response payload into json - store as data
        const data = await response.json()
        
        // return data
        return data
  }

 async deleteRecipe(recipeID){
    const response = await fetch(`${App.apiBase}/recipe/${recipeID}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'}
    })

      // if response not ok
      if(!response.ok){ 
        // console log error
        const err = await response.json()
        if(err) console.log(err)
        // throw error (exit this function)      
        throw new Error('Problem deleting recipe')
      }
      
      // convert response payload into json - store as data
      const data = await response.json()
      
      // return data
      return data
 }

}

export default new RecipeAPI()