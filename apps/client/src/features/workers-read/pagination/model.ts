export type PagingOptions = {
  onPrevious: () => void;
  onNext: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  currentPage: number;
};
