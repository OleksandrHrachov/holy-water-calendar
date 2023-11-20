import React from "react";
import "./BackgroundOverlay.scss";
import { closeModal } from "../../store/modalSlice";
import { CALENDAR_MODAL } from "../../store/types";
import { useAppDispatch} from '../../hooks';

export const BackgroundOverlay = () => {
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(closeModal(CALENDAR_MODAL));
  };

  return <div onClick={onClose} className="background-modal"></div>;
};
