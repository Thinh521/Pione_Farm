import {useMemo, useState} from 'react';
import { removeVietnameseTones } from '../utils/normalize';

export const useSearchAndFilter = ({
  data = [],
  searchableFields = ['name'],
  startDate,
  endDate,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredData = useMemo(() => {
    let result = data;

    if (searchKeyword.trim()) {
      const keyword = removeVietnameseTones(searchKeyword.toLowerCase());

      result = result.filter(item =>
        searchableFields.some(field => {
          const fieldValue = item[field]?.toString() || '';
          return removeVietnameseTones(fieldValue.toLowerCase()).includes(
            keyword,
          );
        }),
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      result = result.filter(item => {
        const createdAt = new Date(item.createdAt).getTime();
        return createdAt >= start && createdAt <= end;
      });
    }

    return result;
  }, [data, searchKeyword, searchableFields, startDate, endDate]);

  return {
    filteredData,
    searchKeyword,
    setSearchKeyword,
  };
};
