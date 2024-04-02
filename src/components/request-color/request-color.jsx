import { useEffect, useState } from 'react';
import axios from 'axios';

const ColorLoader = () => (
    <div>
        <p>Chargement...</p>
    </div>
);

const ColorFound = ({name, theme, group, code}) => {

    return (
        <div>
            <p>Couleur : {name}</p>
            <p>Theme : {theme}</p>
            <p>Groupe : {group}</p>
        </div>
    )
};

const ColorError = () => (
    <div>
        <p>Couleur non trouvé (´。＿。｀)</p>
    </div>
)


const RequestColor = ({ colorName }) => {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    // Requete AJAX (via Axios)
    useEffect(() => {

        // Reset du "State" avant l'envoi de la requete
        setLoading(true);
        setData(null);

        // Envoi de la requete -> Modifier le state du composant
        axios.get(`colors/${colorName}`, {
            baseURL: 'https://www.csscolorsapi.com/api/'
        }).then((response) => {
            //? Traitement en cas de success!
            const data = response.data.data;
            setData({
                name: data.name,
                theme: data.theme,
                group: data.group,
                code: data.hex
            });
        }).catch((error) => {
            //? Traitement en cas d'erreur!
            console.log(error);

        }).finally(() => {
            //? Traitement toujours réalisé en fin de requete
            setLoading(false);
        });
    }, [colorName]);

    return (
        <div>
            {isLoading ? (
                <ColorLoader />
            ) : data ? (
                <ColorFound {...data} />
            ) : (
                <ColorError />
            )}
        </div>
    )
}

export default RequestColor;