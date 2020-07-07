import React from 'react';

const FilterContext = React.createContext({
    activeFilter: {}, // value
    setFilter: () => { } // update function
});

export default FilterContext;