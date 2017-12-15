import {StyleSheet} from 'react-native'

const ListStyle = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 10,
    },
    itemTitle: {
        flexDirection: 'row',
    },
    itemTitleLeft: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
    },
    itemTitleCenter: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
    },
    itemTitleRight: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
    },
    itemConnect: {
        marginTop: 10,
        borderTopColor: '#e2e2e2',
        borderTopWidth: 1,
        paddingTop: 10,
        fontSize: 12,
    }
});


export default ListStyle;