import {useMemo, useState} from 'react';
import {removeVietnameseTones} from '~/utils/normalize';

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

    // Filter theo ngày (1 ngày hoặc khoảng ngày)
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
      const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : start;

      result = result.filter(item => {
        const createdAt = new Date(item.createdAt).getTime();
        return (!start || createdAt >= start) && (!end || createdAt <= end);
      });
    }

    // Filter theo giá
    const priceFilter = filters['Giá'];
    if (priceFilter === 'Tăng dần' || priceFilter === 'Giảm dần') {
      result.sort((a, b) => {
        const priceA = parseFloat(
          (
            (a.marketPrice && a.marketPrice > 0 ? a.marketPrice : a.price) ||
            '0'
          )
            .toString()
            .replace(/,/g, ''),
        );
        const priceB = parseFloat(
          (
            (b.marketPrice && b.marketPrice > 0 ? b.marketPrice : b.price) ||
            '0'
          )
            .toString()
            .replace(/,/g, ''),
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

    // Filter theo tin tức
    const news = filters['Tin tức'];
    if (news && news !== 'Tất cả') {
      result = result.filter(item => {
        const type = item.type?.toLowerCase() || '';
        return (
          (news === 'Trong nước' && type === 'trongnuoc') ||
          (news === 'Ngoài nước' && type === 'ngoainuoc')
        );
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
