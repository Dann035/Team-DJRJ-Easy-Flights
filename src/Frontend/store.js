import Comments from "./components/Comments/Comments";

export const initialStore=()=>{
  return{
    message: null,
    offers:[],
    offersAPI:[],
    comments:[]
  }
}

export default function storeReducer(store, action = {type:""}) {
  switch (action.type) {
    
    //OFERTAS

    case "get_offers":
      return {
        ...store,
        offers: action.payload,
      };
    case "clear_offersAPI":
        return {
          ...store,
          offersAPI: [],
        };
    case "set_offersAPI":
        return {
          ...store,
          offersAPI: action.payload,
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
    
    case "SET_COMMENTS":
      return { ...store, comments: action.payload };
    

    case "delete_comment":
      let filterComments = store.comments.filter(
        (comment) => comment.id !== action.payload
      );
      return {
        ...store,
        comments: filterComments,
      };

    default:
      throw Error("Unknown action.");
  }    
}
