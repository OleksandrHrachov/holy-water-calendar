import React, { FC } from "react";
import "./TodoItem.scss";

interface IProps {
  title: string;
}

export const TodoItem: FC<IProps> = ({title}) => {
  return <div>{title}</div>;
};
