import React ,{ useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// create a component
const CheckBoxItems = ({label, checked, onChange}) => {    
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
      onPress={onChange}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: checked ? 'blue' : 'gray',
          alignItems: 'center',
          justifyContent: 'center',
        }}  
      >
        {checked && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              backgroundColor: 'blue',
            }}
          />
        )}
      </View>
      <Text style={{ marginLeft: 10 }}>{label}</Text>
    </TouchableOpacity>
  );
};

function CheckBox(props) {
   
  const [selectedOptions, setSelectedOptions] = useState([]);  
  const optionsCheck = props.options;

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    
  };
 
  React.useEffect(() => {
    props.onCheckBox(selectedOptions);
  },[selectedOptions])

  return (
    <View
      style={{ flex: 1, marginHorizontal: 5 }}>
      {
          optionsCheck && optionsCheck.map((option,index) =>{
              return <CheckBoxItems        
              key={index}
              label={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              />
          })
      }         
    </View>
  );
}

//make this component available to the app
export default CheckBox;

// cách sử dụng
// const hanldeCheckbox = (value) => {
//   console.log('hanldeCheckbox:',value)
// }
// const optionsCheck = ['Tương tự thông tin trên', 'Tương tự thông tin trên 1','Tương tự thông tin trên 2'];

// return (
// <View
//   style={{ flex: 1, marginHorizontal: 5 }}>
//   {
//       optionsCheck && <CheckBox options = {optionsCheck} onCheckBox = {hanldeCheckbox}/>
//   }         
// </View>
// );