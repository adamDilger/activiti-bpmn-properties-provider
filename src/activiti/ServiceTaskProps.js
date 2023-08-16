import { TextFieldEntry, isTextFieldEntryEdited } from "@bpmn-io/properties-panel";
import { useService } from "bpmn-js-properties-panel";
import { ResultVariable, SkipExpression } from "./SharedProps";

export function ServiceTaskProps(_props) {
  const entries = [
    {
      id: "expression",
      component: ExpressionComponent,
      isEdited: isTextFieldEntryEdited,
    },
    {
      id: "delegateExpression",
      component: DelegateExpressionComponent,
      isEdited: isTextFieldEntryEdited,
    },
    {
      id: "class",
      component: ClassComponent,
      isEdited: isTextFieldEntryEdited,
    },
    ResultVariable,
    SkipExpression,
  ];

  return entries;
}

function ExpressionComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.expression;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      expression: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "expression",
    label: translate("Expression"),
    getValue,
    setValue,
    debounce,
  });
}

function DelegateExpressionComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.delegateExpression;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      delegateExpression: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "delegateExpression",
    label: translate("Delegate Expression"),
    getValue,
    setValue,
    debounce,
  });
}

function ClassComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.class;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      class: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "class",
    label: translate("Java Class"),
    getValue,
    setValue,
    debounce,
  });
}
