import React from "react";
import { Calendar,MapPin } from "lucide-react";
import "./OffersListCards.css"
import { Link } from "react-router-dom";

export const OffersListCards = ({offert}) =>{


    return(
        // <div className="container d-flex align-items-center justify-content-center ">
        //     <div className="row ">
        //         <div className="col-md-3 " >
        //             {/* <div className="h-100 relative" id="containerimg">
        //                 <img src={offert.image_url} className="w-100 h-100 object-cover rounded-top img-fluid"/>
        //                 <span className="priceover ">{offert.price}&nbsp;€</span>
        //             </div>
        //             <div className="p-6 h-75">
        //                 <h4 className="text-xl font-semibold mb-2 mt-3">{offert.title}</h4>
        //                 <div className="flex items-start text-gray-600 mb-2">
        //                     <MapPin/><span>{offert.location}</span>
        //                 </div>
        //                 <div className="flex items-center text-gray-600 mb-2">
        //                     <Calendar className="w-4 h-4 mr-1" /><span>{offert.duration}</span><br/>
        //                 </div>
          
        //             </div> */}
        //             <div className="card">
        //                 <div className="card-image">
        //                     <img src={offert.image_url} alt="1" className="w-100 h-100 object-cover rounded-top img-fluid"/>
        //                 </div>
        //                 <div className="category"> 
        //                     <h3>{offert.title}</h3>
        //                 </div>
        //                 <div className="heading"> 
        //                     <div className="flex items-start mb-2">
        //                         <MapPin/><span>{offert.location}</span>
        //                     </div>
        //                     <div className="flex items-center mb-2">
        //                         <Calendar className="w-4 h-4 mr-1" /><span>{offert.duration}</span><br/>
        //                     </div>
        //                 </div>
        //             </div>
        <div className="card">
            <div className="card-image">
                <img src={offert.image_url} alt="1" className="w-100 h-100 object-cover rounded-top img-fluid"/>
            </div>
            <div className="category"> 
                <h3>{offert.title}</h3>
            </div>
            <div className="heading"> 
                <div className="flex items-start mb-2">
                    <MapPin/><span>{offert.location}</span>
                </div>
                <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-1" /><span>{offert.duration}</span><br/>
                </div>
                <Link to={"/offerdetails/" + offert.id}>
                    <button className="btn btn-success">DETALLES</button>
                </Link>
                
            </div>
    </div>
                    

        //         </div>

        //     </div>

        // </div>
    )
}

