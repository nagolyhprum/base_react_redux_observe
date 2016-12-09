import { createSelector } from "reselect";
import { BehaviorSubject } from "rx";

const withState = input => {
  const subject$ = new BehaviorSubject();
  const selector = createSelector(input, value => {
    setTimeout(() => subject$.onNext(value));
    return subject$;
  });
  return () => selector;
};

const withProps = input => () => withState(input)();

const mapStateToProps = observables => () => {
  const instances = Object.keys(observables).reduce((map, key) => Object.assign({}, map, {
    [key] : observables[key]()
  }), {});
  return (state, props) => Object.keys(instances).reduce((map, key) => Object.assign({}, map, {
    [key] : props[key] || instances[key](state, props)
  }), {});
};

const base = state => state.getIn(["base", "value"]);
const index = (state, props) => props.index;

export default {
  base : withState(base),
  index : withProps(index),
  mapStateToProps
};
