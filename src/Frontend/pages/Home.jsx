import React, { useEffect } from "react";
import Login from "./Login/Login.jsx";

export const Home = () => {
    const token = localStorage.getItem("access_token");

	const verifyToken = async () => {
		try {
			const res = await fetch('http://127.0.0.1:3001/api/protected', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			})
			const data = await res.json();
			if(!data){
				
			}
			alert('Access Allowed');
		} catch (err) {
			console.error(err);
		}
	}
    return (
        <div className="container">
            {token ? (
                <>
                    <h1>Hola</h1>
                </>
            ) : (
                <Login />
            )}
        </div>
    );
};
