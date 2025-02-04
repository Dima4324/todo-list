import styles from "./TasksList.module.css";
import { Task } from "../Task/Task";
import { Preloader } from "../Preloader/Preloader";
import { useEffect, useState } from "react";
import { setTasks } from "../../store/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectTasks, selectIsSorted } from "../../store/selectors/selectors";
import { ACTIONS_TYPE } from "../../store/asyncActions";
export const TasksList = () => {
	const [valueInput, setValueInput] = useState("");
	const [filteredArray, setFilteredArray] = useState([]);

	const dispatch = useDispatch();

	const tasks = useSelector(selectTasks);
	const isLoading = useSelector(selectIsLoading);
	const isSorted = useSelector(selectIsSorted)

	useEffect(() => {
		dispatch(setTasks());
	}, [dispatch]);

	useEffect(() => {
		if (!tasks) {
			return;
		}

		const filteredTasks = tasks.filter((todo) =>
			todo.title.toLowerCase().includes(valueInput.toLowerCase().trim())
		);

		if (isSorted) {
			filteredTasks.sort((a, b) => {
				const textA = a.title.toLowerCase();
				const textB = b.title.toLowerCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});
		}

		setFilteredArray(filteredTasks);
	}, [tasks, valueInput, isSorted]);

	const clickSort = () => {
		dispatch({ type: ACTIONS_TYPE.SET_IS_SORTED, payload: !isSorted });
	};

	const onChange = (e) => {
		setValueInput(e.target.value)
	};

	if (isLoading) {
		return <Preloader />;
	}

	return (
		<div className={styles["tasks-container"]}>
			<h1 className={styles["tasks-container__title"]}>Задачи</h1>
			<input
				name="search"
				type="search"
				value={valueInput}
				onChange={onChange}
				className={styles["tasks-container__search"]}
				placeholder="Поиск задач"
			/>
			<label className={styles.sort}>
				<input
					type="checkbox"
					name="checkbox"
					checked={isSorted}
					onChange={clickSort}
				/>
				<span
					className={styles["tasks-container__sort-checkbox"]}
				></span>
				Сортировать по алфавиту
			</label>
			<ul className={styles["tasks-container__tasks"]}>
				{filteredArray.map((data) => (
					<li key={data.id}>
						<Task {...data} />
					</li>
				))}
			</ul>
		</div>
	);
};
