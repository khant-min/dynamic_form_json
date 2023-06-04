import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState<object[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios("http://localhost:3500/data");
      setData(data);
    })();
  }, []);

  return (
    <div>
      <form>
        <ul style={{ listStyle: "none" }}>
          {data.map((cur: any) => {
            if (cur.type === "radio")
              return (
                <li key={cur.formName}>
                  {cur.options.map((option: any) => (
                    <div key={option.title}>
                      <label htmlFor={option.title}>{option.title}</label>
                      <input
                        id={option.title}
                        type={cur.type}
                        value={option.value}
                        name={cur.type}
                      />
                    </div>
                  ))}
                </li>
              );
            if (cur.type === "selectbox")
              return (
                <li key={cur.formName}>
                  <label htmlFor={cur.formName}>{cur.formName}</label>
                  <select name={cur.formName} id={cur.formName}>
                    {cur.options.map((option: any) => (
                      <option value={option.value} key={option.value}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                </li>
              );
            return (
              <li key={cur.formName}>
                <label htmlFor={cur.formName}>{cur.formName}</label>
                <input
                  type={cur.type}
                  required={cur.isRequired}
                  id={cur.formName}
                  hidden={cur.isHidden}
                  placeholder={cur.placeholder}
                />
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
};

export default App;
