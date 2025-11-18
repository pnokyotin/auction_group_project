
import Search from "../../components/form/search";
import Carousel from '../../components/Carousel';
import Carousel2 from '../../components/Carousel2';
import Carousel3 from '../../components/Carousel3';

import image1 from '../../assets/images/logo.png';
import image2 from '../../assets/images/clothes.jpg';
import image3 from '../../assets/images/town.jpg';

const cardData = [
  { title: 'Card 1', description: 'Description 1', image: image1 },
  { title: 'Card 2', description: 'Description 2', image: image2 },
  { title: 'Card 3', description: 'Description 3', image: image3 },
  { title: 'Card 4', description: 'Description 4', image: image3 },
  { title: 'Card 5', description: 'Description 5', image: image2 },
  { title: 'Card 6', description: 'Description 6', image: image1 },
  { title: 'Card 7', description: 'Description 7', image: image1 },
  { title: 'Card 8', description: 'Description 8', image: image3 },
];

const cardData2 = [
  { title: 'Card 1', description: 'Description 1', image: image1 },
  { title: 'Card 2', description: 'Description 2', image: image2 },
  { title: 'Card 3', description: 'Description 3', image: image3 },
  { title: 'Card 4', description: 'Description 4', image: image3 },
  { title: 'Card 5', description: 'Description 5', image: image2 },
  { title: 'Card 6', description: 'Description 6', image: image1 },
  { title: 'Card 7', description: 'Description 7', image: image1 },
  { title: 'Card 8', description: 'Description 8', image: image3 },
];

export default function Main() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1344px] bg-blue-300 ">
      <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8 min-h-80 justify-center items-center bg-red-500">    
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-20 bg-green-300">
          Welcome to Main Page
        </h1>
        <Search />

        <Carousel2 cards={cardData} />
        <Carousel cards={cardData2} />
        <Carousel3 cards={cardData} />


      </div>
    </div>
  );
}
