import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getAllCategories} from '~/api/categogyApi';

const useFruitCategory = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['fruitCategories'],
    queryFn: getAllCategories,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
    enabled: true,
  });

  const fruitCategory = useMemo(() => {
    return ['Tất cả', ...data.map(c => c.name)];
  }, [data]);

  return {
    fruitCategoryList: data,
    fruitCategory,
    isLoading,
    error,
  };
};

export default useFruitCategory;
