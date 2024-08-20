import React from 'react';
import { useSelector } from 'react-redux';
import { useState ,useEffect} from 'react';
import Category from './category';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch,faSyncAlt, faEllipsisV ,faClock, faChevronDown  } from '@fortawesome/free-solid-svg-icons';
import SlidingWindow from './slidingWindow';


const Dashboard = () => {
  const categories = useSelector(state => state.dashboard.categories);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredWidgets, setFilteredWidgets] = useState(categories);

  useEffect(() => {
    const allWidgets = Object.values(categories[0])
    .flatMap(category => category.widgets);
  
    console.log('All Widgets:', allWidgets);
    
    // Filter widgets and print the result
    const filteredWidgets = allWidgets
      .filter(widget => widget.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    console.log('Filtered Widgets:', filteredWidgets);
    setFilteredWidgets(filteredWidgets);
  }, [searchQuery]);

 
  

  console.log(filteredWidgets);

  const handleAddWidgetClick = () => {
    setIsPanelOpen(true);
  };
  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleAddWidget = (widget) => {
    setWidgets([...widgets, widget]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  
  return (
    <div className='bg-slate-200 w-[100%] flex-col justify-center items-center'>
        <SlidingWindow
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onSubmit={handleAddWidget}
        />
        <nav className=' bg-white flex justify-between items-center px-9 h-10'>
        <h1 className='text-[#323ea8] font-bold py-4  text-left'>DASHBOARD</h1>
        <div className='relative'>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-slate-400 pl-1" />
        </span>
        <input type='search' 
        className='h-8 w-[23rem] px-8 appearance-none focus:outline-none focus:outline-slate-200 rounded-md border-2 bg-slate-200 border-slate-200' 
        placeholder='Search anything...'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={searchQuery}
        onChange={handleSearchChange}
        />
        {isFocused && searchQuery && (<div className=' absolute border-2 border-white bg-slate-300 py-4 m-2 rounded-md w-[22rem] z-50'>
          {filteredWidgets.length > 0 ? (
            filteredWidgets.map(widget => (
              <div key={widget.id} className="widget-item">
                <h3 className='px-0 py-1 m-2 bg-white'>{widget.name}</h3>
                {/* <p>{widget.text}</p> */}
              </div>
            ))
          ) : (
            <p>No widgets found</p>
          )}
          </div>)}
         
        </div>
        <div></div>
        </nav>

        <div className='flex justify-between items-center mt-4 px-7 pb-4'>
          <div className='heading'>
              <h1 className='font-bold text-lg '>CNAPP Dashboard</h1>
          </div>

          <div className='flex justify-between items-center gap-4'>
              <button onClick={handleAddWidgetClick} className="add-widget-btn font-semibold text-sm text-slate-500 bg-white p-1 rounded-md px-2 h-9">
                      Add Widget +
              </button>

              <button className='text-slate-500 bg-white p-2 rounded-lg h-9 flex justify-center items-center'>
              <FontAwesomeIcon icon={faSyncAlt} className="w-4 h-4" />
              </button>

              <div className='relative'>
              <button 
              className='border-1 border-slate-400 text-slate-500 bg-white p-1 rounded-md px-2 h-9'>
                <FontAwesomeIcon icon={faEllipsisV} className="w-4 h-4" />
              </button>
              </div>

              <div>
                <button className='border-[0.1rem] text-[#323ea8] bg-white border-[#323ea8] p-1 rounded-md px-2 h-9'>
                  <div className='flex justify-between items-center h-4'>
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5 -p-1" />
                  <h2 className='-p-1 pl-1 font-bold text-sm m-1 border-l-[0.2rem] border-solid border-[#323ea8]'>Last 2 days</h2>
                  <FontAwesomeIcon icon={faChevronDown} className="pl-1 w-4 h-4" />
                  </div>
                </button>
              </div>
              
          </div>
      </div>

        <div>
        {(categories).map(category => (
            <div className={category.id}>
            <Category key={category.First.id} category={category.First} />
            <Category key={category.Second.id} category={category.Second} />
            <Category key={category.Third.id} category={category.Third} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
