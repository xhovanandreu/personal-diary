
import { StyleSheet, Dimensions }  from 'react-native';
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
module.exports = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        
    },
    screenPadding:{
        padding: 20,
    },
    mainButton: {
        width: "100%",
        backgroundColor: "#0066B3",
        paddingVertical: DEVICE_HEIGHT > 1000 ? 19 : 12,
        borderRadius: 40,
        marginTop: DEVICE_HEIGHT > 1000 ? 30 : 20,
        marginBottom: 20,
    },
    mainButtonTxt: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    inputLabel: {
        marginTop:  DEVICE_HEIGHT > 1000 ? 40 : 25 ,
        marginBottom:  DEVICE_HEIGHT > 1000 ? 10 : 5 ,
        color: "#0066B3",
        fontWeight: "800"
    },
    inputcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F7F7F7",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        
    },
    errorText: {
        color: "red",
        marginVertical: 5
    }
})
