import React , {useState, useRef, useEffect} from 'react';
import { Text, View, Dimensions, Platform, SafeAreaView as SafeAreaViewIos, Image, TouchableOpacity , TextInput, ScrollView} from 'react-native';
function Slider() {
    const [imageList,setImageList] = useState([]);
    const [currentImage,setCurrentImage] = useState(0);
    const stepCarousel = useRef(null);
    const { width: screenWidth} = Dimensions.get('window');
    useEffect(()=>{
      const data = [
        {image:<Image  source={require('../assets/images/banner-1.jpg')} resizeMode='stretch' style={{width:'100%',borderRadius:10, height:200}} />,title:'Banner 1'},
        {image:<Image  source={require('../assets/images/banner-2.jpg')} resizeMode='stretch' style={{width:'100%',borderRadius:10, height:200}} />,title:'Banner 2'},
        {image:<Image  source={require('../assets/images/banner-3.jpg')} resizeMode='stretch' style={{width:'100%',borderRadius:10, height:200}} />,title:'Banner 3'},
      ];
      setImageList(data);
    },[]);
    useEffect(()=>{
        // if(imageList.length > 0){
        //   let index = 0;
        //   setInterval(() => {
        //     stepCarousel.current.scrollTo({
        //       x: index*screenWidth, y:0, animated: true
        //     });
        //     index +=1
        //     if(index === imageList.length){
        //       index = 0
        //     }
        //   },2000)
        // }
    },[imageList]);

    const handleScroll = (e) => {
        if(!e){
          return false ;
        }
        const { nativeEvent } = e;
        if(nativeEvent && nativeEvent.contentOffset){
            currentOffset = nativeEvent.contentOffset.x;
            let imageIndex = 0;
            if(currentOffset > 0){
              imageIndex = Math.floor((nativeEvent.contentOffset+screenWidth/2)/screenWidth);
            }
            setCurrentImage(imageIndex);
        }
    }
    return (
      <ScrollView
        horizontal={true}     
      >
        {
          imageList.map((e,index)=><View key={index}>{e.image}</View>)
        }
      </ScrollView> 
    );
}

export default Slider;