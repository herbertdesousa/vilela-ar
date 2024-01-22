import classNames from 'classnames';

type Props = {
  stepsAmount: number;
  activeStepTitle: string;
  activeStepIndex: number;
};

export function StepIndicator({
  activeStepTitle,
  stepsAmount,
  activeStepIndex,
}: Props) {
  const indicators = Array(stepsAmount)
    .fill('')
    .map((_, idx) => idx);

  return (
    <div className="flex flex-col gap-y-2">
      <ul className="flex gap-x-1 w-full">
        {indicators.map((i) => (
          <li
            key={i}
            className={classNames(
              'flex flex-1 h-1 rounded-full',
              activeStepIndex < i && 'bg-slate-200',
              activeStepIndex >= i && 'bg-blue-600',
            )}
          />
        ))}
      </ul>

      <div className="flex w-full justify-between items-center">
        <strong className="font-medium text-xl">{activeStepTitle}</strong>

        <span className="font-medium text-blue-600 text-sm">
          {`Passo ${activeStepIndex + 1} de ${stepsAmount}`}
        </span>
      </div>
    </div>
  );
}
