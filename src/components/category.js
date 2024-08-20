import React from 'react';
import { useDispatch} from 'react-redux';
import { removeWidget } from './dashboardSlice';
import { useState } from 'react';
import SlidingWindow from './slidingWindow';

const Category = ({ category }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const dispatch = useDispatch();

  const handleAddWidgetClick = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleAddWidget = (widget) => {
    setWidgets([...widgets, widget]);
  };

  const handleRemoveWidget = (widgetId) => {
    dispatch(removeWidget({ categoryId: category.id, widgetId }));
  };

  return (
    <div className='p-8 py-2 pb-0'>
     <SlidingWindow
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onSubmit={handleAddWidget}
        />
      <h2 className='font-bold p-2 text-left'><div>
      <h2>{category.name}</h2>
      </div></h2>
      <div className='font-semibold flex justify-center items-center m-1 gap-4 '>
        {category.widgets.map(widget => (
          <div className='m-4 mx-0 p-4 bg-white w-[32rem] h-[14rem] flex-col justify-center items-center rounded-2xl relative' key={widget.id}>
          <h2 className='text-left'>{widget.name}</h2>
            <h3 className='font-semibold p-4 py-6'>{widget.text}</h3>
            <button className='absolute top-4 right-4 text-red-600' onClick={() => handleRemoveWidget(widget.id)}>x</button>
          </div>
        ))}
        <div className='m-4 mx-0 p-4 bg-white w-[32rem] h-[14rem] flex justify-center items-center rounded-2xl'>
            <button onClick={handleAddWidgetClick} className="add-widget-btn border-2 border-slate-200 p-3 rounded-2xl px-5">
            + Add Widget
            </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
