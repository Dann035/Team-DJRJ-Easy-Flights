import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupCompany } from "../../services/signup";



function SignupCompany() {
    // const [dataForm, setDataForm] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.role = 'COMPANY';
        signupCompany(data);
        navigate('/');
    }

    return (
        <>
            <h1>Signup Company</h1>
            <form onSubmit={handleSubmit}>
                <section className="row">
                    <fieldset className="col-4">
                        <label >Name</label>
                        <input type="text" name="name" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Password</label>
                        <input type="password" name="password" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Email</label>
                        <input type="email" name="email" required/>
                    </fieldset>
                </section>
                <section className="row">
                    <fieldset className="col-4">
                        <label >Phone</label>
                        <input type="tel" name="phone" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Website</label>
                        <input type="url" name="website" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Country</label>
                        <input type="text" name="country" required/>
                    </fieldset>
                </section>
                <section className="row">
                    <fieldset className="col-4">
                        <label >Logo URL</label>
                        <input type="url" name="logo_url" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Slug</label>
                        <input type="text" name="slug" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Status</label>
                        <input type="text" name="status" required/>
                    </fieldset>
                </section>
                <section className="row">
                    <fieldset className="col-2">
                        <label >Rating</label>
                        <input type="text" name="rating" required/>
                    </fieldset>
                    <fieldset className="col-10">
                        <label >Description</label>
                        <textarea type="text" name="description" required></textarea>
                    </fieldset>
                </section>
                <button type="submit">Signup Company</button>
                <button onClick={()=> navigate('/')} type="button">Ir a Login</button>
            </form>
        </>
    );
}

export default SignupCompany;
