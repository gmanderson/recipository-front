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

  // async getListByID(listID){
  //   const response = await fetch(`${App.apiBase}/list/${listID}`, {
  //     headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
  //   })

  //     // if response not ok
  //     if(!response.ok){ 
  //       // console log error
  //       const err = await response.json()
  //       if(err) console.log(err)
  //       // throw error (exit this function)      
  //       throw new Error('Problem getting recipe')
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

export default new ListAPI()