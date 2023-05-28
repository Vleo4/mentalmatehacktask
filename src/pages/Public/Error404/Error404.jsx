import "./Error404.css";
const Error404 = () => {
  return (
    <div className="app__error">
      <section>
        <h1>ERROR 404</h1>
        <h3>Ми не знаємо як ви тут опинились.</h3>
        <div>
            <p onClick={()=>{window.location.href="/"}}>Повернутися на головну</p>
        </div>
      </section>
    </div>
  );
};

export default Error404;
