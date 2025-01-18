interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div
      className={`h-[1px] transition-colors duration-300 ${
        progress > 0 ? 'bg-gray-200' : 'bg-transparent'
      }`}
    >
      <div
        className={`bg-black w-full h-[1px] md:h-[2px] origin-left scale-x-0`}
        style={{ transform: `scaleX(${progress})` }}
      ></div>
    </div>
  );
};
export default ProgressBar;
