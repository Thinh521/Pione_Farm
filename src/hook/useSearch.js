import {useMemo, useState} from 'react';
import {removeVietnameseTones} from '../utils/normalize';

export const useSearchAndFilter = ({
  data = [],
  searchableFields = ['name'],
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredData = useMemo(() => {
    if (!searchKeyword.trim()) return data;

    const keyword = removeVietnameseTones(searchKeyword);

    return data.filter(item =>
      searchableFields.some(field => {
        const fieldValue = item[field]?.toString() || '';
        return removeVietnameseTones(fieldValue).includes(keyword);
      }),
    );
  }, [data, searchKeyword, searchableFields]);

  return {
    filteredData,
    searchKeyword,
    setSearchKeyword,
  };
};
