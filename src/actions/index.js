// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

export const setData = data => ({
    type: 'SET_DATA',
    data
});

export const setActiveFilter = activeFilter => ({
    type: 'SET_ACTIVE_FILTER',
    activeFilter
});

export const setHierarchy = hier => ({
    type: 'SET_HIERARCHY',
    hier
})