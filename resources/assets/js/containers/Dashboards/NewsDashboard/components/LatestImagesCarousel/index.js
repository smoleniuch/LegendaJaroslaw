import React from 'react';
import Slider from "react-slick";
import Image from 'react-image-resizer'
const LatestImagesCarousel = ({images}) => {

    var settings = {
        arrows:false,
        dots: false,
        infinite: true,
        // autoplay:true,
        // autoplaySpeed:30000,
        speed: 2000,
        // centerMode:true,
        variableWidth:true,
        slidesToShow: 10,
        slidesToScroll: 10,
        // swipeToSlide:true,
        // slidesPerRow:20,
        initialSlide:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              // infinite: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
        <Slider className="latest-images-carousel slider variable-width" {...settings}>
            {images.map( image => {

                return (
                
                <img onClick={e => console.log(e)} style={{height:75, width:75 * image.width_to_height_ratio}}  src={image.original} />
                
                )

            })}
        </Slider>
    );
};

LatestImagesCarousel.defaultProps = {
    images:[]
}

export default LatestImagesCarousel;