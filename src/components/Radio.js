import React from 'react';
import { View, Text,  TouchableOpacity  } from 'react-native';

// create a component
const RadioButton = ({ options, selectedOption, onSelect }) => {
    return (
      <View>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
            onPress={() => onSelect(option)}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selectedOption === option ? 'blue' : 'gray',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selectedOption === option && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: 'blue',
                  }}
                />
              )}
            </View>
            <Text style={{ marginLeft: 10 }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
 };

function Radio(props) {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const options = props.options ?? ['radio'];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  React.useEffect(() => {
    props.onRadio && props.onRadio(selectedOption);
  },[selectedOption])
  return (
    <RadioButton options={options} selectedOption={selectedOption} onSelect={handleSelect} />
   );
 }
//<RadioButton options={options} selectedOption={selectedOption} onSelect={handleSelect} />
//make this component available to the app
export default Radio;

// Cách sử dụng Radio
// const hanldeRadio = (value) => {
//   console.log('hanldeRadio:',value)
// }
// const optionsRadio = ['radio 1','radio 2','radio 3'];
// return (
//   <View
//     style={{ flex: 1, marginHorizontal: 5 }}>           
//     {
//         optionsRadio && <Radio options = {optionsRadio} onRadio = {hanldeRadio}/>
//     }         
//   </View>
// );