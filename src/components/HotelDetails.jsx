import { useParams } from "react-router-dom";

const hotels = {
1: {
    name: "Ocean View Suite",
    city: "Chennai",
    guests: 4,
    beds: 2,
    bathrooms: 1,
    price: 1800,
    image: "https://source.unsplash.com/800x400/?hotel,blue",
    amenities: [
    "WiFi", "Free parking", "Lift", "Fridge", "Kitchen"
    ]
},
2: {
    name: "Mountain Retreat",
    city: "Ooty",
    guests: 2,
    beds: 1,
    bathrooms: 1,
    price: 2200,
    image: "https://source.unsplash.com/800x400/?resort,blue",
    amenities: [
    "Fireplace", "Balcony", "Garden", "Wifi", "Breakfast"
    ]
}
};

const HotelDetails = () => {
const { id } = useParams();
const hotel = hotels[id] || hotels[1];

return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
    <div className="flex-1">
        <img
        src={hotel.image}
        alt={hotel.name}
        className="rounded-xl w-full h-[400px] object-cover"
        />
        <h1 className="text-3xl font-bold text-blue-900 mt-4">{hotel.name}</h1>
        <p className="text-gray-700 text-lg">
        {hotel.city} • {hotel.guests} guests • {hotel.beds} beds • {hotel.bathrooms} bathroom
        </p>

        <div className="mt-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">What this place offers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-blue-700">
            {hotel.amenities.map((item, i) => (
            <div key={i} className="bg-blue-50 p-3 rounded shadow-sm">{item}</div>
            ))}
        </div>
        </div>
    </div>

    {/* Reserve Card */}
    <div className="w-full md:w-96 sticky top-24 self-start bg-blue-100 border border-blue-300 rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-blue-800">₹{hotel.price} <span className="text-sm font-normal text-blue-600">/night</span></h3>
        <div className="mt-4 space-y-3">
        <div className="flex justify-between">
            <div>
            <p className="text-sm font-medium text-blue-700">Check-in</p>
            <input type="date" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
            <p className="text-sm font-medium text-blue-700">Checkout</p>
            <input type="date" className="border rounded px-2 py-1 w-full" />
            </div>
        </div>
        <div>
            <p className="text-sm font-medium text-blue-700">Guests</p>
            <select className="border rounded px-2 py-1 w-full">
            <option>1 guest</option>
            <option>2 guests</option>
            <option>3 guests</option>
            <option>4 guests</option>
            </select>
        </div>
        <button className="bg-blue-700 hover:bg-blue-900 text-white w-full py-2 rounded-md font-semibold">
            Reserve
        </button>
        <p className="text-xs text-center text-blue-600">You won't be charged yet</p>
        </div>
    </div>
    </div>
);
};

export default HotelDetails;
