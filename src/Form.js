import React, { useCallback, useState } from "react";

import "./Form.css";

export const REGIONS = ["Scottish Highlands", "West Country", "Cornwall"];
export const DATES = [["2020-12-01", "2020-12-14"]];
export const TYPES = ["city", "outdoor", "seaside", "rural"];

export default function Form({ isLoading, onSubmit }) {
  const [region, setRegion] = useState(REGIONS[0]);
  const [dates, setDates] = useState(DATES[0]);
  const [types, setTypes] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleRegionChange = useCallback((event) => {
    setRegion(event.target.value);
  }, []);

  const handleDatesChange = useCallback((event) => {
    const dates = [event.target.value,"2020-12-14"];
    setDates(dates);
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
    setIsEnabled(newTypes.length > 0);
  }, []);

  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      if (isEnabled) {
        onSubmit({ region, dates, types });
      }
    },
    [region, dates, types, isEnabled]
  );

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label>
          <span>Region</span>
          <select name="region" onChange={handleRegionChange}>
            {REGIONS.map((region) => {
              return <option>{region}</option>;
            })}
          </select>
        </label>
        <label>
          <span>Dates</span>
          <input name="dates" type="date" value={dates[0]} onChange={handleDatesChange} />
        </label>
      </div>
      <div className="form__row">
        <label>
          <span>Types</span>
          <div className="form__grid">
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
          </div>
        </label>
      </div>
      {!isLoading && <button disabled={!isEnabled}>Plan Trip</button>}
      {isLoading && <div className="form__loading">Assembling your trip...</div>}
    </form>
  );
}
