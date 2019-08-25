const exampleHier = {
    id: 'Chapter 1',
    name: 'Chapter 1',
    toggled: true,
    active: true,
    children: [
        {
            id: 'Chapter 1.1',
            name: 'Chapter 1.1',
            children: [
                { id: 'Page A', name: 'Page A' },
                { id: 'Page B', name: 'Page B' }
            ]
        },
        {
            id: 'loading',
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            id: 'Chapter 1.2',
            name: 'Chapter 1.2',
            children: [
                {
                    id: 'Chapter 2.1',
                    name: 'Chapter 2.1',
                    children: [
                        { id: 'Page C', name: 'Page C' },
                        { id: 'Page D', name: 'Page D' },
                        { id: 'Page E', name: 'Page E' },
                        { id: 'Page F', name: 'Page F' },
                        { id: 'Page G', name: 'Page G' }
                    ]
                }
            ]
        }
    ]
};

const hierarchy = (state = {}, action) => {
    switch (action.type) {
      case 'SET_HIERARCHY':
        return action.hier;
      default:
        return exampleHier;
    }
  }
  
  export default hierarchy;