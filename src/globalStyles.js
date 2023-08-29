import { StyleSheet } from 'react-native';

export default globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontFamily: 'Avenir',
    },
    textBold: {
        fontWeight: 800,
        fontFamily: 'Avenir',

    },
    textBoldHeading: {
        fontWeight: 600,
        fontFamily: 'Avenir',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    w100: {
        width: '100%'
    },
    w90: {
        width: '90%'
    },
    w80: {
        width: '80%'
    },
    w0: {
        width: 'auto'
    },
    bgModal: {        
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '100%',
        backgroundColor:'cyan',
        
    },
    button: {
        fontWeight: 600,
        fontFamily: 'Avenir',        
        textAlign: "center",
        fontSize: 20,
        backgroundColor: '#fff',
        // borderWidth:0.2,
        paddingHorizontal:15,
        paddingVertical:10
    },
    boxShadow: {
        borderRadius: 18,        
        shadowColor: '#4048BF',
        shadowOffset: {
            width: 5.4,
            height: 5.4,
        },
        shadowOpacity: 0.74,
        shadowRadius: 30,
        elevation: 10,
    },
    shadowContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
});

// export const bgStyles = (color) => {
//     return StyleSheet.create({
//         bg:{
//             backgroundColor:color
//         }
//     })
// }
// //bgStyles('yellow').bg