const FLAG_CODE = {
  ru: 'ru',
  ja: 'jp',
  en: 'us',
  es: 'es',
};

type FlagProps = {
  code: keyof typeof FLAG_CODE;
  alt: string;
};

export default function Flag({ code, alt }: FlagProps) {
  return (
    <img
      src={`https://flagcdn.com/16x12/${FLAG_CODE[code]}.png`}
      srcSet={`https://flagcdn.com/32x24/${FLAG_CODE[code]}.png 2x, https://flagcdn.com/48x36/${FLAG_CODE[code]}.png 3x`}
      width="16"
      height="12"
      alt={alt}
      className="inline-block h-fit"
    />
  );
}
