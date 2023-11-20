import React from "react";
import "./EditTodoModal.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal, openModal } from "../../store/modalSlice";
import { EDIT_TODO_MODAL, LIST_TODOS_MODAL } from "../../store/types";
import { removeToDo, updateToDo } from "../../store/todoSlice";
import moment from "moment";
import { MAX_YEAR, MIN_YEAR } from "../../const";

interface IForm {
  title: string;
  description: string;
  date: string;
  time: string;
}

export const EditTodoModal = () => {
  const dispatch = useAppDispatch();
  const { selectedTodo, selectedDay } = useAppSelector(
    (state) => state.selectedDay
  );

  const date = selectedTodo?.date.split("-").reverse().join("-");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
    getValues,
  } = useForm<IForm>({
    defaultValues: {
      title: selectedTodo?.title || "",
      description: selectedTodo?.description || "",
      date: date || "",
      time: selectedTodo?.time || "",
    },
  });

  const submitSuccess: SubmitHandler<IForm> = (data) => {
    data.date = data.date.split("-").reverse().join("-");
    if (selectedTodo) {
      dispatch(
        updateToDo({
          selectedDay: selectedDay,
          todo: {
            id: selectedTodo.id,
            title: data.title,
            description: data.description || null,
            date: data.date,
            time: data.time || null,
            updatedAt: moment().format("DD-MM-YYYY HH:mm"),
          },
        })
      );
    }
    reset();
    dispatch(closeModal(EDIT_TODO_MODAL));
  };

  const handleDelete = () => {
    if (selectedTodo) {
      dispatch(
        removeToDo({
          selectedDay: selectedDay,
          todo: selectedTodo,
        })
      );
    }
    reset();
    dispatch(closeModal(EDIT_TODO_MODAL));
  };

  const onCloseModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(closeModal(EDIT_TODO_MODAL));
  };

  return (
    <div onClick={(e) => onCloseModal(e)} className="edit-modal">
      <div className="edit-modal__body" onClick={(e) => e.stopPropagation()}>
        <div
          onClick={(e) => onCloseModal(e)}
          className="edit-modal__close-modal-button"
        >
          <div className="edit-modal__close-modal-button-item-1"></div>
          <div className="edit-modal__close-modal-button-item-2"></div>
        </div>
        <h3 className="edit-modal__body-title">
          Edit TODO{" "}
          <span className="edit-modal__body-title-hint">
            {selectedTodo?.updatedAt
              ? `updated at ${selectedTodo.updatedAt}`
              : `created at ${selectedTodo?.createdAt}`}
          </span>
        </h3>
        <form id="addTodo" onSubmit={handleSubmit(submitSuccess)}>
          <label className="edit-modal__todo-title-label">
            <p>Todo*</p>
            <input
              className={`edit-modal__todo-title-text ${
                errors.title ||
                (touchedFields.title && getValues("title").length === 0)
                  ? "required"
                  : ""
              }`}
              type="text"
              {...register("title", { required: true })}
            />
          </label>
          <label className="edit-modal__todo-description-label">
            <p>Description</p>
            <textarea
              className="edit-modal__todo-description-text"
              rows={5}
              {...register("description")}
            />
          </label>
          <div className="edit-modal__todo-period">
            <label className="edit-modal__todo-period-date-lable">
              <p>Date*</p>
              <input
                className={`edit-modal__todo-period-date-value ${
                  errors.date ||
                  (touchedFields.date && getValues("date").length === 0)
                    ? "required"
                    : ""
                }`}
                type="date"
                {...register("date", { required: true })}
                min={`${MIN_YEAR}-01-01`}
                max={`${MAX_YEAR}-12-31`}
              />
            </label>

            <label className="edit-modal__todo-period-time-lable">
              <p>Time</p>
              <input
                className="edit-modal__todo-period-time-value"
                type="time"
                {...register("time")}
              />
            </label>
          </div>
          <div className="edit-modal__todo-button-container">
            <p>* required</p>
            <div className="edit-modal__todo-button-container-inner">
              <button
                onClick={handleDelete}
                className="edit-modal__todo-delete-button"
                type="button"
              >
                DELETE
              </button>
              <button
                className="edit-modal__todo-save-button"
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
          </div>
        </form>
      </div>
    </div>
  );
};
