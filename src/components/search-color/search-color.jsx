import { useState, useCallback, useId, useRef } from 'react';

// Composant "SearchColor" qui communique a son parent la couleur rechercher via "onSearch"
const SearchColor = ({ onSearch }) => {

    // Génération d'un id unique pour l'attribut d'accessibilité du formulaire
    const formId = useId();

    // Variable d'etat (state) pour stocker la valeur du
    const [colorName, setColorName] = useState('');

    // Génération d'une "ref" pour interagir avec l'input (au niveau du DOM)
    // - Lier avec l'input via l'attibut "ref="
    // - Interagir avec la balise via la propriété "current"
    const searchRef = useRef(); 

    // Gestion du Submit du formulaire
    const handleSubmit = useCallback((e) => {

        //? Annulation de l'event par defaut (Actualisation de la page...)
        e.preventDefault();

        //? Utiliser la props "onSearch" pour communiquer avec le parent
        onSearch(colorName); 

        //? Reset le formulaire
        setColorName('');

        //? Focus l'input "Intéraction impérative via le DOM"
        searchRef.current.focus();

    }, [colorName]);

    // Rendu du composant
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={formId}>
                Trouver une couleur CSS : 
            </label>
            <div>
                <input id={formId} type="text" 
                    ref={searchRef}
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)} />
                {' '}
                <button type="submit">Rechercher</button>
            </div>
        </form>
    );
}

SearchColor.defaultProps = {
    // Définition d'une "Noop" pour la props "onSearch"
    onSearch: () => {}
};

export default SearchColor;