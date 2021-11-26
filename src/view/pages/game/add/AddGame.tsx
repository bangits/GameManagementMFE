import { Stepper } from '@atom/common';
import { FC } from 'react';

export interface AddGameProps {}

const AddGame: FC<AddGameProps> = () => {
  return (
    <>
      <Stepper
        initialValues={{}}
        name='player-add'
        steps={[
          {
            component: () => <div>Game information</div>,
            title: 'Game information',
            value: 1
          },
          {
            component: () => <div>Game Properties</div>,
            title: 'Game Properties',
            value: 2
          },
          {
            component: () => <div>Other details</div>,
            title: 'Other details',
            value: 3
          }
        ]}>
        {({
          updateStepperState,
          CurrentStepComponent,
          currentStep,
          initialValues,
          updateCurrentStep,
          resetStepperState
        }) => (
          <>
            <CurrentStepComponent />
          </>
        )}
      </Stepper>
    </>
  );
};

export default AddGame;
