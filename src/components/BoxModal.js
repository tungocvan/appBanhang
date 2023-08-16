//import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const BoxModal = (props) => {
  return (
    <View style={styles.background}>
      <View style={styles.wrap}>
        <Text style={[styles.text, styles.helloText]}>Hello !</Text>
        <Text style={[styles.text, styles.moreText]}>
          Hello! Ilove You Modal !
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.modalButton, styles.center]}
            onPress={props.close}>
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.center]}
            onPress={props.save}>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalButton: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderColor: '#ffffff',
    marginTop: 64,
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 25,
    paddingRight: 25,
    marginHorizontal: 5,
    flex: 1,
  },
  moreText: {
    textAlign: 'center',
    marginTop: 64,
  },
  helloText: {
    fontSize: 51.2,
    textAlign: 'center',
    marginTop: 20,
  },
  wrap: {
    padding: 20,
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#2D3953',
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  text: {
    fontSize: 28.8,
    color: '#ECF0F9',
    fontWeight: 600,
    fontFamily: 'Avenir',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default BoxModal;
