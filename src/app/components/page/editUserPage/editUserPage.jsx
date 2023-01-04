import React, { useEffect, useState } from "react";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();

    const parseQualitiesFromUser = (user) => {
        return user.qualities.map((qualitie) => {
            return {
                value: qualitie._id,
                label: qualitie.name,
                color: qualitie.color
            };
        });
    };

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            console.log(user);
            setData((prevState) => ({
                ...prevState,
                name: user.name,
                email: user.email,
                profession: user.profession._id,
                sex: user.sex,
                qualities: parseQualitiesFromUser(user),
                rate: user.rate.toString(),
                completedMeetings: user.completedMeetings.toString()
            }));
        });
    }, []);

    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: [],
        rate: "1",
        completedMeetings: "0"
    });

    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        rate: {
            isRequired: {
                message: "Оценка обязательна для заполнения"
            },
            minValue: {
                value: 1,
                message: "Значение должно быть больше 0"
            },
            maxValue: {
                value: 6,
                message: "Значение должно быть меньше 6"
            },
            isOneNumber: {
                message: "Значение должно быть числом"
            }
        },
        completedMeetings: {
            isRequired: {
                message: "Количество встреч обязательно для заполнения"
            },
            minValue: {
                value: 0,
                message: "Значение должно быть больше или равно 0"
            },
            isOneNumber: {
                message: "Значение должно быть числом"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.push(`/users`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Оценка"
                name="rate"
                value={data.rate}
                onChange={handleChange}
                error={errors.rate}
            />
            <TextField
                label="Встретился, раз"
                name="completedMeetings"
                value={data.completedMeetings}
                onChange={handleChange}
                error={errors.completedMeetings}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Edit
            </button>
        </form>
    );
};

export default EditUserPage;
