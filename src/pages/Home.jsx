import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("https://dog.ceo/api/breeds/image/random");
            setData(response.data.message);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }, []);

    return (
        <div className="home-container">
            <div className="hero">
                <img src={data} alt="Random Dog" className="dog-image" />
                <div className="hero-text">
                    <h1>Bienvenue dans notre monde canin</h1>
                    <p>Découvrez les meilleures races et apprenez-en plus sur vos compagnons à quatre pattes.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
