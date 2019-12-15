import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import _ from "lodash";
import { Container, Header, Segment, Grid, Loader } from "semantic-ui-react";
import queryString from "query-string";

import PageButtons from "./PageButtons";
import { getMeds } from "../../actions";
import CustomCard from "../CustomCard";

// renders medicine list
const renderMedList = (medArr, isLoading) => {
  if (isLoading) {
    return <Loader active />;
  }
  return medArr.map(med => {
    return <CustomCard med={med} key={med.name || 1} />;
  });
};

// converts object to array
const objToArr = obj => {
  return _.values(
    _.mapValues(obj, (value, key) => {
      value["name"] = key;
      return value;
    })
  );
};

/** MAIN COMPONENT */
const MedicineTypeHome = props => {
  // component's state
  const [page, setPage] = useState(null);
  const [medArr, setMedArr] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [type, setType] = useState(null);
  const [displayArr, setDisplayArr] = useState([]);

  // accessing the redux store
  const dispatch = useDispatch();
  const meds = useSelector(({ typeMedicines }) => typeMedicines);
  const isLoading = useSelector(({ isLoading }) => isLoading);
  const store = useStore();

  // accessing the page number from url
  const currPage = Number(queryString.parse(props.location.search).page);

  useEffect(() => {
    // on mounting and updating the type
    (async () => {
      dispatch({ type: "LOADING", payload: true });
      const data = await getMeds(props.match.params.type, 500);
      dispatch({ type: "GET_MEDS", payload: data });
      setType(props.match.params.type);
      setDisplayArr([]);
      setMedArr([]);
      setTotalPages(null);
      setPage(null);
    })();

    // on unmounting
    return () => {
      delete store.getState().typeMedicines[type];
    };
    // eslint-disable-next-line
  }, [props.match.params.type, dispatch, store]);

  // sets the loader to be false if data exists
  if (meds[type] && isLoading) {
    dispatch({ type: "LOADING", payload: false });
  }

  // checks if the medicines object is converted to array or not
  if (meds[type] && medArr.length === 0) {
    // if not then converts it
    setMedArr(objToArr(meds[type]));
  }

  // checks if the total pages is set or not
  if (medArr.length !== 0 && !totalPages) {
    setTotalPages(Math.ceil(medArr.length / 12));
  }

  // checks if page is changed or not
  if (page !== currPage && medArr.length !== 0) {
    setDisplayArr(medArr.slice((currPage - 1) * 12, currPage * 12));
    setPage(currPage);
  }

  return (
    <Container style={{ margin: "50px 0", width: "90%" }}>
      <Header as="h1">{type}</Header>
      <Segment placeholder style={{ minHeight: "600px" }}>
        <ul className="portfolio__items">
          {renderMedList(displayArr, isLoading)}
        </ul>
      </Segment>
      <Grid>
        <Grid.Column textAlign="center">
          <PageButtons type={type} page={page} totalPages={totalPages} />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

// class MedicineTypeHome extends React.Component {
//   state = { page: null, medArr: [], totalPages: null, type: null };

//   static getDerivedStateFromProps(props, state) {
//     // sets the type inside of state to be type inside url
//     state.type = props.match.params.type;

//     // sets the page inside of state to be page inside url
//     state.page = Number(queryString.parse(props.location.search).page);

//     // checks if the medicines of right type exists
//     if (!props.meds[state.type]) {
//       // if not then gets it
//       props.getTypeMeds(state.type, 50);
//     }

//     // sets medicines arr to array created from medicines object
//     state.medArr = _.values(
//       _.mapValues(props.meds[state.type], (value, key) => {
//         value["name"] = key;
//         return value;
//       })
//     );

//     // controls page flow
//     if (state.medArr) {
//       state.totalPages = Math.ceil(state.medArr.length / 12);
//       state.medArr = state.medArr.slice((state.page - 1) * 12, state.page * 12);
//     }

//     return state;
//   }
//   componentDidMount() {
//     this.fetchData();
//   }
//   fetchData = () => {
//     const { getTypeMeds } = this.props;
//     getTypeMeds(this.state.type, 50);
//   };

//   render() {
//     return (
//       <Container style={{ margin: "50px 0", width: "90%" }}>
//         <Header as="h1">{this.props.match.params.type}</Header>
//         <Segment placeholder>
//           <ul className="portfolio__items">{this.renderMedList()}</ul>
//         </Segment>
//         <Grid>
//           <Grid.Column textAlign="center">
//             <PageButtons
//               type={this.props.match.params.type}
//               page={this.state.page}
//               totalPages={this.state.totalPages}
//             />
//           </Grid.Column>
//         </Grid>
//       </Container>
//     );
//   }
// }

export default MedicineTypeHome;
