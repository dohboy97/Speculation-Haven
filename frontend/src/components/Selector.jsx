function Selector({ setValue, value, options }) {
  return (
    <div>
      <select onChange={(e) => setValue(e.target.value)}>
        {options.map((el, index) => {
          return (
            <option key={index} value={el.toLowerCase()}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Selector;
