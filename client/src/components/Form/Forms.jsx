import React, { useEffect, useState } from "react";
import styles from "./Forms.module.css";
import addImg from "../../assets/images/boton-circular-plus.png";
import deleteImg from "../../assets/images/signo-menos.png";
import { useDispatch } from "react-redux";
import { createPokemon, fetchAllTypes } from "../../redux/actions";
import {
  validationByName,
  validationByType,
  validationImage,
} from "./Validations";

const Forms = () => {
  const dispatch = useDispatch();
  const [allTypes, setAllTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    types: [],
    hp: 1,
    attack: 1,
    specialAttack: 1,
    defense: 1,
    specialDefense: 1,
    speed: 1,
    height: 1,
    weight: 1,
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    types: "",
  });
  const [selects, setSelects] = useState([1]);
  const [selectValues, setSelectValues] = useState({});
  const [buttonAddDisabled, setButtonAddDisabled] = useState(false);
  const [buttonRemoveDisabled, setButtonRemoveDisabled] = useState(true);

  useEffect(() => {
    if (selects.length >= 2 && !buttonAddDisabled && buttonRemoveDisabled) {
      setButtonAddDisabled(true);
      setButtonRemoveDisabled(false);
    }
  }, [selects]);
  useEffect(() => {
    if (!allTypes.length) {
      dispatch(fetchAllTypes()).then((response) => {
        const data = response.payload;
        setAllTypes(data);
      });
    }
  }, [dispatch, allTypes]);

  const handleAddSelect = (e) => {
    if (e.target.name === "add") {
      setSelects([...selects, selects.length + 1]);
    }
    if (e.target.name === "remove") {
      const selectsCopy = selects;
      selectsCopy.pop();
      setSelects(selectsCopy);
      setButtonAddDisabled(false);
      setButtonRemoveDisabled(true);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "types") {
      setSelectValues((prevValues) => ({
        ...prevValues,
        [index]: value,
      }));
      const updatedTypes = [...formData.types];
      updatedTypes[index] = value;

      setFormData({
        ...formData,
        [name]: updatedTypes,
      });
    }
    if (name === "types") {
      if (!buttonAddDisabled) {
        if (selects.length === 2) setButtonAddDisabled(true);
        setSelectValues((prevValues) => ({
          ...prevValues,
          [index]: value,
        }));
        setFormData({
          ...formData,
          [name]: [...formData.types, value],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value.toLowerCase(),
      });
    }
  };

  useEffect(() => {
    const newErrors = {};

    if (formData.name.length) {
      newErrors.name = validationByName(formData.name);
    }

    if (formData.image.length) {
      newErrors.image = validationImage(formData.image);
    }

    if (formData.types.length) {
      newErrors.types = validationByType(formData.types);
    }

    setErrors({ ...errors, ...newErrors });
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e);
    const newErrors = {};

    newErrors.name = validationByName(formData.name);

    newErrors.image = validationImage(formData.image);

    newErrors.types = validationByType(formData.types);

    setErrors({ ...errors, ...newErrors });

    if (
      !newErrors.name.length &&
      !newErrors.image.length &&
      !newErrors.types.length &&
      formData.name.length > 0 &&
      formData.image.length > 0 &&
      formData.types.length > 0
    ) {
      
      dispatch(createPokemon(formData))
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
      setFormData({
        name: "",
        image: "",
        types: [],
        hp: 1,
        attack: 1,
        specialAttack: 1,
        defense: 1,
        specialDefense: 1,
        speed: 1,
        height: 1,
        weight: 1,
      });
      setSelectValues({});
    }
  };

  const firstStats = [
    { name: "Hp", valueName: "hp", max: 300 },
    { name: "Attack", valueName: "attack", max: 200 },
    { name: "Special Attack", valueName: "specialAttack", max: 195 },
    { name: "Defense", valueName: "defense", max: 240 },
  ];

  const secondStats = [
    { name: "Special Defense", valueName: "specialDefense", max: 240 },
    { name: "Speed", valueName: "speed", max: 205 },
    { name: "Height", valueName: "height", max: 750 },
    { name: "Weight", valueName: "weight", max: 10000 },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className={styles.background}>
      <div className={styles.containerMain}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.nameimageContainer}>
            <label className={styles.labels}>
              Name:
              <input
                className={styles.inputText}
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p className={styles.pError}>{errors.name}</p>}
            </label>
            <label className={styles.labels}>
              Image:
              <input
                className={styles.inputText}
                type="text"
                name="image"
                value={formData.image}
                placeholder="Enter a url"
                onChange={(e) => handleChange(e)}
              />
              {errors.image && <p className={styles.pError}>{errors.image}</p>}
            </label>
          </div>
          <div className={styles.containerTypes}>
            <label className={styles.labelType}>
              <div className={styles.types}>
                Types:
                {selects?.map((select, index) => {
                  return (
                    <select
                      className={styles.minimalDesing}
                      key={index}
                      name="types" 
                      value={selectValues[index] || ""} 
                      onChange={(e) => handleChange(e, index)} 
                    >
                      <option value="" hidden>
                        Select types
                      </option>
                      {allTypes?.map((type) => {
                        return (
                          <option key={type.id} value={type.name}>
                            {type.name}
                          </option>
                        );
                      })}
                    </select>
                  );
                })}
                <button
                  type="button"
                  onClick={(e) => handleAddSelect(e)}
                  disabled={buttonAddDisabled}
                  className={styles.button}
                >
                  <img name="add" src={addImg} alt="addImg" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleAddSelect(e)}
                  disabled={buttonRemoveDisabled}
                  className={styles.button}
                >
                  <img name="remove" src={deleteImg} alt="addImg" />
                </button>
              </div>
              {errors.types && <p className={styles.pError}>{errors.types}</p>}
            </label>
          </div>

          <div className={styles.containerStats}>
            <h1>Stats:</h1>
            <div className={styles.containerFirst}>
              {firstStats.map((stat) => (
                <div style={{ display: "flex" }}>
                  <label key={stat.name}>
                    {stat.name}:
                    <input
                      type="range"
                      min="1"
                      max={stat.max}
                      name={stat.valueName.toLowerCase()}
                      onChange={handleInputChange}
                    />
                  </label>
                  <span>{formData[stat.valueName.toLowerCase()]}</span>
                </div>
              ))}
            </div>
            <div className={styles.containerSecond}>
              {secondStats.map((stat) => (
                <div style={{ display: "flex" }}>
                  <label key={stat.name}>
                    {stat.name}:
                    <input
                      type="range"
                      min="1"
                      max={stat.max}
                      name={stat.valueName.toLowerCase()}
                      onChange={handleInputChange}
                    />
                  </label>
                  <span>{formData[stat.valueName.toLowerCase()]}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button className={styles.btnCreated}>Created Pokemon!</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Forms;
