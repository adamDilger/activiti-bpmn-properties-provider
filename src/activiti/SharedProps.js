import { TextFieldEntry, isTextFieldEntryEdited } from "@bpmn-io/properties-panel";
import { useService } from "bpmn-js-properties-panel";

export const SkipExpression = {
  id: "skipExpression",
  component: SkipExpressionComponent,
  isEdited: isTextFieldEntryEdited,
};

export function SkipExpressionComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.get("skipExpression");
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      skipExpression: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "skipExpression",
    label: translate("Skip Expression"),
    getValue,
    setValue,
    debounce,
  });
}

export const ResultVariable = {
  id: "resultVariable",
  component: ResultVariableComponent,
  isEdited: isTextFieldEntryEdited,
};

export function ResultVariableComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.resultVariable;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      resultVariable: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "resultVariable",
    label: translate("Result Variable"),
    getValue,
    setValue,
    debounce,
  });
}
