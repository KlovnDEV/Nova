export type FlexPart =
  | 'column'
  | 'row'
  | 'center'
  | 'around'
  | 'between'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'baseline';
export type Flex =
  | `${FlexPart}`
  | `${FlexPart} ${FlexPart}`
  | `column ${FlexPart} ${FlexPart}`
  | `row ${FlexPart} ${FlexPart}`;

export interface Props {
  children: React.ReactNode;
  className?: string;
  flex?: Flex;
  elevation?: number;
  [x: string]: any;
}
