import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class ListAPI {
  
  async createList(){
    const response = await fetch(`${App.apiBase}/list`, {
      method: 'POST'
    })

      // if response not ok
      if(!response.ok){ 
        // console log error
        const err = await response.json()
        if(err) console.log(err)
        // throw error (exit this function)      
        throw new Error('Problem creating list')
      }
      
      // convert response payload into json - store as data
      const data = await response.json()
      
      // return data
      return data
  }

  // Adds items to user's shopping list
  async addItemsToList(listId, ingredientsList){
    console.log(ingredientsList)
    const response = await fetch(`${App.apiBase}/list/addItems/${listId}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'},
      body: JSON.stringify({items: ingredientsList})
    })
  }
}

export default new ListAPI()