import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getAllProvinceApii} from '~/api/provinceApi';

const useProvince = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['provinces'],
    queryFn: getAllProvinceApii,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
    enabled: true,
  });

  const provinceOptions = useMemo(() => {
    return ['Tất cả', ...data.map(p => p.name)];
  }, [data]);

  return {
    provinceList: data,
    provinceOptions,
    isLoading,
    error,
  };
};

export default useProvince;
