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

  // 
  async clearList(listId){
    const response = await fetch(`${App.apiBase}/list/clearList/${listId}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'}
    })

  }

  async removeItemFromList(listId, ingredientsList){
    console.log(ingredientsList)
    const response = await fetch(`${App.apiBase}/list/removeItem/${listId}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'},
      body: JSON.stringify({items: ingredientsList})
    })
  }

  async deleteList(listId){

    // validate
    if(!listId) return

    // fetch the json data
    const response = await fetch(`${App.apiBase}/list/${listId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'},
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem Deleting List')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data

}




}

export default new ListAPI()