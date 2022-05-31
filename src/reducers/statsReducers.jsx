const intialData = {
  formData: {},
  loading: false
};

// similar to : const [list, setList] = useState('');
const statsReducers = (state = intialData, action) => {
  switch (action.type) {
    case "UPDATE_USER_COUNT":
      return {
        ...state,
        formData: action.payload,
      };

    default:
      return state;
  }
};

export default statsReducers;
