import RootReducer from "./src/redux/reducers";
import RootReducers from "./src/store/index.reducer" 

export type RootState = ReturnType<typeof RootReducer>;
export type RootStateType = ReturnType<typeof RootReducers>;
