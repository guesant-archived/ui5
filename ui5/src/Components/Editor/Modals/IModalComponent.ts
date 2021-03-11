import { FC } from "react";

export type IModalComponent = FC<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}>;
