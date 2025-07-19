import {useMemo, useState} from 'react';
import {removeVietnameseTones} from '../utils/normalize';

export const useSearchAndFilter = ({
  data = [],
  searchableFields = ['name'],
  startDate,
  endDate,
  searchKeyword: externalSearch = '',
  filters = {},
}) => {
  const [searchKeyword, setSearchKeyword] = useState(externalSearch);

  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
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

    // Filter theo ngày
    if (startDate && endDate) {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      result = result.filter(item => {
        const createdAt = new Date(item.createdAt).getTime();
        return createdAt >= start && createdAt <= end;
      });
    }

    // Filter theo giá
    const priceFilter = filters['Giá'];
    if (priceFilter === 'Tăng dần' || priceFilter === 'Giảm dần') {
      result.sort((a, b) => {
        const priceA = parseFloat(
          (a.marketPrice || '0').toString().replace(/,/g, ''),
        );
        const priceB = parseFloat(
          (b.marketPrice || '0').toString().replace(/,/g, ''),
        );
        return priceFilter === 'Tăng dần' ? priceA - priceB : priceB - priceA;
      });
    }

    // Filter theo tỉnh
    const province = filters['Tỉnh'];
    if (province && province !== 'Tất cả') {
      result = result.filter(item => {
        const itemProvince = item.provinceName || item.province || '';
        return itemProvince.toString() === province.toString();
      });
    }

    // Filter theo số lượng
    const quantity = filters['Số lượng'];
    if (quantity && quantity !== 'Tất cả') {
      result = result.filter(item => {
        const qty = parseFloat(item.quantity || 0);
        if (quantity === 'Dưới 100') return qty < 100;
        if (quantity === '100 - 500') return qty >= 100 && qty <= 500;
        return qty > 500;
      });
    }

    return result;
  }, [data, searchKeyword, searchableFields, startDate, endDate, filters]);

  return {
    filteredData,
    searchKeyword,
    setSearchKeyword,
  };
};
