import "./Features.css";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

function Features() {
    const { texts } = useLanguage();

    return (
        <section className="ft-container container text-center">
            <div>
                <p>{texts.explore}</p>
                <h1 className="title-features">
                    {texts.featurediscoverAdventure}
                </h1>
                <p>
                    {texts.featurediscoverAdventureDesc}
                </p>
            </div>
            <div className="d-flex justify-content-between p-3 gap-3">
                {/* Box Feature 1: Destinations */}
                <Link to="/destinations" className="box-feature feature-1">
                    <i></i>
                    <h3>{texts.feature1Title}</h3>
                    <p>
                        {texts.feature1Desc}
                    </p>
                </Link>

                {/* Box Feature 2: Packages */}
                <Link to="/quiz" className="box-feature feature-2">
                    <i></i>
                    <h3>{texts.feature2Title}</h3>
                    <p>{texts.feature2Desc}</p>
                </Link>

                {/* Box Feature 3: Tools */}
                <Link to="/tools" className="box-feature feature-3">
                    <i></i>
                    <h3>{texts.feature3Title}</h3>
                    <p>
                        {texts.feature3Desc}
                    </p>
                </Link>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-4 mb-3">
                <button className="btn-feature">{texts.learnMore}</button>
                <button className="btn-feature">{texts.signUp}</button>
            </div>
        </section>
    );
}

export default Features;