import {
  View,  
  StyleSheet
} from 'react-native';
const BoxShadow = (props) => {  
  return(
      <View style={[styles.card, styles.elevation,props.style]}>
        {props.children}
      </View>
  )
}
export default BoxShadow

const styles = StyleSheet.create({  
  card: {
    backgroundColor: 'white',
    borderRadius: 8, 
  },
  elevation: {
    elevation: 20,    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5, 
    paddingHorizontal:5,
    paddingVertical:10,
  },
});