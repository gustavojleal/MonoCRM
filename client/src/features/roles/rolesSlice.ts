import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Role } from './types';
import { LookupService } from '../../services/LookupService';

export const fetchRoles = createAsyncThunk<Role[]>('roles/fetchRoles', async () => {
  return await LookupService.getLookupData('roles');
});

interface RolesState {
  list: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RolesState = {
  list: [],
  loading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action: PayloadAction<Role>) => {
      state.list.push(action.payload);
    },
    removeRole: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((_, index) => index !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar roles';
      });
  },
});

export const { addRole, removeRole } = rolesSlice.actions;

export default rolesSlice.reducer;