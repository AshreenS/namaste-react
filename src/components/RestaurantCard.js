const RestaurantCard = ({ resData }) => {
  console.log(resData); // resData is an object
  const { resName, cuisine, rating, deliveryTime, imageUrl } = resData;
  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img alt="res-logo" className="res-logo" src={imageUrl} />
      <h3>{resName}</h3>
      <h4>{cuisine}</h4>
      <h4>{rating}</h4>
      <h4>{deliveryTime}</h4>
    </div>
  );
};

export default RestaurantCard;
