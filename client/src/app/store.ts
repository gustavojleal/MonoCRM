import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from '../features/roles/rolesSlice';
import contactsReducer from '../features/contact/contactsSlice';
// import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    roles: rolesReducer,
    contacts: contactsReducer,
    // auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;