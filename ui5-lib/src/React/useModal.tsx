import { useCallback, useState } from "react";

export const useModal = <SupportedActions,>() => {
  const [openedModal, setOpenedModal] = useState<SupportedActions | null>(null);

  const isOpened = useCallback(
    (name: SupportedActions | null) => openedModal === name,
    [openedModal],
  );

  const openActionCreator = (name: SupportedActions) => (value: boolean) =>
    setOpenedModal(value ? name : null);

  return { openedModal, setOpenedModal, isOpened, openActionCreator };
};
