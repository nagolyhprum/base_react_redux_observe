import React, {
  Component
} from "react";
import { connect } from "react-redux";
import reselect from "utils/reselect";
import { dom } from "react-reactive-class";
const { div : Div } = dom;
const {
  base,
  index,
  mapStateToProps
} = reselect;

const Base = props =>
  <div>
    <Div>{props.base}</Div>
    <Div>{props.index}</Div>
  </div>;

export default connect(mapStateToProps({
  base,
  index
}))(Base);
