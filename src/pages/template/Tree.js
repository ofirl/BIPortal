import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Treebeard } from 'react-treebeard';
import { PropTypes } from 'prop-types';
import TextField from '@material-ui/core/TextField';

const searchBoxClasses = {
    root: 'hierSearchBox'
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
        paddingLeft: theme.spacing(2),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));

const treeBaseStyle = {
    tree: {
        base: {
            listStyle: 'none',
            // backgroundColor: '#21252B',
            backgroundColor: 'inherit',
            margin: 0,
            padding: 0,
            // color: '#9DA5AB',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            // fontSize: '14px'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: '#dcdcdc'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    // marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 14,
                arrow: {
                    fill: '#9DA5AB',
                    strokeWidth: 0,
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    // color: '#9DA5AB'
                    color: 'rgba(0, 0, 0, 0.87)'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};

const exampleData = {
    id: 'Chapter 1',
    name: 'Chapter 1',
    toggled: true,
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
            id: 'Chapter 2',
            name: 'Chapter 2',
            children: [
                {
                    id: 'Chapter 2.1',
                    name: 'Chapter 2.1',
                    children: [
                        { id: 'Page C', name: 'Page C' },
                        { id: 'Page D', name: 'Page D' }
                    ]
                }
            ]
        }
    ]
};

// Helper functions for filtering
const defaultMatcher = (filterText, node) => {
    return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

const findNode = (node, filter, matcher) => {
    return matcher(filter, node) || // i match
        (node.children && // or i have decendents and one of them match
            node.children.length &&
            !!node.children.find(child => findNode(child, filter, matcher)));
};

const findExactNode = (node, filter) => {
    let matcher = (filterId, node) => node.id === filterId;

    let foundNode = matcher(filter, node);
    if (foundNode)
        return foundNode;

    if (node.children && node.children.length) // or i have decendents and one of them match
        return node.children.find(child => findNode(child, filter, matcher));

    return null;
};

const filterTree = (node, filter, matcher = defaultMatcher) => {
    // If im an exact match then all my children get to stay
    if (matcher(filter, node) || !node.children) {
        return node;
    }
    // If not then only keep the ones that match or have matching descendants
    const filtered = node.children
        .filter(child => findNode(child, filter, matcher))
        .map(child => filterTree(child, filter, matcher));
    return Object.assign({}, node, { children: filtered });
};

const expandFilteredNodes = (node, filter, matcher = defaultMatcher) => {
    let children = node.children;
    if (!children || children.length === 0) {
        return Object.assign({}, node, { toggled: false });
    }
    const childrenWithMatches = node.children.filter(child => findNode(child, filter, matcher));
    const shouldExpand = childrenWithMatches.length > 0;
    // If im going to expand, go through all the matches and see if thier children need to expand
    if (shouldExpand) {
        children = childrenWithMatches.map(child => {
            return expandFilteredNodes(child, filter, matcher);
        });
    }
    return Object.assign({}, node, {
        children: children,
        toggled: shouldExpand
    });
};

function onFilterMouseUp({ target: { value } }, data) {
    const filter = value.trim();
    if (!filter) {
        return data;
    }
    let filtered = filterTree(data, filter);
    filtered = expandFilteredNodes(filtered, filter);
    return filtered;
}

const TreeExample = (props) => {
    const classes = useStyles();
    // let { hierarchy, handleChange } = props
    let { handleChange } = props
    // if (hierarchy == null)
    let hierarchy = exampleData;

    const [hier/*, setHier*/] = useState(hierarchy);
    const [data, setData] = useState(hierarchy);
    const [cursor, setCursor] = useState(false);

    const onToggle = (node, toggled) => {
        if (cursor) {
            data.active = false;
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);
        setData(Object.assign({}, data))

        // makes the selection apply to the original hier and not the filtered one - to undo, switch hierNode to be node
        // let hierNode = node;
        let hierNode = findExactNode(hier, node.id);
        let allChildren = [hierNode.id];
        let checkList = [hierNode];
        while (checkList.length > 0) {
            let currentNode = checkList[0];
            if (currentNode.children != null) {
                checkList.push(...currentNode.children);
                allChildren.push(...currentNode.children.filter((c) => c.id != null).map((c) => c.id));
            }

            checkList.splice(0, 1);
        }

        handleChange(allChildren.map((c) => { return { operator: '=', value: c, root: hierNode } }));
    }

    return (
        <React.Fragment>
            <TextField
                id="outlined-dense"
                label="חיפוש"
                className={[classes.textField, classes.dense]}
                classes={searchBoxClasses}
                onInput={(e) => setData(onFilterMouseUp(e, hier))}
                margin="dense"
                variant="outlined"
            />
            {/* <input
                className="form-control"
                onKeyUp={(e) => setData(onFilterMouseUp(e, hier))}
                placeholder="Search the tree..."
                type="text"
            /> */}
            <Treebeard data={data} onToggle={onToggle} style={treeBaseStyle} />
        </React.Fragment>
    )
}
TreeExample.propTypes = {
    /** hierarchy data */
    hierarchy: PropTypes.object,
    /** gets the new selected filters as parameter */
    handleChange: PropTypes.func
}

export default TreeExample;