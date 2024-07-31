// AddressInput.jsx
import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const AddressInput = ({ onAddressSelect }) => {
  const [address, setAddress] = useState('');

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    onAddressSelect(value, latLng);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <input
            {...getInputProps({
              placeholder: 'Search Places...',
              className: 'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            })}
          />
          <div className="absolute mt-2 w-full bg-white shadow-md rounded-md">
            {loading && <div className="p-2">Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'bg-blue-500 text-white cursor-pointer p-2'
                : 'bg-white text-black cursor-pointer p-2';
              return (
                <div
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressInput;
