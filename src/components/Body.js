import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  // Define the CDN URL here
  const IMG_CDN_URL =
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";
  //local state variable - super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]); //all restaurants
  const [filteredRestaurant, setFilteredRestaurant] = useState([]); //only filtered restaurants
  const [searchText, setSearchText] = useState("");

  console.log("Body Rendered");

  // // Normal JS variable
  // let listOfRestaurants = [];

  //normal js variable
  // let listOfRestaurantsJS = [
  //   {
  //     resName: "Meghana Foods",
  //     cuisine: "Biryani, South Indian",
  //     rating: "4.5",
  //     deliveryTime: "30 mins",
  //     id: 1,
  //     imageUrl:
  //       "https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg",
  //   },
  //   {
  //     name: "Dominos Pizza",
  //     cuisine: "Pizza, Fast Food",
  //     rating: "3.8",
  //     deliveryTime: "20 mins",
  //     id: 2,
  //     imageUrl:
  //       "https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg",
  //   },
  //   {
  //     name: "Mc Donald's",
  //     cuisine: "Burger",
  //     rating: "4.1",
  //     deliveryTime: "20 mins",
  //     id: 3,
  //     imageUrl:
  //       "https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg",
  //   },
  // ];

  useEffect(() => {
    console.log("useEffect called");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.406498&lng=78.47724389999999&str=restaurant&trackingId=undefined&submitAction=ENTER&queryUniqueId=41d3943d-ad71-13b4-566f-de721405a461"
    );

    const json = await data.json();

    const rawRestaurants =
      json?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;

    const cleanedRestaurants = rawRestaurants.map((resObj, index) => {
      const info = resObj.card?.card?.info;
      const cloudinaryImageId = info?.cloudinaryImageId;

      const imageUrl = cloudinaryImageId
        ? IMG_CDN_URL + cloudinaryImageId
        : "https://via.placeholder.com/508x320?text=No+Image";

      return {
        id: info?.id || index,
        resName: info?.name || "Unknown",
        cuisine: info?.cuisines?.join(", ") || "N/A",
        rating: info?.avgRatingString || info?.avgRating || "--",
        deliveryTime: (info?.sla?.deliveryTime || "--") + " mins",
        imageUrl: imageUrl,
      };
    });

    setListOfRestaurants(cleanedRestaurants);
    setFilteredRestaurant(cleanedRestaurants); // Initialize filtered restaurants with all restaurants
  };

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              //Filter the result card and update the UI
              //search text
              console.log(searchText, "searchText");
              const filteredRestaurants = listOfRestaurants.filter(
                (restaurant) => {
                  return restaurant.resName
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                }
              );

              setFilteredRestaurant(filteredRestaurants); // Update the filtered restaurants state
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            console.log("Filter Button Clicked");
            let filteredList = listOfRestaurants.filter(
              (restaurant) => restaurant.rating > 4.5
            );
            setListOfRestaurants(filteredList);
            console.log(listOfRestaurants, "listOfRestaurants after filter");
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
