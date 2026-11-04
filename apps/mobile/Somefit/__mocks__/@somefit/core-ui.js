const React = require('react');
const RN = require('react-native');

const h = React.createElement;

module.exports = {
  Input: props => h(RN.TextInput, props),
  Button: props => h(RN.Pressable, props, props.children),
  Typography: props => h(RN.Text, props, props.children),
  Tip: props => h(RN.View, {testID: props.testID}, h(RN.Text, null, props.description)),
  Card: props => h(RN.View, props, props.children),
  SelectButton: Object.assign(
    props => h(RN.Pressable, props, props.children),
    {Group: props => h(RN.View, props, props.children)},
  ),
  Chip: Object.assign(
    props => h(RN.Pressable, props, props.children),
    {Group: props => h(RN.View, props, props.children)},
  ),
  Layout: Object.assign(
    props => h(RN.View, props, props.children),
    {
      Body: props => h(RN.View, props, props.children),
      Header: props => h(RN.View, props, props.children),
      Footer: props => h(RN.View, props, props.children),
    },
  ),
  BottomSheet: Object.assign(
    props => h(RN.View, props, props.children),
    {Action: props => h(RN.Pressable, props)},
  ),
};
