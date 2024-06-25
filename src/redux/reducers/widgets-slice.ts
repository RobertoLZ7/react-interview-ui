import { Widget } from './../../lib/apiConnect';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarData {
    open: boolean;
    message: string;
};

interface WidgetsState {
    widgetList: Widget[];
    snackbar: {open: boolean, message: string};
};

const initialState: WidgetsState = {
  widgetList: [],
  snackbar: {open: false, message: ""}
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    populateWidgets(state, action: PayloadAction<Widget[]>) {
        state.widgetList = action.payload;
    },
    addNewWidget(state, action: PayloadAction<Widget>) {
        state.widgetList = [...state.widgetList, action.payload];
    },
    removeWidget(state, action: PayloadAction<string>) {
        state.widgetList = state.widgetList.filter(element => element.name != action.payload);
    },
    updateWidget(state, action: PayloadAction<Widget>) {
        state.widgetList = state.widgetList.map(element => element.name === action.payload.name ? action.payload : element);
    },
    displaySnackbar(state, action: PayloadAction<SnackbarData>) {
        state.snackbar = action.payload;
    }
  },
});

export const { populateWidgets, addNewWidget, removeWidget, updateWidget, displaySnackbar } = widgetsSlice.actions;

export default widgetsSlice.reducer;