//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { images, SIZES } from '../constants'
// create a component
const Silders = () => {
	const carouselData = [
		{
			id: "01",
			image: images.banner1,
		},
		{
			id: "02",
			image: images.banner2,
		},
		{
			id: "03",
			image: images.banner3,
		},
	];
	return (
		<Swiper autoplay={true} autoplayTimeout={5} style={styles.container}>
			{
				carouselData.map((item) => {
					return (
						<View key={item.id} style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
							<Image
								source={item.image}
								style={{ height: 200, width: SIZES.width-25}}
								resizeMode='stretch'
							/>
						</View>
					)
				})
			}

		</Swiper>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50',		
	},
});

//make this component available to the app
export default Silders;
