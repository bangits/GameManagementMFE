import { gameApi } from '@/adapter/redux/api';
import { useTranslation } from '@atom/common';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import GameDetails from './GameDetails';

const GameDetailsContainer = () => {
  const params = useParams<{ gameId: string }>();

  const { data, isFetching, originalArgs } = gameApi.useGetGameByIdQuery(+params.gameId);

  const t = useTranslation();

  console.log('GameDetailsContainer');
  const dispatch = useDispatch();

  // Game status change functions
  // const [changeGameStatus] = gameApi.useChangeGameStatusMutation();

  // const changeStatusDialogModel = useMemo<{ gameId: PrimaryKey; legalName: string; legalEntity: string }>(
  //   () => ({
  //     gameId: data?.gameId,
  //     legalName: data?.organizationDetails.legalName,
  //     legalEntity: data?.organizationDetails.legalEntity.shortName
  //   }),
  //   [data]
  // );

  // const { openDialogFn: onApproveButtonClick } = useActionWithDialog<typeof changeStatusDialogModel>({
  //   dialogFn: showGameApproveDialog,
  //   actionFn: (gameIds) => changeGameStatus({ gameIds, statusId: GameStatusesEnum.ACTIVE }).unwrap(),
  //   isFetching,
  //   t,
  //   refetch: () => {
  //     dispatch(
  //       gameApi.util.updateQueryData('getGameById', originalArgs, (draft) => {
  //         Object.assign(draft, {
  //           statusId: GameStatusesEnum.Validated
  //         });
  //       })
  //     );
  //   },
  //   getColumnId: (column) => column.gameId
  // });

  // const { openDialogFn: onTerminateButtonClick } = useActionWithDialog<typeof changeStatusDialogModel>({
  //   dialogFn: showGameTerminateDialog,
  //   actionFn: (gameIds) => changeGameStatus({ gameIds, statusId: GameStatusesEnum.Terminated }).unwrap(),
  //   isFetching,
  //   t,
  //   refetch: () => {
  //     dispatch(
  //       gameApi.util.updateQueryData('getGameById', originalArgs, (draft) => {
  //         Object.assign(draft, {
  //           statusId: GameStatusesEnum.Terminated
  //         });
  //       })
  //     );
  //   },
  //   getColumnId: (column) => column.gameId
  // });

  // if (!data) return null;

  return (
    <GameDetails
      data={data}
      onApproveButtonClick={() => {
        console.log;
      }}
      onTerminateButtonClick={() => {
        console.log;
      }}
      // shouldShowApproveButton={data.statusId !== GameStatusesEnum.ACTIVE}
      // shouldShowTerminateButton={data.statusId !== GameStatusesEnum.ACTIVE}
      shouldShowTerminateButton={false}
      shouldShowApproveButton={true}
    />
  );
};

export default GameDetailsContainer;
