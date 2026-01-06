
interface DataType {
    id: number;
    imgPath: any;
  }
  
  import img1 from "/public/images/products/s1.jpg"
  import img2 from "/public/images/products/s2.jpg"
  import img3 from "/public/images/products/s3.jpg"
  import img4 from "/public/images/products/s4.jpg"
  import img5 from "/public/images/products/s5.jpg"
  import img6 from "/public/images/products/s6.jpg"
  import img7 from "/public/images/products/s7.jpg"
  
  const SliderData: DataType[] = [
    {
      imgPath: img1,
      id: 1,
    },
    {
      imgPath: img2,
      id: 2,
    },
    {
      imgPath: img3,
      id: 3,
    },
    {
      imgPath: img4,
      id: 4,
    },
    {
      imgPath: img5,
      id: 5,
    },
    {
      imgPath: img6,
      id: 6,
    },
    {
      imgPath: img7,
      id: 7,
    },
  ];
  
  export default SliderData;
  