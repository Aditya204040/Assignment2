import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories:[{
    "First":{
        "id": 1,
        "name": "CSPM Executive Dashboard",
        "widgets": [
          {
            "id":"1A",
            "name": "Cloud Accounts",
            "text": "Random text for Widget 1"
          },
          {
            "id":"1B",
            "name": "Cloud Account Risk Assessment",
            "text": "Random text for Widget 2"
          }
        ]
      },

      "Second":{
        "id": 2,
        "name": "CWPP Dashboard",
        "widgets": [
          {
            "id":"2A",
            "name": "Top 5 Namespace Specific Alerts",
            "text": "Random text for Widget 3"
          },
          {
            "id":"2B",
            "name": "Workload Alerts",
            "text": "Random text for Widget 4"
          }
        ]
      },

      "Third":{
        "id": 3,
        "name": "Registry Scan",
        "widgets": [
          {
            "id":"3A",
            "name": "Image Risk Assessemnt",
            "text": "Random text for Widget 5"
          },
          {
            "id":"3B",
            "name": "Image Security Issues",
            "text": "Random text for Widget 6"
          }
        ]
      },
      "Fourth":{
        "id": 4,
        "name": "Ticket",
        "widgets": [
          {
            "id":"4A",
            "name": "Widget 7",
            "text": "Random text for Widget 5"
          },
          {
            "id":"4B",
            "name": "Widget 8",
            "text": "Random text for Widget 6"
          }
        ]
      }
  }],
  allWidgets: []
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryKey, widget } = action.payload;
      console.log(categoryKey)

      if (!categoryKey) {
        console.error(`Category key is undefined or null.`);
        return;
      }
    
      const category = state.categories[0][categoryKey];
    
      if (!category) {
        console.error(`Category with key '${categoryKey}' does not exist.`);
        return;
      }
    
      category.widgets.push(widget);
      console.log(`Widget '${widget.name}' added to category '${categoryKey}'.`);
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;

      const categoryKey = Object.keys(state.categories[0]).find(
        key => state.categories[0][key].id === categoryId
      );

      if (categoryKey) {
        const category = state.categories[0][categoryKey];
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      } else {
        console.warn(`Category with ID ${categoryId} not found.`);
      }
    }
  }
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;
