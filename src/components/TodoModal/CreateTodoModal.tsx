import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CreateTodoModal.scss";
import { useAppDispatch } from "../../hooks";
import { addToDo } from "../../store/todoSlice";
import moment from "moment";
import { v4 as uuid } from 'uuid';

interface IProps {
  closeModal: () => void;
}

interface IForm {
  title: string;
  description: string;
  date: string;
  time: string;
}

export const CreateTodoModal: FC<IProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IForm>({
    defaultValues: { title: "", description: "" },
  });

  const submitSuccess: SubmitHandler<IForm> = (data) => {
    data.date = data.date.split("-").reverse().join("-");
    console.log("data =>", { [data.date]: data });
    dispatch(
      addToDo({
        id: uuid(),
        title: data.title,
        description: data.description || null,
        date: data.date,
        time: data.time || null,
        createdAt: moment().format('DD-MM-YYYY HH:mm')
      })
    );
    reset();
    closeModal();
  };

  const onCloseModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    closeModal();
  };

  return (
    <div onClick={(e) => onCloseModal(e)} className="modal">
      <div className="modal__body" onClick={(e) => e.stopPropagation()}>
        <div
          onClick={(e) => onCloseModal(e)}
          className="modal__close-modal-button"
        >
          <div className="modal__close-modal-button-item-1"></div>
          <div className="modal__close-modal-button-item-2"></div>
        </div>
        <h3 className="modal__body-title">Add new TODO</h3>
        <form id="addTodo" onSubmit={handleSubmit(submitSuccess)}>
          <label className="modal__todo-title-label">
            <p>Todo</p>
            <input
              className={`modal__todo-title-text ${
                errors.title ? "required" : ""
              }`}
              type="text"
              {...register("title", { required: true })}
            />
          </label>
          <label className="modal__todo-description-label">
            <p>Description</p>
            <textarea
              className="modal__todo-description-text"
              rows={5}
              {...register("description")}
            />
          </label>
          <div className="modal__todo-period">
            <label className="modal__todo-period-date-lable">
              <p>Date</p>
              <input
                className={`modal__todo-period-date-value ${
                  errors.date ? "required" : ""
                }`}
                type="date"
                {...register("date", { required: true })}
                min="2018-01-01"
                max="2025-12-31"
              />
            </label>

            <label className="modal__todo-period-time-lable">
              <p>Time</p>
              <input
                className="modal__todo-period-time-value"
                type="time"
                {...register("time")}
              />
            </label>
          </div>
          <div className="modal__todo-button-container">
            <button
              className="modal__todo-save-button"
              type="submit"
              disabled={
                watch("title").length === 0 ||
                watch("date").length === 0 ||
                !!errors.title ||
                !!errors.date
              }
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
