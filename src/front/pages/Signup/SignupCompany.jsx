import { useNavigate } from "react-router-dom";



function SignupCompany() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Signup Company</h1>
            <form>
                <section className="row">
                    <fieldset className="col-4">
                        <label >Name</label>
                        <input type="text" name="name" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required/>
                    </fieldset>
                </section>
                <section className="row">
                    <fieldset className="col-4">
                        <label >Phone</label>
                        <input type="text" name="name" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Website</label>
                        <input type="text" name="name" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Country</label>
                        <input type="text" name="name" required/>
                    </fieldset>
                </section>
                <section className="row">
                    <fieldset className="col-4">
                        <label >Logo URL</label>
                        <input type="text" name="name" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Slug</label>
                        <input type="text" name="name" required/>
                    </fieldset>
                    <fieldset className="col-4">
                        <label >Status</label>
                        <input type="text" name="name" required/>
                    </fieldset>
                </section>
                <section className="row">
                    <fieldset className="col-2">
                        <label >Rating</label>
                        <input type="text" name="name" required/>
                    </fieldset>
                    <fieldset className="col-10">
                        <label >Description</label>
                        <textarea type="text" name="name" required/>
                    </fieldset>
                </section>
                <button type="submit">Signup Company</button>
                <button onClick={()=> navigate('/')} type="button">Ir a Login</button>
            </form>
        </>
    );
}

export default SignupCompany;
