import React , {useState, useEffect , useRef} from 'react';
import { View , Text ,  Image , ScrollView, Dimensions} from 'react-native';

const data = [
    {
      src: require('../assets/images/banner-1.jpg'),
    },
    {
      src: require('../assets/images/banner-2.jpg'),
    },
    {
      src: require('../assets/images/banner-3.jpg'),
    }
  ];
function Banner() {    
    const [banners, setBanners] = useState(data);
    const [index, setIndex] = useState(0);
    const stepBanner = useRef(0);    
    useEffect(() => {
      let intervalId = setInterval(() => {
          stepBanner.current = stepBanner.current + 1
          if(stepBanner.current === banners.length) {
            stepBanner.current = 0;
          }
          setIndex(stepBanner.current)
      },5000)
      return () => {
        clearInterval(intervalId)
      }
    },[banners.length])
    const handlScroll = (e) => {
      const { nativeEvent } = e
      position = nativeEvent.contentOffset.x;
      if(position >= 0) {
         stepBanner.current = index + 1;
         if(stepBanner.current === banners.length) {
            stepBanner.current = 0;
          }
      }else{
         stepBanner.current = index - 1;
         if(stepBanner.current < 0) {
            stepBanner.current = banners.length-1;
          }
      }
      setIndex(stepBanner.current)
    }
 return (  
      <ScrollView        
        horizontal
        contentContainerStyle={{ width:'100%'}}
        onScrollEndDrag = {handlScroll}
      >
          <View style={{ width: '100%', height: 200, marginTop:10 }}>
           <Image
            source={banners[index].src}            
            resizeMode = 'stretch'
            style={{width:'100%' , borderRadius:10}}
          />
          </View>
      </ScrollView>
    );
}

export default Banner;