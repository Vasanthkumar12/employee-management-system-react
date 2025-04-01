export const employeeReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_USER_FIELD":
        return { ...state, [action.field]: action.value, id: Date.now() };
  
      case "SET_ERRORS":
        return { ...state, errors: action.payload };
  
      case "REGISTRATION_SUCCESS":
        return initialState; // Reset form on success
  
      case "REGISTRATION_FAILURE":
        return state;
  
      default:
        return state;
    }
  };