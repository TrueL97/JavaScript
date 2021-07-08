import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class App extends React.Component {
    state = {
        isLoading: true,
        movies: [{}, {}],
    };
    getMovies = async () => {
        const movies = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json"); //axops 는 그렇게 빠르지 않으므로 componentDidMount함수가 끝날때까지 우리가 기다려야한다
    };
    componentDidMount() {
        this.getMovies();
    }
    render() {
        const { isLoading } = this.state;
        return <div>{isLoading ? "Loading..." : "we are ready"}</div>;
    }
}
export default App;

// class App extends React.Component {
//     state = {
//         isLoading: true,
//         movies: [{}, {}],
//     };
//     componentDidMount() {
//         //render 호출 후에 componentDidMount 함수가 호출된다
//         setTimeout(() => {
//             this.setState({ isLoading: false, book: true });
//         }, 6000);
//         axios.
//     }
//     render() {
//         const { isLoading } = this.state;
//         return <div>{isLoading ? "Loading..." : "we are ready"}</div>;
//     }
// }

//export default App;

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log("hello");
//     }
//     state = {
//         count: 0,
//     };

//     add = () => {
//         this.setState((current) => ({
//             count: current.count + 1,
//         })); //setState를 사용하면 호출될때마다 새state와 함께 render function이호출된다
//     };
//     minus = () => {
//         this.setState((current) => ({
//             count: current.count - 1,
//         })); //setState를 사용하면 호출될때마다 새state와 함께 render function이호출된다
//     };
//     componentDidMount() {
//         console.log("componentDidMount");
//     }
//     componentDidUpdate() {
//         console.log("i just updated");
//     }
//     componentWillUnmount() {
//         console.log("goodbye, reuel world");
//     }
//     render() {
//         console.log("i am rendering");
//         return (
//             <div>
//                 <h1>Im a class component {this.state.count}</h1>
//                 <button onClick={this.add}>Add</button>
//                 <button onClick={this.minus}>Minus</button>
//             </div>
//         ); //react는 자동적으로 나의 class component의 render method를 실행한다
//     }
// }

// export default App;

// const foodILike = [
//     { id: 1, name: "Kimchi", image: "https://kstory365.files.wordpress.com/2015/01/kimchi-01-cabbage.jpg", rating: 5 },
//     {
//         id: 2,
//         name: "bulgogi",
//         image: "https://www.google.com/search?q=%EB%B6%88%EA%B3%A0%EA%B8%B0&rlz=1C5CHFA_enKR902KR902&sxsrf=ALeKk02ziUIXmsNvR7TuYKh1cpJGpdpH8g:1593509047151&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi-p87lm6nqAhVbUd4KHVSWBBUQ_AUoAXoECBgQAw&biw=1440&bih=701&dpr=2#imgrc=kjZoAmvHGo-KfM",
//         rating: 5,
//     },
//     {
//         id: 3,
//         name: "kimbap",
//         image: "https://www.google.com/search?q=%EA%B9%80%EB%B0%A5&rlz=1C5CHFA_enKR902KR902&sxsrf=ALeKk03dn_nrK6M5JlKKfD5krm8w3qTmGQ:1593509069629&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjqn6rwm6nqAhXDQN4KHYLUA4EQ_AUoAXoECBgQAw&biw=1440&bih=701#imgrc=Xz3xQoYZw3bqEM",
//         rating: 5,
//     },
//     {
//         id: 4,
//         name: "samgyetang",
//         image: "https://img.seoul.co.kr//img/upload/2019/07/25/SSI_20190725184016.jpg",
//         rating: 5,
//     },
// ];

// // function renderFood(dish) {
// //     return <Food name={dish.name} picture={dish.image} />;
// // }

// function Food({ name, picture, rating }) {
//     return (
//         <div>
//             <h2>i like {name}</h2>
//             <h4>{rating}/5</h4>
//             <img src={picture} alt={name} />
//         </div>
//     );
// }
// Food.propTypes = {
//     name: PropTypes.string.isRequired,
//     picture: PropTypes.string.isRequired,
//     rating: PropTypes.number.isRequired,
// };

// function App() {
//     // console.log(foodILike.map(renderFood));
//     // return <div>{foodILike.map(renderFood)}</div>;
//     return (
//         <div>
//             {foodILike.map((dish) => (
//                 <Food key={dish.id} name={dish.name} picture={dish.image} rating={dish.rating} />
//             ))}
//         </div>
//     );
// }

// export default App;
