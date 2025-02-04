import styles from "./TaskForm.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../../store/asyncActions";
import { selectIsLoading, selectId, selectTitle, selectValueInput } from "../../store/selectors/selectors";
import { endpoints } from "../../api/config";
import { ACTIONS_TYPE } from "../../store/asyncActions";
import PropTypes from "prop-types";

export const TaskForm = (props) => {
	const [message, setMessage] = useState({ status: null, text: null });

	const dispatch = useDispatch();

	const isLoading = useSelector(selectIsLoading);
	const id = useSelector(selectId);
	const title = useSelector(selectTitle);
	const valueInput = useSelector(selectValueInput);

	const string = `${
		props.operation === "add" ? "Добавить" : "Редактировать"
	} задачу`;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (valueInput) {
			props.operation === "add" &&
				dispatch(createTask(endpoints.todos, { title: valueInput }));
			props.operation === "update" &&
				dispatch(updateTask(endpoints.todos, { id, title: valueInput }));

			const resultText = `Задача ${
				props.operation === "add" ? "добавлена" : "обновлена"
			}!`;
			setMessage({ status: "success", text: resultText });
		} else {
			setMessage({ status: "error", text: "Введите задачу!" });
		}
	};

	const onChange = (e) => {
		dispatch({ type: ACTIONS_TYPE.SET_VALUE_INPUT, payload: e.target.value });
	};

	useEffect(() => {
		if (props.operation === "update") {
		  dispatch({ type: ACTIONS_TYPE.SET_VALUE_INPUT, payload: title });
		}
		return () => dispatch({ type: ACTIONS_TYPE.SET_VALUE_INPUT, payload: "" });
	  }, [props.operation]);

	useEffect(() => {
		let timer;
		if (message.status === "success") {
			timer = setTimeout(() => {
				props.close();
				setMessage({ status: null, text: null });
			}, 1000);
		}
		return () => clearTimeout(timer);
	}, [message.status]);

	const onResetClick = () => {
		dispatch({ type: ACTIONS_TYPE.SET_VALUE_INPUT, payload: "" });
	}

	return (
		<form className={styles["form"]} onSubmit={handleSubmit}>
			<h2 className={styles["form__title"]}>{string}</h2>
			<div className={styles["form__fields"]}>
				<label className={styles["form__field"]}>
					<span className={styles["form__field-title"]}>Задача</span>
					<input
						onChange={onChange}
						value={valueInput}
						className={styles["form__field-input"]}
						name="title"
						type="text"
						placeholder="Название задачи"
					/>
				</label>
			</div>
			{message.status && (
				<p className={styles["form__message"]}>{message.text}</p>
			)}
			<div className={styles["form__actions"]}>
				<button className={styles["form__reset"]} type="reset" onClick={onResetClick}>
					Очистить
				</button>
				<button
					className={styles["form__submit"]}
					type="submit"
					disabled={isLoading}
				>
					{string}
				</button>
			</div>
		</form>
	);
};

TaskForm.propTypes = {
	close: PropTypes.func,
	operation: PropTypes.string,
};
