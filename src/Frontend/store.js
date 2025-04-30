export const initialStore=()=>{
  return{
    message: null,
    offers:[],
  }
}

export default function storeReducer(store, action = {type:""}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    //OFERTAS

    case "get_offers":
      return {
        ...store,
        offers: action.payload,
      };
    
    case "add_offer":
      return{
        ...store,
        offers:[...store.offers,action.payload]
      }

    case "delete_offers":
      let filterOffers = store.offers.filter(
        (offert) => offert.id !== action.payload
      );
      return {
        ...store,
        offers: filterOffers,
      };

    case "edit_offer":
      let indice = store.findIndex((item) => item.id === action.payload.id);
      store[indice] = action.payload;
      return [...store];

    default:
      throw Error("Unknown action.");
  }    
}
