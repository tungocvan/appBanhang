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


//<RadioButton options={options} selectedOption={selectedOption} onSelect={handleSelect} />
//make this component available to the app
export default RadioButton;
