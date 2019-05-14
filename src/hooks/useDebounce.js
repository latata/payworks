import { useRef, useState } from 'react';
import debounce from 'lodash.debounce';

const useDebounce = (defaultValue, delay) => {
  const [value, setValue] = useState(defaultValue);
  const ref = useRef(debounce((value) => setValue(value), delay));

  return [value, ref.current];
};

export default useDebounce;
