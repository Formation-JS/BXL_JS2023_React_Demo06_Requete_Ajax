import { useCallback, useState } from 'react';
import SearchColor from '../../components/search-color/search-color.jsx'
import RequestColor from '../../components/request-color/request-color.jsx';

const ColorTester = () => {

    // Variable d'état (state) pour stocker la valeur rechercher
    const [colorName, setColorName] = useState(null);

    // Gestion de l'event "onSearch"
    const handleSearchColor = useCallback((name) => {
        //? Mémorisation de la valeur rechercher (si possible)
        setColorName(name?.trim() ? name : null);

    }, []);

    return (
        <>
            <SearchColor onSearch={handleSearchColor} />
            {colorName && (
                <RequestColor colorName={colorName} />
            )}
        </>
    )
}

export default ColorTester;