import PropTypes from 'prop-types';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || options.at(0).value;

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return <Select options={options} type='white' value={sortBy} onChange={handleChange} />;
};

export default SortBy;

SortBy.propTypes = {
  options: PropTypes.array,
};
