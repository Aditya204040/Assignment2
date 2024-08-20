import React, { useState } from 'react';
import './slidingWindow.css';
import WidgetList from './widgetList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addWidget } from './dashboardSlice';

const SlidingWindow = ({ isOpen, onClose, onSubmit }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [selectedOption, setSelectedOption] = useState('First');
  const dispatch = useDispatch();
  const categoriesArray = useSelector(state => state.dashboard.categories);
  const categories = categoriesArray[0];

  console.log(categories[selectedOption]);
  const handleSubmit = () => {
    onSubmit({ widgetName, widgetText });
    onClose(); // Close the panel after submission
  };

  const handleChange=(e)=>{
    setSelectedOption(e.target.value);
    return;
  }

  const createWidget=()=>{

    if (!selectedOption) {
      console.error('Category not Found!.');
      return;
    }

    console.log(`create Widget function is called on ${selectedOption}`);

    const newWidget = {
      id: `${selectedOption}-${Date.now()}`,
      name: widgetName,
      text: widgetText
    };
    dispatch(addWidget({ categoryKey:selectedOption, widget: newWidget }));

    // Clear form fields
    setWidgetName('');
    setWidgetText('');
  }



  return (
    <div className={`sliding-panel ${isOpen ? 'open' : ''} flex justify-between`}>
      <div>
      <div className="sliding-panel-header">
        <h2>Add Widget</h2>
        <button onClick={onClose} className="close-btn p-">x</button>
      </div>
      <div className="sliding-panel-content">
      <h2 className='sliding-panel-info'>Personalise your dashboard by adding the following widget</h2>

      <div className='flex  px-4 my-0 mb-3'>
      <div>
      <label htmlFor='cpsm' 
      className={selectedOption === "First" ? 'selected' : 'option-label'}>CSPM</label>
      <input 
      type='radio' 
      id='cpsm' 
      name='option' 
      value='First' 
      defaultChecked
      onChange={handleChange} 
      className='hidden-radio'/>
      <div className={selectedOption === 'First' ? 'btnB-style-active':'btnB-style'}></div>
      </div>

      <div>
      <label htmlFor='cwpp' 
      className={selectedOption === 'Second' ? 'selected' : 'option-label'}>CWPP</label>
      <input 
      type='radio' 
      id='cwpp' 
      name='option' 
      value='Second' 
      onChange={handleChange} 
      className='hidden-radio'/>
      <div className={selectedOption === 'Second' ? 'btnB-style-active':'btnB-style'}></div>
      </div>

      <div>
      <label htmlFor='image' 
      className={selectedOption === 'Third' ? 'selected' : 'option-label'}>Image</label>
      <input 
      type='radio' 
      id='image' 
      name='option' 
      value='Third' 
      onChange={handleChange} 
      className='hidden-radio'/>
      <div className={selectedOption === 'Third' ? 'btnB-style-active':'btnB-style'}></div>
      </div>

      <div>
      <label htmlFor='ticket' 
      className={selectedOption === 'Fourth' ? 'selected' : 'option-label'}>Ticket</label>
      <input 
      type='radio' 
      id='ticket' 
      name='option' 
      value='Fourth' 
      onChange={handleChange} 
      className='hidden-radio'/>
      <div className={selectedOption === 'Fourth' ? 'btnB-style-active':'btnB-style'}></div>
      </div>
      </div>
    <div>
    <WidgetList 
      categoryKey={categories[selectedOption]}
    />
    </div>
      </div>
       <div>
       <div className='text-left pt-6 flex-col justify-center items-center h-[100%]'>
       <div className='px-3 py-2 mx-2 border-2 border-[rgb(190, 190, 213)] flex items-center justify-between gap-0'>
       <label>
          Widget Name : 
        </label>
        <input
            type="text"
            className='w-[85%] h-9 focus:outline-none'
            placeholder="Widget Name" 
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
        />
       </div>
        <br/>
        <div className='px-3 py-2 mx-2 border-2 border-[rgb(190, 190, 213)] flex items-center justify-between'>
        <label>
          Widget Text : 
        </label>
        <input
            type="text"
            className='w-[85%] h-9 focus:outline-none'
            placeholder="Widget Text" 
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
        />
        </div>
        <div className='flex justify-end p-3 pr-3'>
        <button className="submit-btn" onClick={createWidget}>Add</button>
        </div>
       </div>
       </div>
      </div>
      <div className='flex justify-end items-center gap-4 m-3'>
       <button onClick={onClose} className='cancel-btn border-2 border-[#323ea8] p-6 py-2 rounded-lg text-[#323ea8] font-semibold'>Cancel</button>
       <button onClick={handleSubmit} className="submit-btn">Confirm</button>
       </div>
    </div>
  );
};

export default SlidingWindow;
