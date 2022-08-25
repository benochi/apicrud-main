import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon" || "http://localhost:5000/"

class APICalls {

  //GET https://pokeapi.co/api/v2/{endpoint}/
  static async searchPokeAPIByForm(SearchPhrase) {
      let query = API_URL + `/${SearchPhrase}`;
      let res = await axios.get(query)
      return res.data      
  }

  //GET https://pokeapi.co/api/v2/item/{id or name}/ route for getting items if time allows
  static async searchPokeAPI(id) {
    let res = await axios.get(API_URL +`item/${id}/`)
    return res.data
  }

}

export default APICalls;