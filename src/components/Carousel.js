import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	LogBox,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { images } from '../constants'

const Carousel = () => {
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
	const flatlistRef = useRef();
	// Get Dimesnions
	const screenWidth = Dimensions.get("window").width;
	//const screenWidth = '100%';
	const [activeIndex, setActiveIndex] = useState(0);

	// Auto Scroll

	useEffect(() => {
		//console.log('screenWidth:',screenWidth);
		if(activeIndex !== null){
			let interval = setInterval(() => {
			
				if (activeIndex === carouselData.length - 1) {				
					flatlistRef.current.scrollToIndex({
						index: 0,
						animation: true,
					});
				} else {
					flatlistRef.current.scrollToIndex({
						index: activeIndex + 1,
						animation: true,
					});
				}
				//console.log('flatlistRef:',flatlistRef.current.index);
	
			}, 5000);
	
			return () => {
				//console.log('relase');
				clearInterval(interval)
			};
		}
		
	},[activeIndex,carouselData.length]);

	const getItemLayout = (data, index) => ({
		length: screenWidth,
		offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
		index: index,
	});
	// Data for carousel


	//  Display Images // UI
	const renderItem = ({ item, index }) => {
		return (
			<View key={item.id} >
				<Image
					source={item.image}
					style={{ height: 200, width: screenWidth }}
					resizeMode = 'stretch'
				/>
			</View>
		);
	};

	// Handle Scroll
	const handleScroll = (event) => {
		// Get the scroll position
		const scrollPosition = event.nativeEvent.contentOffset.x;
		//console.log({ scrollPosition });
		// Get the index of current active item

		const index = Math.floor(scrollPosition / screenWidth);

		//console.log({ index });
		// Update the index

		setActiveIndex(index);
	};

	// Render Dot Indicators
	const renderDotIndicators = () => {
		return carouselData.map((dot, index) => {
			// if the active index === index

			if (activeIndex === index) {
				return (
					<View
						key={index}
						style={{
							backgroundColor: "green",
							height: 10,
							width: 10,
							borderRadius: 5,
							marginHorizontal: 6,
						}}
					></View>
				);
			} else {
				return (
					<View
						key={index}
						style={{
							backgroundColor: "red",
							height: 10,
							width: 10,
							borderRadius: 5,
							marginHorizontal: 6,
						}}
					></View>
				);
			}
		});
	};

	return (
		<View style={{marginTop:10, padding:1,position:'relative'}}>
			<View style={{ borderRadius:10, borderWidth:2, borderColor:'#fff'}}>
				<FlatList
					data={carouselData}
					ref={flatlistRef}
					getItemLayout={getItemLayout}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					horizontal={true}
					pagingEnabled={true}
					onScroll={handleScroll}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					right:0,
					bottom:20,
					position:'relative'
				}}
			>
				{renderDotIndicators()}
			</View>
			
		</View>
	);
};

export default Carousel;

const styles = StyleSheet.create({});
