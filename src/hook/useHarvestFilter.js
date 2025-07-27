import {useEffect, useState, useCallback} from 'react';
import useProvince from '~/hook/useProvince';
import useFruitCategory from '~/hook/useFruitCategory';
import {getFarmMarketPrices, getProductTypesByProvince} from '~/api/productApi';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const formatDate = dateString => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const useHarvestFilter = () => {
  const {provinceList, provinceOptions} = useProvince();
  const {fruitCategoryList, fruitCategory} = useFruitCategory();

  const [isLoading, setIsLoading] = useState(false);
  const [productTypeOptions, setProductTypeOptions] = useState(['Tất cả']);
  const [productTypeData, setProductTypeData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('Tất cả');
  const [resultData, setResultData] = useState([]);

  // Fetch loại sản phẩm theo tỉnh và thời gian
  const fetchProductTypes = useCallback(async () => {
    const {Tỉnh, 'Ngày BĐ': start, 'Ngày KT': end} = selectedFilters;
    const isValid = Tỉnh && Tỉnh !== 'Tất cả' && start && end;
    if (!isValid) {
      setProductTypeOptions(['Tất cả']);
      setProductTypeData([]);
      setSelectedTypeFilter('Tất cả');
      return;
    }

    const province = provinceList.find(p => p.name === Tỉnh);
    if (!province) return;

    try {
      const res = await getProductTypesByProvince(province._id, {
        start: formatDate(start),
        end: formatDate(end),
      });

      const types = res?.data || [];
      setProductTypeOptions(['Tất cả', ...types.map(t => t.name)]);
      setProductTypeData(types);
    } catch (err) {
      console.log('Lỗi loại sản phẩm:', err.message);
    }
  }, [selectedFilters, provinceList]);

  // Fetch dữ liệu thu gom
  const fetchFilteredData = useCallback(async () => {
    const {
      Tỉnh,
      'Mặt hàng': category,
      'Ngày BĐ': start,
      'Ngày KT': end,
      Xuất_xứ: origin,
    } = selectedFilters;

    try {
      setIsLoading(true);

      const payload = {};

      const province = provinceList.find(p => p.name === Tỉnh);
      if (province && Tỉnh !== 'Tất cả') payload.provinceId = province._id;

      const cat = fruitCategoryList.find(c => c.name === category);
      if (cat && category !== 'Tất cả') payload.categoryId = cat._id;

      if (start && end) {
        payload.date = {
          start: formatDate(start),
          end: formatDate(end),
        };
      }

      const type = productTypeData.find(t => t.name === selectedTypeFilter);
      if (type && selectedTypeFilter !== 'Tất cả') payload.typeId = type._id;

      if (origin === 'Ngoài nước') {
        payload.scope = 'abroad';
      }

      const res = await getFarmMarketPrices(payload);
      setResultData(res.data || []);
    } catch (err) {
      console.log('Lỗi dữ liệu thu gom:', err.message);
      setResultData([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedFilters,
    selectedTypeFilter,
    provinceList,
    fruitCategoryList,
    productTypeData,
  ]);

  const handleFilterSelect = useCallback(
    debounce((key, value) => {
      setSelectedFilters(prev => ({
        ...prev,
        [key]: value,
      }));

      if (key === 'Mặt hàng') {
        setSelectedTypeFilter('Tất cả');
      }
    }, 300),
    [],
  );

  const isAllFiltersSelected = useCallback(() => {
    const {
      Tỉnh,
      'Mặt hàng': category,
      'Ngày BĐ': start,
      'Ngày KT': end,
    } = selectedFilters;

    return (
      Tỉnh &&
      Tỉnh !== 'Tất cả' &&
      category &&
      category !== 'Tất cả' &&
      start &&
      end
    );
  }, [selectedFilters]);

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]);

  return {
    isLoading,
    fruitCategory,
    provinceOptions,
    selectedFilters,
    handleFilterSelect,
    collectionAndYieldData: resultData,
    productTypeOptions,
    selectedTypeFilter,
    setSelectedTypeFilter,
    isAllFiltersSelected,
  };
};
