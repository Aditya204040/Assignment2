import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeWidget } from './dashboardSlice';

const Category = ({ categoryKey }) => {
  const dispatch = useDispatch();
  const [checked,setChecked]=useState(true);
  
  // Get the category based on the categoryName prop
  const category = useSelector(state =>
    Object.values(state.dashboard.categories[0]).find(cat => cat.name === categoryKey.name)
  );

  const handleCheckboxChange = (widgetId, isChecked) => {
    setChecked(isChecked);
    if (!isChecked) {
      dispatch(removeWidget({ categoryId: category.id, widgetId }));
    }
  };

  if (!category) return null;

  return (
    <div>
    {category.widgets && category.widgets.length > 0 ?(
      <ul className="list-none relative p-2">
        {category.widgets.map(widget => (
          <li key={widget.id} className="flex items-center my-1 px-4 py-2 border-2 ">
            <input
              type="checkbox"
              defaultChecked
              id='customCheckbox'
              onChange={(e) => handleCheckboxChange(widget.id, e.target.checked)}
              className="appearance-none h-5 w-5 bg-[#323ea8] focus:outline-none"
            />
            <label htmlFor="customCheckbox" className="relative -left-5 -top-3 cursor-pointer">
              <svg
                className={`${checked ? "block" : "none"} w-4 h-4 z-50 text-white pointer-events-none absolute top-1 left-[0.1rem] check-svg `}
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </label>
            <label className="ml-2">{widget.name}</label>
          </li>
        ))}
      </ul>)
      : (<p className="text-gray-500">No widgets available.</p>) }
    </div>
    );
};

export default Category;
