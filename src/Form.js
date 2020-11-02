import React, { useCallback, useState } from "react";

export const REGIONS = ["Scottish Highlands"];
export const DATES = [["2020-12-01", "2020-12-14"]];
export const TYPES = ["city", "outdoor"];

export default function Form({ onSubmit }) {
  const [region, setRegion] = useState(REGIONS[0]);
  const [dates, setDates] = useState(DATES[0]);
  const [types, setTypes] = useState([]);

  const handleRegionChange = useCallback((event) => {
    setRegion(event.target.value);
  }, []);

  const handleDatesChange = useCallback((event) => {
    const datesString = event.target.value;
    console.log('event', event);
    setDates(datesString.split(" – "));
  }, []);

  const handleTypesChange = useCallback((event) => {
    const type = event.target.name;
    const isChecked = event.target.checked;
    
    let newTypes = types;
    if (isChecked) {
      //  add item to array
      const index = newTypes.indexOf(type);
      if (index === -1) {
        newTypes.push(type);
      }
    } else if (!isChecked) {
      //  remove item from array
      const index = newTypes.indexOf(type);
      newTypes.splice(index, 1);
    }

    setTypes(newTypes);
  }, []);


  const handleSubmit = useCallback((evt) => {
    console.log("handleSubmit", region, dates, types);
    evt.preventDefault();
    onSubmit({ region, dates, types });
  }, [region, dates, types]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Region:
        <select name="region" onChange={handleRegionChange}>
          {REGIONS.map((region) => {
            return <option>{region}</option>;
          })}
        </select>
      </label>
      <label>
        Dates:
        <select name="dates" onChange={handleDatesChange}>
          {DATES.map((date) => {
            return <option>{date.join(" – ")}</option>;
          })}
        </select>
      </label>
      <label>
        Types:
        {TYPES.map((type) => {
          return (
            <span>
              <input
                type="checkbox"
                name={type}
                onChange={handleTypesChange}
              />
              {type}
            </span>
          );
        })}
      </label>
      <button>Search</button>
    </form>
  );
}
