import { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import style from './request-color.module.css';

const ColorLoader = () => (
    <div className={style['lds-ellipsis']}><div></div><div></div><div></div><div></div></div>
);

const ColorFound = ({name, theme, group, code}) => {

    // Les classeNames sont généré par clsx 
    const classNameFound = clsx(
        style['found'],
        theme === 'light' && style['light'],
        theme === 'dark' && style['dark'],
    )

    // CSS in JS pour gérer les couleurs
    const styleColor = {
        backgroundColor: `#${code}`,
        borderColor: `#${code}`
    }

    return (
        <div className={classNameFound} style={styleColor}>
            <p>Couleur : {name}</p>
            <p>Theme : {theme}</p>
            <p>Groupe : {group}</p>
        </div>
    )
};

const ColorError = () => (
    <div className={style['error']}>
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