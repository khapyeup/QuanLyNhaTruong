import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';  // Replace with actual toast library

/** 
 * Log a warning and show a toast when an action is rejected
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` under the hood, so we can check for rejections
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!');
    console.log(action)
    // Action variable structure 
    // {
    //     error: {message: 'Reject'},
    //     payload: {
    //         data: {
    //             message: 'Error message when get response status error from server'
    //         }
    //         error: 'Message error when got error while fetching'
    //     }
    // }

    const errorMessage = 
      action.payload.data && action.payload.data.message
        ? action.payload.data.message
        : action.payload.error;
    
    // Show a toast notification with the error message
    toast.warning(errorMessage);
  }

  // Pass the action along the middleware chain
  return next(action);
};
