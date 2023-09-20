import { gameApi } from '@/adapter/redux/api';
import { CustomSelect, CustomSelectProps, PrimaryKey } from '@atom/common';
import { useMemo } from 'react';

export const GameTypesSelect = (props: CustomSelectProps & { gameTypeIds?: PrimaryKey[] }) => {
  const { data } = gameApi.useGetGameTypesQuery(props.gameTypeIds?.filter((type) => !!type));

  const selectOptions = useMemo(() => {
    return data?.map((c) => ({ value: c.value, label: c.label })) || [];
  }, [data]);

  return (
    <>
      <CustomSelect {...props} fullWidth options={selectOptions} />
    </>
  );
};
