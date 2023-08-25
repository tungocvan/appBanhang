import React ,{ useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// create a component
const CheckboxItem = ({label, checked, onChange}) => {    
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

const Checkbox = (optionsCheck) => {
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  optionsCheck.map((option,index) =>{
    return <CheckboxItem        
    key={index}
    label={option}
    checked={selectedOptions.includes(option)}
    onChange={() => handleCheckboxChange(option)}
    />
})
}

//make this component available to the app
export default Checkbox;
